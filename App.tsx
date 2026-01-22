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
  {
    id: '10',
    name: 'Marcus Lee',
    role: 'Senior Consultant',
    utilization: 65,
    skills: { cspm: 5, cwp: 3, cas: 4, aut: 5 },
    currentProjects: 2,
    wspw: 5,
  },
  {
    id: '11',
    name: 'Amanda Foster',
    role: 'Associate',
    utilization: 50,
    skills: { cspm: 3, cwp: 2, cas: 3, aut: 2 },
    currentProjects: 1,
    wspw: 3,
  },
  {
    id: '12',
    name: 'Kevin Nguyen',
    role: 'Principal Consultant',
    utilization: 85,
    skills: { cspm: 5, cwp: 5, cas: 5, aut: 4 },
    currentProjects: 3,
    wspw: 9,
  },
  {
    id: '13',
    name: 'Lisa Chang',
    role: 'Consultant',
    utilization: 70,
    skills: { cspm: 4, cwp: 4, cas: 3, aut: 5 },
    currentProjects: 2,
    wspw: 6,
  },
  {
    id: '14',
    name: 'Robert Garcia',
    role: 'Senior Consultant',
    utilization: 78,
    skills: { cspm: 4, cwp: 5, cas: 4, aut: 3 },
    currentProjects: 2,
    wspw: 7,
  },
  {
    id: '15',
    name: 'Nina Petrov',
    role: 'Consultant',
    utilization: 55,
    skills: { cspm: 3, cwp: 3, cas: 5, aut: 4 },
    currentProjects: 1,
    wspw: 4,
  },
  {
    id: '16',
    name: 'Tyler Washington',
    role: 'Associate',
    utilization: 42,
    skills: { cspm: 2, cwp: 3, cas: 2, aut: 3 },
    currentProjects: 1,
    wspw: 2,
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
  // Additional ProServe projects
  {
    id: 'p29',
    title: 'Enterprise Security Suite - GlobalTech',
    type: 'ProServe',
    status: 'InProgress',
    hours: 120,
    complexity: 'High',
    assignedTo: 'Sarah Chen',
  },
  {
    id: 'p30',
    title: 'Cloud Posture Management - BioMed Labs',
    type: 'ProServe',
    status: 'InProgress',
    hours: 60,
    complexity: 'Medium',
    assignedTo: 'Sarah Chen',
  },
  {
    id: 'p31',
    title: 'Security Architecture Review - DataFlow Inc',
    type: 'ProServe',
    status: 'InProgress',
    hours: 80,
    complexity: 'High',
    assignedTo: 'Sarah Chen',
  },
  {
    id: 'p32',
    title: 'Multi-Cloud Security - Nexus Corp',
    type: 'ProServe',
    status: 'InProgress',
    hours: 100,
    complexity: 'High',
    assignedTo: 'Kevin Nguyen',
  },
  {
    id: 'p33',
    title: 'DevSecOps Implementation - FastShip',
    type: 'ProServe',
    status: 'InProgress',
    hours: 90,
    complexity: 'High',
    assignedTo: 'Kevin Nguyen',
  },
  {
    id: 'p34',
    title: 'Zero Trust Framework - SecureFirst',
    type: 'ProServe',
    status: 'OnHold',
    hours: 70,
    complexity: 'Medium',
    assignedTo: 'Kevin Nguyen',
  },
  {
    id: 'p35',
    title: 'Compliance Automation - RegTech Solutions',
    type: 'ProServe',
    status: 'InProgress',
    hours: 55,
    complexity: 'Medium',
    assignedTo: 'Kevin Nguyen',
  },
  {
    id: 'p36',
    title: 'Cloud Security Baseline - Urban Systems',
    type: 'ProServe',
    status: 'InProgress',
    hours: 45,
    complexity: 'Medium',
    assignedTo: 'Marcus Lee',
  },
  {
    id: 'p37',
    title: 'Threat Modeling - CyberShield',
    type: 'ProServe',
    status: 'InProgress',
    hours: 65,
    complexity: 'High',
    assignedTo: 'Marcus Lee',
  },
  {
    id: 'p38',
    title: 'Security Operations Center - TechVentures',
    type: 'ProServe',
    status: 'InProgress',
    hours: 85,
    complexity: 'High',
    assignedTo: 'Robert Garcia',
  },
  {
    id: 'p39',
    title: 'Cloud Migration Security - LegalEase',
    type: 'ProServe',
    status: 'OnHold',
    hours: 50,
    complexity: 'Medium',
    assignedTo: 'Robert Garcia',
  },
  {
    id: 'p40',
    title: 'Incident Response Planning - SafeNet',
    type: 'ProServe',
    status: 'InProgress',
    hours: 40,
    complexity: 'Medium',
    assignedTo: 'Robert Garcia',
  },
  {
    id: 'p41',
    title: 'CSPM Deployment - CloudFirst',
    type: 'ProServe',
    status: 'InProgress',
    hours: 75,
    complexity: 'High',
    assignedTo: 'Lisa Chang',
  },
  {
    id: 'p42',
    title: 'Security Assessment - EduTech',
    type: 'ProServe',
    status: 'InProgress',
    hours: 35,
    complexity: 'Low',
    assignedTo: 'Amanda Foster',
  },
  // More ProServe projects to ensure 3+ per consultant
  {
    id: 'p43',
    title: 'API Gateway Security - FinanceHub',
    type: 'ProServe',
    status: 'InProgress',
    hours: 55,
    complexity: 'Medium',
    assignedTo: 'Marcus Lee',
  },
  {
    id: 'p44',
    title: 'Container Security - MedDevice Co',
    type: 'ProServe',
    status: 'InProgress',
    hours: 70,
    complexity: 'High',
    assignedTo: 'Emily Johnson',
  },
  {
    id: 'p45',
    title: 'Cloud Compliance - InsureTech',
    type: 'ProServe',
    status: 'InProgress',
    hours: 60,
    complexity: 'Medium',
    assignedTo: 'Emily Johnson',
  },
  {
    id: 'p46',
    title: 'Security Hardening - RetailMax',
    type: 'ProServe',
    status: 'InProgress',
    hours: 85,
    complexity: 'High',
    assignedTo: 'Jessica Martinez',
  },
  {
    id: 'p47',
    title: 'Workload Protection - LogiChain',
    type: 'ProServe',
    status: 'OnHold',
    hours: 50,
    complexity: 'Medium',
    assignedTo: 'Jessica Martinez',
  },
  {
    id: 'p48',
    title: 'DSPM Implementation - DataVault',
    type: 'ProServe',
    status: 'InProgress',
    hours: 65,
    complexity: 'High',
    assignedTo: 'Priya Patel',
  },
  {
    id: 'p49',
    title: 'Security Monitoring - SmartGrid',
    type: 'ProServe',
    status: 'InProgress',
    hours: 45,
    complexity: 'Medium',
    assignedTo: 'Priya Patel',
  },
  {
    id: 'p50',
    title: 'Cloud Security Assessment - AeroSpace',
    type: 'ProServe',
    status: 'InProgress',
    hours: 90,
    complexity: 'High',
    assignedTo: 'Alex Thompson',
  },
  {
    id: 'p51',
    title: 'Runtime Protection - GameStudio',
    type: 'ProServe',
    status: 'InProgress',
    hours: 40,
    complexity: 'Medium',
    assignedTo: 'Alex Thompson',
  },
  {
    id: 'p52',
    title: 'Vulnerability Management - CryptoTrade',
    type: 'ProServe',
    status: 'InProgress',
    hours: 55,
    complexity: 'Medium',
    assignedTo: 'Lisa Chang',
  },
  {
    id: 'p53',
    title: 'Security Architecture - GreenEnergy',
    type: 'ProServe',
    status: 'OnHold',
    hours: 70,
    complexity: 'High',
    assignedTo: 'Lisa Chang',
  },
  {
    id: 'p54',
    title: 'Cloud Posture Review - StartupHub',
    type: 'ProServe',
    status: 'InProgress',
    hours: 30,
    complexity: 'Low',
    assignedTo: 'Amanda Foster',
  },
  {
    id: 'p55',
    title: 'Basic Security Setup - LocalGov',
    type: 'ProServe',
    status: 'InProgress',
    hours: 25,
    complexity: 'Low',
    assignedTo: 'Amanda Foster',
  },
];

