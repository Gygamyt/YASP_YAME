export interface Employee {
    id: number;
    name: string;
    position: string;
    department: 'Engineering' | 'Management' | 'HR' | 'Design';
    currentIndex: number;
    status: 'green' | 'yellow' | 'red';
    activeRequests: number;
    daysSinceLastActivity: number;
    interviewLoad: number;
    responseTime: number;
    lastActivity: string;
    skills: string[];
}

export interface IndexFactor {
    name: keyof Pick<Employee, 'activeRequests' | 'daysSinceLastActivity' | 'interviewLoad' | 'responseTime'>;
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
