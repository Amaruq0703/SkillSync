import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Base user table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  userType: text("user_type").notNull(), // "student", "employee", "employer"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Student profiles
export const studentProfiles = pgTable("student_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull().unique(),
  fullName: text("full_name").notNull(),
  education: text("education"),
  graduationYear: integer("graduation_year"),
  university: text("university"),
  skills: jsonb("skills").$type<string[]>(),
  interests: jsonb("interests").$type<string[]>(),
  resumeUrl: text("resume_url"),
  bio: text("bio"),
});

// Company/Employer profiles
export const companyProfiles = pgTable("company_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull().unique(),
  companyName: text("company_name").notNull(),
  industry: text("industry"),
  size: text("size"), // Small, Medium, Large, Enterprise
  website: text("website"),
  location: text("location"),
  description: text("description"),
});

// Employee profiles
export const employeeProfiles = pgTable("employee_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull().unique(),
  companyId: integer("company_id").references(() => companyProfiles.id),
  fullName: text("full_name").notNull(),
  position: text("position"),
  department: text("department"),
  skills: jsonb("skills").$type<string[]>(),
  yearsOfExperience: integer("years_of_experience"),
  bio: text("bio"),
});

// Jobs posted by companies
export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").references(() => companyProfiles.id).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  requirements: jsonb("requirements").$type<string[]>(),
  location: text("location"),
  salary: text("salary"),
  isRemote: boolean("is_remote"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Job applications by students
export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").references(() => jobs.id).notNull(),
  studentId: integer("student_id").references(() => studentProfiles.id).notNull(),
  status: text("status").notNull(), // "pending", "reviewing", "accepted", "rejected"
  matchScore: integer("match_score"),
  coverLetter: text("cover_letter"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// CV Analysis results
export const cvAnalysis = pgTable("cv_analysis", {
  id: serial("id").primaryKey(), 
  userId: integer("user_id").references(() => users.id).notNull(),
  resumeText: text("resume_text"),
  extractedSkills: jsonb("extracted_skills").$type<string[]>(),
  recommendations: jsonb("recommendations").$type<string[]>(),
  strengths: jsonb("strengths").$type<string[]>(),
  weaknesses: jsonb("weaknesses").$type<string[]>(),
  analysisDate: timestamp("analysis_date").defaultNow().notNull(),
});

// Course recommendations based on skill gaps
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  skillsTaught: jsonb("skills_taught").$type<string[]>().notNull(),
  difficulty: text("difficulty"), // "beginner", "intermediate", "advanced"
  durationWeeks: integer("duration_weeks"),
  provider: text("provider"),
  url: text("url"),
});

// Schema definitions for inserting data
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  userType: true,
});

export const insertStudentProfileSchema = createInsertSchema(studentProfiles).omit({
  id: true,
});

export const insertCompanyProfileSchema = createInsertSchema(companyProfiles).omit({
  id: true,
});

export const insertEmployeeProfileSchema = createInsertSchema(employeeProfiles).omit({
  id: true,
});

export const insertJobSchema = createInsertSchema(jobs).omit({
  id: true,
  createdAt: true,
});

export const insertCvAnalysisSchema = createInsertSchema(cvAnalysis).omit({
  id: true,
  analysisDate: true,
});

// Create types for each schema
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertStudentProfile = z.infer<typeof insertStudentProfileSchema>;
export type StudentProfile = typeof studentProfiles.$inferSelect;

export type InsertCompanyProfile = z.infer<typeof insertCompanyProfileSchema>;
export type CompanyProfile = typeof companyProfiles.$inferSelect;

export type InsertEmployeeProfile = z.infer<typeof insertEmployeeProfileSchema>;
export type EmployeeProfile = typeof employeeProfiles.$inferSelect;

export type InsertJob = z.infer<typeof insertJobSchema>;
export type Job = typeof jobs.$inferSelect;

export type InsertCvAnalysis = z.infer<typeof insertCvAnalysisSchema>;
export type CvAnalysis = typeof cvAnalysis.$inferSelect;
