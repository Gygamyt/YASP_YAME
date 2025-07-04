import React from 'react';
import { Employee } from "@task-tracker/shared/src/types/employee";
import './EmployeeCardStyles.css';

/**
 * Props interface for the EmployeeCard component.
 * @interface EmployeeCardProps
 * @property {Employee} employee - The employee data to display.
 * @property {(employee: Employee) => void} onClick - Callback function triggered when card is clicked.
 */
export interface EmployeeCardProps {
    employee: Employee;
    onClick: (employee: Employee) => void;
}

/**
 * Employee card component that displays employee information in a clickable card format.
 * Shows employee details, workload status, active projects, and skills.
 * Supports both mouse clicks and keyboard navigation (Enter/Space).
 *
 * @component
 * @param {EmployeeCardProps} props - The component props.
 * @param {Employee} props.employee - Employee object containing all employee data.
 * @param {(employee: Employee) => void} props.onClick - Click handler function.
 * @returns {React.ReactElement} A clickable card displaying employee information.
 *
 * @example
 * ```
 * import { EmployeeCard } from './EmployeeCard';
 *
 * const handleEmployeeClick = (employee: Employee) => {
 *   console.log('Employee clicked:', employee.name);
 * };
 *
 * <EmployeeCard
 *   employee={employeeData}
 *   onClick={handleEmployeeClick}
 * />
 * ```
 */
export const EmployeeCard: React.FC<EmployeeCardProps> = ({employee, onClick}: EmployeeCardProps): React.ReactElement => {
    /**
     * Handles click events on the employee card.
     * Triggers the onClick callback with the employee data.
     * @returns {void}
     */
    const handleClick = (): void => {
        onClick(employee);
    };

    return (
        <div className={`employee-card employee-card--${employee.status}`}
             onClick={handleClick}
             role="button"
             tabIndex={0}
             onKeyDown={e => {
                 if (e.key === 'Enter' || e.key === ' ') {
                     handleClick();
                 }
             }}>

            {/* Employee header section with name, position, and workload index */}
            <div className="employee-header">
                <div className="employee-info">
                    <h3>{employee.name}</h3>
                    <p className="employee-position">{employee.rate} | {employee.language}</p>
                </div>
                <div className="index-score">
                    <div className={`index-value index-value--${employee.status}`}>
                        {employee.currentIndex.toFixed(2)}
                    </div>
                </div>
            </div>

            {/* Employee statistics section showing requests and interviews */}
            <div className="employee-stats">
                <div className="stat-item">
                    <span className="stat-value">{employee.activeRequests.length}</span>
                    <span className="stat-label">Requests</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{employee.plannedInterviews}</span>
                    <span className="stat-label">Planned Interviews</span>
                </div>
            </div>

            {/* Active projects section - only shown if employee has active requests */}
            {employee.activeRequests.length > 0 && (
                <div className="employee-projects">
                    <strong>Projects:</strong>
                    <div className="projects-list">
                        {employee.activeRequests.map(project => (
                            <div key={project.id} className={`project-row`}>
                                <span className={`project-status-dot project-status-dot--${project.status}`}></span>
                                <span className="project-name">{project.name}</span>
                                <span className="project-date">{project.submittedAt}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills section - only shown if employee has skills */}
            {employee.skills.length > 0 && (
                <div className="employee-skills">
                    <strong>Skills:</strong>
                    <div className="skills-list">
                        {employee.skills.map((skill, idx) => (
                            <span key={idx} className="skill-tag">{skill}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
