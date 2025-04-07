import { eq } from "drizzle-orm";
import { db } from "./db";
import { 
  users, 
  skills, 
  userSkills, 
  companies,
  jobs,
  jobSkills,
  courses,
  courseSkills,
  userCourses,
  cvAnalysis,
  jobApplications,
  type User,
  type Skill,
  type UserSkill,
  type Company,
  type Job,
  type JobSkill,
  type Course,
  type CourseSkill,
  type UserCourse,
  type CvAnalysis,
  type JobApplication,
  type InsertUser,
} from "@shared/schema";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Skill operations
  getSkills(): Promise<Skill[]>;
  getSkillById(id: number): Promise<Skill | undefined>;
  getUserSkills(userId: number): Promise<any[]>;
  addUserSkill(userSkill: UserSkill): Promise<UserSkill>;
  
  // Company operations
  createCompany(company: Company): Promise<Company>;
  getCompanyByUserId(userId: number): Promise<Company | undefined>;
  
  // Job operations
  createJob(job: Job): Promise<Job>;
  getJobs(): Promise<Job[]>;
  getJobById(id: number): Promise<Job | undefined>;
  getJobsByCompanyId(companyId: number): Promise<Job[]>;
  getJobSkills(jobId: number): Promise<any[]>;
  
  // Course operations
  getCourses(): Promise<Course[]>;
  getCourseById(id: number): Promise<Course | undefined>;
  getUserCourses(userId: number): Promise<any[]>;
  enrollUserInCourse(userCourse: UserCourse): Promise<UserCourse>;
  updateUserCourseProgress(id: number, progress: number): Promise<UserCourse>;
  
  // CV Analysis
  createCvAnalysis(analysis: CvAnalysis): Promise<CvAnalysis>;
  getCvAnalysisByUserId(userId: number): Promise<CvAnalysis[]>;
  
  // Job Applications
  createJobApplication(application: JobApplication): Promise<JobApplication>;
  getJobApplicationsByUserId(userId: number): Promise<any[]>;
  getJobApplicationsByJobId(jobId: number): Promise<any[]>;
  updateJobApplicationStatus(id: number, status: string): Promise<JobApplication>;
  
  // Session store for authentication
  sessionStore: any;
}

export class DatabaseStorage implements IStorage {
  sessionStore: any;
  
  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool,
      createTableIfMissing: true 
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Skill operations
  async getSkills(): Promise<Skill[]> {
    return db.select().from(skills);
  }
  
  async getSkillById(id: number): Promise<Skill | undefined> {
    const [skill] = await db.select().from(skills).where(eq(skills.id, id));
    return skill;
  }
  
  async getUserSkills(userId: number): Promise<any[]> {
    return db.select({
      ...userSkills,
      skill: skills
    })
    .from(userSkills)
    .where(eq(userSkills.userId, userId))
    .innerJoin(skills, eq(userSkills.skillId, skills.id));
  }
  
  async addUserSkill(userSkill: UserSkill): Promise<UserSkill> {
    const [result] = await db.insert(userSkills).values(userSkill).returning();
    return result;
  }
  
  // Company operations
  async createCompany(company: Company): Promise<Company> {
    const [result] = await db.insert(companies).values(company).returning();
    return result;
  }
  
  async getCompanyByUserId(userId: number): Promise<Company | undefined> {
    const [company] = await db.select().from(companies).where(eq(companies.userId, userId));
    return company;
  }
  
  // Job operations
  async createJob(job: Job): Promise<Job> {
    const [result] = await db.insert(jobs).values(job).returning();
    return result;
  }
  
  async getJobs(): Promise<Job[]> {
    return db.select().from(jobs);
  }
  
  async getJobById(id: number): Promise<Job | undefined> {
    const [job] = await db.select().from(jobs).where(eq(jobs.id, id));
    return job;
  }
  
  async getJobsByCompanyId(companyId: number): Promise<Job[]> {
    return db.select().from(jobs).where(eq(jobs.companyId, companyId));
  }
  
  async getJobSkills(jobId: number): Promise<any[]> {
    return db.select({
      ...jobSkills,
      skill: skills
    })
    .from(jobSkills)
    .where(eq(jobSkills.jobId, jobId))
    .innerJoin(skills, eq(jobSkills.skillId, skills.id));
  }
  
  // Course operations
  async getCourses(): Promise<Course[]> {
    return db.select().from(courses);
  }
  
  async getCourseById(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }
  
  async getUserCourses(userId: number): Promise<any[]> {
    return db.select({
      ...userCourses,
      course: courses
    })
    .from(userCourses)
    .where(eq(userCourses.userId, userId))
    .innerJoin(courses, eq(userCourses.courseId, courses.id));
  }
  
  async enrollUserInCourse(userCourse: UserCourse): Promise<UserCourse> {
    const [result] = await db.insert(userCourses).values(userCourse).returning();
    return result;
  }
  
  async updateUserCourseProgress(id: number, progress: number): Promise<UserCourse> {
    const [result] = await db
      .update(userCourses)
      .set({ 
        progress,
        status: progress === 100 ? 'completed' : 'in_progress',
        completedAt: progress === 100 ? new Date() : null
      })
      .where(eq(userCourses.id, id))
      .returning();
    return result;
  }
  
  // CV Analysis
  async createCvAnalysis(analysis: CvAnalysis): Promise<CvAnalysis> {
    const [result] = await db.insert(cvAnalysis).values(analysis).returning();
    return result;
  }
  
  async getCvAnalysisByUserId(userId: number): Promise<CvAnalysis[]> {
    return db.select().from(cvAnalysis).where(eq(cvAnalysis.userId, userId));
  }
  
  // Job Applications
  async createJobApplication(application: JobApplication): Promise<JobApplication> {
    const [result] = await db.insert(jobApplications).values(application).returning();
    return result;
  }
  
  async getJobApplicationsByUserId(userId: number): Promise<any[]> {
    return db.select({
      ...jobApplications,
      job: jobs
    })
    .from(jobApplications)
    .where(eq(jobApplications.userId, userId))
    .innerJoin(jobs, eq(jobApplications.jobId, jobs.id));
  }
  
  async getJobApplicationsByJobId(jobId: number): Promise<any[]> {
    return db.select({
      ...jobApplications,
      user: users
    })
    .from(jobApplications)
    .where(eq(jobApplications.jobId, jobId))
    .innerJoin(users, eq(jobApplications.userId, users.id));
  }
  
  async updateJobApplicationStatus(id: number, status: string): Promise<JobApplication> {
    const status_val = status as any;
    const [result] = await db
      .update(jobApplications)
      .set({ 
        status: status_val,
        updatedAt: new Date()
      })
      .where(eq(jobApplications.id, id))
      .returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
