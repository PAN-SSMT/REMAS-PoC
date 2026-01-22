import React, { useState } from 'react';
import AppNavigation from './components/shared/AppNavigation';
import Modal from './components/shared/Modal';


// Placeholder data for initial UI
const MOCK_CONSULTANTS = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Senior Consultant',
    utilization: 75,
    skills: { cspm: 5, cwp: 4, cas: 3, aut: 4 },
    currentProjects: 2,
    wspw: 6,
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'Consultant',
    utilization: 60,
    skills: { cspm: 4, cwp: 5, cas: 4, aut: 3 },
    currentProjects: 1,
    wspw: 4,
  },
  {
    id: '3',
    name: 'Emily Johnson',
    role: 'Associate',
    utilization: 85,
    skills: { cspm: 3, cwp: 3, cas: 5, aut: 2 },
    currentProjects: 3,
    wspw: 9,
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Senior Consultant',
    utilization: 45,
    skills: { cspm: 5, cwp: 5, cas: 4, aut: 5 },
    currentProjects: 1,
    wspw: 3,
  },
  {
    id: '5',
    name: 'Jessica Martinez',
    role: 'Principal Consultant',
    utilization: 90,
    skills: { cspm: 5, cwp: 5, cas: 5, aut: 5 },
    currentProjects: 4,
    wspw: 10,
  },
  {
    id: '6',
    name: 'Alex Thompson',
    role: 'Consultant',
    utilization: 55,
    skills: { cspm: 3, cwp: 4, cas: 3, aut: 4 },
    currentProjects: 1,
    wspw: 4,
  },
  {
    id: '7',
    name: 'Rachel Wong',
    role: 'Senior Consultant',
    utilization: 70,
    skills: { cspm: 4, cwp: 3, cas: 5, aut: 3 },
    currentProjects: 2,
    wspw: 7,
  },
  {
    id: '8',
    name: 'James O\'Brien',
    role: 'Associate',
    utilization: 40,
    skills: { cspm: 2, cwp: 3, cas: 2, aut: 1 },
    currentProjects: 1,
    wspw: 2,
  },
  {
    id: '9',
    name: 'Priya Patel',
    role: 'Consultant',
    utilization: 80,
    skills: { cspm: 4, cwp: 4, cas: 4, aut: 4 },
    currentProjects: 3,
    wspw: 8,
  },
];

