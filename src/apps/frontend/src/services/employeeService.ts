import { api } from './api';
import { Employee } from "@task-tracker/shared/src/types/employee/employee.ts";

export const employeeService = {
    async getAll(): Promise<Employee[]> {
        const response = await api.get('/employees');
        return response.data;
    },

    async getById(id: number): Promise<Employee> {
        const response = await api.get(`/employees/${id}`);
        return response.data;
    },

    async create(employee: Omit<Employee, 'id' | 'currentIndex' | 'status' | 'lastActivity'>): Promise<Employee> {
        const response = await api.post('/employees', employee);
        return response.data;
    },

    async update(id: number, data: Partial<Employee>): Promise<Employee> {
        const response = await api.patch(`/employees/${id}`, data);
        return response.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/employees/${id}`);
    },

    async getAnalytics(): Promise<any> {
        const response = await api.get('/employees/analytics');
        return response.data;
    }
};
