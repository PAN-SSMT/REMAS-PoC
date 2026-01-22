import { Consultant } from './consultant';
import { Project } from './project';

export interface SkillMatchDetail {
  skill: string;
  required: number;
  actual: number;
  gap: number;
  weight: number;
}

export type AvailabilityStatus = 'Available' | 'Partial' | 'Unavailable';

export interface ConsultantMatch {
  consultant: Consultant;
  matchScore: number; // 0-100
  skillMatchDetails: SkillMatchDetail[];
  availabilityStatus: AvailabilityStatus;
  availableHours: number;
  aiRationale: string;
  concerns: string[];
  skillGaps: SkillMatchDetail[];
}

export interface CapacityAnalysis {
  totalConsultants: number;
  averageUtilization: number;
  availableCapacityHours: number;
  overutilizedCount: number;
  underutilizedCount: number;
  byProjectType: {
    type: string;
    assignedCount: number;
    availableCount: number;
  }[];
  recommendations: string[];
}

export interface RiskAssessment {
  overallRisk: 'Low' | 'Medium' | 'High';
  riskFactors: {
    factor: string;
    severity: 'Low' | 'Medium' | 'High';
    description: string;
    mitigation?: string;
  }[];
  successProbability: number; // 0-100
}

export interface AIQueryResponse {
  answer: string;
  confidence: number;
  relatedConsultants?: Consultant[];
  relatedProjects?: Project[];
  suggestedActions?: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
  metadata?: {
    matchResults?: ConsultantMatch[];
    consultantSummary?: string;
    queryType?: 'match' | 'summary' | 'capacity' | 'general';
  };
}
