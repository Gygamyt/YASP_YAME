import React from 'react';
import { Employee } from "@task-tracker/shared/src/types/employee";

export interface EmployeeCardProps {
    employee: Employee;
    onClick: (employee: Employee) => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({employee, onClick}) => {
    const handleClick = () => {
        onClick(employee);
    };

    return (
        <div
            className={`employee-card employee-card--${employee.status}`}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleClick();
                }
            }}
        >
            <div className="employee-header">
                <div className="employee-info">
                    <h3>{employee.name}</h3>
                    <p className="employee-position">{employee.position}</p>
                </div>
                <div className="index-score">
                    <div className={`index-value index-value--${employee.status}`}>
                        {employee.currentIndex.toFixed(1)}
                    </div>
                </div>
            </div>

            <div className="employee-stats">
                <div className="stat-item">
                    <span className="stat-value">{employee.activeRequests}</span>
                    <span className="stat-label">Запросы</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{employee.interviewLoad}</span>
                    <span className="stat-label">Собеседования</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{employee.responseTime.toFixed(1)}д</span>
                    <span className="stat-label">Отклик</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{employee.daysSinceLastActivity}д</span>
                    <span className="stat-label">Активность</span>
                </div>
            </div>

            <div className="employee-activity">
                Последняя активность: {employee.lastActivity}
            </div>
        </div>
    );
};
