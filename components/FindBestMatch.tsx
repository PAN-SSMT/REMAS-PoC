import React, { useMemo, useState } from 'react';
import { MatchResult } from './MatchingEngine';

type SkillKey = 'cspm' | 'cwp' | 'cas' | 'aut';

interface ProjectForMatching {
  id: string;
  title: string;
  type: string;
}

interface ProServeProjectDetail {
  areasOfSupport: string[];
  approxRemainingSessions: number;
  totalSessionsPerWeek: number;
}

interface FindBestMatchProps {
  project: ProjectForMatching;
  matchResults: MatchResult[];
  onClose: () => void;
  onAssign: (consultantId: string, consultantName: string) => void;
  proServeDetails: Record<string, ProServeProjectDetail>;
}

const SKILL_LABELS: Record<string, string> = {
  cspm: 'CSPM',
  cwp: 'CWP',
  cas: 'CAS',
  aut: 'AUT',
};

const getScoreClassName = (score: number): string => {
  if (score >= 80) return 'text-emerald-700 bg-emerald-50 border border-emerald-200';
  if (score >= 60) return 'text-amber-700 bg-amber-50 border border-amber-200';
  return 'text-red-700 bg-red-50 border border-red-200';
};

const getProjectTypeBadgeClass = (type: string): string => {
  switch (type) {
    case 'ProServe':
      return 'bg-[#F0EDF5] text-[#5A4A6B]';
    case 'EE':
      return 'bg-[#EDF2F7] text-[#4A5A6B]';
    case 'Automation':
      return 'bg-[#EDF5F5] text-[#4A6B6B]';
    case 'ScaleOptimize':
      return 'bg-[#EDF5F0] text-[#4A6B5A]';
    default:
      return 'bg-slate-200 text-slate-700';
  }
};

const getSkillLabel = (skill: string): string => SKILL_LABELS[skill] || skill.toUpperCase();
const formatProjectType = (type: string): string => (type === 'ScaleOptimize' ? 'Scale & Optimize' : type);

type ViewMode = 'shortlist' | 'compare' | 'confirm';

