import { SkillLevel } from './consultant';

export type ProjectType = 'ProServe' | 'EE' | 'Automation' | 'ScaleOptimize';

export type ProjectStatus = 'Unassigned' | 'Assigned' | 'InProgress' | 'Completed' | 'OnHold';

export type ProjectComplexity = 'Low' | 'Medium' | 'High';

export interface SkillRequirement {
  skill: string;
  minimumLevel: SkillLevel;
  weight: number; // Importance: 1-10
  isRequired: boolean;
}

export interface ConsultantAssignment {
  consultantId: string;
  consultantName: string;
  role: 'Lead' | 'Support';
  allocatedHours: number;
  assignedAt: Date;
  assignedBy: string;
}

export interface Project {
  id: string;
  
  // Customer info
  customerId: string;
  customerName: string;
  customerIndustry?: string;
  
  // Project classification
  type: ProjectType;
  complexity: ProjectComplexity;
  
  // Requirements
  title: string;
  description: string;
  requiredSkills: SkillRequirement[];
  
  // Timeline
  estimatedHours: number;
  startDate: Date;
  endDate: Date;
  
  // Assignment
  status: ProjectStatus;
  assignedConsultants: ConsultantAssignment[];
  
  // External system reference
  externalId?: string;
  externalSystem?: 'Clarizen' | 'Salesforce' | 'ServiceNow';
  externalUrl?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface ProjectFilter {
  types?: ProjectType[];
  statuses?: ProjectStatus[];
  complexities?: ProjectComplexity[];
  startDateFrom?: Date;
  startDateTo?: Date;
  searchTerm?: string;
}
