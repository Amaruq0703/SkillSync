import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || 'skillsync-dev-secret',
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      secure: process.env.NODE_ENV === 'production',
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (err) {
        return done(err);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      // Check if username exists
      const existingUserByName = await storage.getUserByUsername(req.body.username);
      if (existingUserByName) {
        return res.status(400).json({ error: "Username already exists" });
      }
      
      // Check if email exists
      const existingUserByEmail = await storage.getUserByEmail(req.body.email);
      if (existingUserByEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const user = await storage.createUser({
        ...req.body,
        password: await hashPassword(req.body.password),
      });

      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json(req.user);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });
  
  // Initialize profile based on user type after registration
  app.post("/api/register/:userType/profile", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      
      const { userType } = req.params;
      const userId = req.user!.id;
      
      switch (userType) {
        case 'student':
          const studentProfile = await storage.createStudentProfile({
            userId,
            fullName: req.body.fullName,
            ...req.body
          });
          return res.status(201).json(studentProfile);
          
        case 'employer':
          const companyProfile = await storage.createCompanyProfile({
            userId,
            companyName: req.body.companyName,
            ...req.body
          });
          return res.status(201).json(companyProfile);
          
        case 'employee':
          const employeeProfile = await storage.createEmployeeProfile({
            userId,
            fullName: req.body.fullName,
            ...req.body
          });
          return res.status(201).json(employeeProfile);
          
        default:
          return res.status(400).json({ error: "Invalid user type" });
      }
    } catch (err) {
      next(err);
    }
  });
  
  // Get current user's profile
  app.get("/api/profile", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      
      const userId = req.user!.id;
      const userType = req.user!.userType;
      
      let profile = null;
      switch (userType) {
        case 'student':
          profile = await storage.getStudentProfile(userId);
          break;
          
        case 'employer':
          profile = await storage.getCompanyProfile(userId);
          break;
          
        case 'employee':
          profile = await storage.getEmployeeProfile(userId);
          break;
          
        default:
          return res.status(400).json({ error: "Invalid user type" });
      }
      
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      
      res.json(profile);
    } catch (err) {
      next(err);
    }
  });
}