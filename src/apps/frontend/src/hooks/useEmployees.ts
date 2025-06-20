import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Employee, ProjectDetails } from '@task-tracker/shared/src/types/employee';

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
    }
];

const mockEmployees: Employee[] = [
    {
        id: 1,
        name: 'Ivan Petrov',
        rate: 'Senior',
        language: 'JS/TS',
        currentIndex: 2.1,
        status: 'yellow',
        activeRequests: [mockProjects[0]],
        plannedInterviews: 1,
        skills: ['React', 'TypeScript', 'Node.js']
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
        skills: ['Management', 'Agile', 'Scrum']
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
        skills: ['.NET', 'Blazor', 'SQL']
    },
    {
        id: 4,
        name: 'Elena Smirnova',
        rate: 'Junior',
        language: 'Java',
        currentIndex: 2.9,
        status: 'red',
        activeRequests: [mockProjects[0]],
        plannedInterviews: 1,
        skills: []
    }
];

function calculateIndex(requests: ProjectDetails[]): number {
    // Пример: 0 — свободен, 3+ — перегружен
    return Math.min(requests.length * 1.2, 3);
}

export const useEmployees = () => {
    return useQuery({
        queryKey: ['employees'],
        queryFn: async (): Promise<Employee[]> => {
            // Пересчёт индекса для каждого сотрудника на лету
            return mockEmployees.map(emp => ({
                ...emp,
                currentIndex: calculateIndex(emp.activeRequests)
            }));
        },
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
};

export const useAddEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newEmployee: Omit<Employee, 'id' | 'currentIndex' | 'status'>): Promise<Employee> => {
            await new Promise(resolve => setTimeout(resolve, 800));
            const activeRequests = newEmployee.activeRequests || [];
            const calculatedIndex = calculateIndex(activeRequests);
            const status = calculatedIndex < 1 ? 'green' : calculatedIndex < 2 ? 'yellow' : 'red';
            const addedEmployee: Employee = {
                ...newEmployee,
                id: Date.now(),
                currentIndex: calculatedIndex,
                status,
            };
            mockEmployees.push(addedEmployee);
            return addedEmployee;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        },
        onError: (error) => {
            console.error('Error adding employee:', error);
        }
    });
};

export const useUpdateEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: Partial<Employee> }): Promise<Employee> => {
            await new Promise(resolve => setTimeout(resolve, 600));
            const employeeIndex = mockEmployees.findIndex(emp => emp.id === id);
            if (employeeIndex === -1) throw new Error('Employee not found');
            const updatedEmployee = {
                ...mockEmployees[employeeIndex],
                ...data,
                currentIndex: calculateIndex(data.activeRequests ?? mockEmployees[employeeIndex].activeRequests)
            };
            mockEmployees[employeeIndex] = updatedEmployee;
            return updatedEmployee;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        },
        onError: (error) => {
            console.error('Error updating employee:', error);
        }
    });
};

export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number): Promise<void> => {
            await new Promise(resolve => setTimeout(resolve, 500));
            const employeeIndex = mockEmployees.findIndex(emp => emp.id === id);
            if (employeeIndex === -1) throw new Error('Employee not found');
            mockEmployees.splice(employeeIndex, 1);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        },
        onError: (error) => {
            console.error('Error deleting employee:', error);
        }
    });
};
