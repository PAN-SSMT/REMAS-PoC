// Skill proficiency levels: 1=Beginner, 5=Expert
export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export type ConsultantRole = 'Senior Consultant' | 'Consultant' | 'Associate';

export interface SkillSet {
  cspm: SkillLevel;           // Cloud Security Posture Management
  cwp: SkillLevel;            // Cloud Workload Protection
  cas: SkillLevel;            // Cloud Application Security
  automation: SkillLevel;
  prismaCloud: SkillLevel;
  cortexXDR: SkillLevel;
  cortexXSIAM: SkillLevel;
  kubernetes: SkillLevel;
  terraform: SkillLevel;
  python: SkillLevel;
  aws: SkillLevel;
  azure: SkillLevel;
  gcp: SkillLevel;
}

export interface ProjectExperience {
  proserve: number;           // Count of completed ProServe projects
  ees: number;                // Expert Engagements
  automation: number;
  scaleOptimize: number;
}

export interface AIConsultantSummary {
  strengths: string[];
  areasForGrowth: string[];
  bestFitProjects: string[];
  recommendedTraining: string[];
  lastUpdated: Date;
}

export interface Consultant {
  id: string;
  name: string;
  email: string;
  role: ConsultantRole;
  avatarUrl?: string;
  
  // Skillsets
  skills: SkillSet;
  
  // Certifications
  certifications: string[];
  
  // Experience counts
  projectExperience: ProjectExperience;
  
  // Capacity
  weeklyCapacityHours: number;
  currentUtilization: number; // 0-100 percentage
  
  // AI-generated insights
  aiSummary?: AIConsultantSummary;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

export interface SkillFormEntry {
  category: string;
  skill: keyof SkillSet;
  skillLabel: string;
  selfRating: SkillLevel;
  yearsExperience: number;
  lastUsed?: Date;
  notes?: string;
}

export interface SkillsetForm {
  consultantId: string;
  submittedAt: Date;
  
  technicalSkills: SkillFormEntry[];
  
  projectPreferences: {
    preferredTypes: ('ProServe' | 'EE' | 'Automation' | 'ScaleOptimize')[];
    preferredCustomerSize: ('SMB' | 'Mid-Market' | 'Enterprise')[];
    travelWillingness: boolean;
    maxTravelPercent: number;
  };
  
  plannedTimeOff: {
    startDate: Date;
    endDate: Date;
    reason?: string;
  }[];
  
  managerValidated: boolean;
  validatedBy?: string;
  validatedAt?: Date;
}
