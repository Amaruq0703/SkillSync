import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import OpenAI from "openai";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { users, skills, userSkills, jobSkills, jobs, companies, courses, cvAnalysis } from "@shared/schema";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  setupAuth(app);

  // User routes
  app.get("/api/users/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Don't return the password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  // Skills routes
  app.get("/api/skills", async (req, res) => {
    try {
      const allSkills = await storage.getSkills();
      res.json(allSkills);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  app.get("/api/users/:userId/skills", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      const userId = parseInt(req.params.userId);
      const userSkills = await storage.getUserSkills(userId);
      res.json(userSkills);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  app.post("/api/users/:userId/skills", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      const userId = parseInt(req.params.userId);
      const userSkill = await storage.addUserSkill({
        ...req.body,
        userId,
      });
      res.status(201).json(userSkill);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  // Company routes
  app.post("/api/companies", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      const company = await storage.createCompany({
        ...req.body,
        userId: (req.user as any).id,
      });
      res.status(201).json(company);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  app.get("/api/companies/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const company = await storage.getCompanyByUserId(userId);
      
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      
      res.json(company);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  // Job routes
  app.get("/api/jobs", async (req, res) => {
    try {
      const jobs = await storage.getJobs();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  app.post("/api/companies/:companyId/jobs", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      const companyId = parseInt(req.params.companyId);
      const job = await storage.createJob({
        ...req.body,
        companyId,
      });
      res.status(201).json(job);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  app.get("/api/companies/:companyId/jobs", async (req, res) => {
    try {
      const companyId = parseInt(req.params.companyId);
      const jobs = await storage.getJobsByCompanyId(companyId);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  // Course routes
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  app.get("/api/users/:userId/courses", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      const userId = parseInt(req.params.userId);
      const userCourses = await storage.getUserCourses(userId);
      res.json(userCourses);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  app.post("/api/users/:userId/courses/:courseId", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      const userId = parseInt(req.params.userId);
      const courseId = parseInt(req.params.courseId);
      
      const userCourse = await storage.enrollUserInCourse({
        userId,
        courseId,
        id: 0, // This will be auto-generated by the database
        status: "not_started",
        progress: 0,
        startedAt: null,
        completedAt: null,
      });
      
      res.status(201).json(userCourse);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  app.patch("/api/users/:userId/courses/:userCourseId", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      const userCourseId = parseInt(req.params.userCourseId);
      const { progress } = req.body;
      
      const updatedUserCourse = await storage.updateUserCourseProgress(userCourseId, progress);
      res.json(updatedUserCourse);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  // CV Analysis routes
  app.post("/api/cv-analysis", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      const { cvText } = req.body;
      const userId = (req.user as any).id;
      
      // Get skills from the database to use in the prompt
      const allSkills = await storage.getSkills();
      const skillsText = allSkills.map(skill => skill.name).join(", ");
      
      // Use OpenAI to analyze the CV
      const analysisResponse = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: `You are an expert CV analyzer for a career platform. 
            Analyze the CV text to identify skills, experience, education, and career trajectory. 
            Consider these skills in your analysis: ${skillsText}.
            Output your analysis in JSON format with these sections:
            1. identifiedSkills (array of skill objects with name and proficiencyLevel 1-5)
            2. educationSummary (string)
            3. experienceSummary (string)
            4. strengths (array of strings)
            5. weaknesses (array of strings)
            6. careerRecommendations (array of strings)`
          },
          {
            role: "user",
            content: cvText
          }
        ],
        response_format: { type: "json_object" }
      });
      
      const analysisResult = JSON.parse(analysisResponse.choices[0].message.content);
      
      // Next, perform skill gap analysis by comparing with in-demand job skills
      // Get job skills from the database
      const jobSkillsData = await db
        .select({
          skillId: jobSkills.skillId,
          skillName: skills.name,
          requiredLevel: jobSkills.requiredLevel,
          count: db.count()
        })
        .from(jobSkills)
        .innerJoin(skills, eq(jobSkills.skillId, skills.id))
        .groupBy(jobSkills.skillId, skills.name, jobSkills.requiredLevel);
      
      // Create skill gap analysis
      const identifiedSkillsMap = new Map(
        analysisResult.identifiedSkills.map((s: any) => [s.name.toLowerCase(), s.proficiencyLevel])
      );
      
      const skillGapAnalysis = {
        missingCriticalSkills: [],
        skillsToImprove: [],
        strongSkills: []
      };
      
      jobSkillsData.forEach(job => {
        const skillName = job.skillName;
        const requiredLevel = job.requiredLevel || 3; // Default to 3 if not specified
        const userLevel = identifiedSkillsMap.get(skillName.toLowerCase()) || 0;
        
        if (userLevel === 0) {
          skillGapAnalysis.missingCriticalSkills.push({
            skillName,
            requiredLevel,
            currentLevel: 0,
            gap: requiredLevel
          });
        } else if (userLevel < requiredLevel) {
          skillGapAnalysis.skillsToImprove.push({
            skillName,
            requiredLevel,
            currentLevel: userLevel,
            gap: requiredLevel - userLevel
          });
        } else {
          skillGapAnalysis.strongSkills.push({
            skillName,
            requiredLevel,
            currentLevel: userLevel,
            surplus: userLevel - requiredLevel
          });
        }
      });
      
      // Create and save the CV analysis
      const cvAnalysisEntry = await storage.createCvAnalysis({
        userId,
        cvText,
        analysis: analysisResult,
        skillGapAnalysis,
        id: 0, // This will be auto-generated by the database
        createdAt: new Date()
      });
      
      res.status(201).json({
        id: cvAnalysisEntry.id,
        analysis: analysisResult,
        skillGapAnalysis
      });
    } catch (error) {
      console.error('CV Analysis error:', error);
      res.status(500).json({ error: "Error analyzing CV" });
    }
  });

  app.get("/api/users/:userId/cv-analysis", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      const userId = parseInt(req.params.userId);
      const analyses = await storage.getCvAnalysisByUserId(userId);
      res.json(analyses);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  // Job matching endpoint
  app.get("/api/users/:userId/job-matches", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      const userId = parseInt(req.params.userId);
      
      // Get user's skills
      const userSkillsData = await storage.getUserSkills(userId);
      const userSkillMap = new Map(
        userSkillsData.map(us => [us.skillId, us.proficiencyLevel])
      );
      
      // Get all jobs with their required skills
      const allJobs = await storage.getJobs();
      const jobMatches = [];
      
      for (const job of allJobs) {
        const jobSkillsData = await storage.getJobSkills(job.id);
        
        // Calculate match score based on skill overlap and proficiency levels
        let totalScore = 0;
        let maxPossibleScore = 0;
        
        for (const jobSkill of jobSkillsData) {
          const requiredLevel = jobSkill.requiredLevel || 3; // Default to 3 if not specified
          const userLevel = userSkillMap.get(jobSkill.skillId) || 0;
          
          maxPossibleScore += requiredLevel * 20; // Each skill level is worth 20 points
          
          if (userLevel > 0) {
            // User has the skill
            const levelScore = Math.min(userLevel, requiredLevel) * 20;
            totalScore += levelScore;
          }
        }
        
        // Calculate percentage match
        const matchPercentage = maxPossibleScore > 0 
          ? Math.round((totalScore / maxPossibleScore) * 100) 
          : 0;
        
        // Get company info
        const company = await storage.getCompanyByUserId(job.companyId);
        
        jobMatches.push({
          job,
          company,
          matchScore: matchPercentage,
          missingSkills: jobSkillsData
            .filter(js => !userSkillMap.has(js.skillId))
            .map(js => js.skill)
        });
      }
      
      // Sort by match score descending
      jobMatches.sort((a, b) => b.matchScore - a.matchScore);
      
      res.json(jobMatches);
    } catch (error) {
      console.error('Job matching error:', error);
      res.status(500).json({ error: "Error finding job matches" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
