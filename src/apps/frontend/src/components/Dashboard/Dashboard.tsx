import React, { useState } from 'react';
import { useEmployees } from '../../hooks/useEmployees';
import { EmployeeCard } from './EmployeeCard';
import { EmployeeModal } from './EmployeeModal';
import './DashboardStyles.css';
import { Employee } from "@task-tracker/shared/src/types";

/**
 * Dashboard component for displaying and managing employee information.
 * Provides search, filtering, and employee detail viewing capabilities.
 *
 * @component
 * @returns {React.ReactElement} The dashboard component with employee grid and controls.
 *
 * @example
 * ```
 * import { Dashboard } from './Dashboard';
 *
 * function App() {
 *   return <Dashboard />;
 * }
 * ```
 */
export const Dashboard: React.FC = () => {
    /**
     * Employee data from the custom hook.
     */
    const {data: employees, isLoading, error} = useEmployees();

    /**
     * Currently selected employee for modal display.
     */
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    /**
     * Search term for filtering employees by name, rate, or language.
     */
    const [searchTerm, setSearchTerm] = useState('');

    /**
     * Department filter for filtering employees by programming language.
     */
    const [filterDepartment, setFilterDepartment] = useState('all');

    /**
     * Handles employee card click to open modal with details.
     * @param {Employee} employee - The employee object to display in modal.
     * @returns {void}
     */
    const handleEmployeeClick = (employee: any): void => {
        setSelectedEmployee(employee);
    };

    /**
     * Closes the employee detail modal.
     * @returns {void}
     */
    const handleCloseModal = (): void => {
        setSelectedEmployee(null);
    };

    /**
     * Filtered employees based on search term and department selection.
     * Filters by name, rate, language, and department.
     * @type {Employee[]}
     */
    const filteredEmployees: Employee[] =
        employees?.filter((employee) => {
            const matchesSearch =
                employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.rate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.language.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDepartment =
                filterDepartment === 'all' || employee.language === filterDepartment;
            return matchesSearch && matchesDepartment;
        }) || [];

    /**
     * Employees grouped by their workload status for statistics display.
     * @type {{ green: Employee[], yellow: Employee[], red: Employee[] }}
     */
    const employeesByStatus: { green: Employee[]; yellow: Employee[]; red: Employee[]; } = {
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
                        <EmployeeCard key={employee.id} employee={employee} onClick={handleEmployeeClick}/>
                    ))
                )}
            </div>

            {selectedEmployee && (
                <EmployeeModal employee={selectedEmployee} onClose={handleCloseModal}/>
            )}
        </div>
    );
};