const MOCK_PROJECTS = [
  {
    id: 'p1',
    title: 'CSPM Implementation - Acme Corp',
    type: 'ProServe',
    status: 'Unassigned',
    hours: 80,
    complexity: 'High',
  },
  {
    id: 'p2',
    title: 'Container Security Review - TechStart',
    type: 'EE',
    status: 'Unassigned',
    hours: 16,
    complexity: 'Medium',
  },
  {
    id: 'p3',
    title: 'CI/CD Pipeline Automation - Global Bank',
    type: 'Automation',
    status: 'InProgress',
    hours: 40,
    complexity: 'High',
    assignedTo: 'Sarah Chen',
  },
  {
    id: 'p4',
    title: 'Cloud Workload Protection - FinTech Inc',
    type: 'ProServe',
    status: 'OnHold',
    hours: 60,
    complexity: 'High',
    assignedTo: 'Sarah Chen',
  },
  {
    id: 'p5',
    title: 'Security Assessment - HealthCare Plus',
    type: 'EE',
    status: 'InProgress',
    hours: 24,
    complexity: 'Medium',
    assignedTo: 'Michael Rodriguez',
  },
  {
    id: 'p6',
    title: 'Kubernetes Security - DevOps Solutions',
    type: 'Automation',
    status: 'InProgress',
    hours: 32,
    complexity: 'Medium',
    assignedTo: 'David Kim',
  },
  {
    id: 'p7',
    title: 'Scale Optimization - Retail Giant',
    type: 'ScaleOptimize',
    status: 'InProgress',
    hours: 48,
    complexity: 'High',
    assignedTo: 'Emily Johnson',
  },
  {
    id: 'p16',
    title: 'Cloud Migration - Healthcare Systems',
    type: 'ProServe',
    status: 'OnHold',
    hours: 100,
    complexity: 'High',
    assignedTo: 'Emily Johnson',
  },
  {
    id: 'p17',
    title: 'SIEM Integration - Financial Services',
    type: 'Automation',
    status: 'InProgress',
    hours: 36,
    complexity: 'Medium',
    assignedTo: 'Emily Johnson',
  },
  {
    id: 'p18',
    title: 'Threat Detection Setup - E-Commerce',
    type: 'EE',
    status: 'InProgress',
    hours: 20,
    complexity: 'Medium',
    assignedTo: 'Jessica Martinez',
  },
  {
    id: 'p19',
    title: 'Security Automation - Logistics Corp',
    type: 'Automation',
    status: 'OnHold',
    hours: 45,
    complexity: 'High',
    assignedTo: 'Jessica Martinez',
  },
  {
    id: 'p20',
    title: 'Compliance Framework - Gov Agency',
    type: 'ProServe',
    status: 'InProgress',
    hours: 80,
    complexity: 'High',
    assignedTo: 'Jessica Martinez',
  },
  {
    id: 'p21',
    title: 'Vulnerability Management - Retail Chain',
    type: 'EE',
    status: 'InProgress',
    hours: 28,
    complexity: 'Medium',
    assignedTo: 'Jessica Martinez',
  },
  {
    id: 'p22',
    title: 'Container Security - Tech Innovators',
    type: 'Automation',
    status: 'InProgress',
    hours: 40,
    complexity: 'Medium',
    assignedTo: 'Priya Patel',
  },
  {
    id: 'p23',
    title: 'Cloud Posture Review - Media Group',
    type: 'ProServe',
    status: 'OnHold',
    hours: 32,
    complexity: 'Medium',
    assignedTo: 'Priya Patel',
  },
  {
    id: 'p24',
    title: 'API Security Audit - FinTech Startup',
    type: 'EE',
    status: 'InProgress',
    hours: 24,
    complexity: 'Medium',
    assignedTo: 'Priya Patel',
  },
  {
    id: 'p25',
    title: 'Runtime Protection - Manufacturing',
    type: 'ScaleOptimize',
    status: 'InProgress',
    hours: 36,
    complexity: 'High',
    assignedTo: 'Rachel Wong',
  },
  {
    id: 'p26',
    title: 'Security Training - Enterprise Client',
    type: 'EE',
    status: 'OnHold',
    hours: 16,
    complexity: 'Low',
    assignedTo: 'Rachel Wong',
  },
  {
    id: 'p27',
    title: 'Network Security Review - Telecom',
    type: 'ProServe',
    status: 'InProgress',
    hours: 48,
    complexity: 'High',
    assignedTo: 'Alex Thompson',
  },
  {
    id: 'p28',
    title: 'Identity Management - Insurance',
    type: 'Automation',
    status: 'InProgress',
    hours: 32,
    complexity: 'Medium',
    assignedTo: 'James O\'Brien',
  },
  {
    id: 'p8',
    title: 'Compliance Audit - Insurance Co',
    type: 'Automation',
    status: 'Unassigned',
    hours: 20,
    complexity: 'Low',
  },
  {
    id: 'p9',
    title: 'Multi-Cloud Security - Tech Startup',
    type: 'ProServe',
    status: 'Unassigned',
    hours: 100,
    complexity: 'High',
  },
  {
    id: 'p10',
    title: 'Zero Trust Architecture - MegaCorp',
    type: 'ProServe',
    status: 'Unassigned',
    hours: 120,
    complexity: 'High',
  },
  {
    id: 'p11',
    title: 'API Security Review - PaymentPro',
    type: 'EE',
    status: 'Unassigned',
    hours: 24,
    complexity: 'Medium',
  },
  {
    id: 'p12',
    title: 'Cloud Migration Security - LegacyTech',
    type: 'Automation',
    status: 'Unassigned',
    hours: 56,
    complexity: 'High',
  },
  {
    id: 'p13',
    title: 'SOC Integration - SecureBank',
    type: 'ProServe',
    status: 'Unassigned',
    hours: 80,
    complexity: 'High',
  },
  {
    id: 'p14',
    title: 'Vulnerability Assessment - EduOrg',
    type: 'Automation',
    status: 'Unassigned',
    hours: 16,
    complexity: 'Low',
  },
  {
    id: 'p15',
    title: 'Container Runtime Protection - CloudNative',
    type: 'ScaleOptimize',
    status: 'Unassigned',
    hours: 40,
    complexity: 'Medium',
  },
];

