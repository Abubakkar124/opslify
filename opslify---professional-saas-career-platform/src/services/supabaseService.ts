import { supabase } from '../lib/supabase';
import { BlogPost, Job, User, Application, Notification, Ticket, AdminSettings } from '../types';

export const SupabaseService = {
  // Blogs
  async getBlogs(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async saveBlog(blog: BlogPost): Promise<void> {
    const { error } = await supabase
      .from('blogs')
      .upsert({
        id: blog.id.includes('-') ? blog.id : undefined, // Supabase expects UUID or it will generate one
        title: blog.title,
        sub_headline: blog.subHeadline,
        content: blog.content,
        image: blog.image,
        date: blog.date,
        team: blog.team,
        author: blog.author
      });
    
    if (error) throw error;
  },

  async deleteBlog(id: string): Promise<void> {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Jobs
  async getJobs(): Promise<Job[]> {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('posted_date', { ascending: false });
    
    if (error) throw error;
    return (data || []).map(job => ({
      id: job.id,
      companyName: job.company_name,
      role: job.role,
      skills: job.skills,
      salaryMin: job.salary_min,
      salaryMax: job.salary_max,
      jobDescription: job.job_description,
      externalLink: job.external_link,
      jobType: job.job_type,
      jobCategory: job.job_category,
      postedDate: job.posted_date
    }));
  },

  async saveJob(job: Job): Promise<void> {
    const { error } = await supabase
      .from('jobs')
      .insert({
        company_name: job.companyName,
        role: job.role,
        skills: job.skills,
        salary_min: job.salaryMin,
        salary_max: job.salaryMax,
        job_description: job.jobDescription,
        external_link: job.externalLink,
        job_type: job.jobType,
        job_category: job.jobCategory,
        posted_date: job.postedDate
      });
    
    if (error) throw error;
  },

  // Users
  async getUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*');
    
    if (error) throw error;
    return data || [];
  },

  // Add more methods as needed...
};
