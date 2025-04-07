import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  userType: text("user_type", { enum: ["student", "employee", "employer"] }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  category: text("category").notNull(),
  description: text("description"),
});

export const userSkills = pgTable("user_skills", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  skillId: integer("skill_id").references(() => skills.id, { onDelete: "cascade" }).notNull(),
  proficiencyLevel: integer("proficiency_level").notNull(), // 1-5 scale
  verified: boolean("verified").default(false),
});

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  industry: text("industry").notNull(),
  description: text("description"),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
});

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  companyId: integer("company_id").references(() => companies.id, { onDelete: "cascade" }).notNull(),
  location: text("location"),
  salary: text("salary"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const jobSkills = pgTable("job_skills", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").references(() => jobs.id, { onDelete: "cascade" }).notNull(),
  skillId: integer("skill_id").references(() => skills.id, { onDelete: "cascade" }).notNull(),
  requiredLevel: integer("required_level"), // 1-5 scale
  preferred: boolean("preferred").default(false),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  provider: text("provider").notNull(),
  url: text("url").notNull(),
  duration: text("duration"),
  difficulty: text("difficulty", { enum: ["beginner", "intermediate", "advanced"] }).notNull(),
});

export const courseSkills = pgTable("course_skills", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
  skillId: integer("skill_id").references(() => skills.id, { onDelete: "cascade" }).notNull(),
  targetLevel: integer("target_level"), // What proficiency level this course helps achieve
});

export const userCourses = pgTable("user_courses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  courseId: integer("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
  status: text("status", { enum: ["not_started", "in_progress", "completed"] }).default("not_started").notNull(),
  progress: integer("progress").default(0), // Percentage
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
});

export const cvAnalysis = pgTable("cv_analysis", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  cvText: text("cv_text").notNull(),
  analysis: json("analysis").notNull(),
  skillGapAnalysis: json("skill_gap_analysis"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  jobId: integer("job_id").references(() => jobs.id, { onDelete: "cascade" }).notNull(),
  status: text("status", { enum: ["applied", "under_review", "interview", "rejected", "accepted"] }).default("applied").notNull(),
  matchScore: integer("match_score"), // 0-100 score based on skill matching algorithm
  appliedAt: timestamp("applied_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  userType: true,
});

export const insertSkillSchema = createInsertSchema(skills);
export const insertUserSkillSchema = createInsertSchema(userSkills);
export const insertCompanySchema = createInsertSchema(companies);
export const insertJobSchema = createInsertSchema(jobs);
export const insertJobSkillSchema = createInsertSchema(jobSkills);
export const insertCourseSchema = createInsertSchema(courses);
export const insertCourseSkillSchema = createInsertSchema(courseSkills);
export const insertUserCourseSchema = createInsertSchema(userCourses);
export const insertCvAnalysisSchema = createInsertSchema(cvAnalysis).pick({
  userId: true,
  cvText: true,
});
export const insertJobApplicationSchema = createInsertSchema(jobApplications).pick({
  userId: true,
  jobId: true,
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  userSkills: many(userSkills),
  companies: many(companies),
  userCourses: many(userCourses),
  cvAnalyses: many(cvAnalysis),
  jobApplications: many(jobApplications),
}));

export const skillsRelations = relations(skills, ({ many }) => ({
  userSkills: many(userSkills),
  jobSkills: many(jobSkills),
  courseSkills: many(courseSkills),
}));

export const jobsRelations = relations(jobs, ({ one, many }) => ({
  company: one(companies, {
    fields: [jobs.companyId],
    references: [companies.id],
  }),
  jobSkills: many(jobSkills),
  jobApplications: many(jobApplications),
}));

export const coursesRelations = relations(courses, ({ many }) => ({
  courseSkills: many(courseSkills),
  userCourses: many(userCourses),
}));

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type UserSkill = typeof userSkills.$inferSelect;
export type Company = typeof companies.$inferSelect;
export type Job = typeof jobs.$inferSelect;
export type JobSkill = typeof jobSkills.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type CourseSkill = typeof courseSkills.$inferSelect;
export type UserCourse = typeof userCourses.$inferSelect;
export type CvAnalysis = typeof cvAnalysis.$inferSelect;
export type JobApplication = typeof jobApplications.$inferSelect;
