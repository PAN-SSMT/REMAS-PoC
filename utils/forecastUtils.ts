export const FORECAST_WEEKS = 12;
export const DEFAULT_FALLBACK_SESSIONS_PER_WEEK = 2;
export const MAX_SESSIONS_PER_WEEK = 10;
export const AVAILABILITY_THRESHOLD = 70;

export interface ForecastConsultant {
  id: string;
  name: string;
}

export interface ForecastProject {
  id: string;
  type: string;
  assignedTo?: string;
  title?: string;
}

export interface ForecastProServeDetails {
  totalSessionsPerWeek: number;
  approxRemainingSessions: number;
}

export interface CompletingProjectForecast {
  projectId: string;
  title: string;
  weeksUntilCompletion: number;
  sessionsPerWeek: number;
}

export interface ConsultantForecast {
  weeklyUtilization: number[];
  firstAvailableWeek: number | null;
  completingProjects: CompletingProjectForecast[];
  weeklySessions: number[];
  activeProjectCount: number;
  proServeProjectCount: number;
  otherProjectCount: number;
}

export const getWeeksUntilCompletion = (details: ForecastProServeDetails): number => {
  if (details.totalSessionsPerWeek <= 0) {
    return FORECAST_WEEKS;
  }
  return Math.ceil(details.approxRemainingSessions / details.totalSessionsPerWeek);
};

export const getConsultantForecast = (
  consultant: ForecastConsultant,
  projects: ForecastProject[],
  proServeDetails: Record<string, ForecastProServeDetails>,
): ConsultantForecast => {
  const consultantProjects = projects.filter((project) => project.assignedTo === consultant.name);
  const proServeProjects = consultantProjects.filter((project) => project.type === 'ProServe');
  const weeklySessions = Array.from({ length: FORECAST_WEEKS }, () => 0);
  const completingProjects: CompletingProjectForecast[] = [];

  proServeProjects.forEach((project) => {
    const details = proServeDetails[project.id];
    if (!details) {
      for (let weekIndex = 0; weekIndex < FORECAST_WEEKS; weekIndex += 1) {
        weeklySessions[weekIndex] += DEFAULT_FALLBACK_SESSIONS_PER_WEEK;
      }
      return;
    }

    const weeksUntilCompletion = getWeeksUntilCompletion(details);
    completingProjects.push({
      projectId: project.id,
      title: project.title ?? project.id,
      weeksUntilCompletion,
      sessionsPerWeek: details.totalSessionsPerWeek,
    });

    for (let weekIndex = 0; weekIndex < FORECAST_WEEKS; weekIndex += 1) {
      if (weekIndex < weeksUntilCompletion) {
        weeklySessions[weekIndex] += details.totalSessionsPerWeek;
      }
    }
  });

  const weeklyUtilization = weeklySessions.map((projectedWspw) =>
    Math.min(100, Math.round((projectedWspw / MAX_SESSIONS_PER_WEEK) * 100)),
  );

  const firstAvailableWeekIndex = weeklyUtilization.findIndex((utilization) => utilization < AVAILABILITY_THRESHOLD);
  const firstAvailableWeek = firstAvailableWeekIndex >= 0 ? firstAvailableWeekIndex + 1 : null;

  return {
    weeklyUtilization,
    firstAvailableWeek,
    completingProjects: completingProjects.sort((a, b) => a.weeksUntilCompletion - b.weeksUntilCompletion),
    weeklySessions,
    activeProjectCount: consultantProjects.length,
    proServeProjectCount: proServeProjects.length,
    otherProjectCount: consultantProjects.length - proServeProjects.length,
  };
};
