# REMAS - Resource Management & Assignment System

## Architecture Documentation

**Version:** 1.0  
**Last Updated:** December 7, 2025  
**Related Application:** NOVA (Next-Gen Operations & Virtual Advisor)

---

## 📋 Overview

REMAS is an AI-powered consultant assignment and resource management system designed for Technical Services teams. It helps Project Managers intelligently match consultants to projects based on skills, availability, and capacity.

### Core Objectives

1. **Assign consultants** to four types of projects:
   - ProServe
   - EEs (Expert Engagements)
   - Automation
   - Scale & Optimize

2. **Intelligent Matching** - Tell Project Managers which consultant has the skills and availability for specific projects

3. **Customer Engagement Visibility** - Provide all relevant information about customer engagements

4. **Executive Insights** - Generate consultant skillset summaries, strengths/weaknesses, and project fit analysis

5. **Self-Service Updates** - Allow consultants to maintain their skillset profiles

6. **Allocation Overview** - Show current consultant-to-project assignments

---

## 🔗 Relationship with NOVA

REMAS and NOVA are companion applications:

| Aspect | NOVA | REMAS |
|--------|------|-------|
| **Full Name** | Next-Gen Operations & Virtual Advisor | Resource Management & Assignment System |
| **Focus** | Customer-facing security advisory | Internal resource management |
| **Users** | Customers, CSMs | Project Managers, Consultants |
| **AI Purpose** | Security recommendations | Consultant matching & insights |

### Integration Points
- Shared UI components and design system
- Cross-application navigation links
- Consistent branding (Palo Alto Networks Technical Services)
- Same technology stack (React, TypeScript, Gemini AI)

---

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND (React + TypeScript)                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │  Dashboard   │  │  Consultant  │  │   Project    │  │  Assignment  │    │
│  │   Overview   │  │   Profiles   │  │   Manager    │  │   AI Chat    │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BACKEND API (Node.js/Express or Python/FastAPI)     │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │  Auth/SSO    │  │   AI Agent   │  │  Integration │  │   Business   │    │
│  │   Service    │  │   Service    │  │   Gateway    │  │    Logic     │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
        ┌─────────────────────────────┼─────────────────────────────┐
        ▼                             ▼                             ▼
┌───────────────┐           ┌───────────────┐            ┌───────────────┐
│ Google Gemini │           │   Database    │            │  Integrations │
│   AI (LLM)    │           │  (PostgreSQL) │            │               │
│               │           │               │            │ • Google Cal  │
│ • Matching    │           │ • Consultants │            │ • Clarizen    │
│ • Analysis    │           │ • Projects    │            │ • Workload    │
│ • Summaries   │           │ • Skills      │            │   System      │
└───────────────┘           │ • History     │            └───────────────┘
                            └───────────────┘
```

---

## 🗄️ Data Models

### 1. Consultant Profile

```typescript
interface Consultant {
  id: string;
  name: string;
  email: string;
  role: 'Senior Consultant' | 'Consultant' | 'Associate';
  
  // Skillsets (self-reported + manager validated)
  skills: {
    cspm: SkillLevel;      // Cloud Security Posture Management
    cwp: SkillLevel;       // Cloud Workload Protection
    cas: SkillLevel;       // Cloud Application Security
    automation: SkillLevel;
    prismaCloud: SkillLevel;
    cortexXDR: SkillLevel;
    // ... extensible
  };
  
  // Certifications
  certifications: string[];
  
  // Project type experience
  projectExperience: {
    proserve: number;      // count of completed projects
    ees: number;           // Expert Engagements
    automation: number;
    scaleOptimize: number;
  };
  
  // Capacity & Availability
  weeklyCapacityHours: number;
  currentUtilization: number; // percentage
  
  // AI-generated summary (updated periodically)
  aiSummary?: {
    strengths: string[];
    areasForGrowth: string[];
    bestFitProjects: string[];
    lastUpdated: Date;
  };
}

type SkillLevel = 1 | 2 | 3 | 4 | 5; // 1=Beginner, 5=Expert
```

### 2. Project/Engagement

```typescript
interface Project {
  id: string;
  customerId: string;
  customerName: string;
  
  type: 'ProServe' | 'EE' | 'Automation' | 'ScaleOptimize';
  
  // Requirements
  requiredSkills: {
    skill: string;
    minimumLevel: SkillLevel;
    weight: number; // importance 1-10
  }[];
  
  // Scope
  estimatedHours: number;
  startDate: Date;
  endDate: Date;
  
  // Assignment
  status: 'Unassigned' | 'Assigned' | 'InProgress' | 'Completed';
  assignedConsultants: ConsultantAssignment[];
  
  // Clarizen/External reference
  externalId?: string;
  externalSystem?: 'Clarizen' | 'Salesforce';
  
  // Details
  description: string;
  complexity: 'Low' | 'Medium' | 'High';
}
```

### 3. Skillset Form (Self-Service)

```typescript
interface SkillsetForm {
  consultantId: string;
  submittedAt: Date;
  
  // Technical Skills
  technicalSkills: {
    category: string;
    skill: string;
    selfRating: SkillLevel;
    yearsExperience: number;
    lastUsed?: Date;
    notes?: string;
  }[];
  
  // Preferences
  projectPreferences: {
    preferredTypes: string[];
    preferredCustomerSize: string[];
    travelWillingness: boolean;
  };
  
  // Availability exceptions
  plannedTimeOff: DateRange[];
  
