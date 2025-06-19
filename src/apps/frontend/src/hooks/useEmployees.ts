import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Employee } from '@task-tracker/shared/src/types/employee';

const mockEmployees: Employee[] = [
    {
        id: 1,
        name: 'Иван Петров',
        position: 'Senior Developer',
        department: 'Engineering',
        currentIndex: 7.5,
        status: 'green',
        activeRequests: 3,
        daysSinceLastActivity: 1,
        interviewLoad: 2,
        responseTime: 1.2,
        lastActivity: '2024-01-15',
        skills: ['React', 'TypeScript', 'Node.js']
    },
    {
        id: 2,
        name: 'Мария Сидорова',
        position: 'Project Manager',
        department: 'Management',
        currentIndex: 8.2,
        status: 'yellow',
        activeRequests: 5,
        daysSinceLastActivity: 0,
        interviewLoad: 1,
        responseTime: 0.8,
        lastActivity: '2024-01-16',
        skills: ['Management', 'Agile', 'Scrum']
    },
    {
        id: 3,
        name: 'Алексей Козлов',
        position: 'Frontend Developer',
        department: 'Engineering',
        currentIndex: 6.8,
        status: 'green',
        activeRequests: 2,
        daysSinceLastActivity: 2,
        interviewLoad: 1,
        responseTime: 1.5,
        lastActivity: '2024-01-14',
        skills: ['Vue.js', 'JavaScript', 'CSS']
    },
    {
        id: 4,
        name: 'Елена Смирнова',
        position: 'UX Designer',
        department: 'Design',
        currentIndex: 9.1,
        status: 'red',
        activeRequests: 8,
        daysSinceLastActivity: 0,
        interviewLoad: 3,
        responseTime: 0.5,
        lastActivity: '2024-01-16',
        skills: ['Figma', 'Sketch', 'User Research']
    }
];

export const useEmployees = () => {
    return useQuery({
        queryKey: ['employees'],
        queryFn: async (): Promise<Employee[]> => {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            return mockEmployees;

            // When backend is ready, replace with:
            // const response = await employeeService.getAll();
            // return response;
        },
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
};

export const useAddEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newEmployee: Omit<Employee, 'id' | 'currentIndex' | 'status' | 'lastActivity'>): Promise<Employee> => {
            await new Promise(resolve => setTimeout(resolve, 800));

            // Generate mock response
            const addedEmployee: Employee = {
                ...newEmployee,
                id: Date.now(), // Simple ID generation for mock
                currentIndex: Math.random() * 10, // Random index for demo
                status: Math.random() > 0.7 ? 'red' : Math.random() > 0.4 ? 'yellow' : 'green',
                lastActivity: new Date().toISOString().split('T')[0]
            };

            mockEmployees.push(addedEmployee);

            return addedEmployee;

            // When backend is ready, replace with:
            // const response = await employeeService.create(newEmployee);
            // return response;
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

            // Find and update employee in mock data
            const employeeIndex = mockEmployees.findIndex(emp => emp.id === id);
            if (employeeIndex === -1) {
                throw new Error('Employee not found');
            }

            const updatedEmployee = { ...mockEmployees[employeeIndex], ...data };
            mockEmployees[employeeIndex] = updatedEmployee;

            return updatedEmployee;

            // When backend is ready, replace with:
            // const response = await employeeService.update(id, data);
            // return response;
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

            // Remove employee from mock data
            const employeeIndex = mockEmployees.findIndex(emp => emp.id === id);
            if (employeeIndex === -1) {
                throw new Error('Employee not found');
            }

            mockEmployees.splice(employeeIndex, 1);

            // When backend is ready, replace with:
            // await employeeService.delete(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        },
        onError: (error) => {
            console.error('Error deleting employee:', error);
        }
    });
};
