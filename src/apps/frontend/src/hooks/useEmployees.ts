import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {employeeService} from '../services/employeeService';
import {Employee} from "@task-tracker/shared/src/types/employee.ts";

export const useEmployees = () => {
    return useQuery({
        queryKey: ['employees'],
        queryFn: employeeService.getAll,
        refetchInterval: 30000, // Обновление каждые 30 секунд
    });
};

export const useAddEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: employeeService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['employees']});
        },
    });
};

export const useUpdateEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, data}: { id: number; data: Partial<Employee> }) =>
            employeeService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['employees']});
        },
    });
};
