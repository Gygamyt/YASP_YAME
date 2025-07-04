import React, { useState } from 'react';
import { useEmployees } from '../../hooks/useEmployees';
import { EmployeeCard } from './EmployeeCard';
import { EmployeeModal } from './EmployeeModal';
import './DashboardStyles.css';

export const Dashboard: React.FC = () => {
    const { data: employees, isLoading, error } = useEmployees();
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDepartment, setFilterDepartment] = useState('all');

    const handleEmployeeClick = (employee: any) => {
        setSelectedEmployee(employee);
    };

    const handleCloseModal = () => {
        setSelectedEmployee(null);
    };

    const filteredEmployees =
        employees?.filter((employee) => {
            const matchesSearch =
                employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.rate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.language.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDepartment =
                filterDepartment === 'all' || employee.language === filterDepartment;
            return matchesSearch && matchesDepartment;
        }) || [];

    const employeesByStatus = {
        green: filteredEmployees.filter((emp) => emp.status === 'green'),
        yellow: filteredEmployees.filter((emp) => emp.status === 'yellow'),
        red: filteredEmployees.filter((emp) => emp.status === 'red'),
    };

    return (
        <div className="dashboard">
            <div className="dashboard-toolbar">
                <input
                    type="text"
                    placeholder="Search by name, rate or language..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <select
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    className="department-filter"
                >
                    <option value="all">All languages</option>
                    <option value="Java">Java</option>
                    <option value="C#">C#</option>
                    <option value="JS/TS">JS/TS</option>
                    <option value="Python">Python</option>
                </select>
                <div className="dashboard-stats">
                    <div className="stat-card stat-card--green">
                        <span className="stat-number">{employeesByStatus.green.length}</span>
                        <span className="stat-label">Available</span>
                    </div>
                    <div className="stat-card stat-card--yellow">
                        <span className="stat-number">{employeesByStatus.yellow.length}</span>
                        <span className="stat-label">Medium Load</span>
                    </div>
                    <div className="stat-card stat-card--red">
                        <span className="stat-number">{employeesByStatus.red.length}</span>
                        <span className="stat-label">Overloaded</span>
                    </div>
                </div>
            </div>

            <div className="employees-grid">
                {isLoading ? (
                    <div className="dashboard-loading">
                        <div className="loading-spinner"></div>
                        <p>Loading employees...</p>
                    </div>
                ) : error ? (
                    <div className="dashboard-error">
                        <h3>Error loading data</h3>
                        <p>Could not load employee information</p>
                        <button onClick={() => window.location.reload()} className="btn btn--primary">
                            Try again
                        </button>
                    </div>
                ) : filteredEmployees.length === 0 ? (
                    <div className="no-employees">
                        <p>No employees found</p>
                    </div>
                ) : (
                    filteredEmployees.map((employee) => (
                        <EmployeeCard key={employee.id} employee={employee} onClick={handleEmployeeClick} />
                    ))
                )}
            </div>

            {selectedEmployee && (
                <EmployeeModal employee={selectedEmployee} onClose={handleCloseModal} />
            )}
        </div>
    );
};
