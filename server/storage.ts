import { 
  users, type User, type InsertUser, 
  studentProfiles, type StudentProfile, type InsertStudentProfile,
  companyProfiles, type CompanyProfile, type InsertCompanyProfile, 
  employeeProfiles, type EmployeeProfile, type InsertEmployeeProfile,
  jobs, type Job, type InsertJob,
  jobApplications, cvAnalysis, type CvAnalysis, type InsertCvAnalysis
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

// Helper function to ensure JSON arrays are properly typed as string arrays
function ensureStringArray(data: any): string[] | null {
  if (!data) return null;
  if (Array.isArray(data)) return data as string[];
  // If it's an object with numeric keys, convert to proper array
  if (typeof data === 'object') {
    return Object.values(data) as string[];
  }
  return null;
}

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Student profile management
  getStudentProfile(userId: number): Promise<StudentProfile | undefined>;
  createStudentProfile(profile: InsertStudentProfile): Promise<StudentProfile>;
  updateStudentProfile(userId: number, profile: Partial<InsertStudentProfile>): Promise<StudentProfile | undefined>;
  
  // Company profile management
  getCompanyProfile(userId: number): Promise<CompanyProfile | undefined>;
  createCompanyProfile(profile: InsertCompanyProfile): Promise<CompanyProfile>;
  updateCompanyProfile(userId: number, profile: Partial<InsertCompanyProfile>): Promise<CompanyProfile | undefined>;
  
  // Employee profile management
  getEmployeeProfile(userId: number): Promise<EmployeeProfile | undefined>;
  createEmployeeProfile(profile: InsertEmployeeProfile): Promise<EmployeeProfile>;
  updateEmployeeProfile(userId: number, profile: Partial<InsertEmployeeProfile>): Promise<EmployeeProfile | undefined>;
  
  // Job management
  getJobs(): Promise<Job[]>;
  getJobsByCompany(companyId: number): Promise<Job[]>;
  createJob(job: InsertJob): Promise<Job>;
  
  // CV Analysis
  saveCvAnalysis(analysis: InsertCvAnalysis): Promise<CvAnalysis>;
  getCvAnalysisByUser(userId: number): Promise<CvAnalysis | undefined>;

  // Session store
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private studentProfiles: Map<number, StudentProfile>;
  private companyProfiles: Map<number, CompanyProfile>;
  private employeeProfiles: Map<number, EmployeeProfile>;
  private jobs: Map<number, Job>;
  private cvAnalyses: Map<number, CvAnalysis>;
  
  currentId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.studentProfiles = new Map();
    this.companyProfiles = new Map();
    this.employeeProfiles = new Map();
    this.jobs = new Map();
    this.cvAnalyses = new Map();
    this.currentId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  // User management
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const now = new Date();
    const user: User = { 
      id,
      username: insertUser.username,
      email: insertUser.email,
      password: insertUser.password,
      userType: insertUser.userType,
      createdAt: now 
    };
    this.users.set(id, user);
    return user;
  }

  // Student profile management
  async getStudentProfile(userId: number): Promise<StudentProfile | undefined> {
    return Array.from(this.studentProfiles.values()).find(
      (profile) => profile.userId === userId
    );
  }

  async createStudentProfile(profile: InsertStudentProfile): Promise<StudentProfile> {
    const id = this.currentId++;
    // Ensure all fields have proper values to match StudentProfile type
    const studentProfile: StudentProfile = { 
      ...profile, 
      id,
      education: profile.education || null,
      graduationYear: profile.graduationYear || null,
      university: profile.university || null,
      skills: ensureStringArray(profile.skills),
      interests: ensureStringArray(profile.interests),
      resumeUrl: profile.resumeUrl || null,
      bio: profile.bio || null
    };
    this.studentProfiles.set(id, studentProfile);
    return studentProfile;
  }

  async updateStudentProfile(userId: number, profile: Partial<InsertStudentProfile>): Promise<StudentProfile | undefined> {
    // Use Array.from instead of entries() to avoid MapIterator type issues
    const existingProfile = Array.from(this.studentProfiles.values())
      .find(profile => profile.userId === userId);
    
    if (existingProfile) {
      // Create a copy of the profile to avoid mutating the input
      const profileCopy = { ...profile };
      
      // Process arrays with our helper
      if (profileCopy.skills) profileCopy.skills = ensureStringArray(profileCopy.skills);
      if (profileCopy.interests) profileCopy.interests = ensureStringArray(profileCopy.interests);
      
      const updatedProfile = { ...existingProfile, ...profileCopy };
      this.studentProfiles.set(existingProfile.id, updatedProfile);
      return updatedProfile;
    }
    return undefined;
  }

  // Company profile management
  async getCompanyProfile(userId: number): Promise<CompanyProfile | undefined> {
    return Array.from(this.companyProfiles.values()).find(
      (profile) => profile.userId === userId
    );
  }

  async createCompanyProfile(profile: InsertCompanyProfile): Promise<CompanyProfile> {
    const id = this.currentId++;
    const companyProfile: CompanyProfile = { 
      ...profile, 
      id,
      industry: profile.industry || null,
      size: profile.size || null,
      website: profile.website || null,
      location: profile.location || null,
      description: profile.description || null
    };
    this.companyProfiles.set(id, companyProfile);
    return companyProfile;
  }

  async updateCompanyProfile(userId: number, profile: Partial<InsertCompanyProfile>): Promise<CompanyProfile | undefined> {
    const existingProfile = Array.from(this.companyProfiles.values())
      .find(profile => profile.userId === userId);
    
    if (existingProfile) {
      const updatedProfile = { ...existingProfile, ...profile };
      this.companyProfiles.set(existingProfile.id, updatedProfile);
      return updatedProfile;
    }
    return undefined;
  }

  // Employee profile management
  async getEmployeeProfile(userId: number): Promise<EmployeeProfile | undefined> {
    return Array.from(this.employeeProfiles.values()).find(
      (profile) => profile.userId === userId
    );
  }

  async createEmployeeProfile(profile: InsertEmployeeProfile): Promise<EmployeeProfile> {
    const id = this.currentId++;
    const employeeProfile: EmployeeProfile = { 
      ...profile, 
      id,
      companyId: profile.companyId || null,
      position: profile.position || null,
      department: profile.department || null,
      skills: ensureStringArray(profile.skills),
      yearsOfExperience: profile.yearsOfExperience || null,
      bio: profile.bio || null
    };
    this.employeeProfiles.set(id, employeeProfile);
    return employeeProfile;
  }

  async updateEmployeeProfile(userId: number, profile: Partial<InsertEmployeeProfile>): Promise<EmployeeProfile | undefined> {
    const existingProfile = Array.from(this.employeeProfiles.values())
      .find(profile => profile.userId === userId);
    
    if (existingProfile) {
      // Create a copy of the profile to avoid mutating the input
      const profileCopy = { ...profile };
      
      // Process arrays with our helper
      if (profileCopy.skills) profileCopy.skills = ensureStringArray(profileCopy.skills);
      
      const updatedProfile = { ...existingProfile, ...profileCopy };
      this.employeeProfiles.set(existingProfile.id, updatedProfile);
      return updatedProfile;
    }
    return undefined;
  }

  // Job management
  async getJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values());
  }

  async getJobsByCompany(companyId: number): Promise<Job[]> {
    return Array.from(this.jobs.values()).filter(job => job.companyId === companyId);
  }

  async createJob(job: InsertJob): Promise<Job> {
    const id = this.currentId++;
    const now = new Date();
    const newJob: Job = { 
      ...job, 
      id, 
      createdAt: now,
      location: job.location || null,
      requirements: ensureStringArray(job.requirements),
      salary: job.salary || null,
      isRemote: job.isRemote || null
    };
    this.jobs.set(id, newJob);
    return newJob;
  }

  // CV Analysis
  async saveCvAnalysis(analysis: InsertCvAnalysis): Promise<CvAnalysis> {
    const id = this.currentId++;
    const now = new Date();
    const newAnalysis: CvAnalysis = { 
      ...analysis, 
      id, 
      analysisDate: now,
      resumeText: analysis.resumeText || null,
      extractedSkills: ensureStringArray(analysis.extractedSkills),
      recommendations: ensureStringArray(analysis.recommendations),
      strengths: ensureStringArray(analysis.strengths),
      weaknesses: ensureStringArray(analysis.weaknesses)
    };
    this.cvAnalyses.set(id, newAnalysis);
    return newAnalysis;
  }

  async getCvAnalysisByUser(userId: number): Promise<CvAnalysis | undefined> {
    const analyses = Array.from(this.cvAnalyses.values())
      .filter(analysis => analysis.userId === userId)
      .sort((a, b) => b.analysisDate.getTime() - a.analysisDate.getTime());
    
    return analyses[0];
  }
}

export const storage = new MemStorage();
