export interface MatchResult {
  consultantId: string;
  consultantName: string;
  consultantRole: string;
  overallScore: number;
  skillScore: number;
  availabilityScore: number;
  experienceScore: number;
  utilization: number;
  wspw: number;
  currentProjects: number;
  skills: { cspm: number; cwp: number; cas: number; aut: number };
  requiredSkills: string[];
  skillGaps: { skill: string; required: number; actual: number }[];
  summary: string;
  rationale: string;
}

type SkillKey = "cspm" | "cwp" | "cas" | "aut";

type MatchProject = {
  id: string;
  title: string;
  type: string;
  hours: number;
  complexity: string;
  assignedTo?: string;
};

type MatchConsultant = {
  id: string;
  name: string;
  role: string;
  utilization: number;
  skills: { cspm: number; cwp: number; cas: number; aut: number };
  currentProjects: number;
  wspw: number;
};

type MatchProjectLite = {
  id: string;
  type: string;
  assignedTo?: string;
};

type ProServeDetail = {
  areasOfSupport: string[];
  approxRemainingSessions: number;
  totalSessionsPerWeek: number;
};

const ALL_SKILLS: SkillKey[] = ["cspm", "cwp", "cas", "aut"];

const SKILL_LABEL: Record<SkillKey, string> = {
  cspm: "CSPM",
  cwp: "CWP",
  cas: "CAS",
  aut: "AUT",
};

const AREA_TO_SKILL: Record<string, SkillKey> = {
  CSPM: "cspm",
  CWP: "cwp",
  CAS: "cas",
  DSPM: "cspm",
  AUT: "aut",
};

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const uniqueSkills = (skills: SkillKey[]): SkillKey[] => {
  const seen = new Set<SkillKey>();
  const result: SkillKey[] = [];
  skills.forEach((skill) => {
    if (!seen.has(skill)) {
      seen.add(skill);
      result.push(skill);
    }
  });
  return result;
};

const inferSkillsFromTitle = (title: string): SkillKey[] => {
  const text = title.toLowerCase();
  const inferred: SkillKey[] = [];

  if (
    text.includes("cspm") ||
    text.includes("posture") ||
    text.includes("compliance") ||
    text.includes("cloud security")
  ) {
    inferred.push("cspm");
  }

  if (
    text.includes("cwp") ||
    text.includes("container") ||
    text.includes("workload") ||
    text.includes("runtime") ||
    text.includes("kubernetes")
  ) {
    inferred.push("cwp");
  }

  if (
    text.includes("cas") ||
    text.includes("application security") ||
    text.includes("api security") ||
    text.includes("appsec")
  ) {
    inferred.push("cas");
  }

  if (
    text.includes("automation") ||
    text.includes("ci/cd") ||
    text.includes("pipeline") ||
    text.includes("siem") ||
    text.includes("soc")
  ) {
    inferred.push("aut");
  }

  return inferred;
};

const inferSkillsFromProjectType = (projectType: string): SkillKey[] => {
  switch (projectType) {
    case "ProServe":
      return ["cspm"];
    case "EE":
      return ["cspm", "cwp"];
    case "Automation":
      return ["aut", "cwp"];
    case "ScaleOptimize":
      return ["cwp", "aut"];
    default:
      return [];
  }
};

const getRequiredSkills = (
  project: MatchProject,
  proServeDetails: Record<string, ProServeDetail>
): SkillKey[] => {
  const byArea: SkillKey[] = [];
  const detail = proServeDetails[project.id];

  if (project.type === "ProServe" && detail) {
    detail.areasOfSupport.forEach((area) => {
      const mapped = AREA_TO_SKILL[area.toUpperCase()];
      if (mapped) byArea.push(mapped);
    });
  }

  const byTitle = inferSkillsFromTitle(project.title);
  const byType = inferSkillsFromProjectType(project.type);
  const combined = uniqueSkills([...byArea, ...byTitle, ...byType]);

  return combined.length > 0 ? combined : [...ALL_SKILLS];
};

