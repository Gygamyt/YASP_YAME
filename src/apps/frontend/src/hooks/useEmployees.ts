import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Employee, ProjectDetails } from '@task-tracker/shared/src/types/employee/employee.ts';
import { mockEmployees } from "./mocks.ts";

/**
 * Calculate workload index based on active project requests.
 *
 * @param {ProjectDetails[]} requests - Array of active project details.
 * @returns {number} A numeric index (0 = free, up to 3 = overloaded).
 */
function calculateIndex(requests: ProjectDetails[]): number {
    return Math.min(requests.length * 1.2, 3);
}

/**
 * Custom hook to fetch and compute the list of employees.
 *
 * @returns {import('@tanstack/react-query').UseQueryResult<Employee[], Error>}
 *   React Query result containing the employee array with recalculated indexes.
 *
 * @example
 * const { data: employees, isLoading, error } = useEmployees();
 */
export const useEmployees = () => {
    return useQuery<Employee[], Error>({
        queryKey: ['employees'],
        queryFn: async (): Promise<Employee[]> => {
            // Recalculate each employee's index on the fly
            return mockEmployees.map(emp => ({
                ...emp,
                currentIndex: calculateIndex(emp.activeRequests),
            }));
        },
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
};

/**
 * Custom hook to add a new employee.
 *
 * @returns {import('@tanstack/react-query').UseMutationResult<
 *            Employee,
 *            unknown,
 *            Omit<Employee, 'id' | 'currentIndex' | 'status'>
 *          >}
 *   React Query mutation result for creating an employee.
 *
 * @example
 * const addEmployee = useAddEmployee();
 * addEmployee.mutateAsync({ name, rate, language, ... });
 */
export const useAddEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation<
        Employee,
        unknown,
        Omit<Employee, 'id' | 'currentIndex' | 'status'>
    >({
        mutationFn: async (newEmployee) => {
            await new Promise(resolve => setTimeout(resolve, 800));
            const activeRequests = newEmployee.activeRequests || [];
            const calculatedIndex = calculateIndex(activeRequests);
            const status =
                calculatedIndex < 1 ? 'green'
                    : calculatedIndex < 2 ? 'yellow'
                        : 'red';
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
        },
    });
};

/**
 * Custom hook to update an existing employee.
 *
 * @returns {import('@tanstack/react-query').UseMutationResult<
 *            Employee,
 *            unknown,
 *            { id: number; data: Partial<Employee> }
 *          >}
 *   React Query mutation result for updating an employee.
 *
 * @example
 * const updateEmployee = useUpdateEmployee();
 * updateEmployee.mutateAsync({ id: 123, data: { rate: 'Senior' } });
 */
export const useUpdateEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation<
        Employee,
        unknown,
        { id: number; data: Partial<Employee> }
    >({
        mutationFn: async ({ id, data }) => {
            await new Promise(resolve => setTimeout(resolve, 600));
            const index = mockEmployees.findIndex(emp => emp.id === id);
            if (index === -1) throw new Error('Employee not found');
            const base = mockEmployees[index];
            const updatedEmployee: Employee = {
                ...base,
                ...data,
                currentIndex: calculateIndex(
                    data.activeRequests ?? base.activeRequests
                ),
            };
            mockEmployees[index] = updatedEmployee;
            return updatedEmployee;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        },
        onError: (error) => {
            console.error('Error updating employee:', error);
        },
    });
};

/**
 * Custom hook to delete an employee by ID.
 *
 * @returns {import('@tanstack/react-query').UseMutationResult<void, unknown, number>}
 *   React Query mutation result for deleting an employee.
 *
 * @example
 * const deleteEmployee = useDeleteEmployee();
 * deleteEmployee.mutateAsync(employeeId);
 */
export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation<void, unknown, number>({
        mutationFn: async (id) => {
            await new Promise(resolve => setTimeout(resolve, 500));
            const index = mockEmployees.findIndex(emp => emp.id === id);
            if (index === -1) throw new Error('Employee not found');
            mockEmployees.splice(index, 1);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        },
        onError: (error) => {
            console.error('Error deleting employee:', error);
        },
    });
};
