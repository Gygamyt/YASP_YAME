import React from 'react';
import { Employee } from '@task-tracker/shared/src/types/employee';

export interface EmployeeModalProps {
    employee: Employee;
    onClose: () => void;
}

export const EmployeeModal: React.FC<EmployeeModalProps> = ({ employee, onClose }) => {
    // Index calculation factors with weights
    const indexFactors = [
        {
            name: 'activeRequests',
            label: 'Активные запросы',
            value: employee.activeRequests,
            weight: 30,
            description: 'Количество активных задач в работе'
        },
        {
            name: 'responseTime',
            label: 'Время отклика',
            value: employee.responseTime,
            weight: 25,
            description: 'Среднее время ответа на запросы (дни)'
        },
        {
            name: 'interviewLoad',
            label: 'Нагрузка собеседований',
            value: employee.interviewLoad,
            weight: 25,
            description: 'Количество запланированных собеседований'
        },
        {
            name: 'daysSinceLastActivity',
            label: 'Дни с последней активности',
            value: employee.daysSinceLastActivity,
            weight: 20,
            description: 'Количество дней с момента последней активности'
        }
    ];

    // Handle backdrop click
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Handle escape key
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{employee.name}</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <div className="modal-body">
                    {/* Employee Info */}
                    <div className="employee-details">
                        <div className="detail-row">
                            <span className="detail-label">Должность:</span>
                            <span className="detail-value">{employee.position}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Отдел:</span>
                            <span className="detail-value">{employee.department}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Индекс загрузки:</span>
                            <span className={`detail-value index-badge index-badge--${employee.status}`}>
                {employee.currentIndex.toFixed(1)}
              </span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Последняя активность:</span>
                            <span className="detail-value">{employee.lastActivity}</span>
                        </div>
                    </div>

                    {/* Index Factors */}
                    <div className="index-factors">
                        <h3>Факторы влияния на индекс</h3>
                        {indexFactors.map(factor => (
                            <div key={factor.name} className="factor-item">
                                <div className="factor-header">
                                    <span className="factor-label">{factor.label}</span>
                                    <span className="factor-weight">{factor.weight}%</span>
                                </div>
                                <div className="factor-value">{factor.value}</div>
                                <div className="factor-description">{factor.description}</div>
                            </div>
                        ))}
                    </div>

                    {/* Skills */}
                    {employee.skills && employee.skills.length > 0 && (
                        <div className="employee-skills">
                            <h3>Навыки</h3>
                            <div className="skills-list">
                                {employee.skills.map((skill, index) => (
                                    <span key={index} className="skill-tag">
                    {skill}
                  </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