interface Consultant {
  id: string;
  name: string;
  role: string;
  utilization: number;
  skills: { cspm: number; cwp: number; cas: number; aut: number };
  currentProjects: number;
  wspw: number;
}

const App: React.FC = () => {
  const [consultants, setConsultants] = useState<Consultant[]>(MOCK_CONSULTANTS);
  const [selectedConsultant, setSelectedConsultant] = useState<string | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<Consultant | null>(null);
  const [isProjectQueuePopupOpen, setIsProjectQueuePopupOpen] = useState(false);
  const [isTeamOverviewPopupOpen, setIsTeamOverviewPopupOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isProjectDetailsModalOpen, setIsProjectDetailsModalOpen] = useState(false);
  const [isProjectEditModalOpen, setIsProjectEditModalOpen] = useState(false);
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [editProjectForm, setEditProjectForm] = useState<typeof MOCK_PROJECTS[0] | null>(null);
  const [projectTypeFilter, setProjectTypeFilter] = useState<string | null>(null);
  const [isAvailabilityPopupOpen, setIsAvailabilityPopupOpen] = useState(false);

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 80) return 'text-red-600 bg-red-100';
    if (utilization >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getWspwColor = (wspw: number) => {
    if (wspw >= 9) return 'text-red-600 bg-red-100';
    if (wspw >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Unassigned':
        return 'bg-orange-100 text-orange-700';
      case 'InProgress':
        return 'bg-blue-100 text-blue-700';
      case 'Completed':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ProServe':
        return 'bg-purple-100 text-purple-700';
      case 'EE':
        return 'bg-blue-100 text-blue-700';
      case 'Automation':
        return 'bg-cyan-100 text-cyan-700';
      case 'ScaleOptimize':
        return 'bg-emerald-100 text-emerald-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen text-gray-900">
      {/* Header - Same style as NOVA */}
      <header className="p-4 md:px-8 md:py-5 border-b border-gray-200 bg-white shadow-sm flex-shrink-0">
        <div className="flex justify-between items-center">
          <img src="/REMAS-PoC/assets/REMAS Logo.png" alt="REMAS - Resource Management & Assignment System" className="h-[84px]" />
          <div className="flex flex-col items-end">
            <img src="/REMAS-PoC/assets/PaloAltoLogo.png" alt="Palo Alto Networks" className="h-[71px]" />
            <p className="text-gray-900 text-[19px] transform -translate-x-[10%] -translate-y-[3%]">Technical Services</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 overflow-hidden bg-gray-50 p-3 md:p-4 gap-3 md:gap-4">
        {/* Left Column - Stats & AI Assistant */}
        <div className="w-1/3 min-w-[350px] max-w-[450px] flex flex-col gap-3 md:gap-4">
          {/* Availability Widget */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-lg font-semibold text-gray-900">Availability</h2>
              <button
                onClick={() => setIsAvailabilityPopupOpen(true)}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                title="Open in popup"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-4.5 0L18 6m0 0h-4.5m4.5 0v4.5" />
                </svg>
              </button>
              </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">CSPM</p>
                <p className="text-lg font-bold text-yellow-600">72%</p>
            </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">CWP</p>
                <p className="text-lg font-bold text-yellow-600">65%</p>
                  </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">CAS</p>
                <p className="text-lg font-bold text-green-600">58%</p>
                  </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">AUT</p>
                <p className="text-lg font-bold text-red-600">81%</p>
                </div>
            </div>
          </div>

          {/* AI Chat Placeholder */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">REMAS Advisor</h2>
            </div>
            <div className="flex-1 p-4 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-sm">Ask questions about consultants, projects, or availability</p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Who's available for a CSPM project?"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Project Queue & Team Overview */}
        <div className="flex-1 flex flex-col gap-3 md:gap-4">
          {/* Project Queue */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[280px] flex flex-col min-h-0">
            <div className="p-4 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
                  <button
                    onClick={() => setIsProjectQueuePopupOpen(true)}
                    className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                    title="Open in popup"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-4.5 0L18 6m0 0h-4.5m4.5 0v4.5" />
                    </svg>
                  </button>
                  <div className="flex items-center gap-1 ml-2">
                    <button
                      onClick={() => setProjectTypeFilter(null)}
                      className={`px-2 py-0.5 text-[10px] font-medium rounded-full transition-colors ${
                        projectTypeFilter === null
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setProjectTypeFilter('ProServe')}
                      className={`px-2 py-0.5 text-[10px] font-medium rounded-full transition-colors ${
                        projectTypeFilter === 'ProServe'
                          ? 'bg-purple-600 text-white'
                          : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                      }`}
                    >
                      ProServe
                    </button>
                    <button
                      onClick={() => setProjectTypeFilter('EE')}
                      className={`px-2 py-0.5 text-[10px] font-medium rounded-full transition-colors ${
                        projectTypeFilter === 'EE'
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    >
                      EE
                    </button>
                    <button
                      onClick={() => setProjectTypeFilter('Automation')}
                      className={`px-2 py-0.5 text-[10px] font-medium rounded-full transition-colors ${
                        projectTypeFilter === 'Automation'
                          ? 'bg-cyan-600 text-white'
                          : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'
                      }`}
                    >
                      Automation
                    </button>
                    <button
                      onClick={() => setProjectTypeFilter('ScaleOptimize')}
                      className={`px-2 py-0.5 text-[10px] font-medium rounded-full transition-colors ${
                        projectTypeFilter === 'ScaleOptimize'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                      }`}
                    >
                      Scale
                    </button>
            </div>
            </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  + Add Project
                </button>
            </div>
            </div>
            <div className="flex-1 overflow-y-scroll p-4 scrollbar-visible" style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f1f5f9' }}>
              <div className="grid grid-cols-3 gap-3">
                {projects
                  .filter(p => p.status === 'Unassigned')
                  .filter(p => projectTypeFilter === null || p.type === projectTypeFilter)
                  .map((project) => (
                  <div
                    key={project.id}
                    className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <div className="mb-2">
                      <h3 className="font-medium text-gray-900 text-sm line-clamp-2">{project.title}</h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getTypeColor(project.type)}`}>
                            {project.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <span>{project.hours}h</span>
                          <span>• {project.complexity}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-0.5">
                        <button
                          onClick={() => {
                            setSelectedProject(project.id);
                            setIsProjectDetailsModalOpen(true);
                          }}
                          className="text-[10px] text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProject(project.id);
                            setEditProjectForm({ ...project });
                            setIsProjectEditModalOpen(true);
                          }}
                          className="text-[10px] text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    <button className="mt-2 w-1/2 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors">
                      Find Best Match
                    </button>
            </div>
                ))}
            </div>
            </div>
          </div>

          {/* Team Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 flex flex-col min-h-0">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">Team Overview</h2>
                <button
                  onClick={() => setIsTeamOverviewPopupOpen(true)}
                  className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                  title="Open in popup"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-4.5 0L18 6m0 0h-4.5m4.5 0v4.5" />
                  </svg>
                </button>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                + Add Consultant
              </button>
            </div>
            <div className="flex-1 overflow-y-scroll p-3 scrollbar-visible" style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f1f5f9' }}>
              <div className="grid grid-cols-3 gap-3">
                {consultants.map((consultant) => (
                  <div
                    key={consultant.id}
                    className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="min-w-0 flex-1 mr-2">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{consultant.name}</h3>
                        <p className="text-xs text-gray-500 truncate">{consultant.role}</p>
                      </div>
                      <span 
                        className={`px-1.5 py-0.5 text-xs font-medium rounded-full flex-shrink-0 ${getWspwColor(consultant.wspw)}`}
                        title="Working Sessions per Week"
                      >
                        WSPW: {consultant.wspw}
                      </span>
                    </div>
                    
                    {/* Skills with Actions */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-gray-500 w-9">CSPM</span>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className={`w-2.5 h-2.5 rounded-sm ${
                                  level <= consultant.skills.cspm ? 'bg-blue-500' : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-gray-500 w-9">CWP</span>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className={`w-2.5 h-2.5 rounded-sm ${
                                  level <= consultant.skills.cwp ? 'bg-green-500' : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-gray-500 w-9">CAS</span>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className={`w-2.5 h-2.5 rounded-sm ${
                                  level <= consultant.skills.cas ? 'bg-purple-500' : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-gray-500 w-9">AUT</span>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className={`w-2.5 h-2.5 rounded-sm ${
                                  level <= consultant.skills.aut ? 'bg-cyan-500' : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-0.5">
                        <button
                    onClick={() => {
                      setSelectedConsultant(consultant.id);
                            setIsDetailsModalOpen(true);
                          }}
                          className="text-[10px] text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => {
                            setSelectedConsultant(consultant.id);
                            setEditForm({ ...consultant });
                            setIsEditModalOpen(true);
                          }}
                          className="text-[10px] text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">
                      {consultant.currentProjects} active project{consultant.currentProjects !== 1 ? 's' : ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Consultant Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title={consultants.find(c => c.id === selectedConsultant)?.name || 'Consultant Details'}
        maxWidth="max-w-2xl"
      >
        {(() => {
          const consultant = consultants.find(c => c.id === selectedConsultant);
          if (!consultant) return null;
          return (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {consultant.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{consultant.name}</h3>
                  <p className="text-gray-500">{consultant.role}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className={`px-2 py-1 text-sm font-medium rounded-full ${getUtilizationColor(consultant.utilization)}`}>
                      {consultant.utilization}% Utilization
                    </span>
                    <span className="text-sm text-gray-500">
                      {consultant.currentProjects} active project{consultant.currentProjects !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Skills & Expertise</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">CSPM (Cloud Security Posture Management)</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-6 h-6 rounded ${level <= consultant.skills.cspm ? 'bg-blue-500' : 'bg-gray-200'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">CWP (Cloud Workload Protection)</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-6 h-6 rounded ${level <= consultant.skills.cwp ? 'bg-green-500' : 'bg-gray-200'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">CAS (Cloud Application Security)</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-6 h-6 rounded ${level <= consultant.skills.cas ? 'bg-purple-500' : 'bg-gray-200'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">AUT (Automation)</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-6 h-6 rounded ${level <= consultant.skills.aut ? 'bg-cyan-500' : 'bg-gray-200'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Assigned Projects */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Assigned Projects</h4>
                <div className="space-y-3">
                  {projects.filter(p => p.assignedTo === consultant.name).length > 0 ? (
                    projects.filter(p => p.assignedTo === consultant.name).map((project) => (
                      <div key={project.id} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{project.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getTypeColor(project.type)}`}>
                              {project.type}
                            </span>
                            <span className="text-xs text-gray-500">{project.hours}h</span>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          project.status === 'InProgress' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {project.status === 'InProgress' ? 'In Progress' : 'On Hold'}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-2">No projects currently assigned</p>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">{consultant.utilization}%</p>
                  <p className="text-xs text-blue-700">Current Utilization</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">{consultant.currentProjects}</p>
                  <p className="text-xs text-green-700">Active Projects</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {Math.round((consultant.skills.cspm + consultant.skills.cwp + consultant.skills.cas + consultant.skills.aut) / 4 * 20)}%
                  </p>
                  <p className="text-xs text-purple-700">Avg Skill Level</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setIsDetailsModalOpen(false);
                    setEditForm({ ...consultant });
                    setIsEditModalOpen(true);
                  }}
                  className="flex-1 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Consultant
                </button>
                <button
                  onClick={() => setIsDetailsModalOpen(false)}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          );
        })()}
      </Modal>

      {/* Edit Consultant Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditForm(null);
        }}
        title="Edit Consultant"
        maxWidth="max-w-xl"
      >
        {editForm && (
          <div className="space-y-5">
            {/* Name */}
                      <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
                      </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                value={editForm.role}
                onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Associate">Associate</option>
                <option value="Consultant">Consultant</option>
                <option value="Senior Consultant">Senior Consultant</option>
                <option value="Principal Consultant">Principal Consultant</option>
              </select>
            </div>

            {/* Utilization */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Utilization: {editForm.utilization}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={editForm.utilization}
                onChange={(e) => setEditForm({ ...editForm, utilization: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Current Projects */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Active Projects</label>
              <input
                type="number"
                min="0"
                max="10"
                value={editForm.currentProjects}
                onChange={(e) => setEditForm({ ...editForm, currentProjects: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Skills</h4>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">CSPM: {editForm.skills.cspm}/5</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => setEditForm({ ...editForm, skills: { ...editForm.skills, cspm: level } })}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        level <= editForm.skills.cspm
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">CWP: {editForm.skills.cwp}/5</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => setEditForm({ ...editForm, skills: { ...editForm.skills, cwp: level } })}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        level <= editForm.skills.cwp
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">CAS: {editForm.skills.cas}/5</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => setEditForm({ ...editForm, skills: { ...editForm.skills, cas: level } })}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        level <= editForm.skills.cas
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">AUT: {editForm.skills.aut}/5</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => setEditForm({ ...editForm, skills: { ...editForm.skills, aut: level } })}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        level <= editForm.skills.aut
                          ? 'bg-cyan-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setConsultants(consultants.map(c => c.id === editForm.id ? editForm : c));
                  setIsEditModalOpen(false);
                  setEditForm(null);
                }}
                className="flex-1 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditForm(null);
                }}
                className="flex-1 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Projects Popup Modal */}
      <Modal
        isOpen={isProjectQueuePopupOpen}
        onClose={() => setIsProjectQueuePopupOpen(false)}
        title="Projects"
        maxWidth="max-w-5xl"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1.5 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
              {MOCK_PROJECTS.filter(p => p.status === 'Unassigned').length} Unassigned Projects
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto scrollbar-visible pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f1f5f9' }}>
            {MOCK_PROJECTS.filter(p => p.status === 'Unassigned').map((project) => (
              <div
                key={project.id}
                className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="mb-2">
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-2">{project.title}</h3>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getTypeColor(project.type)}`}>
                        {project.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <span>{project.hours}h</span>
                      <span>• {project.complexity}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <button
                      onClick={() => {
                        setSelectedProject(project.id);
                        setIsProjectQueuePopupOpen(false);
                        setIsProjectDetailsModalOpen(true);
                      }}
                      className="text-[10px] text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProject(project.id);
                        setEditProjectForm({ ...project });
                        setIsProjectQueuePopupOpen(false);
                        setIsProjectEditModalOpen(true);
                      }}
                      className="text-[10px] text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <button className="mt-2 w-1/2 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Find Best Match
                </button>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Team Overview Popup Modal */}
      <Modal
        isOpen={isTeamOverviewPopupOpen}
        onClose={() => setIsTeamOverviewPopupOpen(false)}
        title="Team Overview"
        maxWidth="max-w-6xl"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">
              {consultants.length} Consultants • Avg Utilization: {Math.round(consultants.reduce((sum, c) => sum + c.utilization, 0) / consultants.length)}%
            </span>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              + Add Consultant
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto scrollbar-visible pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f1f5f9' }}>
            {consultants.map((consultant) => (
              <div
                key={consultant.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="min-w-0 flex-1 mr-2">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">{consultant.name}</h3>
                    <p className="text-xs text-gray-500 truncate">{consultant.role}</p>
                  </div>
                  <span 
                    className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${getWspwColor(consultant.wspw)}`}
                    title="Working Sessions per Week"
                  >
                    WSPW: {consultant.wspw}
                      </span>
                    </div>
                    
                    {/* Skills with Actions */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-gray-500 w-10">CSPM</span>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className={`w-3 h-3 rounded-sm ${
                                  level <= consultant.skills.cspm ? 'bg-blue-500' : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-gray-500 w-10">CWP</span>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className={`w-3 h-3 rounded-sm ${
                                  level <= consultant.skills.cwp ? 'bg-green-500' : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-gray-500 w-10">CAS</span>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className={`w-3 h-3 rounded-sm ${
                                  level <= consultant.skills.cas ? 'bg-purple-500' : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-gray-500 w-10">AUT</span>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className={`w-3 h-3 rounded-sm ${
                                  level <= consultant.skills.aut ? 'bg-cyan-500' : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-0.5">
                        <button
                          onClick={() => {
                            setSelectedConsultant(consultant.id);
                            setIsTeamOverviewPopupOpen(false);
                            setIsDetailsModalOpen(true);
                          }}
                          className="text-[10px] text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => {
                            setSelectedConsultant(consultant.id);
                            setEditForm({ ...consultant });
                            setIsTeamOverviewPopupOpen(false);
                            setIsEditModalOpen(true);
                          }}
                          className="text-[10px] text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                    </div>

                <div className="text-xs text-gray-500">
                  {consultant.currentProjects} active project{consultant.currentProjects !== 1 ? 's' : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Project Details Modal */}
      <Modal
        isOpen={isProjectDetailsModalOpen}
        onClose={() => setIsProjectDetailsModalOpen(false)}
        title={projects.find(p => p.id === selectedProject)?.title || 'Project Details'}
        maxWidth="max-w-2xl"
      >
        {(() => {
          const project = projects.find(p => p.id === selectedProject);
          if (!project) return null;
          return (
            <div className="space-y-6">
              {/* Project Info */}
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${getTypeColor(project.type)}`}>
                  <span className="text-2xl font-bold">{project.type.charAt(0)}</span>
          </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                  <div className="mt-2 flex items-center gap-3">
                    <span className={`px-2 py-1 text-sm font-medium rounded-full ${getTypeColor(project.type)}`}>
                      {project.type}
                    </span>
                    <span className={`px-2 py-1 text-sm font-medium rounded-full ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
        </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Project Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Estimated Hours</p>
                    <p className="text-lg font-semibold text-gray-900">{project.hours}h</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Complexity</p>
                    <p className="text-lg font-semibold text-gray-900">{project.complexity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="text-lg font-semibold text-gray-900">{project.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Assigned To</p>
                    <p className="text-lg font-semibold text-gray-900">{project.assignedTo || 'Unassigned'}</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-purple-600">{project.hours}h</p>
                  <p className="text-xs text-purple-700">Total Hours</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">{project.complexity}</p>
                  <p className="text-xs text-blue-700">Complexity</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-orange-600">{project.type}</p>
                  <p className="text-xs text-orange-700">Project Type</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setIsProjectDetailsModalOpen(false);
                    setEditProjectForm({ ...project });
                    setIsProjectEditModalOpen(true);
                  }}
                  className="flex-1 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Project
                </button>
                <button
                  onClick={() => setIsProjectDetailsModalOpen(false)}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          );
        })()}
      </Modal>

      {/* Edit Project Modal */}
      <Modal
        isOpen={isProjectEditModalOpen}
        onClose={() => {
          setIsProjectEditModalOpen(false);
          setEditProjectForm(null);
        }}
        title="Edit Project"
        maxWidth="max-w-xl"
      >
        {editProjectForm && (
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
              <input
                type="text"
                value={editProjectForm.title}
                onChange={(e) => setEditProjectForm({ ...editProjectForm, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
              <select
                value={editProjectForm.type}
                onChange={(e) => setEditProjectForm({ ...editProjectForm, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ProServe">ProServe</option>
                <option value="EE">EE</option>
                <option value="Automation">Automation</option>
                <option value="ScaleOptimize">ScaleOptimize</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={editProjectForm.status}
                onChange={(e) => setEditProjectForm({ ...editProjectForm, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Unassigned">Unassigned</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Hours */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Hours</label>
              <input
                type="number"
                min="1"
                value={editProjectForm.hours}
                onChange={(e) => setEditProjectForm({ ...editProjectForm, hours: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Complexity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Complexity</label>
              <select
                value={editProjectForm.complexity}
                onChange={(e) => setEditProjectForm({ ...editProjectForm, complexity: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setProjects(projects.map(p => p.id === editProjectForm.id ? editProjectForm : p));
                  setIsProjectEditModalOpen(false);
                  setEditProjectForm(null);
                }}
                className="flex-1 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setIsProjectEditModalOpen(false);
                  setEditProjectForm(null);
                }}
                className="flex-1 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Availability Popup Modal */}
      <Modal
        isOpen={isAvailabilityPopupOpen}
        onClose={() => setIsAvailabilityPopupOpen(false)}
        title="Team Availability by Skill Area"
        maxWidth="max-w-4xl"
      >
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-sm font-medium text-gray-900 mb-1">CSPM</p>
              <p className="text-3xl font-bold text-yellow-600">72%</p>
              <p className="text-xs text-gray-500 mt-1">Capacity Used</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-sm font-medium text-gray-900 mb-1">CWP</p>
              <p className="text-3xl font-bold text-yellow-600">65%</p>
              <p className="text-xs text-gray-500 mt-1">Capacity Used</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-sm font-medium text-gray-900 mb-1">CAS</p>
              <p className="text-3xl font-bold text-green-600">58%</p>
              <p className="text-xs text-gray-500 mt-1">Capacity Used</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-sm font-medium text-gray-900 mb-1">AUT</p>
              <p className="text-3xl font-bold text-red-600">81%</p>
              <p className="text-xs text-gray-500 mt-1">Capacity Used</p>
            </div>
          </div>

          {/* Detailed Breakdown */}
        <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Consultant Availability by Area</h3>
            
            {/* CSPM */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">CSPM (Cloud Security Posture Management)</h4>
                <span className="px-2 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-700">72% Used</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div><span className="text-gray-500">Available:</span> <span className="font-medium">3 consultants</span></div>
                <div><span className="text-gray-500">Partially Available:</span> <span className="font-medium">4 consultants</span></div>
                <div><span className="text-gray-500">Fully Booked:</span> <span className="font-medium">2 consultants</span></div>
              </div>
            </div>

            {/* CWP */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">CWP (Cloud Workload Protection)</h4>
                <span className="px-2 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-700">65% Used</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div><span className="text-gray-500">Available:</span> <span className="font-medium">4 consultants</span></div>
                <div><span className="text-gray-500">Partially Available:</span> <span className="font-medium">3 consultants</span></div>
                <div><span className="text-gray-500">Fully Booked:</span> <span className="font-medium">2 consultants</span></div>
              </div>
            </div>

            {/* CAS */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">CAS (Cloud Application Security)</h4>
                <span className="px-2 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700">58% Used</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div><span className="text-gray-500">Available:</span> <span className="font-medium">5 consultants</span></div>
                <div><span className="text-gray-500">Partially Available:</span> <span className="font-medium">2 consultants</span></div>
                <div><span className="text-gray-500">Fully Booked:</span> <span className="font-medium">2 consultants</span></div>
              </div>
            </div>

            {/* AUT */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">AUT (Automation)</h4>
                <span className="px-2 py-1 text-sm font-medium rounded-full bg-red-100 text-red-700">81% Used</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div><span className="text-gray-500">Available:</span> <span className="font-medium">2 consultants</span></div>
                <div><span className="text-gray-500">Partially Available:</span> <span className="font-medium">3 consultants</span></div>
                <div><span className="text-gray-500">Fully Booked:</span> <span className="font-medium">4 consultants</span></div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              onClick={() => setIsAvailabilityPopupOpen(false)}
              className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;
