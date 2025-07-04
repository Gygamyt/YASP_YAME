import { Employee, ProjectDetails } from "@task-tracker/shared/src/types";

const mockProjects: ProjectDetails[] = [
    {
        id: 1,
        submittedAt: '2024-06-01',
        status: 'submitted',
        name: 'ProjectName'
    },
    {
        id: 2,
        submittedAt: '2024-06-02',
        status: 'waiting_feedback',
        name: 'ProjectName'
    },
    {
        id: 3,
        submittedAt: '2024-06-03',
        status: "no_updates",
        name: 'ProjectName'
    },
    {
        id: 4,
        submittedAt: '2024-01-01',
        status: "rejected",
        name: 'ProjectName'
    }
];

export const mockEmployees: Employee[] = [
    {
        id: 1,
        name: 'Ivan Petrov',
        rate: 'Senior',
        language: 'JS/TS',
        currentIndex: 2.1,
        status: 'yellow',
        activeRequests: [mockProjects[0]],
        plannedInterviews: 1,
        skills: ['Playwright', 'PyTest', 'Node.js']
    },
    {
        id: 2,
        name: 'Maria Sidorova',
        rate: 'Lead',
        language: 'Python',
        currentIndex: 2.7,
        status: 'red',
        activeRequests: [mockProjects[1], mockProjects[0]],
        plannedInterviews: 2,
        skills: ['Management', 'PyTest']
    },
    {
        id: 3,
        name: 'Alexey Kozlov',
        rate: 'Middle',
        language: 'C#',
        currentIndex: 1.3,
        status: 'green',
        activeRequests: [],
        plannedInterviews: 0,
        skills: ['.NET', 'SQL']
    },
    {
        id: 4,
        name: 'Elena Smirnova',
        rate: 'Junior',
        language: 'Java',
        currentIndex: 2.9,
        status: 'red',
        activeRequests: [mockProjects[2], mockProjects[3]],
        plannedInterviews: 1,
        skills: []
    }
];
