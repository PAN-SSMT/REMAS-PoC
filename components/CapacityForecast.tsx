import React from 'react';
import {
  FORECAST_WEEKS,
  getConsultantForecast,
  getWeeksUntilCompletion,
} from '../utils/forecastUtils';

interface Consultant {
  id: string;
  name: string;
  role: string;
  utilization: number;
  currentProjects: number;
}

interface Project {
  id: string;
  title: string;
  type: string;
  status: string;
  assignedTo?: string;
  hours: number;
}

interface ProServeProjectDetails {
  totalSessionsPerWeek: number;
  approxRemainingSessions: number;
}

interface CapacityForecastProps {
  consultants: Consultant[];
  projects: Project[];
  proServeDetails: Record<string, ProServeProjectDetails>;
  onClose: () => void;
  onSelectConsultant: (consultantId: string) => void;
}

interface ConsultantForecastRow {
  consultant: Consultant;
  weeklyUtilization: number[];
  firstAvailableWeek: number | null;
  hasDropFromPreviousWeek: boolean[];
  activeProjectCount: number;
}

interface ForecastSummary {
  rows: ConsultantForecastRow[];
  availableNext4Weeks: number;
  projectsCompleting: number;
  currentAvgUtilization: number;
  projectedAvgWeek12: number;
  unassignedProjects: number;
  totalUnassignedHours: number;
}

interface StatDefinition {
  title: string;
  value: string | number;
  valueClassName: string;
  tooltip: string;
}

const computeCapacityForecast = (
  consultants: Consultant[],
  projects: Project[],
  proServeDetails: Record<string, ProServeProjectDetails>,
): ForecastSummary => {
  const rows = consultants.map((consultant) => {
    const consultantForecast = getConsultantForecast(consultant, projects, proServeDetails);

    const hasDropFromPreviousWeek = consultantForecast.weeklyUtilization.map((utilization, index) => {
      if (index === 0) return false;
      return utilization < consultantForecast.weeklyUtilization[index - 1];
    });

    return {
      consultant,
      weeklyUtilization: consultantForecast.weeklyUtilization,
      firstAvailableWeek: consultantForecast.firstAvailableWeek,
      hasDropFromPreviousWeek,
      activeProjectCount: consultantForecast.activeProjectCount,
    };
  });

  const sortedRows = [...rows].sort((a, b) => {
    const weekA = a.firstAvailableWeek ?? Number.POSITIVE_INFINITY;
    const weekB = b.firstAvailableWeek ?? Number.POSITIVE_INFINITY;
    if (weekA !== weekB) return weekA - weekB;
    return a.consultant.name.localeCompare(b.consultant.name);
  });

  const allProServeProjects = projects.filter(
    (project) => project.type === 'ProServe' && project.status === 'InProgress',
  );
  const projectsCompleting = allProServeProjects.reduce((count, project) => {
    const details = proServeDetails[project.id];
    if (!details) return count;
    return count + (getWeeksUntilCompletion(details) <= 4 ? 1 : 0);
  }, 0);

  const availableNext4Weeks = sortedRows.filter(
    (row) => row.firstAvailableWeek !== null && row.firstAvailableWeek <= 4,
  ).length;

  const currentAvgUtilization =
    consultants.length > 0
      ? Math.round(consultants.reduce((sum, consultant) => sum + consultant.utilization, 0) / consultants.length)
      : 0;

  const projectedAvgWeek12 =
    sortedRows.length > 0
      ? Math.round(
          sortedRows.reduce((sum, row) => sum + row.weeklyUtilization[FORECAST_WEEKS - 1], 0) / sortedRows.length,
        )
      : 0;

  const unassignedProjects = projects.filter((project) => project.status === 'Unassigned').length;
  const totalUnassignedHours = projects
    .filter((project) => project.status === 'Unassigned')
    .reduce((sum, project) => sum + project.hours, 0);

  return {
    rows: sortedRows,
    availableNext4Weeks,
    projectsCompleting,
    currentAvgUtilization,
    projectedAvgWeek12,
    unassignedProjects,
    totalUnassignedHours,
  };
};

const getHeatmapCellClass = (utilization: number): string => {
  if (utilization >= 80) return 'bg-red-50 text-red-700';
  if (utilization >= 50) return 'bg-amber-50 text-amber-700';
  if (utilization > 0) return 'bg-emerald-50 text-emerald-700';
  return 'bg-white text-slate-400';
};

const StatCard: React.FC<StatDefinition> = ({ title, value, valueClassName, tooltip }) => (
  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
    <div className="flex items-center gap-1.5">
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <div className="relative group">
        <span className="w-4 h-4 rounded-full border border-gray-400 text-gray-400 text-[10px] inline-flex items-center justify-center leading-none cursor-help">
          i
        </span>
        <div className="absolute left-1/2 -translate-x-1/2 top-6 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-3 py-2 shadow-lg max-w-[250px] z-[70] normal-case font-normal">
          {tooltip}
        </div>
      </div>
    </div>
    <p className={`text-3xl font-bold mt-1 ${valueClassName}`}>{value}</p>
  </div>
);