const calculateSkillScore = (
  consultant: MatchConsultant,
  requiredSkills: SkillKey[]
): number => {
  const average =
    requiredSkills.reduce((sum, skill) => sum + (consultant.skills[skill] / 5) * 100, 0) /
    requiredSkills.length;
  return Math.round(clamp(average, 0, 100));
};

const calculateAvailabilityScore = (project: MatchProject, consultant: MatchConsultant): number => {
  let score = 100 - consultant.utilization;

  if (consultant.wspw >= 9) {
    score *= 0.5;
  } else if (consultant.wspw >= 7) {
    score *= 0.7;
  } else if (consultant.wspw >= 5) {
    score *= 0.85;
  } else if (consultant.wspw <= 3) {
    score *= 1.2;
  }

  const isHighDemand = project.complexity === "High" || project.hours >= 60;
  const isLowDemand = project.complexity === "Low" || project.hours <= 20;

  if (consultant.utilization > 70 && isHighDemand) {
    score *= 0.8;
  } else if (consultant.utilization > 70 && isLowDemand) {
    score *= 1.1;
  }

  return Math.round(clamp(score, 0, 100));
};

const calculateExperienceScore = (
  project: MatchProject,
  consultant: MatchConsultant,
  projects: MatchProjectLite[]
): number => {
  const sameTypeCount = projects.filter(
    (p) => p.assignedTo === consultant.name && p.type === project.type
  ).length;

  if (sameTypeCount === 0) return 50;
  if (sameTypeCount === 1) return 80;
  if (sameTypeCount === 2) return 100;
  if (sameTypeCount === 3) return 70;
  return 40;
};

const buildSkillGaps = (
  consultant: MatchConsultant,
  requiredSkills: SkillKey[]
): { skill: string; required: number; actual: number }[] =>
  requiredSkills
    .filter((skill) => consultant.skills[skill] < 3)
    .map((skill) => ({
      skill: SKILL_LABEL[skill],
      required: 3,
      actual: consultant.skills[skill],
    }));

const buildSummary = (consultant: MatchConsultant, requiredSkills: SkillKey[]): string => {
  const ranked = [...requiredSkills].sort((a, b) => consultant.skills[b] - consultant.skills[a]);
  const top = ranked[0];
  const second = ranked[1];
  const topLevel = consultant.skills[top];
  const secondLevel = second ? consultant.skills[second] : 0;

  let skillInsight: string;
  if (requiredSkills.length === 4 && ALL_SKILLS.every((skill) => consultant.skills[skill] >= 4)) {
    skillInsight = "Excellent all-round skills";
  } else if (second && topLevel >= 4 && secondLevel >= 3) {
    skillInsight = `Strong ${SKILL_LABEL[top]} & ${SKILL_LABEL[second]} skills (${topLevel}/5, ${secondLevel}/5)`;
  } else if (topLevel >= 4) {
    skillInsight = `Strong ${SKILL_LABEL[top]} skills (${topLevel}/5)`;
  } else if (topLevel >= 3) {
    skillInsight = `Good ${SKILL_LABEL[top]} skills (${topLevel}/5)`;
  } else {
    skillInsight = `Limited ${SKILL_LABEL[top]} skills (${topLevel}/5)`;
  }

  let availabilityInsight: string;
  if (consultant.wspw >= 9 || consultant.utilization >= 85) {
    availabilityInsight = `near capacity (WSPW: ${consultant.wspw})`;
  } else if (consultant.utilization < 50) {
    availabilityInsight = `low utilization (${consultant.utilization}%)`;
  } else if (consultant.utilization <= 70) {
    availabilityInsight = `moderate availability (${consultant.utilization}% utilized)`;
  } else {
    availabilityInsight = `limited availability (${consultant.utilization}% utilized)`;
  }

  return `${skillInsight}, ${availabilityInsight}`;
};