  // Validated by manager
  managerValidated: boolean;
  validatedBy?: string;
  validatedAt?: Date;
}
```

---

## 📦 Data Sources

| Data Source | Purpose | Integration Method |
|-------------|---------|-------------------|
| **Skillset Forms** | Consultant capabilities | Internal database / Google Forms |
| **Google Calendar** | Availability checking | Google Calendar API (OAuth2) |
| **Weekly Workload** | Utilization/capacity | Internal system API or spreadsheet |
| **Clarizen** | Project assignments | Clarizen REST API |

---

## 🤖 AI Agent Design

### Core AI Functions

```typescript
interface ConsultantAIService {
  // 1. Find best consultant matches for a project
  findBestMatches(project: Project): Promise<ConsultantMatch[]>;
  
  // 2. Generate executive summary for a consultant
  generateConsultantSummary(consultantId: string): Promise<ConsultantSummary>;
  
  // 3. Answer natural language queries
  queryAssignments(query: string): Promise<AIResponse>;
  
  // 4. Capacity planning insights
  analyzeCapacity(teamId?: string): Promise<CapacityAnalysis>;
  
  // 5. Project risk assessment
  assessProjectRisk(project: Project, consultant: Consultant): Promise<RiskAssessment>;
}

interface ConsultantMatch {
  consultant: Consultant;
  matchScore: number;        // 0-100
  skillMatchDetails: SkillMatchDetail[];
  availabilityStatus: 'Available' | 'Partial' | 'Unavailable';
  aiRationale: string;       // Why this consultant is recommended
}
```

### Example AI Queries

```
- "Who is available for a 40-hour CSPM project next month?"
- "Show me all consultants with CWP expertise level 4 or higher"
- "What projects is John Smith currently assigned to?"
- "Generate a summary of Sarah's skillset and best-fit projects"
- "Which consultants have capacity for new EE engagements?"
```

---

## 🖥️ UI Components

### Main Views

1. **PM Dashboard** - Project queue, AI recommendations, assignment workflow
2. **Consultant Profiles** - Skills matrix, certifications, current assignments
3. **Executive Overview** - Team metrics, capacity charts, AI insights
4. **Skillset Form** - Self-service skill updates for consultants
5. **AI Chat Interface** - Natural language queries about resources

### Shared Components (from NOVA)

- `Modal.tsx` - Popup dialogs
- `ChatInterface.tsx` - AI conversation UI
- Header component with cross-app navigation
- Styling/Tailwind configuration

---

## 📁 Project Structure

```
remas/
├── docs/
│   └── ARCHITECTURE.md          # This document
├── components/
│   ├── dashboard/
│   │   ├── PMDashboard.tsx
│   │   ├── ExecutiveOverview.tsx
│   │   └── CapacityChart.tsx
│   ├── consultant/
│   │   ├── ConsultantCard.tsx
│   │   ├── ConsultantProfile.tsx
│   │   ├── SkillsetForm.tsx
│   │   └── AvailabilityCalendar.tsx
│   ├── project/
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectDetails.tsx
│   │   └── AssignmentModal.tsx
│   ├── ai/
│   │   ├── AIChat.tsx
│   │   ├── MatchRecommendations.tsx
│   │   └── ConsultantSummary.tsx
│   └── shared/
│       ├── Modal.tsx
│       ├── AppNavigation.tsx     # Cross-app nav to NOVA
│       ├── SkillBadge.tsx
│       └── UtilizationGauge.tsx
├── services/
│   ├── geminiService.ts          # Core AI service
│   ├── consultantService.ts      # Consultant CRUD
│   ├── projectService.ts         # Project CRUD
│   ├── googleCalendarService.ts  # Calendar integration
│   ├── clarizenService.ts        # Clarizen sync
│   └── utilizationService.ts     # Workload data
├── hooks/
│   ├── useConsultants.ts
│   ├── useProjects.ts
│   └── useAIRecommendations.ts
├── types/
│   ├── consultant.ts
│   ├── project.ts
│   └── ai.ts
├── prompts/
│   ├── matchingPrompt.ts
│   ├── summaryPrompt.ts
│   └── queryPrompt.ts
├── App.tsx
├── index.tsx
├── index.html
├── types.ts
├── constants.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Implementation Roadmap

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| **Phase 1: Foundation** | 2-3 weeks | Data models, basic UI, consultant profiles, manual assignment |
| **Phase 2: Skillset Management** | 1-2 weeks | Skillset form, self-service updates, skill visualization |
| **Phase 3: AI Matching** | 2-3 weeks | Gemini integration, matching algorithm, recommendations UI |
| **Phase 4: Calendar Integration** | 1-2 weeks | Google Calendar API, availability checking |
| **Phase 5: Clarizen Sync** | 2 weeks | Bidirectional project sync, assignment updates |
| **Phase 6: AI Chat & Insights** | 2 weeks | Natural language queries, executive summaries |
| **Phase 7: Polish & Integration** | 1 week | Dashboard refinements, NOVA integration, cross-app nav |

---

## 💡 Key Recommendations

1. **Start with a solid data layer** - AI quality depends on clean consultant profiles and skill data

2. **Use Gemini's function calling** - For structured queries, leverage function calling for database operations

3. **Implement RAG** - Store consultant profiles in a vector database for accurate AI responses

4. **Build incremental** - Start with AI-assisted manual matching, then increase automation

5. **Backend service** - For production with multiple users and integrations, implement a proper backend API

---

## 🔐 Security Considerations

- OAuth2 for Google Calendar access (per-consultant consent)
- Role-based access control (PM vs Consultant views)
- Audit logging for assignment changes
- Secure API key management for integrations

---

## 📝 Notes

- This document should be updated as the architecture evolves
- Related NOVA documentation: `../cloud-security-ai-advisor (6)/README.md`