// Detailed ProServe project information
const PROSERVE_PROJECT_DETAILS: Record<string, {
  assignedClient: string;
  clarizenProjectId: string;
  areasOfSupport: string[];
  cloudPlatform: 'Cortex Cloud' | 'Prisma Cloud';
  cortexCloudUpgrade: 'Yes' | 'No';
  projectStarted: 'Yes' | 'No';
  internalKickOffCompleted: 'Yes' | 'No';
  externalKickOffCompleted: 'Yes' | 'No';
  technicalAssessmentCompleted: 'Yes' | 'No';
  workingSessionsScheduled: 'Yes' | 'No';
  nextWorkingSession: string;
  totalSessionsPerWeek: number;
  approxRemainingSessions: number;
  approxCompletionDate: string;
  notes: string;
}> = {
  'p1': {
    assignedClient: 'Acme Corp',
    clarizenProjectId: 'P-1234567',
    areasOfSupport: ['CSPM', 'CWP'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-25',
    totalSessionsPerWeek: 3,
    approxRemainingSessions: 12,
    approxCompletionDate: '2026-03-15',
    notes: 'Customer requested additional CSPM coverage for AWS accounts. Waiting on access credentials for production environment.',
  },
  'p4': {
    assignedClient: 'FinTech Inc',
    clarizenProjectId: 'P-2345678',
    areasOfSupport: ['CWP', 'CAS'],
    cloudPlatform: 'Prisma Cloud',
    cortexCloudUpgrade: 'No',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'No',
    workingSessionsScheduled: 'No',
    nextWorkingSession: '',
    totalSessionsPerWeek: 2,
    approxRemainingSessions: 18,
    approxCompletionDate: '2026-04-30',
    notes: 'Project on hold pending customer budget approval. Escalation in progress with account team.',
  },
  'p9': {
    assignedClient: 'Tech Startup',
    clarizenProjectId: 'P-3456789',
    areasOfSupport: ['CSPM', 'DSPM', 'AUT'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'No',
    internalKickOffCompleted: 'No',
    externalKickOffCompleted: 'No',
    technicalAssessmentCompleted: 'No',
    workingSessionsScheduled: 'No',
    nextWorkingSession: '',
    totalSessionsPerWeek: 4,
    approxRemainingSessions: 25,
    approxCompletionDate: '2026-05-15',
    notes: 'New engagement. Waiting for SOW signature.',
  },
  'p10': {
    assignedClient: 'MegaCorp',
    clarizenProjectId: 'P-4567890',
    areasOfSupport: ['CSPM', 'CWP', 'CAS', 'DSPM'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'No',
    internalKickOffCompleted: 'No',
    externalKickOffCompleted: 'No',
    technicalAssessmentCompleted: 'No',
    workingSessionsScheduled: 'No',
    nextWorkingSession: '',
    totalSessionsPerWeek: 5,
    approxRemainingSessions: 30,
    approxCompletionDate: '2026-06-01',
    notes: 'Large enterprise deployment. Multi-cloud environment (AWS, Azure, GCP).',
  },
  'p13': {
    assignedClient: 'SecureBank',
    clarizenProjectId: 'P-5678901',
    areasOfSupport: ['CSPM', 'AUT'],
    cloudPlatform: 'Prisma Cloud',
    cortexCloudUpgrade: 'No',
    projectStarted: 'No',
    internalKickOffCompleted: 'No',
    externalKickOffCompleted: 'No',
    technicalAssessmentCompleted: 'No',
    workingSessionsScheduled: 'No',
    nextWorkingSession: '',
    totalSessionsPerWeek: 3,
    approxRemainingSessions: 20,
    approxCompletionDate: '2026-04-15',
    notes: 'SOC integration project. Requires compliance review before kickoff.',
  },
  'p16': {
    assignedClient: 'Healthcare Systems',
    clarizenProjectId: 'P-6789012',
    areasOfSupport: ['CWP', 'CSPM'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'No',
    nextWorkingSession: '',
    totalSessionsPerWeek: 2,
    approxRemainingSessions: 15,
    approxCompletionDate: '2026-04-01',
    notes: 'On hold due to HIPAA compliance review. Customer legal team involved.',
  },
  'p20': {
    assignedClient: 'Gov Agency',
    clarizenProjectId: 'P-7890123',
    areasOfSupport: ['CSPM', 'CAS', 'DSPM'],
    cloudPlatform: 'Prisma Cloud',
    cortexCloudUpgrade: 'No',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-22',
    totalSessionsPerWeek: 4,
    approxRemainingSessions: 20,
    approxCompletionDate: '2026-03-30',
    notes: 'FedRAMP compliance requirements. All sessions must be recorded.',
  },
  'p23': {
    assignedClient: 'Media Group',
    clarizenProjectId: 'P-8901234',
    areasOfSupport: ['CSPM'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'No',
    workingSessionsScheduled: 'No',
    nextWorkingSession: '',
    totalSessionsPerWeek: 2,
    approxRemainingSessions: 8,
    approxCompletionDate: '2026-02-28',
    notes: 'On hold - customer requested delay until Q2.',
  },
  'p27': {
    assignedClient: 'Telecom',
    clarizenProjectId: 'P-9012345',
    areasOfSupport: ['CSPM', 'CWP', 'AUT'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-23',
    totalSessionsPerWeek: 3,
    approxRemainingSessions: 10,
    approxCompletionDate: '2026-02-20',
    notes: 'Network security review in progress. Good engagement.',
  },
  'p29': {
    assignedClient: 'GlobalTech',
    clarizenProjectId: 'P-1122334',
    areasOfSupport: ['CSPM', 'CWP', 'CAS'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-24',
    totalSessionsPerWeek: 4,
    approxRemainingSessions: 28,
    approxCompletionDate: '2026-04-15',
    notes: 'Large enterprise deployment across 3 regions. Executive sponsor very engaged.',
  },
  'p30': {
    assignedClient: 'BioMed Labs',
    clarizenProjectId: 'P-2233445',
    areasOfSupport: ['CSPM', 'DSPM'],
    cloudPlatform: 'Prisma Cloud',
    cortexCloudUpgrade: 'No',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-22',
    totalSessionsPerWeek: 2,
    approxRemainingSessions: 12,
    approxCompletionDate: '2026-03-01',
    notes: 'Healthcare compliance requirements. HIPAA considerations.',
  },
  'p31': {
    assignedClient: 'DataFlow Inc',
    clarizenProjectId: 'P-3344556',
    areasOfSupport: ['CSPM', 'CWP', 'AUT'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'No',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-25',
    totalSessionsPerWeek: 3,
    approxRemainingSessions: 18,
    approxCompletionDate: '2026-03-20',
    notes: 'Data analytics platform security review. Complex multi-cloud environment.',
  },
  'p32': {
    assignedClient: 'Nexus Corp',
    clarizenProjectId: 'P-4455667',
    areasOfSupport: ['CSPM', 'CWP', 'CAS', 'DSPM'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-21',
    totalSessionsPerWeek: 5,
    approxRemainingSessions: 22,
    approxCompletionDate: '2026-03-10',
    notes: 'Strategic account. Full platform deployment with executive visibility.',
  },
  'p33': {
    assignedClient: 'FastShip',
    clarizenProjectId: 'P-5566778',
    areasOfSupport: ['CWP', 'AUT'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-23',
    totalSessionsPerWeek: 3,
    approxRemainingSessions: 20,
    approxCompletionDate: '2026-03-25',
    notes: 'CI/CD pipeline integration focus. Kubernetes-native workloads.',
  },
  'p34': {
    assignedClient: 'SecureFirst',
    clarizenProjectId: 'P-6677889',
    areasOfSupport: ['CSPM', 'CAS'],
    cloudPlatform: 'Prisma Cloud',
    cortexCloudUpgrade: 'No',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'No',
    workingSessionsScheduled: 'No',
    nextWorkingSession: '',
    totalSessionsPerWeek: 2,
    approxRemainingSessions: 16,
    approxCompletionDate: '2026-04-01',
    notes: 'On hold - customer reorganization. Expected to resume in February.',
  },
  'p35': {
    assignedClient: 'RegTech Solutions',
    clarizenProjectId: 'P-7788990',
    areasOfSupport: ['CSPM', 'DSPM', 'AUT'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-24',
    totalSessionsPerWeek: 2,
    approxRemainingSessions: 14,
    approxCompletionDate: '2026-03-15',
    notes: 'Compliance automation for financial services. SOC2 and PCI-DSS focus.',
  },
  'p36': {
    assignedClient: 'Urban Systems',
    clarizenProjectId: 'P-8899001',
    areasOfSupport: ['CSPM'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-22',
    totalSessionsPerWeek: 2,
    approxRemainingSessions: 10,
    approxCompletionDate: '2026-02-28',
    notes: 'Smart city infrastructure security. AWS-focused deployment.',
  },
  'p37': {
    assignedClient: 'CyberShield',
    clarizenProjectId: 'P-9900112',
    areasOfSupport: ['CSPM', 'CWP', 'CAS'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-25',
    totalSessionsPerWeek: 3,
    approxRemainingSessions: 15,
    approxCompletionDate: '2026-03-05',
    notes: 'Security vendor partnership. High visibility engagement.',
  },
  'p38': {
    assignedClient: 'TechVentures',
    clarizenProjectId: 'P-0011223',
    areasOfSupport: ['CSPM', 'CWP', 'AUT'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-21',
    totalSessionsPerWeek: 4,
    approxRemainingSessions: 18,
    approxCompletionDate: '2026-03-01',
    notes: 'SOC buildout project. 24/7 monitoring setup required.',
  },
  'p39': {
    assignedClient: 'LegalEase',
    clarizenProjectId: 'P-1122335',
    areasOfSupport: ['CSPM', 'DSPM'],
    cloudPlatform: 'Prisma Cloud',
    cortexCloudUpgrade: 'No',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'No',
    workingSessionsScheduled: 'No',
    nextWorkingSession: '',
    totalSessionsPerWeek: 2,
    approxRemainingSessions: 12,
    approxCompletionDate: '2026-03-30',
    notes: 'On hold - legal review of data handling procedures. Expected to resume soon.',
  },
  'p40': {
    assignedClient: 'SafeNet',
    clarizenProjectId: 'P-2233446',
    areasOfSupport: ['CWP', 'AUT'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-23',
    totalSessionsPerWeek: 2,
    approxRemainingSessions: 8,
    approxCompletionDate: '2026-02-15',
    notes: 'Incident response automation. Quick engagement, nearing completion.',
  },
  'p41': {
    assignedClient: 'CloudFirst',
    clarizenProjectId: 'P-3344557',
    areasOfSupport: ['CSPM', 'CAS'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-24',
    totalSessionsPerWeek: 3,
    approxRemainingSessions: 16,
    approxCompletionDate: '2026-03-10',
    notes: 'Cloud-native startup. Fast-paced environment, weekly demos required.',
  },
  'p42': {
    assignedClient: 'EduTech',
    clarizenProjectId: 'P-4455668',
    areasOfSupport: ['CSPM'],
    cloudPlatform: 'Prisma Cloud',
    cortexCloudUpgrade: 'No',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-26',
    totalSessionsPerWeek: 1,
    approxRemainingSessions: 6,
    approxCompletionDate: '2026-02-28',
    notes: 'Education sector client. Simple deployment, good for junior consultant.',
  },
  'p43': {
    assignedClient: 'FinanceHub',
    clarizenProjectId: 'P-5566779',
    areasOfSupport: ['CSPM', 'CAS'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-24',
    totalSessionsPerWeek: 2,
    approxRemainingSessions: 12,
    approxCompletionDate: '2026-03-15',
    notes: 'API security focus for fintech platform. PCI compliance requirements.',
  },
  'p44': {
    assignedClient: 'MedDevice Co',
    clarizenProjectId: 'P-6677890',
    areasOfSupport: ['CWP', 'CSPM'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-23',
    totalSessionsPerWeek: 3,
    approxRemainingSessions: 16,
    approxCompletionDate: '2026-03-10',
    notes: 'Medical device manufacturer. FDA compliance considerations.',
  },
  'p45': {
    assignedClient: 'InsureTech',
    clarizenProjectId: 'P-7788991',
    areasOfSupport: ['CSPM', 'DSPM'],
    cloudPlatform: 'Prisma Cloud',
    cortexCloudUpgrade: 'No',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-25',
    totalSessionsPerWeek: 2,
    approxRemainingSessions: 14,
    approxCompletionDate: '2026-03-20',
    notes: 'Insurance industry compliance. Data protection focus.',
  },
  'p46': {
    assignedClient: 'RetailMax',
    clarizenProjectId: 'P-8899002',
    areasOfSupport: ['CSPM', 'CWP', 'AUT'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-22',
    totalSessionsPerWeek: 4,
    approxRemainingSessions: 20,
    approxCompletionDate: '2026-03-05',
    notes: 'Large retail chain. Multi-region deployment with high availability requirements.',
  },
  'p47': {
    assignedClient: 'LogiChain',
    clarizenProjectId: 'P-9900113',
    areasOfSupport: ['CWP', 'CAS'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'No',
    workingSessionsScheduled: 'No',
    nextWorkingSession: '',
    totalSessionsPerWeek: 2,
    approxRemainingSessions: 10,
    approxCompletionDate: '2026-03-30',
    notes: 'On hold - supply chain disruption affecting customer operations. Will resume in February.',
  },
  'p48': {
    assignedClient: 'DataVault',
    clarizenProjectId: 'P-0011224',
    areasOfSupport: ['DSPM', 'CSPM'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-24',
    totalSessionsPerWeek: 3,
    approxRemainingSessions: 15,
    approxCompletionDate: '2026-03-01',
    notes: 'Data security platform provider. Complex data classification requirements.',
  },
  'p49': {
    assignedClient: 'SmartGrid',
    clarizenProjectId: 'P-1122336',
    areasOfSupport: ['CSPM', 'AUT'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-23',
    totalSessionsPerWeek: 2,
    approxRemainingSessions: 10,
    approxCompletionDate: '2026-02-25',
    notes: 'Energy sector client. Critical infrastructure security requirements.',
  },
  'p50': {
    assignedClient: 'AeroSpace',
    clarizenProjectId: 'P-2233447',
    areasOfSupport: ['CSPM', 'CWP', 'DSPM'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-21',
    totalSessionsPerWeek: 4,
    approxRemainingSessions: 22,
    approxCompletionDate: '2026-03-20',
    notes: 'Defense contractor. ITAR and security clearance requirements.',
  },
  'p51': {
    assignedClient: 'GameStudio',
    clarizenProjectId: 'P-3344558',
    areasOfSupport: ['CWP', 'CAS'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-25',
    totalSessionsPerWeek: 2,
    approxRemainingSessions: 8,
    approxCompletionDate: '2026-02-20',
    notes: 'Gaming company. High-traffic application security focus.',
  },
  'p52': {
    assignedClient: 'CryptoTrade',
    clarizenProjectId: 'P-4455669',
    areasOfSupport: ['CSPM', 'CAS', 'DSPM'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-22',
    totalSessionsPerWeek: 2,
    approxRemainingSessions: 12,
    approxCompletionDate: '2026-03-10',
    notes: 'Cryptocurrency exchange. High-security requirements, SOC2 compliance.',
  },
  'p53': {
    assignedClient: 'GreenEnergy',
    clarizenProjectId: 'P-5566780',
    areasOfSupport: ['CSPM', 'AUT'],
    cloudPlatform: 'Prisma Cloud',
    cortexCloudUpgrade: 'No',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'No',
    workingSessionsScheduled: 'No',
    nextWorkingSession: '',
    totalSessionsPerWeek: 3,
    approxRemainingSessions: 18,
    approxCompletionDate: '2026-04-01',
    notes: 'On hold - customer budget review. Renewable energy sector.',
  },
  'p54': {
    assignedClient: 'StartupHub',
    clarizenProjectId: 'P-6677891',
    areasOfSupport: ['CSPM'],
    cloudPlatform: 'Cortex Cloud',
    cortexCloudUpgrade: 'Yes',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-27',
    totalSessionsPerWeek: 1,
    approxRemainingSessions: 5,
    approxCompletionDate: '2026-02-28',
    notes: 'Startup incubator. Basic security posture assessment.',
  },
  'p55': {
    assignedClient: 'LocalGov',
    clarizenProjectId: 'P-7788992',
    areasOfSupport: ['CSPM'],
    cloudPlatform: 'Prisma Cloud',
    cortexCloudUpgrade: 'No',
    projectStarted: 'Yes',
    internalKickOffCompleted: 'Yes',
    externalKickOffCompleted: 'Yes',
    technicalAssessmentCompleted: 'Yes',
    workingSessionsScheduled: 'Yes',
    nextWorkingSession: '2026-01-28',
    totalSessionsPerWeek: 1,
    approxRemainingSessions: 4,
    approxCompletionDate: '2026-02-20',
    notes: 'Local government client. Simple AWS environment. Good training opportunity.',
  },
};

// Consultant Cortex Cloud Skills Assessment Data
interface ConsultantSkillsAssessment {
  // Platform & General (1-5)
  rbacSbacSso: number;
  dashboardsReporting: number;
  xql: number;
  automationPlaybooks: number;
  cortexCloudApi: number;
  upgradeHelper: number;
  selfServiceUpgradeTool: number;
  // Cloud Onboarding (1-5)
  onboardingAws: number;
  onboardingGoogle: number;
  onboardingAzure: number;
  onboardingOracle: number;
  // Security Configuration (1-5)
  securityPoliciesRules: number;
  attackSurfaceRules: number;
  agentlessScanning: number;
  ciemIdentityPermission: number;
  dspmDataSecurity: number;
  aispmAiInventory: number;
  // Workload Protection (1-5)
  xdrAgents: number;
  kspmConnectors: number;
  registryScanning: number;
  serverlessScanning: number;
  cwpRulesPolicies: number;
  vulnerabilityPolicies: number;
  vulnerabilityRemediation: number;
  cwpCli: number;
  regoSyntax: number;
  // Application Security - VCS (1-5)
  vcsGitHub: number;
  vcsGitLab: number;
  vcsAzureRepos: number;
  vcsBitbucket: number;
  // Application Security - CI/CD (1-5)
  cicdGitLabCi: number;
  cicdGitHubActions: number;
  cicdTerraformCloud: number;
  cicdAzureDevOps: number;
  // Application Security - Other (1-5)
  appSecRulesPolicies: number;
  transporterBrokerVm: number;
  ideIntegration: number;
  thirdPartyScanning: number;
  appSecFindings: number;
  cicdRiskEvaluation: number;
  casCli: number;
  // Overall Knowledge (1-5)
  overallCspm: number;
  overallCwp: number;
  overallCas: number;
  // Certifications & Experience (Yes/No)
  cloudSecurityCertification: 'Yes' | 'No';
  customerFacingProjects: 'Yes' | 'No';
  hasNecessaryTraining: 'Yes' | 'No' | 'Not Sure';
  // Text fields
  panwStakeholderKnowledge: string;
  dailyTrainingLabs: string;
  missingTrainingMaterial: string;
  pythonSkills: number;
  additionalThoughts: string;
  marketplaceContentPacks: string;
  additionalCortexCloudExp: string;
  otherCortexExperience: string;
}

const CONSULTANT_SKILLS: Record<string, ConsultantSkillsAssessment> = {
  '1': { // Sarah Chen
    rbacSbacSso: 5, dashboardsReporting: 5, xql: 4, automationPlaybooks: 5, cortexCloudApi: 4, upgradeHelper: 5, selfServiceUpgradeTool: 4,
    onboardingAws: 5, onboardingGoogle: 4, onboardingAzure: 5, onboardingOracle: 3,
    securityPoliciesRules: 5, attackSurfaceRules: 4, agentlessScanning: 5, ciemIdentityPermission: 4, dspmDataSecurity: 4, aispmAiInventory: 3,
    xdrAgents: 4, kspmConnectors: 5, registryScanning: 4, serverlessScanning: 4, cwpRulesPolicies: 5, vulnerabilityPolicies: 5, vulnerabilityRemediation: 5, cwpCli: 4, regoSyntax: 3,
    vcsGitHub: 4, vcsGitLab: 4, vcsAzureRepos: 3, vcsBitbucket: 3,
    cicdGitLabCi: 4, cicdGitHubActions: 5, cicdTerraformCloud: 4, cicdAzureDevOps: 3,
    appSecRulesPolicies: 4, transporterBrokerVm: 3, ideIntegration: 4, thirdPartyScanning: 4, appSecFindings: 5, cicdRiskEvaluation: 4, casCli: 4,
    overallCspm: 5, overallCwp: 4, overallCas: 3,
    cloudSecurityCertification: 'Yes', customerFacingProjects: 'Yes', hasNecessaryTraining: 'Yes',
    panwStakeholderKnowledge: 'Strong understanding of all roles. Regular collaboration with PSC and TAC Support.',
    dailyTrainingLabs: 'Daily lab work on Cortex Cloud features, weekly deep-dives on new releases.',
    missingTrainingMaterial: '',
    pythonSkills: 4,
    additionalThoughts: 'Would benefit from more AISPM hands-on training.',
    marketplaceContentPacks: 'AWS Security Pack, Compliance Automation Pack',
    additionalCortexCloudExp: 'Led 3 enterprise migrations from Prisma Cloud to Cortex Cloud.',
    otherCortexExperience: 'Basic XSOAR experience for automation workflows.',
  },
  '2': { // Michael Rodriguez
    rbacSbacSso: 4, dashboardsReporting: 4, xql: 3, automationPlaybooks: 4, cortexCloudApi: 3, upgradeHelper: 4, selfServiceUpgradeTool: 3,
    onboardingAws: 4, onboardingGoogle: 5, onboardingAzure: 4, onboardingOracle: 2,
    securityPoliciesRules: 4, attackSurfaceRules: 4, agentlessScanning: 5, ciemIdentityPermission: 5, dspmDataSecurity: 3, aispmAiInventory: 2,
    xdrAgents: 5, kspmConnectors: 4, registryScanning: 5, serverlessScanning: 4, cwpRulesPolicies: 5, vulnerabilityPolicies: 4, vulnerabilityRemediation: 4, cwpCli: 5, regoSyntax: 4,
    vcsGitHub: 3, vcsGitLab: 3, vcsAzureRepos: 4, vcsBitbucket: 2,
    cicdGitLabCi: 3, cicdGitHubActions: 4, cicdTerraformCloud: 3, cicdAzureDevOps: 4,
    appSecRulesPolicies: 4, transporterBrokerVm: 4, ideIntegration: 3, thirdPartyScanning: 3, appSecFindings: 4, cicdRiskEvaluation: 4, casCli: 3,
    overallCspm: 4, overallCwp: 5, overallCas: 4,
    cloudSecurityCertification: 'Yes', customerFacingProjects: 'Yes', hasNecessaryTraining: 'Yes',
    panwStakeholderKnowledge: 'Good understanding of PM and AT/Sales roles. Learning more about S&O.',
    dailyTrainingLabs: 'Focus on CWP labs, container security scenarios.',
    missingTrainingMaterial: '',
    pythonSkills: 3,
    additionalThoughts: 'Interested in DSPM certification path.',
    marketplaceContentPacks: 'Container Security Pack, GCP Integration Pack',
    additionalCortexCloudExp: 'Specialized in Kubernetes security deployments.',
    otherCortexExperience: 'XDR deployment experience for 2 enterprise clients.',
  },
  '3': { // Emily Johnson
    rbacSbacSso: 3, dashboardsReporting: 4, xql: 3, automationPlaybooks: 3, cortexCloudApi: 2, upgradeHelper: 3, selfServiceUpgradeTool: 3,
    onboardingAws: 3, onboardingGoogle: 3, onboardingAzure: 4, onboardingOracle: 2,
    securityPoliciesRules: 4, attackSurfaceRules: 3, agentlessScanning: 3, ciemIdentityPermission: 3, dspmDataSecurity: 5, aispmAiInventory: 4,
    xdrAgents: 3, kspmConnectors: 3, registryScanning: 3, serverlessScanning: 3, cwpRulesPolicies: 3, vulnerabilityPolicies: 3, vulnerabilityRemediation: 3, cwpCli: 2, regoSyntax: 2,
    vcsGitHub: 3, vcsGitLab: 2, vcsAzureRepos: 4, vcsBitbucket: 2,
    cicdGitLabCi: 2, cicdGitHubActions: 3, cicdTerraformCloud: 2, cicdAzureDevOps: 4,
    appSecRulesPolicies: 4, transporterBrokerVm: 2, ideIntegration: 5, thirdPartyScanning: 4, appSecFindings: 5, cicdRiskEvaluation: 4, casCli: 3,
    overallCspm: 3, overallCwp: 3, overallCas: 5,
    cloudSecurityCertification: 'No', customerFacingProjects: 'Yes', hasNecessaryTraining: 'Not Sure',
    panwStakeholderKnowledge: 'Understanding PM and PSC roles well. Need more exposure to EE processes.',
    dailyTrainingLabs: 'AppSec focused labs, IDE integration testing.',
    missingTrainingMaterial: 'Would like access to advanced CSPM training materials.',
    pythonSkills: 2,
    additionalThoughts: 'Planning to get Cloud Security Professional certification this quarter.',
    marketplaceContentPacks: 'AppSec Starter Pack',
    additionalCortexCloudExp: 'Strong focus on application security and code scanning.',
    otherCortexExperience: 'None',
  },
  '4': { // David Kim
    rbacSbacSso: 5, dashboardsReporting: 5, xql: 5, automationPlaybooks: 5, cortexCloudApi: 5, upgradeHelper: 5, selfServiceUpgradeTool: 5,
    onboardingAws: 5, onboardingGoogle: 5, onboardingAzure: 5, onboardingOracle: 4,
    securityPoliciesRules: 5, attackSurfaceRules: 5, agentlessScanning: 4, ciemIdentityPermission: 5, dspmDataSecurity: 4, aispmAiInventory: 4,
    xdrAgents: 5, kspmConnectors: 5, registryScanning: 5, serverlessScanning: 4, cwpRulesPolicies: 5, vulnerabilityPolicies: 5, vulnerabilityRemediation: 5, cwpCli: 5, regoSyntax: 5,
    vcsGitHub: 4, vcsGitLab: 4, vcsAzureRepos: 4, vcsBitbucket: 3,
    cicdGitLabCi: 4, cicdGitHubActions: 5, cicdTerraformCloud: 5, cicdAzureDevOps: 4,
    appSecRulesPolicies: 4, transporterBrokerVm: 5, ideIntegration: 4, thirdPartyScanning: 5, appSecFindings: 4, cicdRiskEvaluation: 5, casCli: 4,
    overallCspm: 5, overallCwp: 5, overallCas: 4,
    cloudSecurityCertification: 'Yes', customerFacingProjects: 'Yes', hasNecessaryTraining: 'Yes',
    panwStakeholderKnowledge: 'Expert level understanding of all PANW stakeholder roles and responsibilities.',
    dailyTrainingLabs: 'Mentor other consultants, create internal training content.',
    missingTrainingMaterial: '',
    pythonSkills: 5,
    additionalThoughts: 'Available to help develop training materials for new hires.',
    marketplaceContentPacks: 'All major packs - AWS, Azure, GCP, Compliance, Container Security',
    additionalCortexCloudExp: 'Technical lead for multiple enterprise deployments. Upgrade specialist.',
    otherCortexExperience: 'Extensive XSOAR and XDR experience. XSIAM fundamentals.',
  },
  '5': { // Jessica Martinez
    rbacSbacSso: 5, dashboardsReporting: 5, xql: 5, automationPlaybooks: 5, cortexCloudApi: 5, upgradeHelper: 5, selfServiceUpgradeTool: 5,
    onboardingAws: 5, onboardingGoogle: 5, onboardingAzure: 5, onboardingOracle: 5,
    securityPoliciesRules: 5, attackSurfaceRules: 5, agentlessScanning: 5, ciemIdentityPermission: 5, dspmDataSecurity: 5, aispmAiInventory: 5,
    xdrAgents: 5, kspmConnectors: 5, registryScanning: 5, serverlessScanning: 5, cwpRulesPolicies: 5, vulnerabilityPolicies: 5, vulnerabilityRemediation: 5, cwpCli: 5, regoSyntax: 5,
    vcsGitHub: 5, vcsGitLab: 5, vcsAzureRepos: 5, vcsBitbucket: 5,
    cicdGitLabCi: 5, cicdGitHubActions: 5, cicdTerraformCloud: 5, cicdAzureDevOps: 5,
    appSecRulesPolicies: 5, transporterBrokerVm: 5, ideIntegration: 5, thirdPartyScanning: 5, appSecFindings: 5, cicdRiskEvaluation: 5, casCli: 5,
    overallCspm: 5, overallCwp: 5, overallCas: 5,
    cloudSecurityCertification: 'Yes', customerFacingProjects: 'Yes', hasNecessaryTraining: 'Yes',
    panwStakeholderKnowledge: 'Complete understanding of all roles. Regularly advise leadership on process improvements.',
    dailyTrainingLabs: 'Stay current on all new features, beta testing new capabilities.',
    missingTrainingMaterial: '',
    pythonSkills: 5,
    additionalThoughts: 'Principal-level consultant, available for escalations and complex deployments.',
    marketplaceContentPacks: 'All available content packs, including beta packs.',
    additionalCortexCloudExp: 'Subject matter expert for Cortex Cloud. Authored internal best practices documentation.',
    otherCortexExperience: 'Full Cortex suite experience - XSIAM, XSOAR, XDR. Certified in all.',
  },
  '6': { // Alex Thompson
    rbacSbacSso: 3, dashboardsReporting: 3, xql: 2, automationPlaybooks: 3, cortexCloudApi: 3, upgradeHelper: 3, selfServiceUpgradeTool: 2,
    onboardingAws: 4, onboardingGoogle: 3, onboardingAzure: 3, onboardingOracle: 2,
    securityPoliciesRules: 4, attackSurfaceRules: 3, agentlessScanning: 3, ciemIdentityPermission: 3, dspmDataSecurity: 3, aispmAiInventory: 2,
    xdrAgents: 4, kspmConnectors: 3, registryScanning: 4, serverlessScanning: 3, cwpRulesPolicies: 4, vulnerabilityPolicies: 4, vulnerabilityRemediation: 3, cwpCli: 3, regoSyntax: 2,
    vcsGitHub: 4, vcsGitLab: 3, vcsAzureRepos: 2, vcsBitbucket: 2,
    cicdGitLabCi: 3, cicdGitHubActions: 4, cicdTerraformCloud: 3, cicdAzureDevOps: 2,
    appSecRulesPolicies: 3, transporterBrokerVm: 2, ideIntegration: 3, thirdPartyScanning: 3, appSecFindings: 3, cicdRiskEvaluation: 3, casCli: 2,
    overallCspm: 3, overallCwp: 4, overallCas: 3,
    cloudSecurityCertification: 'No', customerFacingProjects: 'Yes', hasNecessaryTraining: 'Not Sure',
    panwStakeholderKnowledge: 'Good understanding of PSC and PM roles.',
    dailyTrainingLabs: 'Weekly labs focusing on AWS security scenarios.',
    missingTrainingMaterial: 'Need access to advanced automation training.',
    pythonSkills: 4,
    additionalThoughts: 'Strong scripting background, looking to leverage for automation.',
    marketplaceContentPacks: 'AWS Security Pack',
    additionalCortexCloudExp: 'Focus on network security integrations.',
    otherCortexExperience: 'Basic XDR knowledge.',
  },
  '10': { // Marcus Lee
    rbacSbacSso: 5, dashboardsReporting: 4, xql: 4, automationPlaybooks: 5, cortexCloudApi: 5, upgradeHelper: 4, selfServiceUpgradeTool: 4,
    onboardingAws: 5, onboardingGoogle: 4, onboardingAzure: 4, onboardingOracle: 3,
    securityPoliciesRules: 5, attackSurfaceRules: 4, agentlessScanning: 4, ciemIdentityPermission: 4, dspmDataSecurity: 3, aispmAiInventory: 3,
    xdrAgents: 4, kspmConnectors: 4, registryScanning: 4, serverlessScanning: 3, cwpRulesPolicies: 4, vulnerabilityPolicies: 4, vulnerabilityRemediation: 4, cwpCli: 5, regoSyntax: 4,
    vcsGitHub: 4, vcsGitLab: 3, vcsAzureRepos: 3, vcsBitbucket: 3,
    cicdGitLabCi: 4, cicdGitHubActions: 4, cicdTerraformCloud: 4, cicdAzureDevOps: 3,
    appSecRulesPolicies: 4, transporterBrokerVm: 4, ideIntegration: 3, thirdPartyScanning: 4, appSecFindings: 4, cicdRiskEvaluation: 4, casCli: 4,
    overallCspm: 5, overallCwp: 3, overallCas: 4,
    cloudSecurityCertification: 'Yes', customerFacingProjects: 'Yes', hasNecessaryTraining: 'Yes',
    panwStakeholderKnowledge: 'Strong understanding across all stakeholder roles.',
    dailyTrainingLabs: 'Focus on CSPM and automation scenarios.',
    missingTrainingMaterial: '',
    pythonSkills: 5,
    additionalThoughts: 'Automation specialist, strong API integration skills.',
    marketplaceContentPacks: 'Compliance Pack, Automation Pack, Multi-Cloud Pack',
    additionalCortexCloudExp: 'API integration expert, custom automation development.',
    otherCortexExperience: 'XSOAR playbook development experience.',
  },
  '12': { // Kevin Nguyen
    rbacSbacSso: 5, dashboardsReporting: 5, xql: 5, automationPlaybooks: 5, cortexCloudApi: 5, upgradeHelper: 5, selfServiceUpgradeTool: 5,
    onboardingAws: 5, onboardingGoogle: 5, onboardingAzure: 5, onboardingOracle: 4,
    securityPoliciesRules: 5, attackSurfaceRules: 5, agentlessScanning: 5, ciemIdentityPermission: 5, dspmDataSecurity: 5, aispmAiInventory: 4,
    xdrAgents: 5, kspmConnectors: 5, registryScanning: 5, serverlessScanning: 5, cwpRulesPolicies: 5, vulnerabilityPolicies: 5, vulnerabilityRemediation: 5, cwpCli: 5, regoSyntax: 4,
    vcsGitHub: 5, vcsGitLab: 5, vcsAzureRepos: 4, vcsBitbucket: 4,
    cicdGitLabCi: 5, cicdGitHubActions: 5, cicdTerraformCloud: 5, cicdAzureDevOps: 4,
    appSecRulesPolicies: 5, transporterBrokerVm: 4, ideIntegration: 5, thirdPartyScanning: 5, appSecFindings: 5, cicdRiskEvaluation: 5, casCli: 5,
    overallCspm: 5, overallCwp: 5, overallCas: 5,
    cloudSecurityCertification: 'Yes', customerFacingProjects: 'Yes', hasNecessaryTraining: 'Yes',
    panwStakeholderKnowledge: 'Expert understanding of all roles. Mentors junior consultants.',
    dailyTrainingLabs: 'Advanced scenarios, new feature testing, customer escalation prep.',
    missingTrainingMaterial: '',
    pythonSkills: 5,
    additionalThoughts: 'Available for complex customer escalations and architecture reviews.',
    marketplaceContentPacks: 'All available packs plus custom development.',
    additionalCortexCloudExp: 'Principal consultant, technical lead for strategic accounts.',
    otherCortexExperience: 'Full Cortex suite certified - XSIAM, XSOAR, XDR.',
  },
  '14': { // Robert Garcia
    rbacSbacSso: 4, dashboardsReporting: 4, xql: 4, automationPlaybooks: 4, cortexCloudApi: 4, upgradeHelper: 4, selfServiceUpgradeTool: 4,
    onboardingAws: 4, onboardingGoogle: 4, onboardingAzure: 5, onboardingOracle: 3,
    securityPoliciesRules: 4, attackSurfaceRules: 5, agentlessScanning: 4, ciemIdentityPermission: 4, dspmDataSecurity: 4, aispmAiInventory: 3,
    xdrAgents: 5, kspmConnectors: 4, registryScanning: 5, serverlessScanning: 4, cwpRulesPolicies: 5, vulnerabilityPolicies: 5, vulnerabilityRemediation: 5, cwpCli: 4, regoSyntax: 3,
    vcsGitHub: 4, vcsGitLab: 4, vcsAzureRepos: 5, vcsBitbucket: 3,
    cicdGitLabCi: 4, cicdGitHubActions: 4, cicdTerraformCloud: 4, cicdAzureDevOps: 5,
    appSecRulesPolicies: 4, transporterBrokerVm: 4, ideIntegration: 4, thirdPartyScanning: 4, appSecFindings: 4, cicdRiskEvaluation: 4, casCli: 4,
    overallCspm: 4, overallCwp: 5, overallCas: 4,
    cloudSecurityCertification: 'Yes', customerFacingProjects: 'Yes', hasNecessaryTraining: 'Yes',
    panwStakeholderKnowledge: 'Strong understanding of all roles, especially technical support.',
    dailyTrainingLabs: 'CWP focused labs, vulnerability management scenarios.',
    missingTrainingMaterial: '',
    pythonSkills: 3,
    additionalThoughts: 'CWP specialist with strong Azure expertise.',
    marketplaceContentPacks: 'Azure Security Pack, CWP Advanced Pack',
    additionalCortexCloudExp: 'Azure security specialist, multiple enterprise deployments.',
    otherCortexExperience: 'XDR certified, some XSOAR experience.',
  },
  '9': { // Priya Patel
    rbacSbacSso: 4, dashboardsReporting: 4, xql: 4, automationPlaybooks: 4, cortexCloudApi: 4, upgradeHelper: 4, selfServiceUpgradeTool: 4,
    onboardingAws: 4, onboardingGoogle: 4, onboardingAzure: 4, onboardingOracle: 3,
    securityPoliciesRules: 4, attackSurfaceRules: 4, agentlessScanning: 4, ciemIdentityPermission: 4, dspmDataSecurity: 4, aispmAiInventory: 3,
    xdrAgents: 4, kspmConnectors: 4, registryScanning: 4, serverlessScanning: 4, cwpRulesPolicies: 4, vulnerabilityPolicies: 4, vulnerabilityRemediation: 4, cwpCli: 4, regoSyntax: 3,
    vcsGitHub: 4, vcsGitLab: 4, vcsAzureRepos: 4, vcsBitbucket: 3,
    cicdGitLabCi: 4, cicdGitHubActions: 4, cicdTerraformCloud: 4, cicdAzureDevOps: 4,
    appSecRulesPolicies: 4, transporterBrokerVm: 3, ideIntegration: 4, thirdPartyScanning: 4, appSecFindings: 4, cicdRiskEvaluation: 4, casCli: 4,
    overallCspm: 4, overallCwp: 4, overallCas: 4,
    cloudSecurityCertification: 'Yes', customerFacingProjects: 'Yes', hasNecessaryTraining: 'Yes',
    panwStakeholderKnowledge: 'Strong understanding of all PANW stakeholder roles.',
    dailyTrainingLabs: 'Balanced focus across CSPM, CWP, and CAS capabilities.',
    missingTrainingMaterial: '',
    pythonSkills: 4,
    additionalThoughts: 'Well-rounded consultant with consistent skills across all areas.',
    marketplaceContentPacks: 'Multi-Cloud Security Pack, Compliance Pack',
    additionalCortexCloudExp: 'Experienced with multi-cloud deployments and data security.',
    otherCortexExperience: 'XSOAR experience, familiar with XDR.',
  },
  '11': { // Amanda Foster
    rbacSbacSso: 2, dashboardsReporting: 3, xql: 2, automationPlaybooks: 2, cortexCloudApi: 2, upgradeHelper: 2, selfServiceUpgradeTool: 2,
    onboardingAws: 3, onboardingGoogle: 2, onboardingAzure: 3, onboardingOracle: 1,
    securityPoliciesRules: 3, attackSurfaceRules: 2, agentlessScanning: 2, ciemIdentityPermission: 2, dspmDataSecurity: 2, aispmAiInventory: 1,
    xdrAgents: 2, kspmConnectors: 2, registryScanning: 2, serverlessScanning: 2, cwpRulesPolicies: 2, vulnerabilityPolicies: 2, vulnerabilityRemediation: 2, cwpCli: 2, regoSyntax: 1,
    vcsGitHub: 3, vcsGitLab: 2, vcsAzureRepos: 2, vcsBitbucket: 2,
    cicdGitLabCi: 2, cicdGitHubActions: 3, cicdTerraformCloud: 2, cicdAzureDevOps: 2,
    appSecRulesPolicies: 2, transporterBrokerVm: 1, ideIntegration: 3, thirdPartyScanning: 2, appSecFindings: 2, cicdRiskEvaluation: 2, casCli: 2,
    overallCspm: 3, overallCwp: 2, overallCas: 3,
    cloudSecurityCertification: 'No', customerFacingProjects: 'Yes', hasNecessaryTraining: 'Not Sure',
    panwStakeholderKnowledge: 'Learning the different stakeholder roles. Good grasp of PSC responsibilities.',
    dailyTrainingLabs: 'Basic labs, focusing on fundamentals.',
    missingTrainingMaterial: 'Would benefit from more advanced CSPM training.',
    pythonSkills: 2,
    additionalThoughts: 'Associate level, eager to learn and grow.',
    marketplaceContentPacks: 'Basic security packs',
    additionalCortexCloudExp: 'New to Cortex Cloud, building experience.',
    otherCortexExperience: 'Basic familiarity with XDR concepts.',
  },
  '13': { // Lisa Chang
    rbacSbacSso: 3, dashboardsReporting: 4, xql: 3, automationPlaybooks: 4, cortexCloudApi: 4, upgradeHelper: 3, selfServiceUpgradeTool: 3,
    onboardingAws: 4, onboardingGoogle: 3, onboardingAzure: 3, onboardingOracle: 2,
    securityPoliciesRules: 4, attackSurfaceRules: 3, agentlessScanning: 3, ciemIdentityPermission: 3, dspmDataSecurity: 3, aispmAiInventory: 3,
    xdrAgents: 3, kspmConnectors: 3, registryScanning: 3, serverlessScanning: 3, cwpRulesPolicies: 3, vulnerabilityPolicies: 3, vulnerabilityRemediation: 3, cwpCli: 4, regoSyntax: 3,
    vcsGitHub: 4, vcsGitLab: 4, vcsAzureRepos: 3, vcsBitbucket: 3,
    cicdGitLabCi: 4, cicdGitHubActions: 4, cicdTerraformCloud: 4, cicdAzureDevOps: 3,
    appSecRulesPolicies: 4, transporterBrokerVm: 3, ideIntegration: 4, thirdPartyScanning: 4, appSecFindings: 4, cicdRiskEvaluation: 4, casCli: 4,
    overallCspm: 4, overallCwp: 4, overallCas: 3,
    cloudSecurityCertification: 'Yes', customerFacingProjects: 'Yes', hasNecessaryTraining: 'Yes',
    panwStakeholderKnowledge: 'Good understanding of all stakeholder roles.',
    dailyTrainingLabs: 'Focus on automation and CI/CD integration scenarios.',
    missingTrainingMaterial: '',
    pythonSkills: 5,
    additionalThoughts: 'Strong automation background, Python expert.',
    marketplaceContentPacks: 'CI/CD Security Pack, Automation Pack',
    additionalCortexCloudExp: 'Automation specialist with strong scripting skills.',
    otherCortexExperience: 'XSOAR playbook development expert.',
  },
};

// Non-ProServe Consultant Skills Assessment (Prisma Cloud & Cortex)
interface NonProServeSkillsAssessment {
  // Prisma Cloud - CSPM (1-4)
  cspmPolicyCreation: number;
  cspmAlertTriage: number;
  cspmComplianceFramework: number;
  cspmCustomPolicyRql: number;
  cspmSiemSoarIntegration: number;
  // Prisma Cloud - CWPP/Runtime Security (1-4)
  cwppVulnerabilityManagement: number;
  cwppRuntimeProtection: number;
  cwppSecretsManagement: number;
  cwppContainerDefenders: number;
  cwppServerlessSecurity: number;
  cwppVmDefenders: number;
  cwppRegistryScanner: number;
  // Prisma Cloud - CIEM (1-4)
  ciemLeastPrivilege: number;
  ciemNetworkFlowAnalysis: number;
  ciemOverPrivilegedEntities: number;
  ciemIacScanning: number;
  // Cortex XDR - Endpoint Protection (1-4)
  xdrEndpointDeployment: number;
  xdrIncidentResponse: number;
  xdrPolicyManagement: number;
  xdrThreatHunting: number;
  xdrToolIntegration: number;
  // Cortex XDR - Investigation & Response (1-4)
  xdrIncidentTriage: number;
  xdrXqlQueries: number;
  // Cortex XSOAR (1-4)
  xsoarPlaybookDev: number;
  xsoarToolIntegration: number;
  xsoarIncidentAutomation: number;
  xsoarCaseManagement: number;
  // Certifications
  certPccse: 'Yes' | 'No';
  certCloudSecurityPro: 'Yes' | 'No';
  certCloudSecurityPractitioner: 'Yes' | 'No';
  certOther: string;
  otherSecuritySkills: string;
}

const NON_PROSERVE_SKILLS: Record<string, NonProServeSkillsAssessment> = {
  '2': { // Michael Rodriguez
    cspmPolicyCreation: 4, cspmAlertTriage: 4, cspmComplianceFramework: 3, cspmCustomPolicyRql: 3, cspmSiemSoarIntegration: 4,
    cwppVulnerabilityManagement: 4, cwppRuntimeProtection: 4, cwppSecretsManagement: 3, cwppContainerDefenders: 4, cwppServerlessSecurity: 3, cwppVmDefenders: 4, cwppRegistryScanner: 4,
    ciemLeastPrivilege: 4, ciemNetworkFlowAnalysis: 3, ciemOverPrivilegedEntities: 4, ciemIacScanning: 3,
    xdrEndpointDeployment: 4, xdrIncidentResponse: 4, xdrPolicyManagement: 4, xdrThreatHunting: 3, xdrToolIntegration: 4,
    xdrIncidentTriage: 4, xdrXqlQueries: 3,
    xsoarPlaybookDev: 3, xsoarToolIntegration: 4, xsoarIncidentAutomation: 3, xsoarCaseManagement: 4,
    certPccse: 'Yes', certCloudSecurityPro: 'Yes', certCloudSecurityPractitioner: 'Yes',
    certOther: 'AWS Solutions Architect Professional, GCP Cloud Security Engineer',
    otherSecuritySkills: 'Container security specialist, Kubernetes expertise, Python automation',
  },
  '4': { // David Kim
    cspmPolicyCreation: 4, cspmAlertTriage: 4, cspmComplianceFramework: 4, cspmCustomPolicyRql: 4, cspmSiemSoarIntegration: 4,
    cwppVulnerabilityManagement: 4, cwppRuntimeProtection: 4, cwppSecretsManagement: 4, cwppContainerDefenders: 4, cwppServerlessSecurity: 4, cwppVmDefenders: 4, cwppRegistryScanner: 4,
    ciemLeastPrivilege: 4, ciemNetworkFlowAnalysis: 4, ciemOverPrivilegedEntities: 4, ciemIacScanning: 4,
    xdrEndpointDeployment: 4, xdrIncidentResponse: 4, xdrPolicyManagement: 4, xdrThreatHunting: 4, xdrToolIntegration: 4,
    xdrIncidentTriage: 4, xdrXqlQueries: 4,
    xsoarPlaybookDev: 4, xsoarToolIntegration: 4, xsoarIncidentAutomation: 4, xsoarCaseManagement: 4,
    certPccse: 'Yes', certCloudSecurityPro: 'Yes', certCloudSecurityPractitioner: 'Yes',
    certOther: 'AWS Security Specialty, Azure Security Engineer, GCP Professional Cloud Architect',
    otherSecuritySkills: 'Expert in all areas - Splunk, Sentinel, Python, Terraform, multi-cloud architecture. Senior technical mentor.',
  },
  '7': { // Rachel Wong
    cspmPolicyCreation: 3, cspmAlertTriage: 4, cspmComplianceFramework: 3, cspmCustomPolicyRql: 2, cspmSiemSoarIntegration: 3,
    cwppVulnerabilityManagement: 4, cwppRuntimeProtection: 3, cwppSecretsManagement: 3, cwppContainerDefenders: 4, cwppServerlessSecurity: 3, cwppVmDefenders: 4, cwppRegistryScanner: 3,
    ciemLeastPrivilege: 3, ciemNetworkFlowAnalysis: 3, ciemOverPrivilegedEntities: 3, ciemIacScanning: 4,
    xdrEndpointDeployment: 3, xdrIncidentResponse: 4, xdrPolicyManagement: 3, xdrThreatHunting: 3, xdrToolIntegration: 3,
    xdrIncidentTriage: 4, xdrXqlQueries: 3,
    xsoarPlaybookDev: 3, xsoarToolIntegration: 3, xsoarIncidentAutomation: 3, xsoarCaseManagement: 4,
    certPccse: 'No', certCloudSecurityPro: 'Yes', certCloudSecurityPractitioner: 'Yes', 
    certOther: 'AWS Solutions Architect Associate',
    otherSecuritySkills: 'Splunk certified, Python scripting, Azure Sentinel experience',
  },
  '8': { // James O'Brien
    cspmPolicyCreation: 2, cspmAlertTriage: 2, cspmComplianceFramework: 2, cspmCustomPolicyRql: 1, cspmSiemSoarIntegration: 2,
    cwppVulnerabilityManagement: 2, cwppRuntimeProtection: 2, cwppSecretsManagement: 2, cwppContainerDefenders: 2, cwppServerlessSecurity: 1, cwppVmDefenders: 2, cwppRegistryScanner: 2,
    ciemLeastPrivilege: 2, ciemNetworkFlowAnalysis: 1, ciemOverPrivilegedEntities: 2, ciemIacScanning: 2,
    xdrEndpointDeployment: 2, xdrIncidentResponse: 2, xdrPolicyManagement: 2, xdrThreatHunting: 1, xdrToolIntegration: 2,
    xdrIncidentTriage: 2, xdrXqlQueries: 1,
    xsoarPlaybookDev: 1, xsoarToolIntegration: 2, xsoarIncidentAutomation: 1, xsoarCaseManagement: 2,
    certPccse: 'No', certCloudSecurityPro: 'No', certCloudSecurityPractitioner: 'No',
    certOther: 'CompTIA Security+',
    otherSecuritySkills: 'Basic scripting skills, learning cloud security fundamentals',
  },
  '9': { // Priya Patel
    cspmPolicyCreation: 4, cspmAlertTriage: 4, cspmComplianceFramework: 4, cspmCustomPolicyRql: 3, cspmSiemSoarIntegration: 4,
    cwppVulnerabilityManagement: 4, cwppRuntimeProtection: 4, cwppSecretsManagement: 4, cwppContainerDefenders: 4, cwppServerlessSecurity: 3, cwppVmDefenders: 4, cwppRegistryScanner: 4,
    ciemLeastPrivilege: 4, ciemNetworkFlowAnalysis: 3, ciemOverPrivilegedEntities: 4, ciemIacScanning: 4,
    xdrEndpointDeployment: 4, xdrIncidentResponse: 4, xdrPolicyManagement: 4, xdrThreatHunting: 3, xdrToolIntegration: 4,
    xdrIncidentTriage: 4, xdrXqlQueries: 3,
    xsoarPlaybookDev: 4, xsoarToolIntegration: 4, xsoarIncidentAutomation: 4, xsoarCaseManagement: 4,
    certPccse: 'Yes', certCloudSecurityPro: 'Yes', certCloudSecurityPractitioner: 'Yes',
    certOther: 'AWS Security Specialty, GCP Professional Cloud Security Engineer',
    otherSecuritySkills: 'Splunk, QRadar, Python, Terraform, multi-cloud security architecture',
  },
  '11': { // Amanda Foster
    cspmPolicyCreation: 2, cspmAlertTriage: 3, cspmComplianceFramework: 2, cspmCustomPolicyRql: 1, cspmSiemSoarIntegration: 2,
    cwppVulnerabilityManagement: 2, cwppRuntimeProtection: 2, cwppSecretsManagement: 2, cwppContainerDefenders: 2, cwppServerlessSecurity: 1, cwppVmDefenders: 3, cwppRegistryScanner: 2,
    ciemLeastPrivilege: 2, ciemNetworkFlowAnalysis: 2, ciemOverPrivilegedEntities: 2, ciemIacScanning: 2,
    xdrEndpointDeployment: 3, xdrIncidentResponse: 2, xdrPolicyManagement: 2, xdrThreatHunting: 2, xdrToolIntegration: 2,
    xdrIncidentTriage: 2, xdrXqlQueries: 2,
    xsoarPlaybookDev: 2, xsoarToolIntegration: 2, xsoarIncidentAutomation: 2, xsoarCaseManagement: 2,
    certPccse: 'No', certCloudSecurityPro: 'No', certCloudSecurityPractitioner: 'Yes',
    certOther: 'Azure Fundamentals',
    otherSecuritySkills: 'Learning Python, basic cloud security concepts',
  },
  '13': { // Lisa Chang
    cspmPolicyCreation: 3, cspmAlertTriage: 4, cspmComplianceFramework: 3, cspmCustomPolicyRql: 3, cspmSiemSoarIntegration: 4,
    cwppVulnerabilityManagement: 3, cwppRuntimeProtection: 3, cwppSecretsManagement: 3, cwppContainerDefenders: 3, cwppServerlessSecurity: 3, cwppVmDefenders: 3, cwppRegistryScanner: 3,
    ciemLeastPrivilege: 3, ciemNetworkFlowAnalysis: 3, ciemOverPrivilegedEntities: 3, ciemIacScanning: 3,
    xdrEndpointDeployment: 3, xdrIncidentResponse: 3, xdrPolicyManagement: 3, xdrThreatHunting: 3, xdrToolIntegration: 4,
    xdrIncidentTriage: 3, xdrXqlQueries: 3,
    xsoarPlaybookDev: 4, xsoarToolIntegration: 4, xsoarIncidentAutomation: 4, xsoarCaseManagement: 3,
    certPccse: 'No', certCloudSecurityPro: 'Yes', certCloudSecurityPractitioner: 'Yes',
    certOther: 'AWS Cloud Practitioner',
    otherSecuritySkills: 'Strong automation background, XSOAR specialist, Python scripting',
  },
  '15': { // Nina Petrov
    cspmPolicyCreation: 3, cspmAlertTriage: 3, cspmComplianceFramework: 4, cspmCustomPolicyRql: 2, cspmSiemSoarIntegration: 3,
    cwppVulnerabilityManagement: 3, cwppRuntimeProtection: 3, cwppSecretsManagement: 4, cwppContainerDefenders: 3, cwppServerlessSecurity: 2, cwppVmDefenders: 3, cwppRegistryScanner: 3,
    ciemLeastPrivilege: 3, ciemNetworkFlowAnalysis: 3, ciemOverPrivilegedEntities: 4, ciemIacScanning: 3,
    xdrEndpointDeployment: 3, xdrIncidentResponse: 3, xdrPolicyManagement: 3, xdrThreatHunting: 2, xdrToolIntegration: 3,
    xdrIncidentTriage: 3, xdrXqlQueries: 2,
    xsoarPlaybookDev: 3, xsoarToolIntegration: 3, xsoarIncidentAutomation: 3, xsoarCaseManagement: 3,
    certPccse: 'No', certCloudSecurityPro: 'Yes', certCloudSecurityPractitioner: 'Yes',
    certOther: 'CISSP, Azure Security Engineer Associate',
    otherSecuritySkills: 'Strong compliance background, IAM specialist, Azure Sentinel',
  },
  '16': { // Tyler Washington
    cspmPolicyCreation: 1, cspmAlertTriage: 2, cspmComplianceFramework: 1, cspmCustomPolicyRql: 1, cspmSiemSoarIntegration: 1,
    cwppVulnerabilityManagement: 2, cwppRuntimeProtection: 1, cwppSecretsManagement: 1, cwppContainerDefenders: 1, cwppServerlessSecurity: 1, cwppVmDefenders: 2, cwppRegistryScanner: 1,
    ciemLeastPrivilege: 1, ciemNetworkFlowAnalysis: 1, ciemOverPrivilegedEntities: 1, ciemIacScanning: 1,
    xdrEndpointDeployment: 2, xdrIncidentResponse: 2, xdrPolicyManagement: 1, xdrThreatHunting: 1, xdrToolIntegration: 1,
    xdrIncidentTriage: 2, xdrXqlQueries: 1,
    xsoarPlaybookDev: 1, xsoarToolIntegration: 1, xsoarIncidentAutomation: 1, xsoarCaseManagement: 1,
    certPccse: 'No', certCloudSecurityPro: 'No', certCloudSecurityPractitioner: 'No',
    certOther: 'None yet - studying for AWS Cloud Practitioner',
    otherSecuritySkills: 'New to security, basic IT background, eager to learn',
  },
};

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
  const [teamTypeFilter, setTeamTypeFilter] = useState<string | null>(null);
  const [isAvailabilityPopupOpen, setIsAvailabilityPopupOpen] = useState(false);
  const [isConsultantProjectsModalOpen, setIsConsultantProjectsModalOpen] = useState(false);
  const [selectedProServeProject, setSelectedProServeProject] = useState<string | null>(null);
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [isUtilizationCalendarOpen, setIsUtilizationCalendarOpen] = useState(false);

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
          <img src="./assets/REMAS Logo.png" alt="REMAS - Resource Management & Assignment System" className="h-[84px]" />
          <div className="flex flex-col items-end">
            <img src="./assets/PaloAltoLogo.png" alt="Palo Alto Networks" className="h-[82px]" />
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
                      Scale&Opt
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
                <div className="flex items-center gap-1 ml-2">
                  <button
                    onClick={() => setTeamTypeFilter(null)}
                    className={`px-2 py-0.5 text-[10px] font-medium rounded-full transition-colors ${
                      teamTypeFilter === null
                        ? 'bg-gray-800 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setTeamTypeFilter('ProServe')}
                    className={`px-2 py-0.5 text-[10px] font-medium rounded-full transition-colors ${
                      teamTypeFilter === 'ProServe'
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    }`}
                  >
                    ProServe
                  </button>
                  <button
                    onClick={() => setTeamTypeFilter('EE')}
                    className={`px-2 py-0.5 text-[10px] font-medium rounded-full transition-colors ${
                      teamTypeFilter === 'EE'
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    EE
                  </button>
                  <button
                    onClick={() => setTeamTypeFilter('Automation')}
                    className={`px-2 py-0.5 text-[10px] font-medium rounded-full transition-colors ${
                      teamTypeFilter === 'Automation'
                        ? 'bg-cyan-600 text-white'
                        : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'
                    }`}
                  >
                    Automation
                  </button>
                  <button
                    onClick={() => setTeamTypeFilter('ScaleOptimize')}
                    className={`px-2 py-0.5 text-[10px] font-medium rounded-full transition-colors ${
                      teamTypeFilter === 'ScaleOptimize'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                    }`}
                  >
                    Scale&Opt
                  </button>
                </div>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                + Add Consultant
              </button>
            </div>
            <div className="flex-1 overflow-y-scroll p-3 scrollbar-visible" style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f1f5f9' }}>
              <div className="grid grid-cols-3 gap-3">
                {consultants
                  .filter(c => teamTypeFilter === null || projects.some(p => p.assignedTo === c.name && p.type === teamTypeFilter))
                  .map((consultant) => (
                  <div
                    key={consultant.id}
                    className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="min-w-0 flex-1 mr-2">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{consultant.name}</h3>
                        <p className="text-xs text-gray-500 truncate">{consultant.role}</p>
                      </div>
                      {projects.some(p => p.assignedTo === consultant.name && p.type === 'ProServe') && (
                        <span 
                          className={`px-1.5 py-0.5 text-xs font-medium rounded-full flex-shrink-0 ${getWspwColor(consultant.wspw)}`}
                          title="Working Sessions per Week"
                        >
                          WSPW: {consultant.wspw}
                        </span>
                      )}
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
                  <div className="mt-2 flex items-center gap-2">
                    <button 
                      onClick={() => {
                        const hasProServeProjects = projects.some(p => p.assignedTo === consultant.name && p.type === 'ProServe');
                        if (hasProServeProjects) {
                          setIsUtilizationCalendarOpen(true);
                        }
                      }}
                      className={`px-2 py-0.5 text-xs font-medium rounded-full transition-all cursor-pointer hover:scale-105 hover:shadow-md hover:brightness-95 ${getUtilizationColor(consultant.utilization)}`}
                    >
                      {consultant.utilization}% Utilization
                    </button>
                    <button 
                      onClick={() => {
                        const hasProServeProjects = projects.some(p => p.assignedTo === consultant.name && p.type === 'ProServe');
                        if (hasProServeProjects) {
                          setIsConsultantProjectsModalOpen(true);
                        }
                      }}
                      className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700 transition-all cursor-pointer hover:scale-105 hover:shadow-md hover:bg-green-200"
                    >
                      {projects.filter(p => p.assignedTo === consultant.name && p.type === 'ProServe').length} Project{projects.filter(p => p.assignedTo === consultant.name && p.type === 'ProServe').length !== 1 ? 's' : ''}
                    </button>
                    <button 
                      onClick={() => setIsSkillsModalOpen(true)}
                      className="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-700 transition-all cursor-pointer hover:scale-105 hover:shadow-md hover:bg-purple-200"
                    >
                      {Math.round((consultant.skills.cspm + consultant.skills.cwp + consultant.skills.cas + consultant.skills.aut) / 4 * 20)}% Avg Skill
                    </button>
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
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
                {projects.filter(p => p.status === 'Unassigned').filter(p => projectTypeFilter === null || p.type === projectTypeFilter).length} Unassigned Projects
              </span>
              <div className="flex items-center gap-1">
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
                  Scale&Opt
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto scrollbar-visible pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f1f5f9' }}>
            {projects.filter(p => p.status === 'Unassigned').filter(p => projectTypeFilter === null || p.type === projectTypeFilter).map((project) => (
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
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">
                {consultants.filter(c => teamTypeFilter === null || projects.some(p => p.assignedTo === c.name && p.type === teamTypeFilter)).length} Consultants • Avg Utilization: {Math.round(consultants.filter(c => teamTypeFilter === null || projects.some(p => p.assignedTo === c.name && p.type === teamTypeFilter)).reduce((sum, c) => sum + c.utilization, 0) / (consultants.filter(c => teamTypeFilter === null || projects.some(p => p.assignedTo === c.name && p.type === teamTypeFilter)).length || 1))}%
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setTeamTypeFilter(null)}
                  className={`px-2 py-0.5 text-[10px] font-medium rounded-full transition-colors ${
                    teamTypeFilter === null
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setTeamTypeFilter('ProServe')}
                  className={`px-2 py-0.5 text-[10px] font-medium rounded-full transition-colors ${
                    teamTypeFilter === 'ProServe'
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  }`}
                >
                  ProServe
                </button>
                <button
                  onClick={() => setTeamTypeFilter('EE')}
                  className={`px-2 py-0.5 text-[10px] font-medium rounded-full transition-colors ${
                    teamTypeFilter === 'EE'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  EE
                </button>
                <button
                  onClick={() => setTeamTypeFilter('Automation')}
                  className={`px-2 py-0.5 text-[10px] font-medium rounded-full transition-colors ${
                    teamTypeFilter === 'Automation'
                      ? 'bg-cyan-600 text-white'
                      : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'
                  }`}
                >
                  Automation
                </button>
                <button
                  onClick={() => setTeamTypeFilter('ScaleOptimize')}
                  className={`px-2 py-0.5 text-[10px] font-medium rounded-full transition-colors ${
                    teamTypeFilter === 'ScaleOptimize'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                  }`}
                >
                  Scale&Opt
                </button>
              </div>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              + Add Consultant
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto scrollbar-visible pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f1f5f9' }}>
            {consultants.filter(c => teamTypeFilter === null || projects.some(p => p.assignedTo === c.name && p.type === teamTypeFilter)).map((consultant) => (
              <div
                key={consultant.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="min-w-0 flex-1 mr-2">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">{consultant.name}</h3>
                    <p className="text-xs text-gray-500 truncate">{consultant.role}</p>
                  </div>
                  {projects.some(p => p.assignedTo === consultant.name && p.type === 'ProServe') && (
                    <span 
                      className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${getWspwColor(consultant.wspw)}`}
                      title="Working Sessions per Week"
                    >
                      WSPW: {consultant.wspw}
                    </span>
                  )}
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

      {/* Consultant ProServe Projects Modal */}
      <Modal
        isOpen={isConsultantProjectsModalOpen}
        onClose={() => {
          setIsConsultantProjectsModalOpen(false);
          setSelectedProServeProject(null);
        }}
        title={`ProServe Projects - ${consultants.find(c => c.id === selectedConsultant)?.name || 'Consultant'}`}
        maxWidth="max-w-2xl"
      >
        {(() => {
          const consultant = consultants.find(c => c.id === selectedConsultant);
          if (!consultant) return null;
          const proServeProjects = projects.filter(p => p.assignedTo === consultant.name && p.type === 'ProServe');
          
          // Detail view for selected project
          if (selectedProServeProject) {
            const project = proServeProjects.find(p => p.id === selectedProServeProject);
            const details = project ? PROSERVE_PROJECT_DETAILS[project.id] : null;
            
            if (!project) return null;
            
            return (
              <div className="space-y-4">
                {/* Back button */}
                <button
                  onClick={() => setSelectedProServeProject(null)}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  Back to Projects
                </button>
                
                {/* Project Header */}
                <div className="flex items-start justify-between pb-3 border-b border-gray-200">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{details?.assignedClient || project.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{project.title}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                        ProServe
                      </span>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        project.status === 'InProgress' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {project.status === 'InProgress' ? 'In Progress' : project.status === 'OnHold' ? 'On Hold' : project.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{project.hours}h</p>
                    <p className="text-xs text-gray-500">{project.complexity} Complexity</p>
                  </div>
                </div>
                
                {details ? (
                  <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f1f5f9' }}>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Clarizen Project ID</span>
                      <span className="text-sm font-medium text-gray-900 font-mono">{details.clarizenProjectId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Areas of Support</span>
                      <div className="flex gap-1 flex-wrap justify-end">
                        {details.areasOfSupport.map((area) => (
                          <span key={area} className="px-1.5 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-700">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Cloud Platform</span>
                      <span className="text-sm font-medium text-gray-900">{details.cloudPlatform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Cortex Cloud Upgrade</span>
                      <span className={`text-sm font-medium ${details.cortexCloudUpgrade === 'Yes' ? 'text-green-600' : 'text-gray-500'}`}>
                        {details.cortexCloudUpgrade}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Project Started</span>
                      <span className={`text-sm font-medium ${details.projectStarted === 'Yes' ? 'text-green-600' : 'text-gray-500'}`}>
                        {details.projectStarted}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Internal Kick Off</span>
                      <span className={`text-sm font-medium ${details.internalKickOffCompleted === 'Yes' ? 'text-green-600' : 'text-gray-500'}`}>
                        {details.internalKickOffCompleted}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">External Kick Off</span>
                      <span className={`text-sm font-medium ${details.externalKickOffCompleted === 'Yes' ? 'text-green-600' : 'text-gray-500'}`}>
                        {details.externalKickOffCompleted}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Technical Assessment</span>
                      <span className={`text-sm font-medium ${details.technicalAssessmentCompleted === 'Yes' ? 'text-green-600' : 'text-gray-500'}`}>
                        {details.technicalAssessmentCompleted}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Sessions Scheduled</span>
                      <span className={`text-sm font-medium ${details.workingSessionsScheduled === 'Yes' ? 'text-green-600' : 'text-gray-500'}`}>
                        {details.workingSessionsScheduled}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Next Working Session</span>
                      <span className="text-sm font-medium text-gray-900">
                        {details.nextWorkingSession || '—'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Sessions per Week</span>
                      <span className="text-sm font-medium text-gray-900">{details.totalSessionsPerWeek}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Remaining Sessions</span>
                      <span className="text-sm font-medium text-gray-900">{details.approxRemainingSessions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Completion Date</span>
                      <span className="text-sm font-medium text-gray-900">{details.approxCompletionDate}</span>
                    </div>
                    
                    {/* Notes */}
                    {details.notes && (
                      <div className="mt-2 pt-3 border-t border-gray-100">
                        <p className="text-sm text-gray-500 mb-1">Notes</p>
                        <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{details.notes}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">Detailed project information not available.</p>
                )}
                
                {/* Close Button */}
                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setIsConsultantProjectsModalOpen(false);
                      setSelectedProServeProject(null);
                    }}
                    className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            );
          }
          
          // List view
          return (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">
                  {proServeProjects.length} ProServe Project{proServeProjects.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f1f5f9' }}>
                {proServeProjects.map((project) => {
                  const details = PROSERVE_PROJECT_DETAILS[project.id];
                  return (
                    <button
                      key={project.id}
                      onClick={() => setSelectedProServeProject(project.id)}
                      className="w-full text-left bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{details?.assignedClient || 'Unknown Client'}</h3>
                          <p className="text-sm text-gray-500 mt-0.5">{project.title}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            project.status === 'InProgress' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                          }`}>
                            {project.status === 'InProgress' ? 'In Progress' : project.status === 'OnHold' ? 'On Hold' : project.status}
                          </span>
                          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              {/* Close Button */}
              <div className="flex justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsConsultantProjectsModalOpen(false)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          );
        })()}
      </Modal>

      {/* Consultant Skills Assessment Modal */}
      <Modal
        isOpen={isSkillsModalOpen}
        onClose={() => setIsSkillsModalOpen(false)}
        title={`Skills Assessment - ${consultants.find(c => c.id === selectedConsultant)?.name || 'Consultant'}`}
        maxWidth="max-w-3xl"
      >
        {(() => {
          const consultant = consultants.find(c => c.id === selectedConsultant);
          if (!consultant) return null;
          
          // Check if consultant is ProServe (has ProServe projects)
          const isProServeConsultant = projects.some(p => p.assignedTo === consultant.name && p.type === 'ProServe');
          const proServeSkills = CONSULTANT_SKILLS[consultant.id];
          const nonProServeSkills = NON_PROSERVE_SKILLS[consultant.id];
          
          const renderSkillLevel5 = (level: number) => (
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((l) => (
                <div
                  key={l}
                  className={`w-4 h-4 rounded-sm ${l <= level ? 'bg-purple-500' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          );

          const renderSkillLevel4 = (level: number) => (
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map((l) => (
                <div
                  key={l}
                  className={`w-5 h-5 rounded-sm ${l <= level ? 'bg-blue-500' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          );

          const renderYesNo = (value: string) => (
            <span className={`text-sm font-medium ${value === 'Yes' ? 'text-green-600' : value === 'No' ? 'text-gray-500' : 'text-yellow-600'}`}>
              {value}
            </span>
          );
          
          // Non-ProServe consultant view
          if (!isProServeConsultant) {
            if (!nonProServeSkills) {
              return (
                <div className="text-center py-8">
                  <p className="text-gray-500">Skills assessment data not available for this consultant.</p>
                  <button
                    onClick={() => setIsSkillsModalOpen(false)}
                    className="mt-4 px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                </div>
              );
            }
            
            return (
              <div className="space-y-4">
                <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-6" style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f1f5f9' }}>
                  
                  {/* Proficiency Scale Info */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="font-bold text-gray-900 mb-2">Overall Experience with Prisma Cloud</h3>
                    <p className="text-xs text-gray-600 mb-2">For the following tasks, please rate your proficiency level based on this scale:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div><span className="font-semibold">1 - Novice:</span> Basic awareness, have seen it done or have theoretical knowledge.</div>
                      <div><span className="font-semibold">2 - Intermediate:</span> Can perform this task independently on a routine basis.</div>
                      <div><span className="font-semibold">3 - Advanced:</span> Can handle complex or non-standard scenarios related to this task.</div>
                      <div><span className="font-semibold">4 - Expert:</span> Can architect solutions and troubleshoot the most difficult issues related to this task.</div>
                    </div>
                  </div>

                  {/* Prisma Cloud - CSPM */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">Prisma Cloud - Cloud Security Posture Management (CSPM)</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Policy Creation and Management. Investigating and remediating alerts from default policies</span>{renderSkillLevel4(nonProServeSkills.cspmPolicyCreation)}</div>
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Alert Triage and Remediation</span>{renderSkillLevel4(nonProServeSkills.cspmAlertTriage)}</div>
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Compliance Framework Implementation. Generating and interpreting compliance reports for standard frameworks (e.g., CIS, NIST, PCI DSS):</span>{renderSkillLevel4(nonProServeSkills.cspmComplianceFramework)}</div>
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Custom Policy Development. Authoring custom security policies using RQL (Resource Query Language):</span>{renderSkillLevel4(nonProServeSkills.cspmCustomPolicyRql)}</div>
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Integration with SIEM/SOAR</span>{renderSkillLevel4(nonProServeSkills.cspmSiemSoarIntegration)}</div>
                    </div>
                  </div>

                  {/* Prisma Cloud - CWPP */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">Prisma Cloud - Cloud Workload Protection Platform (CWPP)/Runtime Security</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Vulnerability Management (Container/Host)</span>{renderSkillLevel4(nonProServeSkills.cwppVulnerabilityManagement)}</div>
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Runtime Protection (Container/Host). Creating and tuning runtime protection rules for containers:</span>{renderSkillLevel4(nonProServeSkills.cwppRuntimeProtection)}</div>
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Secrets Management</span>{renderSkillLevel4(nonProServeSkills.cwppSecretsManagement)}</div>
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Deploying Defenders on containerized environments (e.g., Kubernetes, OpenShift, ECS):</span>{renderSkillLevel4(nonProServeSkills.cwppContainerDefenders)}</div>
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Serverless Security. Deploying App-Embedded or Serverless Defenders to protect functions (e.g., AWS Lambda, Azure Functions):</span>{renderSkillLevel4(nonProServeSkills.cwppServerlessSecurity)}</div>
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Deploying and managing Defenders on virtual machines (VMs) and bare-metal servers:</span>{renderSkillLevel4(nonProServeSkills.cwppVmDefenders)}</div>
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Integrating the Prisma Cloud registry scanner into a CI/CD pipeline (e.g., Jenkins, Azure DevOps, GitLab):</span>{renderSkillLevel4(nonProServeSkills.cwppRegistryScanner)}</div>
                    </div>
                  </div>

                  {/* Prisma Cloud - CIEM */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">Prisma Cloud - Cloud Infrastructure Entitlement Management (CIEM)</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Enforcing least-privilege access using Prisma Cloud's IAM recommendations</span>{renderSkillLevel4(nonProServeSkills.ciemLeastPrivilege)}</div>
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Analyzing cloud network flow logs to identify anomalous traffic or security threats</span>{renderSkillLevel4(nonProServeSkills.ciemNetworkFlowAnalysis)}</div>
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Investigating and remediating over-privileged IAM entities (users, roles, service accounts)</span>{renderSkillLevel4(nonProServeSkills.ciemOverPrivilegedEntities)}</div>
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Scanning Infrastructure-as-Code (IaC) templates (e.g., Terraform, CloudFormation) for misconfigurations</span>{renderSkillLevel4(nonProServeSkills.ciemIacScanning)}</div>
                    </div>
                  </div>

                  {/* Cortex Cloud Experience Header */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="font-bold text-gray-900">Overall Experience with Cortex Cloud</h3>
                    <p className="text-xs text-gray-600">Please continue to use the same proficiency scale (1 - 4)</p>
                  </div>

                  {/* Cortex XDR - Endpoint Protection */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">Cortex XDR - Endpoint Protection & Agent Management</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Endpoint Deployment and Configuration</span>{renderSkillLevel4(nonProServeSkills.xdrEndpointDeployment)}</div>
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Incident Response and Triage</span>{renderSkillLevel4(nonProServeSkills.xdrIncidentResponse)}</div>
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Policy Management</span>{renderSkillLevel4(nonProServeSkills.xdrPolicyManagement)}</div>
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Threat Hunting</span>{renderSkillLevel4(nonProServeSkills.xdrThreatHunting)}</div>
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Integration with other security tools</span>{renderSkillLevel4(nonProServeSkills.xdrToolIntegration)}</div>
                    </div>
                  </div>

                  {/* Cortex XDR - Investigation */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">Cortex XDR - Investigation, Response & Threat Hunting</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Triaging incidents and analyzing the Causality View to understand the full attack story</span>{renderSkillLevel4(nonProServeSkills.xdrIncidentTriage)}</div>
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Writing basic XQL queries to search for IOCs or explore endpoint data</span>{renderSkillLevel4(nonProServeSkills.xdrXqlQueries)}</div>
                    </div>
                  </div>

                  {/* Cortex XSOAR */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">Cortex XSOAR - Security Orchestration, Automation, and Response</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Playbook Development and Customization</span>{renderSkillLevel4(nonProServeSkills.xsoarPlaybookDev)}</div>
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Integration with various security tools</span>{renderSkillLevel4(nonProServeSkills.xsoarToolIntegration)}</div>
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Incident Automation</span>{renderSkillLevel4(nonProServeSkills.xsoarIncidentAutomation)}</div>
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Case Management</span>{renderSkillLevel4(nonProServeSkills.xsoarCaseManagement)}</div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">Certifications</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">PCCSE</span>{renderYesNo(nonProServeSkills.certPccse)}</div>
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Cloud Security Professional</span>{renderYesNo(nonProServeSkills.certCloudSecurityPro)}</div>
                      <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Cloud Security Practitioner</span>{renderYesNo(nonProServeSkills.certCloudSecurityPractitioner)}</div>
                    </div>
                    {nonProServeSkills.certOther && (
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 mb-1">Other Certifications (Cloud Certifications like Azure, AWS or GCP cloud practitioner, Solutions Architect etc) Please specify</p>
                        <p className="text-sm text-gray-700 bg-white rounded p-2 border border-gray-200">{nonProServeSkills.certOther}</p>
                      </div>
                    )}
                    {nonProServeSkills.otherSecuritySkills && (
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 mb-1">Please list any other relevant security skills, experiences, or platforms you are proficient in (e.g., Splunk, Sentinel, scripting, automation, other cloud providers)</p>
                        <p className="text-sm text-gray-700 bg-white rounded p-2 border border-gray-200">{nonProServeSkills.otherSecuritySkills}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Close Button */}
                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setIsSkillsModalOpen(false)}
                    className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            );
          }
          
          // ProServe consultant view
          const skills = proServeSkills;
          if (!skills) {
            return (
              <div className="text-center py-8">
                <p className="text-gray-500">Skills assessment data not available for this consultant.</p>
                <button
                  onClick={() => setIsSkillsModalOpen(false)}
                  className="mt-4 px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            );
          }
          
          return (
            <div className="space-y-4">
              <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-6" style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f1f5f9' }}>
                
                {/* Platform & General */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Cortex Cloud Platform</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Level of experience configuring and tuning Cortex Cloud RBAC, SBAC and SSO</span>{renderSkillLevel5(skills.rbacSbacSso)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Knowledge level of configuration, customization and tuning of Cortex Cloud Dashboards and Reporting</span>{renderSkillLevel5(skills.dashboardsReporting)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Knowledge level of XQL</span>{renderSkillLevel5(skills.xql)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Knowledge level of Cortex Cloud Automation and Playbooks</span>{renderSkillLevel5(skills.automationPlaybooks)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Knowledge level of Cortex Cloud API</span>{renderSkillLevel5(skills.cortexCloudApi)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Knowledge level of Cortex Cloud Upgrade Helper</span>{renderSkillLevel5(skills.upgradeHelper)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Knowledge level of Self Service Upgrade Tool</span>{renderSkillLevel5(skills.selfServiceUpgradeTool)}</div>
                  </div>
                </div>

                {/* Cloud Onboarding */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Cloud Onboarding</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">On-boarding AWS Cloud Accounts and Organizations to Cortex Cloud</span>{renderSkillLevel5(skills.onboardingAws)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">On-boarding Google Projects and Organizations to Cortex Cloud</span>{renderSkillLevel5(skills.onboardingGoogle)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">On-boarding Azure Subscriptions and Tenants to Cortex Cloud</span>{renderSkillLevel5(skills.onboardingAzure)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">On-boarding Oracle Cloud Infrastructure Compartments and OCI Tenancy to Cortex Cloud</span>{renderSkillLevel5(skills.onboardingOracle)}</div>
                  </div>
                </div>

                {/* Security Configuration */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Security Configuration</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Configuring and tuning of Cloud Security Policies, Rules and Case Management</span>{renderSkillLevel5(skills.securityPoliciesRules)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Configuring and analyzing Attack Surface Rules and Issues</span>{renderSkillLevel5(skills.attackSurfaceRules)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Configuration of Agentless Scanning; Cloud Scan and Outpost</span>{renderSkillLevel5(skills.agentlessScanning)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Configuring and leveraging Cortex Cloud CIEM for Identity & Permission analysis</span>{renderSkillLevel5(skills.ciemIdentityPermission)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Configuring and leveraging Cortex Cloud DSPM for Data Security analysis</span>{renderSkillLevel5(skills.dspmDataSecurity)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Configuring and leveraging Cortex Cloud AISPM for AI Inventory & Issue analysis</span>{renderSkillLevel5(skills.aispmAiInventory)}</div>
                  </div>
                </div>

                {/* Workload Protection */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Cloud Workload Protection (CWP)</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Installation and management of XDR agents</span>{renderSkillLevel5(skills.xdrAgents)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Installation and management of KSPM Connectors</span>{renderSkillLevel5(skills.kspmConnectors)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Registry Scanning configuration and tuning</span>{renderSkillLevel5(skills.registryScanning)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Serverless Function Scanning configuration and tuning</span>{renderSkillLevel5(skills.serverlessScanning)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Configuration and tuning of Cloud Workload Rules and Policies</span>{renderSkillLevel5(skills.cwpRulesPolicies)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Configuration and tuning of Vulnerability Management Policies</span>{renderSkillLevel5(skills.vulnerabilityPolicies)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Best practices of workload vulnerability management and remediation</span>{renderSkillLevel5(skills.vulnerabilityRemediation)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Experience leveraging CWP capabilities of Cortex Cloud CLI</span>{renderSkillLevel5(skills.cwpCli)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Experience using Rego Syntax for Custom Workload Security Rules</span>{renderSkillLevel5(skills.regoSyntax)}</div>
                  </div>
                </div>

                {/* Application Security - VCS */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Application Security - VCS Onboarding</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Onboarding GitHub Code Repositories (VCS)</span>{renderSkillLevel5(skills.vcsGitHub)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Onboarding GitLab Code Repositories (VCS)</span>{renderSkillLevel5(skills.vcsGitLab)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Onboarding Azure Repos (VCS)</span>{renderSkillLevel5(skills.vcsAzureRepos)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Onboarding Bitbucket Code Repositories (VCS)</span>{renderSkillLevel5(skills.vcsBitbucket)}</div>
                  </div>
                </div>

                {/* Application Security - CI/CD */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Application Security - CI/CD Integrations</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Configuring CI/CD integrations with GitLab CI</span>{renderSkillLevel5(skills.cicdGitLabCi)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Configuring CI/CD integrations with GitHub Actions</span>{renderSkillLevel5(skills.cicdGitHubActions)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Configuring CI/CD integrations with Terraform Cloud Run Task</span>{renderSkillLevel5(skills.cicdTerraformCloud)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Configuring CI/CD integrations with Azure DevOps</span>{renderSkillLevel5(skills.cicdAzureDevOps)}</div>
                  </div>
                </div>

                {/* Application Security - Other */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Application Security - Additional</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Configuration and tuning Cortex Cloud AppSec Rules and Policies</span>{renderSkillLevel5(skills.appSecRulesPolicies)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Configuring Transporter over Broker VM</span>{renderSkillLevel5(skills.transporterBrokerVm)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Configuring an integration with IDE</span>{renderSkillLevel5(skills.ideIntegration)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Connect 3rd Party Scanning Tools such as SonarQube, Veracode, Semgrep and SARIF</span>{renderSkillLevel5(skills.thirdPartyScanning)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Analysis of Cortex Cloud AppSec Findings: Secrets, IaC Security and SCA</span>{renderSkillLevel5(skills.appSecFindings)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">CI/CD Risk Evaluation</span>{renderSkillLevel5(skills.cicdRiskEvaluation)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Experience leveraging CAS capabilities of Cortex Cloud CLI</span>{renderSkillLevel5(skills.casCli)}</div>
                  </div>
                </div>

                {/* Overall Knowledge */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Overall Knowledge</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Overall knowledge level of Cortex Cloud CSPM features</span>{renderSkillLevel5(skills.overallCspm)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Overall knowledge level of Cortex Cloud CWP features</span>{renderSkillLevel5(skills.overallCwp)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Overall knowledge level of Cortex Cloud AppSec (CAS) features</span>{renderSkillLevel5(skills.overallCas)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Rate your Python scripting skills (optional)</span>{renderSkillLevel5(skills.pythonSkills)}</div>
                  </div>
                </div>

                {/* Certifications & Training */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Certifications & Training</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Have you obtained Cloud Security Professional certification?</span>{renderYesNo(skills.cloudSecurityCertification)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Have you worked on any customer facing Cortex Cloud Upgrade or Deployment projects?</span>{renderYesNo(skills.customerFacingProjects)}</div>
                    <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Do you have all the necessary Cortex Cloud and Upgrade training material?</span>{renderYesNo(skills.hasNecessaryTraining)}</div>
                  </div>
                </div>

                {/* Text Fields */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Additional Information</h3>
                  <div className="space-y-3">
                    {skills.panwStakeholderKnowledge && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">How well do you understand roles and responsibilities of the following PANW stakeholders: (PSC, PM, AT/Sales, S&O, EE, TAC Support)?</p>
                        <p className="text-sm text-gray-700 bg-white rounded p-2 border border-gray-200">{skills.panwStakeholderKnowledge}</p>
                      </div>
                    )}
                    {skills.dailyTrainingLabs && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Please share which training or lab work you do on a daily basis to prepare for Cortex Cloud related projects.</p>
                        <p className="text-sm text-gray-700 bg-white rounded p-2 border border-gray-200">{skills.dailyTrainingLabs}</p>
                      </div>
                    )}
                    {skills.missingTrainingMaterial && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">If No - please share what is missing to help you to become Cortex Cloud SME?</p>
                        <p className="text-sm text-gray-700 bg-white rounded p-2 border border-gray-200">{skills.missingTrainingMaterial}</p>
                      </div>
                    )}
                    {skills.additionalThoughts && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Please feel free to share any additional thoughts and ideas regarding Cortex Cloud training and enablement (optional).</p>
                        <p className="text-sm text-gray-700 bg-white rounded p-2 border border-gray-200">{skills.additionalThoughts}</p>
                      </div>
                    )}
                    {skills.marketplaceContentPacks && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">If you have experience with Cortex Cloud content packs in the Marketplace, please list them here (optional).</p>
                        <p className="text-sm text-gray-700 bg-white rounded p-2 border border-gray-200">{skills.marketplaceContentPacks}</p>
                      </div>
                    )}
                    {skills.additionalCortexCloudExp && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Do you have any additional Cortex Cloud experience that has not been covered in this form? Please share a high level summary below (optional).</p>
                        <p className="text-sm text-gray-700 bg-white rounded p-2 border border-gray-200">{skills.additionalCortexCloudExp}</p>
                      </div>
                    )}
                    {skills.otherCortexExperience && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Do you have any Cortex experience outside of Cortex Cloud (e.g. XSIAM, XSOAR, XDR)? Please share a high level summary below (optional).</p>
                        <p className="text-sm text-gray-700 bg-white rounded p-2 border border-gray-200">{skills.otherCortexExperience}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Close Button */}
              <div className="flex justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsSkillsModalOpen(false)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          );
        })()}
      </Modal>

      {/* Utilization Calendar Modal */}
      <Modal
        isOpen={isUtilizationCalendarOpen}
        onClose={() => setIsUtilizationCalendarOpen(false)}
        title={`Weekly Schedule - ${consultants.find(c => c.id === selectedConsultant)?.name || 'Consultant'}`}
        maxWidth="max-w-2xl"
      >
        {(() => {
          const consultant = consultants.find(c => c.id === selectedConsultant);
          if (!consultant) return null;
          
          const wspw = consultant.wspw;
          const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
          
          // Create an array of 10 slots (2 per day, 5 days)
          // Fill based on WSPW - distribute sessions across the week
          const slots: boolean[] = Array(10).fill(false);
          
          // Distribute sessions evenly across the week
          // Morning slots: 0, 2, 4, 6, 8 (indices)
          // Afternoon slots: 1, 3, 5, 7, 9 (indices)
          const distribution = [
            0, 2, 4, 6, 8, // Morning sessions first (Mon-Fri mornings)
            1, 3, 5, 7, 9  // Then afternoon sessions (Mon-Fri afternoons)
          ];
          
          for (let i = 0; i < Math.min(wspw, 10); i++) {
            slots[distribution[i]] = true;
          }
          
          return (
            <div className="space-y-4">
              {/* Header Info */}
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                <div>
                  <p className="text-sm text-gray-600">Working Sessions Per Week (WSPW)</p>
                  <p className="text-2xl font-bold text-gray-900">{wspw} <span className="text-sm font-normal text-gray-500">of 10 sessions</span></p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Utilization</p>
                  <p className={`text-2xl font-bold ${consultant.utilization >= 80 ? 'text-red-600' : consultant.utilization >= 60 ? 'text-yellow-600' : 'text-green-600'}`}>
                    {consultant.utilization}%
                  </p>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Header Row */}
                <div className="grid grid-cols-5 bg-gray-100 border-b border-gray-200">
                  {days.map((day) => (
                    <div key={day} className="p-3 text-center font-semibold text-sm text-gray-700 border-r border-gray-200 last:border-r-0">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Morning Row */}
                <div className="grid grid-cols-5 border-b border-gray-200">
                  {days.map((day, dayIndex) => {
                    const slotIndex = dayIndex * 2; // Morning slot
                    const isBooked = slots[slotIndex];
                    return (
                      <div 
                        key={`${day}-am`} 
                        className={`p-4 border-r border-gray-200 last:border-r-0 ${isBooked ? 'bg-blue-100' : 'bg-white'}`}
                      >
                        <div className="text-xs text-gray-500 mb-1">8:00 AM - 12:00 PM</div>
                        <div className={`text-sm font-medium ${isBooked ? 'text-blue-700' : 'text-gray-400'}`}>
                          {isBooked ? (
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Booked
                            </div>
                          ) : (
                            'Available'
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Afternoon Row */}
                <div className="grid grid-cols-5">
                  {days.map((day, dayIndex) => {
                    const slotIndex = dayIndex * 2 + 1; // Afternoon slot
                    const isBooked = slots[slotIndex];
                    return (
                      <div 
                        key={`${day}-pm`} 
                        className={`p-4 border-r border-gray-200 last:border-r-0 ${isBooked ? 'bg-blue-100' : 'bg-white'}`}
                      >
                        <div className="text-xs text-gray-500 mb-1">1:00 PM - 5:00 PM</div>
                        <div className={`text-sm font-medium ${isBooked ? 'text-blue-700' : 'text-gray-400'}`}>
                          {isBooked ? (
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Booked
                            </div>
                          ) : (
                            'Available'
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
                  <span className="text-gray-600">Booked Session (4 hours)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-white border border-gray-200 rounded"></div>
                  <span className="text-gray-600">Available</span>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsUtilizationCalendarOpen(false)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
};

export default App;
