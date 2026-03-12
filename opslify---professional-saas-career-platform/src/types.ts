import { Type } from "@google/genai";

export interface User {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  mobile?: string;
  address?: string;
  city?: string;
  education?: string;
  experienceLevel?: "Fresher" | "Experienced";
  lookingFor?: string;
  linkedInUrl?: string;
  resumeUrl?: string;
  registrationDate: string;
  status: "active" | "disabled";
}

export interface Job {
  id: string;
  companyName: string;
  role: string;
  skills: string[];
  salaryMin: number;
  salaryMax: number;
  jobDescription: string;
  externalLink: string;
  jobType: "Remote" | "Hybrid";
  jobCategory: JobCategory;
  postedDate: string;
}

export type JobCategory = 
  | "Remote Tech"
  | "Remote Data Analyst"
  | "Remote HR & Administration"
  | "Remote Customer Success"
  | "Remote Data Entry"
  | "Remote AI Engineers"
  | "Remote Data Scientist";

export interface Application {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  jobId: string;
  jobRole: string;
  jobCategory: JobCategory;
  applicationDate: string;
  status: "Applied";
}

export interface Notification {
  id: string;
  userId?: string; // If undefined, it's for everyone
  title: string;
  message: string;
  category?: JobCategory;
  timestamp: string;
  type: "system" | "job" | "announcement";
}

export interface Experience {
  companyName: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  link?: string;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  experiences: Experience[];
  skills: string[];
  technicalSkills?: string[];
  hobbies?: string[];
  projects?: Project[];
  education: string;
}

export interface ResumeAuditResult {
  score: number;
  suggestions: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface AdminSettings {
  enabledCategories: JobCategory[];
  announcementBanner: string;
  maintenanceMode: boolean;
  announcementHistory?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  subHeadline: string;
  content: string;
  image: string;
  date: string;
  team: "Opslify Team" | "Content Team" | "Marketing Team";
  author: string;
}

export interface Ticket {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  mobile: string;
  message: string;
  timestamp: string;
  status: "Open" | "Resolved";
}

export interface PaymentRequest {
  id: string;
  userId: string;
  upiId: string;
  fullName: string;
  email: string;
  mobile: string;
  bankName: string;
  screenshotUrl: string;
  status: "Paid" | "Processing" | "Cancelled";
  paymentMode: string;
  timestamp: string;
}

export interface UserSubscription {
  userId: string;
  subscriptionDate: string; // ISO string
  status: "Monthly Subscription Active for 30 days" | "Subscription cancelled" | "Subscription pending";
  lastUpdated: string;
}
