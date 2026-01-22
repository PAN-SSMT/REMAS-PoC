// Skill categories and their display labels
export const SKILL_CATEGORIES = {
  security: {
    label: 'Security',
    skills: ['cspm', 'cwp', 'cas'] as const,
  },
  products: {
    label: 'Products',
    skills: ['prismaCloud', 'cortexXDR', 'cortexXSIAM'] as const,
  },
  cloud: {
    label: 'Cloud Platforms',
    skills: ['aws', 'azure', 'gcp'] as const,
  },
  technical: {
    label: 'Technical',
    skills: ['kubernetes', 'terraform', 'python', 'automation'] as const,
  },
} as const;

export const SKILL_LABELS: Record<string, string> = {
  cspm: 'Cloud Security Posture Management',
  cwp: 'Cloud Workload Protection',
  cas: 'Cloud Application Security',
  prismaCloud: 'Prisma Cloud',
  cortexXDR: 'Cortex XDR',
  cortexXSIAM: 'Cortex XSIAM',
  kubernetes: 'Kubernetes',
  terraform: 'Terraform / IaC',
  python: 'Python / Scripting',
  automation: 'Automation',
  aws: 'Amazon Web Services',
  azure: 'Microsoft Azure',
  gcp: 'Google Cloud Platform',
};

export const SKILL_LEVEL_LABELS: Record<number, string> = {
  1: 'Beginner',
  2: 'Basic',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Expert',
};

export const PROJECT_TYPES = [
  { value: 'ProServe', label: 'Professional Services', color: 'purple' },
  { value: 'EE', label: 'Expert Engagement', color: 'blue' },
  { value: 'Automation', label: 'Automation', color: 'cyan' },
  { value: 'ScaleOptimize', label: 'Scale & Optimize', color: 'emerald' },
] as const;

export const PROJECT_STATUSES = [
  { value: 'Unassigned', label: 'Unassigned', color: 'orange' },
  { value: 'Assigned', label: 'Assigned', color: 'blue' },
  { value: 'InProgress', label: 'In Progress', color: 'indigo' },
  { value: 'OnHold', label: 'On Hold', color: 'yellow' },
  { value: 'Completed', label: 'Completed', color: 'green' },
] as const;

export const COMPLEXITY_LEVELS = [
  { value: 'Low', label: 'Low', hours: '1-20' },
  { value: 'Medium', label: 'Medium', hours: '20-60' },
  { value: 'High', label: 'High', hours: '60+' },
] as const;

// Utilization thresholds
export const UTILIZATION_THRESHOLDS = {
  underutilized: 50,  // Below this is underutilized (green)
  optimal: 80,        // Between underutilized and this is optimal (yellow)
  overutilized: 100,  // Above optimal is overutilized (red)
};

// App navigation paths
export const APP_PATHS = {
  nova: '../cloud-security-ai-advisor (6)/index.html',
  remas: '../remas/index.html',
};