const buildRationale = (
  consultant: MatchConsultant,
  project: MatchProject,
  projects: MatchProjectLite[],
  requiredSkills: SkillKey[],
  skillGaps: { skill: string; required: number; actual: number }[],
  skillScore: number,
  availabilityScore: number,
  experienceScore: number
): string => {
  const skillBreakdown = requiredSkills
    .map((skill) => `${SKILL_LABEL[skill]} ${consultant.skills[skill]}/5`)
    .join(", ");
  const sameTypeCount = projects.filter(
    (p) => p.assignedTo === consultant.name && p.type === project.type
  ).length;

  const sentences: string[] = [];
  sentences.push(
    `${consultant.name} has ${skillGaps.length === 0 ? "strong" : "partial"} alignment with this project's requirements, with ${skillBreakdown}.`
  );

  if (skillGaps.length > 0) {
    const gapText = skillGaps
      .map((gap) => `${gap.skill} (${gap.actual}/5 vs required ${gap.required}/5)`)
      .join(", ");
    sentences.push(`Potential skill gaps exist in ${gapText}.`);
  } else {
    sentences.push(`No major skill gaps were identified for the required skill set.`);
  }

  sentences.push(
    `Current availability is ${consultant.utilization}% utilization with WSPW ${consultant.wspw}, resulting in an availability score of ${availabilityScore}/100.`
  );
  sentences.push(
    `They currently handle ${sameTypeCount} ${project.type} project${
      sameTypeCount === 1 ? "" : "s"
    }, producing an experience score of ${experienceScore}/100 and an overall skill score of ${skillScore}/100.`
  );

  if (consultant.utilization > 80 || consultant.wspw >= 9 || sameTypeCount >= 4 || skillGaps.length > 0) {
    const concerns: string[] = [];
    if (consultant.utilization > 80 || consultant.wspw >= 9) concerns.push("capacity is high");
    if (sameTypeCount >= 4) concerns.push("type-specific workload is heavy");
    if (skillGaps.length > 0) concerns.push("there are skill gaps to address");
    sentences.push(`Primary concern: ${concerns.join(", ")}.`);
  }

  return sentences.join(" ");
};

export function findBestMatches(
  project: {
    id: string;
    title: string;
    type: string;
    hours: number;
    complexity: string;
    assignedTo?: string;
  },
  consultants: Array<{
    id: string;
    name: string;
    role: string;
    utilization: number;
    skills: { cspm: number; cwp: number; cas: number; aut: number };
    currentProjects: number;
    wspw: number;
  }>,
  projects: Array<{ id: string; type: string; assignedTo?: string }>,
  proServeDetails: Record<
    string,
    { areasOfSupport: string[]; approxRemainingSessions: number; totalSessionsPerWeek: number }
  >
): MatchResult[] {
  const requiredSkills = getRequiredSkills(project, proServeDetails);

  const matches = consultants
    .filter((consultant) => project.assignedTo !== consultant.name)
    .map((consultant): MatchResult => {
      const skillScore = calculateSkillScore(consultant, requiredSkills);
      const availabilityScore = calculateAvailabilityScore(project, consultant);
      const experienceScore = calculateExperienceScore(project, consultant, projects);
      const overallScore = Math.round(skillScore * 0.5 + availabilityScore * 0.35 + experienceScore * 0.15);
      const skillGaps = buildSkillGaps(consultant, requiredSkills);
      const summary = buildSummary(consultant, requiredSkills);
      const rationale = buildRationale(
        consultant,
        project,
        projects,
        requiredSkills,
        skillGaps,
        skillScore,
        availabilityScore,
        experienceScore
      );

      return {
        consultantId: consultant.id,
        consultantName: consultant.name,
        consultantRole: consultant.role,
        overallScore,
        skillScore,
        availabilityScore,
        experienceScore,
        utilization: consultant.utilization,
        wspw: consultant.wspw,
        currentProjects: consultant.currentProjects,
        skills: consultant.skills,
        requiredSkills,
        skillGaps,
        summary,
        rationale,
      };
    })
    .sort((a, b) => b.overallScore - a.overallScore)
    .slice(0, 10);

  return matches;
}