const FindBestMatch: React.FC<FindBestMatchProps> = ({
  project,
  matchResults,
  onClose,
  onAssign,
  proServeDetails,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('shortlist');
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  const [selectedForAssignment, setSelectedForAssignment] = useState<MatchResult | null>(null);
  const [confirmReturnView, setConfirmReturnView] = useState<ViewMode>('shortlist');

  const topMatches = useMemo(() => matchResults.slice(0, 5), [matchResults]);
  const selectedMatches = useMemo(
    () => topMatches.filter((match) => selectedForCompare.includes(match.consultantId)),
    [topMatches, selectedForCompare],
  );

  const requiredSkills = useMemo(() => {
    const fromMatches = topMatches[0]?.requiredSkills ?? [];
    if (fromMatches.length > 0) return fromMatches;

    const details = proServeDetails[project.id];
    if (!details) return [];
    return details.areasOfSupport.map((area) => area.toLowerCase());
  }, [project.id, proServeDetails, topMatches]);

  const canCompare = selectedForCompare.length >= 2 && selectedForCompare.length <= 3;
  const compareTooltip = canCompare ? '' : 'Select 2-3 consultants to compare';
  const projectDetails = proServeDetails[project.id];

  const toggleRationale = (consultantId: string) => {
    setExpandedRationales((prev) =>
      prev.includes(consultantId) ? prev.filter((id) => id !== consultantId) : [...prev, consultantId],
    );
  };

  const toggleCompareSelection = (consultantId: string) => {
    setSelectedForCompare((prev) => {
      if (prev.includes(consultantId)) {
        return prev.filter((id) => id !== consultantId);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, consultantId];
    });
  };

  const startAssignment = (match: MatchResult, returnView: ViewMode) => {
    setSelectedForAssignment(match);
    setConfirmReturnView(returnView);
    setViewMode('confirm');
  };

  if (viewMode === 'confirm' && selectedForAssignment) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Assign {selectedForAssignment.consultantName} to {project.title}?
          </h3>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-xs text-gray-500">Overall Score</p>
              <p className="text-2xl font-bold text-[#1A535C]">{selectedForAssignment.overallScore}</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-xs text-gray-500">Utilization</p>
              <p className="text-2xl font-bold text-[#1A535C]">{selectedForAssignment.utilization}%</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-xs text-gray-500">WSPW</p>
              <p className="text-2xl font-bold text-[#1A535C]">{selectedForAssignment.wspw}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            This will change the project status to In Progress and add it to {selectedForAssignment.consultantName}
            {"'"}s active projects.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              setViewMode(confirmReturnView === 'confirm' ? 'shortlist' : confirmReturnView);
              setSelectedForAssignment(null);
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onAssign(selectedForAssignment.consultantId, selectedForAssignment.consultantName)}
            className="px-4 py-2 bg-[#1A535C] text-white text-sm font-medium rounded-lg hover:bg-[#143F47] transition-colors"
          >
            Confirm Assignment
          </button>
        </div>
      </div>
    );
  }

  if (viewMode === 'compare') {
    const bestOverall = Math.max(...selectedMatches.map((match) => match.overallScore));
    const bestAvailability = Math.max(...selectedMatches.map((match) => match.availabilityScore));
    const bestExperience = Math.max(...selectedMatches.map((match) => match.experienceScore));
    const lowestUtilization = Math.min(...selectedMatches.map((match) => match.utilization));
    const lowestWspw = Math.min(...selectedMatches.map((match) => match.wspw));
    const lowestProjects = Math.min(...selectedMatches.map((match) => match.currentProjects));
    const lowestGapCount = Math.min(...selectedMatches.map((match) => match.skillGaps.length));

    const skillBestByKey: Partial<Record<SkillKey, number>> = {};
    (requiredSkills as SkillKey[]).forEach((skillKey) => {
      skillBestByKey[skillKey] = Math.max(...selectedMatches.map((match) => match.skills[skillKey]));
    });

    const rowClassNames = ['bg-white', 'bg-slate-50'];

    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Comparison View</h3>
          <button
            onClick={() => setViewMode('shortlist')}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Back to Shortlist
          </button>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full table-fixed border-collapse text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="w-44 border border-slate-200 px-3 py-2 text-left font-semibold text-gray-700">Metric</th>
                {selectedMatches.map((match) => (
                  <th key={match.consultantId} className="border border-slate-200 px-3 py-2 text-left font-semibold text-gray-900">
                    <p>{match.consultantName}</p>
                    <p className="text-xs font-normal text-gray-500">{match.consultantRole}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className={rowClassNames[0]}>
                <td className="border border-slate-200 px-3 py-2 font-medium text-gray-700">Overall Score</td>
                {selectedMatches.map((match) => (
                  <td
                    key={`${match.consultantId}-overall`}
                    className={`border border-slate-200 px-3 py-2 ${match.overallScore === bestOverall ? 'bg-emerald-50' : ''}`}
                  >
                    <span className={`inline-flex rounded-md px-2.5 py-1 text-sm font-semibold ${getScoreClassName(match.overallScore)}`}>
                      {match.overallScore}
                    </span>
                  </td>
                ))}
              </tr>

              <tr className={rowClassNames[1]}>
                <td className="border border-slate-200 px-3 py-2 font-medium text-gray-700 align-top">
                  Skill Score Breakdown
                </td>
                {selectedMatches.map((match) => (
                  <td key={`${match.consultantId}-skills`} className="border border-slate-200 px-3 py-2 space-y-1">
                    {requiredSkills.map((skill) => {
                      const key = skill.toLowerCase() as SkillKey;
                      const isBest = match.skills[key] === skillBestByKey[key];
                      return (
                        <div
                          key={`${match.consultantId}-${skill}`}
                          className={`flex items-center justify-between rounded-md px-2 py-1 text-xs ${
                            isBest ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          <span>{getSkillLabel(skill)}</span>
                          <span className="font-semibold">{match.skills[key]}/5</span>
                        </div>
                      );
                    })}
                  </td>
                ))}
              </tr>

              <tr className={rowClassNames[0]}>
                <td className="border border-slate-200 px-3 py-2 font-medium text-gray-700">Availability Score</td>
                {selectedMatches.map((match) => (
                  <td
                    key={`${match.consultantId}-availability`}
                    className={`border border-slate-200 px-3 py-2 ${match.availabilityScore === bestAvailability ? 'bg-emerald-50' : ''}`}
                  >
                    {match.availabilityScore}
                  </td>
                ))}
              </tr>

              <tr className={rowClassNames[1]}>
                <td className="border border-slate-200 px-3 py-2 font-medium text-gray-700">Current Utilization %</td>
                {selectedMatches.map((match) => (
                  <td
                    key={`${match.consultantId}-util`}
                    className={`border border-slate-200 px-3 py-2 ${match.utilization === lowestUtilization ? 'bg-emerald-50' : ''}`}
                  >
                    {match.utilization}%
                  </td>
                ))}
              </tr>

              <tr className={rowClassNames[0]}>
                <td className="border border-slate-200 px-3 py-2 font-medium text-gray-700">WSPW</td>
                {selectedMatches.map((match) => (
                  <td
                    key={`${match.consultantId}-wspw`}
                    className={`border border-slate-200 px-3 py-2 ${match.wspw === lowestWspw ? 'bg-emerald-50' : ''}`}
                  >
                    {match.wspw}
                  </td>
                ))}
              </tr>

              <tr className={rowClassNames[1]}>
                <td className="border border-slate-200 px-3 py-2 font-medium text-gray-700">Experience Score</td>
                {selectedMatches.map((match) => (
                  <td
                    key={`${match.consultantId}-experience`}
                    className={`border border-slate-200 px-3 py-2 ${match.experienceScore === bestExperience ? 'bg-emerald-50' : ''}`}
                  >
                    {match.experienceScore}
                  </td>
                ))}
              </tr>

              <tr className={rowClassNames[0]}>
                <td className="border border-slate-200 px-3 py-2 font-medium text-gray-700">Active Projects Count</td>
                {selectedMatches.map((match) => (
                  <td
                    key={`${match.consultantId}-projects`}
                    className={`border border-slate-200 px-3 py-2 ${match.currentProjects === lowestProjects ? 'bg-emerald-50' : ''}`}
                  >
                    {match.currentProjects}
                  </td>
                ))}
              </tr>

              <tr className={rowClassNames[1]}>
                <td className="border border-slate-200 px-3 py-2 font-medium text-gray-700">Skill Gaps</td>
                {selectedMatches.map((match) => (
                  <td
                    key={`${match.consultantId}-gaps`}
                    className={`border border-slate-200 px-3 py-2 ${match.skillGaps.length === lowestGapCount ? 'bg-emerald-50' : ''}`}
                  >
                    {match.skillGaps.length === 0
                      ? 'None'
                      : match.skillGaps.map((gap) => `${gap.skill} (${gap.actual}/${gap.required})`).join(', ')}
                  </td>
                ))}
              </tr>

              <tr className={rowClassNames[0]}>
                <td className="border border-slate-200 px-3 py-2 font-medium text-gray-700">Summary</td>
                {selectedMatches.map((match) => (
                  <td key={`${match.consultantId}-summary`} className="border border-slate-200 px-3 py-2 text-gray-700">
                    {match.summary}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${selectedMatches.length}, minmax(0, 1fr))` }}>
          {selectedMatches.map((match) => (
            <button
              key={`${match.consultantId}-assign`}
              onClick={() => startAssignment(match, 'compare')}
              className="px-3 py-2 border border-[#1A535C] text-[#1A535C] text-sm font-medium rounded-lg hover:bg-[#E6F2F4] transition-colors"
            >
              Assign {match.consultantName}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
            <p className="mt-1">
              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getProjectTypeBadgeClass(project.type)}`}>
                {formatProjectType(project.type)}
              </span>
            </p>
          </div>
          {topMatches.length > 0 && (
            <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-[#E6F2F4] text-[#1A535C] border border-[#C7E1E5]">
              Top Match Score: {topMatches[0].overallScore}
            </span>
          )}
        </div>

        {requiredSkills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {requiredSkills.map((skill) => (
              <span
                key={`required-${skill}`}
                className="px-2 py-0.5 bg-white border border-slate-200 rounded-full text-[11px] font-medium text-slate-700"
              >
                {getSkillLabel(skill)}
              </span>
            ))}
          </div>
        )}

        {project.type === 'ProServe' && projectDetails && (
          <div className="text-xs text-gray-600 space-y-1">
            <p>
              <span className="font-medium text-gray-700">Remaining Sessions:</span> {projectDetails.approxRemainingSessions}
            </p>
            <p>
              <span className="font-medium text-gray-700">Areas of Support:</span> {projectDetails.areasOfSupport.join(', ')}
            </p>
          </div>
        )}
      </div>

      {topMatches.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-gray-700 font-medium">No available consultants found for this project.</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {topMatches.map((match, index) => {
              const isTop = index === 0;
              const isExpanded = expandedRationales.includes(match.consultantId);
              const isChecked = selectedForCompare.includes(match.consultantId);
              const selectionLimitReached = selectedForCompare.length >= 3 && !isChecked;

              return (
                <div
                  key={match.consultantId}
                  className={`rounded-xl border p-4 ${isTop ? 'border-[#1A535C]/30 bg-[#F2F8F9]' : 'border-slate-200 bg-white'}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          isTop ? 'bg-[#1A535C] text-white' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {index + 1}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-gray-900">{match.consultantName}</p>
                          <span className="text-xs text-gray-500">{match.consultantRole}</span>
                          {isTop && (
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#E6F2F4] text-[#1A535C] border border-[#C7E1E5]">
                              Best Match
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-gray-700">{match.summary}</p>

                        {match.skillGaps.length > 0 && (
                          <p className="mt-1 text-xs text-red-600">
                            Gap:{' '}
                            {match.skillGaps.map((gap) => `${gap.skill} (${gap.actual}/${gap.required})`).join(', ')}
                          </p>
                        )}

                        <button
                          onClick={() => toggleRationale(match.consultantId)}
                          className="mt-1 text-xs text-[#1A535C] hover:text-[#143F47] hover:underline transition-colors"
                        >
                          {isExpanded ? 'Hide Details' : 'Learn More'}
                        </button>
                        {isExpanded && <p className="mt-2 text-xs text-gray-600 leading-relaxed">{match.rationale}</p>}
                      </div>
                    </div>

                    <div className="w-52 shrink-0 space-y-2">
                      <div className={`rounded-lg px-3 py-2 text-center ${getScoreClassName(match.overallScore)}`}>
                        <p className="text-[11px] font-medium uppercase tracking-wide">Score</p>
                        <p className="text-2xl font-bold leading-tight">{match.overallScore}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                        <div className="rounded-md bg-slate-100 px-2 py-1 text-center text-slate-700">Skills: {match.skillScore}</div>
                        <div className="rounded-md bg-slate-100 px-2 py-1 text-center text-slate-700">
                          Availability: {match.availabilityScore}
                        </div>
                        <div className="rounded-md bg-slate-100 px-2 py-1 text-center text-slate-700">Experience: {match.experienceScore}</div>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <label className={`flex items-center gap-1.5 text-xs ${selectionLimitReached ? 'text-gray-400' : 'text-gray-600'}`}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            disabled={selectionLimitReached}
                            onChange={() => toggleCompareSelection(match.consultantId)}
                            className="rounded border-slate-300 text-[#1A535C] focus:ring-[#1A535C]"
                          />
                          Compare
                        </label>
                        <button
                          onClick={() => startAssignment(match, 'shortlist')}
                          className="px-3 py-1.5 border border-[#1A535C] text-[#1A535C] text-xs font-medium rounded-lg hover:bg-[#E6F2F4] transition-colors"
                        >
                          Assign
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                if (canCompare) setViewMode('compare');
              }}
              disabled={!canCompare}
              title={compareTooltip}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                canCompare
                  ? 'bg-[#1A535C] text-white hover:bg-[#143F47]'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Compare Selected ({selectedForCompare.length})
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FindBestMatch;