const CapacityForecast: React.FC<CapacityForecastProps> = ({
  consultants,
  projects,
  proServeDetails,
  onClose,
  onSelectConsultant,
}) => {
  const forecast = computeCapacityForecast(consultants, projects, proServeDetails);
  const consultantsGap = Math.max(0, forecast.unassignedProjects - forecast.availableNext4Weeks);
  const stats: StatDefinition[] = [
    {
      title: 'Available Next 4 Weeks',
      value: forecast.availableNext4Weeks,
      valueClassName: 'text-[#1A535C]',
      tooltip:
        'Number of consultants whose projected utilization drops below 70% within the next 4 weeks, indicating they will have capacity for new projects.',
    },
    {
      title: 'Projects Completing',
      value: forecast.projectsCompleting,
      valueClassName: 'text-[#1A535C]',
      tooltip:
        'Number of ProServe projects estimated to finish within the next 4 weeks, based on remaining sessions divided by sessions per week.',
    },
    {
      title: 'Current Avg Utilization',
      value: `${forecast.currentAvgUtilization}%`,
      valueClassName: 'text-[#1A535C]',
      tooltip:
        'Average utilization percentage across all consultants right now. Calculated as the sum of all consultant utilization values divided by the number of consultants.',
    },
    {
      title: 'Projected Avg (Week 12)',
      value: `${forecast.projectedAvgWeek12}%`,
      valueClassName: 'text-[#1A535C]',
      tooltip:
        'Projected average utilization across all consultants in week 12, based on current project assignments and estimated completion dates.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            valueClassName={stat.valueClassName}
            tooltip={stat.tooltip}
          />
        ))}
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-hidden">
          <table className="w-full table-fixed border-collapse text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-[170px] sticky left-0 z-20 bg-gray-50 border-b border-r border-gray-200 px-2 py-2 text-left text-[10px] font-semibold text-gray-600 uppercase tracking-wide">
                  Consultant
                </th>
                {Array.from({ length: FORECAST_WEEKS }, (_, index) => (
                  <th
                    key={`week-header-${index + 1}`}
                    className="w-[38px] border-b border-gray-200 px-1 py-2 text-center text-[10px] font-semibold text-gray-600 tracking-wide"
                  >
                    W{index + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {forecast.rows.map((row) => (
                <tr
                  key={row.consultant.id}
                  onClick={() => onSelectConsultant(row.consultant.id)}
                  className="cursor-pointer hover:bg-[#E6F2F4] transition-colors"
                >
                  <td className="sticky left-0 z-10 bg-white border-r border-b border-gray-200 px-2 py-2 align-top">
                    <p className="font-semibold text-[11px] text-gray-900 leading-tight truncate">{row.consultant.name}</p>
                    <p className="text-[10px] text-gray-500 truncate">{row.consultant.role}</p>
                    <div className="mt-1 text-[10px] text-gray-600 leading-tight">
                      <span>{row.consultant.utilization}%</span>
                      <span className="mx-1">•</span>
                      <span>
                        {row.activeProjectCount} proj{row.activeProjectCount !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </td>
                  {row.weeklyUtilization.map((utilization, weekIndex) => (
                    <td
                      key={`${row.consultant.id}-week-${weekIndex + 1}`}
                      className={`border-b border-gray-200 px-1 py-2 text-center font-semibold text-[10px] ${getHeatmapCellClass(utilization)}`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span>{utilization}%</span>
                        {row.hasDropFromPreviousWeek[weekIndex] && (
                          <span className="w-2 h-2 bg-[#1A535C] rounded-full inline-block" />
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-900">Capacity Gap</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 text-sm">
          <div className="rounded-md bg-white border border-gray-200 px-3 py-2">
            <span className="text-gray-500">Unassigned Projects: </span>
            <span className="font-semibold text-gray-900">{forecast.unassignedProjects}</span>
          </div>
          <div className="rounded-md bg-white border border-gray-200 px-3 py-2">
            <span className="text-gray-500">Total Hours Needed: </span>
            <span className="font-semibold text-gray-900">{forecast.totalUnassignedHours}</span>
          </div>
          <div className="rounded-md bg-white border border-gray-200 px-3 py-2">
            <span className="text-gray-500">Consultants Available (next 4 weeks): </span>
            <span className="font-semibold text-gray-900">{forecast.availableNext4Weeks}</span>
          </div>
        </div>

        {consultantsGap > 0 && (
          <div className="rounded-md border border-orange-300 bg-orange-50 px-3 py-2 text-sm text-orange-800">
            <span className="font-semibold">⚠ Potential resource gap:</span> {consultantsGap} more consultant
            {consultantsGap !== 1 ? 's' : ''} needed to cover unassigned pipeline
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-5 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CapacityForecast;
