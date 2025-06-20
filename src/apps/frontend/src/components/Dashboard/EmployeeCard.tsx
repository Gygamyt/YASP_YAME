import React from 'react';
import { Employee } from "@task-tracker/shared/src/types/employee";
import './EmployeeCard.css';

export interface EmployeeCardProps {
    employee: Employee;
    onClick: (employee: Employee) => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onClick }) => {
    const handleClick = () => {
        onClick(employee);
    };

    return (
        <div
            className={`employee-card employee-card--${employee.status}`}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleClick();
                }
            }}
        >
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
