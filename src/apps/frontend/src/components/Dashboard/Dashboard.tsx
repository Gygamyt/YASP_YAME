import React, { useState } from 'react';
import { useEmployees } from '../../hooks/useEmployees';
import { EmployeeCard } from './EmployeeCard';
import { EmployeeModal } from './EmployeeModal';
import { Employee } from '@task-tracker/shared/src/types/employee';

export const Dashboard: React.FC = () => {
    const { data: employees, isLoading, error } = useEmployees();
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDepartment, setFilterDepartment] = useState<string>('all');

    // Handle employee card click
    const handleEmployeeClick = (employee: Employee) => {
        setSelectedEmployee(employee);
    };

    // Close modal
    const handleCloseModal = () => {
        setSelectedEmployee(null);
    };

    // Filter employees based on search and department
    const filteredEmployees = employees?.filter(employee => {
        const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.position.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;

        return matchesSearch && matchesDepartment;
    }) || [];

    // Group employees by status
    const employeesByStatus = {
        green: filteredEmployees.filter(emp => emp.status === 'green'),
        yellow: filteredEmployees.filter(emp => emp.status === 'yellow'),
        red: filteredEmployees.filter(emp => emp.status === 'red')
    };

    if (isLoading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Загрузка данных сотрудников...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-error">
                <h3>Ошибка загрузки данных</h3>
                <p>Не удалось загрузить информацию о сотрудниках</p>
                <button onClick={() => window.location.reload()} className="btn btn--primary">
                    Попробовать снова
                </button>
            </div>
        );
    }

    return (
        <div className="dashboard">
            {/* Dashboard Header */}
            <div className="dashboard-header">
                <h1>Дашборд загрузки сотрудников</h1>
                <div className="dashboard-stats">
                    <div className="stat-card stat-card--green">
                        <span className="stat-number">{employeesByStatus.green.length}</span>
                        <span className="stat-label">Доступны</span>
                    </div>
                    <div className="stat-card stat-card--yellow">
                        <span className="stat-number">{employeesByStatus.yellow.length}</span>
                        <span className="stat-label">Средняя загрузка</span>
                    </div>
                    <div className="stat-card stat-card--red">
                        <span className="stat-number">{employeesByStatus.red.length}</span>
                        <span className="stat-label">Перегружены</span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="dashboard-filters">
                <div className="filter-group">
                    <input
                        type="text"
                        placeholder="Поиск по имени или должности..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="filter-group">
                    <select
                        value={filterDepartment}
                        onChange={(e) => setFilterDepartment(e.target.value)}
                        className="department-filter"
                    >
                        <option value="all">Все отделы</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Management">Management</option>
                        <option value="HR">HR</option>
                        <option value="Design">Design</option>
                    </select>
                </div>
            </div>

            {/* Employee Grid */}
            <div className="employees-grid">
                {filteredEmployees.length === 0 ? (
                    <div className="no-employees">
                        <p>Сотрудники не найдены</p>
                    </div>
                ) : (
                    filteredEmployees.map(employee => (
                        <EmployeeCard
                            key={employee.id}
                            employee={employee}
                            onClick={handleEmployeeClick}
                        />
                    ))
                )}
            </div>

            {/* Employee Modal */}
            {selectedEmployee && (
                <EmployeeModal
                    employee={selectedEmployee}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};
