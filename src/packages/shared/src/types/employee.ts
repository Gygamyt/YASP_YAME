export type EmployeeRate = 'Intern' | 'Junior' | 'Middle' | 'Senior' | 'Lead';
export type EmployeeLanguage = 'Java' | 'C#' | 'JS/TS' | 'Python' | 'Design';
export type ProjectStatus = 'submitted' | 'waiting_feedback' | 'passed_stage';

export interface ProjectDetails {
    id: number;
    submittedAt: string;
    status: ProjectStatus;
    name: string;
}

export interface Employee {
    id: number;
    name: string;
    rate: EmployeeRate;
    language: EmployeeLanguage;
    currentIndex: number; // 0 (free) — 3 (overloaded)
    status: 'green' | 'yellow' | 'red';
    activeRequests: ProjectDetails[];
    plannedInterviews: number;
    skills: string[];
}

export interface IndexFactor {
    name: 'activeRequests' | 'plannedInterviews';
    label: string;
    weight: number;
    description: string;
}

export interface StatusThreshold {
    min: number;
    max: number;
    label: string;
    color: string;
}

export interface DepartmentStats {
    department: string;
    averageIndex: number;
    employeeCount: number;
}

export interface TeamAnalytics {
    totalEmployees: number;
    available: number;
    busy: number;
    overloaded: number;
    departmentStats: DepartmentStats[];
}
