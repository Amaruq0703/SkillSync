import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertCvAnalysisSchema } from "@shared/schema";

// Helper middleware to check if user is authenticated
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);
  
  // Basic API test route
  app.get("/api/hello", (req: Request, res: Response) => {
    res.json({ hello: "world" });
  });

  // Job routes
  app.get("/api/jobs", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobs = await storage.getJobs();
      res.json(jobs);
    } catch (err) {
      next(err);
    }
  });
  
  app.get("/api/jobs/company/:companyId", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const companyId = parseInt(req.params.companyId);
      if (isNaN(companyId)) {
        return res.status(400).json({ error: "Invalid company ID" });
      }
      
      const jobs = await storage.getJobsByCompany(companyId);
      res.json(jobs);
    } catch (err) {
      next(err);
    }
  });
  
  app.post("/api/jobs", isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Only employers can create jobs
      if (req.user!.userType !== "employer") {
        return res.status(403).json({ error: "Only employers can create jobs" });
      }
      
      // Get the company profile for the current user
      const companyProfile = await storage.getCompanyProfile(req.user!.id);
      if (!companyProfile) {
        return res.status(404).json({ error: "Company profile not found" });
      }
      
      const job = await storage.createJob({
        ...req.body,
        companyId: companyProfile.id
      });
      
      res.status(201).json(job);
    } catch (err) {
      next(err);
    }
  });
  
  // CV Analysis routes
  app.post("/api/cv-analysis", isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse and validate the request body
      const parsedData = insertCvAnalysisSchema.safeParse(req.body);
      if (!parsedData.success) {
        return res.status(400).json({ error: "Invalid input data" });
      }

      // Create the CV analysis
      const analysis = await storage.saveCvAnalysis({
        ...parsedData.data,
        userId: req.user!.id
      });
      
      res.status(201).json(analysis);
    } catch (err) {
      next(err);
    }
  });
  
  app.get("/api/cv-analysis", isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const analysis = await storage.getCvAnalysisByUser(req.user!.id);
      if (!analysis) {
        return res.status(404).json({ error: "CV analysis not found" });
      }
      
      res.json(analysis);
    } catch (err) {
      next(err);
    }
  });

  // Return a server instance
  const httpServer = createServer(app);
  return httpServer;
}
