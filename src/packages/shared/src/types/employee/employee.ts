import { ProjectDetails } from "../project/project.ts";

/**
 * Employee’s rate for customer. todo add more variants
 */
export type EmployeeRate =
    | 'Intern'
    | 'Junior'
    | 'Middle'
    | 'Senior'
    | 'Lead';

/**
 * Main programming language the employee works with. todo add combined variants
 */
export type EmployeeLanguage =
    | 'Java'
    | 'C#'
    | 'JS/TS'
    | 'Python';

/**
 * Employee’s technical skill. todo add all of techs :) later hard skills should be received from DB, so I need to handle it ASAP
 */
export type HardSkills =
    | 'Playwright'
    | 'Selenium'
    | 'PyTest'
    | 'Node.js'
    | '.NET'
    | 'SQL'
    | 'Management';

/**
 * Information about an employee.
 * @interface Employee
 * @property {number} id - Unique employee identifier. todo add GUID generation
 * @property {string} name - Employee’s name.
 * @property {EmployeeRate} rate - Employee’s rate.
 * @property {EmployeeLanguage} language - Primary programming language.
 * @property {number} currentIndex - Workload index (0 = free, 3 = overloaded).
 * @property {'green' | 'yellow' | 'red'} status - Color-coded workload status. todo maybe I need to add gradient, idk
 * @property {ProjectDetails[]} activeRequests - Active project requests.
 * @property {number} plannedInterviews - Number of scheduled interviews. todo not so important parameter
 * @property {HardSkills[]} skills - Array of technical skills.
 */
export interface Employee {
    id: number;
    name: string;
    rate: EmployeeRate;
    language: EmployeeLanguage;
    currentIndex: number;
    status: 'green' | 'yellow' | 'red';
    activeRequests: ProjectDetails[];
    plannedInterviews: number;
    skills: HardSkills[];
}

/**
 * Factor used in calculating the workload index.
 * @interface IndexFactor
 * @property {'activeRequests' | 'plannedInterviews'} name - Factor name.
 * @property {string} label - Display label for the factor.
 * @property {number} weight - Weight of the factor in the index calculation.
 * @property {string} description - Description of the factor.
 */
export interface IndexFactor {
    name: 'activeRequests' | 'plannedInterviews';
    label: string;
    weight: number;
    description: string;
}

/**
 * Threshold values for workload status.
 * @interface StatusThreshold
 * @property {number} min - Minimum value for the status.
 * @property {number} max - Maximum value for the status.
 * @property {string} label - Text label for the status.
 * @property {string} color - Display color for the status.
 */
export interface StatusThreshold {
    min: number;
    max: number;
    label: string;
    color: string;
}

/**
 * Department-level statistics.
 * @interface DepartmentStats
 * @property {string} department - Department name.
 * @property {number} averageIndex - Average workload index in the department.
 * @property {number} employeeCount - Number of employees in the department.
 */
export interface DepartmentStats {
    department: string;
    averageIndex: number;
    employeeCount: number;
}

/**
 * Team analytics data.
 * @interface TeamAnalytics
 * @property {number} totalEmployees - Total number of employees.
 * @property {number} available - Number of available employees.
 * @property {number} busy - Number of busy employees.
 * @property {number} overloaded - Number of overloaded employees.
 * @property {DepartmentStats[]} departmentStats - Array of department statistics.
 */
export interface TeamAnalytics {
    totalEmployees: number;
    available: number;
    busy: number;
    overloaded: number;
    departmentStats: DepartmentStats[];
}
