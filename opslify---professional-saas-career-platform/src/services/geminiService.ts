import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const GeminiService = {
  generateResume: async (data: any) => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Create a professional ATS-friendly resume for the following person: ${JSON.stringify(data)}. 
      Structure it with: Contact Info, Professional Summary, Core Competencies, Professional Experience, Projects, Education, and Skills.
      Return in a clean markdown format.`,
    });
    return response.text;
  },

  generateCoverLetter: async (data: any, jobDesc: string) => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a customized cover letter for this person: ${JSON.stringify(data)} applying for this job: ${jobDesc}. 
      The letter should be professional, persuasive, and highlight relevant skills. 
      Return in professional letter format.`,
    });
    return response.text;
  },

  suggestKeywords: async (role: string) => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest top 15 ATS keywords for a ${role} position. 
      Include technical skills, soft skills, and industry-standard terminology.
      Return as a comma-separated list.`,
    });
    return response.text;
  },

  generateSummary: async (data: any) => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 3 different professional resume summaries (one punchy, one detailed, one skill-focused) for this profile: ${JSON.stringify(data)}.`,
    });
    return response.text;
  },

  auditResume: async (resumeText: string) => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this resume for ATS compatibility, readability, and impact: ${resumeText}. 
      Provide a score out of 100, 5 improvement suggestions, 3 strengths, and 3 weaknesses.
      Return in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });
    return JSON.parse(response.text || "{}");
  }
};
