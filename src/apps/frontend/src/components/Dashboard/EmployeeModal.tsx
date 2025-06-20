import React from 'react';
import './EmployeeModalStyles.css';
import { Employee } from '@task-tracker/shared/src/types/employee';

export interface EmployeeModalProps {
    employee: Employee;
    onClose: () => void;
}

export const EmployeeModal: React.FC<EmployeeModalProps> = ({employee, onClose}) => {
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
            value: 'mock',
            weight: 25,
            description: 'Среднее время ответа на запросы (дни)'
        },
        {
            name: 'interviewLoad',
            label: 'Нагрузка собеседований',
            value: 'mock',
            weight: 25,
            description: 'Количество запланированных собеседований'
        },
        {
            name: 'daysSinceLastActivity',
            label: 'Дни с последней активности',
            value: 'mock',
            weight: 20,
            description: 'Количество дней с момента последней активности'
        }
    ];

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

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
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{employee.name}</h2>
                    <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
                </div>
                <div className="modal-body">
                    <div className="employee-details">
                        <div className="detail-row">
                            <span className="detail-label">Грейд:</span>
                            <span className="detail-value">{employee.rate}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Отдел:</span>
                            <span className="detail-value">{'mock'}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Индекс загрузки:</span>
                            <span
                                className={`detail-value index-badge index-badge--${employee.status}`}>{employee.currentIndex.toFixed(1)}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Последняя активность:</span>
                            <span className="detail-value">{'mock'}</span>
                        </div>
                    </div>

                    <div className="index-factors">
                        <h3>Факторы влияния на индекс</h3>
                        {indexFactors.map(factor => (
                            <div key={factor.name} className="factor-item">
                                <div className="factor-header">
                                    <span className="factor-label">{factor.label}</span>
                                    <span className="factor-weight">{factor.weight}%</span>
                                </div>
                                <div className="factor-value">{'mock'}</div>
                                <div className="factor-description">{factor.description}</div>
                            </div>
                        ))}
                    </div>

                    {employee.skills && employee.skills.length > 0 && (
                        <div className="employee-skills">
                            <h3>Навыки</h3>
                            <div className="skills-list">
                                {employee.skills.map((skill, index) => (
                                    <span key={index} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
