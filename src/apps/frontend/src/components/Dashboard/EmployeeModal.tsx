import React, { useEffect } from 'react';
import './EmployeeModalStyles.css';
import { Employee } from '@task-tracker/shared/src/types/employee';

/**
 * Props for the EmployeeModal component.
 *
 * @interface EmployeeModalProps
 * @property {Employee} employee - The employee data to display.
 * @property {() => void} onClose - Callback to close the modal.
 */
export interface EmployeeModalProps {
    employee: Employee;
    onClose: () => void;
}

/**
 * EmployeeModal displays detailed info about an employee in a centered card.
 * Supports closing via backdrop click, close button, or Escape key.
 *
 * @component
 * @param {EmployeeModalProps} props
 * @returns {React.ReactElement}
 */
export const EmployeeModal: React.FC<EmployeeModalProps> = ({ employee, onClose }: EmployeeModalProps): React.ReactElement => {
    const indexFactors = [
        {
            name: 'activeRequests',
            label: 'Active Requests',
            value: employee.activeRequests.length,
            weight: 30,
            description: `Number of sent CV's`,
        },
        {
            name: 'interviewLoad',
            label: 'Interview Load',
            value: employee.plannedInterviews,
            weight: 25,
            description: 'Number of scheduled interviews'
        },
    ];

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                {/* Header */}
                <div className="modal-header">
                    <h2 id="modal-title" className="modal-title">{employee.name}</h2>
                    <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">×</button>
                </div>

                {/* Body */}
                <div className="modal-body">
                    <div className="modal-details" >
                        <div className="detail-row">
                            <span className="detail-label">Rate:</span>
                            <span className="detail-value">{employee.rate}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Language:</span>
                            <span className="detail-value">{employee.language}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Load Index:</span>
                            <span className={`index-badge index-badge--${employee.status}`}>
                {employee.currentIndex.toFixed(1)}
              </span>
                        </div>
                    </div>

                    <div className="modal-factors">
                        <h3 className="factors-title">Load Factors</h3>
                        {indexFactors.map(f => (
                            <div key={f.name} className="factor-item">
                                <div className="factor-header">
                                    <span className="factor-label">{f.label}</span>
                                    <span className="factor-weight">{f.weight}%</span>
                                </div>
                                <div className="factor-value">{f.value}</div>
                                <div className="factor-description">{f.description}</div>
                            </div>
                        ))}
                    </div>

                    {employee.skills.length > 0 && (
                        <div className="modal-skills">
                            <h3 className="skills-title">Skills</h3>
                            <div className="skills-list">
                                {employee.skills.map((skill, idx) => (
                                    <span key={idx} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
