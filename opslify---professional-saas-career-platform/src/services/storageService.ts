import { User, Job, Application, Notification, AdminSettings, JobCategory, Ticket, BlogPost, PaymentRequest, UserSubscription } from "../types";

const STORAGE_KEYS = {
  USERS: "opslify_users",
  JOBS: "opslify_jobs",
  APPLICATIONS: "opslify_applications",
  NOTIFICATIONS: "opslify_notifications",
  SETTINGS: "opslify_settings",
  CURRENT_USER: "opslify_current_user",
  TICKETS: "opslify_tickets",
  BLOGS: "opslify_blogs",
  PAYMENTS: "opslify_payments",
  SUBSCRIPTIONS: "opslify_subscriptions",
};

export const StorageService = {
  // Blogs
  getBlogs: (): BlogPost[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.BLOGS) || "[]"),
  saveBlog: (blog: BlogPost) => {
    const blogs = StorageService.getBlogs();
    const index = blogs.findIndex(b => b.id === blog.id);
    if (index > -1) blogs[index] = blog;
    else blogs.unshift(blog); // Newest first
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
  },
  deleteBlog: (id: string) => {
    const blogs = StorageService.getBlogs().filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
  },

  // Users
  getUsers: (): User[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]"),
  saveUser: (user: User) => {
    const users = StorageService.getUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index > -1) users[index] = user;
    else users.push(user);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },
  deleteUser: (id: string) => {
    const users = StorageService.getUsers().filter(u => u.id !== id);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  // Auth
  getCurrentUser: (): User | null => JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || "null"),
  setCurrentUser: (user: User | null) => localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user)),

  // Jobs
  getJobs: (): Job[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.JOBS) || "[]"),
  saveJob: (job: Job) => {
    const jobs = StorageService.getJobs();
    jobs.push(job);
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
    
    // Trigger notification
    StorageService.addNotification({
      id: Math.random().toString(36).substr(2, 9),
      title: "New Job Posted",
      message: `A new ${job.role} position is available in ${job.jobCategory}.`,
      category: job.jobCategory,
      timestamp: new Date().toISOString(),
      type: "job"
    });
  },
  deleteJob: (id: string) => {
    const jobs = StorageService.getJobs().filter(j => j.id !== id);
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  },
  updateJob: (job: Job) => {
    const jobs = StorageService.getJobs();
    const index = jobs.findIndex(j => j.id === job.id);
    if (index > -1) {
      jobs[index] = job;
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
    }
  },

  // Applications
  getApplications: (): Application[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || "[]"),
  applyToJob: (application: Application) => {
    const apps = StorageService.getApplications();
    apps.push(application);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
  },

  // Notifications
  getNotifications: (): Notification[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || "[]"),
  addNotification: (notification: Notification) => {
    const notes = StorageService.getNotifications();
    notes.unshift(notification);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notes));
  },
  deleteNotification: (id: string) => {
    const notes = StorageService.getNotifications().filter(n => n.id !== id);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notes));
  },

  // Tickets
  getTickets: (): Ticket[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.TICKETS) || "[]"),
  saveTicket: (ticket: Ticket) => {
    const tickets = StorageService.getTickets();
    tickets.unshift(ticket);
    localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
  },
  deleteTicket: (id: string) => {
    const tickets = StorageService.getTickets().filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
  },
  updateTicket: (ticket: Ticket) => {
    const tickets = StorageService.getTickets();
    const index = tickets.findIndex(t => t.id === ticket.id);
    if (index > -1) {
      tickets[index] = ticket;
      localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
    }
  },

  // Settings
  getSettings: (): AdminSettings => {
    const defaults: AdminSettings = {
      enabledCategories: [
        "Remote Tech", "Remote Data Analyst", "Remote HR & Administration",
        "Remote Customer Success", "Remote Data Entry", "Remote AI Engineers", "Remote Data Scientist"
      ],
      announcementBanner: "",
      maintenanceMode: false
    };
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || JSON.stringify(defaults));
  },
  saveSettings: (settings: AdminSettings) => localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings)),
  
  // Payments
  getPayments: (): PaymentRequest[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.PAYMENTS) || "[]"),
  savePayment: (payment: PaymentRequest) => {
    const payments = StorageService.getPayments();
    payments.unshift(payment);
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
  },
  deletePayment: (id: string) => {
    const payments = StorageService.getPayments().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
  },

  // Subscriptions
  getSubscriptions: (): UserSubscription[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBSCRIPTIONS) || "[]"),
  getSubscriptionByUserId: (userId: string): UserSubscription | null => {
    const subs = StorageService.getSubscriptions();
    return subs.find(s => s.userId === userId) || null;
  },
  saveSubscription: (sub: UserSubscription) => {
    const subs = StorageService.getSubscriptions();
    const index = subs.findIndex(s => s.userId === sub.userId);
    if (index > -1) subs[index] = sub;
    else subs.push(sub);
    localStorage.setItem(STORAGE_KEYS.SUBSCRIPTIONS, JSON.stringify(subs));
  },

  // Seed data if empty
  seed: () => {
    if (StorageService.getJobs().length === 0) {
      const sampleJobs: Job[] = [
        {
          id: "1",
          companyName: "Confidential Company",
          role: "Remote Data Analyst",
          skills: ["Python", "SQL", "Power BI"],
          salaryMin: 1500,
          salaryMax: 3000,
          jobDescription: "Looking for a data analyst with experience in dashboarding and data visualization.",
          externalLink: "https://example.com/apply",
          jobType: "Remote",
          jobCategory: "Remote Data Analyst",
          postedDate: new Date().toISOString()
        }
      ];
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(sampleJobs));
    }
  }
};
