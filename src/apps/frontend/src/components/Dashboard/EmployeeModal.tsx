import React from 'react';
import './EmployeeModalStyles.css';
import { Employee } from '@task-tracker/shared/src/types/employee';

/**
 * Props interface for the EmployeeModal component.
 * @interface EmployeeModalProps
 * @property {Employee} employee - The employee data to display in the modal.
 * @property {() => void} onClose - Callback function to close the modal.
 */
export interface EmployeeModalProps {
    employee: Employee;
    onClose: () => void;
}

/**
 * EmployeeModal component displays detailed information about an employee,
 * including workload index factors and skills. Supports closing via backdrop click,
 * close button, or Escape key.
 *
 * @component
 * @param {EmployeeModalProps} props - The props for the component.
 * @param {Employee} props.employee - The employee object to display.
 * @param {() => void} props.onClose - Function to call when closing the modal.
 * @returns {React.ReactElement} The modal dialog with employee details.
 *
 * @example
 * ```
 * <EmployeeModal employee={selectedEmployee} onClose={handleClose} />
 * ```
 */
export const EmployeeModal: React.FC<EmployeeModalProps> = ({ employee, onClose }: EmployeeModalProps): React.ReactElement => {
    /**
     * Defines the list of factors influencing the workload index.
     */
    const indexFactors = [
        {
            name: 'activeRequests',
            label: 'Active Requests',
            value: employee.activeRequests,
            weight: 30,
            description: 'Number of active tasks in progress'
        },
        {
            name: 'responseTime',
            label: 'Response Time',
            value: 'mock',
            weight: 25,
            description: 'Average response time to requests (days)'
        },
        {
            name: 'interviewLoad',
            label: 'Interview Load',
            value: 'mock',
            weight: 25,
            description: 'Number of scheduled interviews'
        },
        {
            name: 'daysSinceLastActivity',
            label: 'Days Since Last Activity',
            value: 'mock',
            weight: 20,
            description: 'Number of days since last activity'
        }
    ];

    /**
     * Handles clicks on the backdrop to close the modal when clicking outside content.
     * @param {React.MouseEvent<HTMLDivElement>} e - The click event.
     * @returns {void}
     */
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    React.useEffect(() => {
        /**
         * Handles Escape key press to close the modal.
         * @param {KeyboardEvent} e - The keyboard event.
         */
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
                {/* Header with employee name and close button */}
                <div className="modal-header">
                    <h2>{employee.name}</h2>
                    <button
                        className="modal-close"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        ×
                    </button>
                </div>

                {/* Body with details, index factors, and skills */}
                <div className="modal-body">
                    <div className="employee-details">
                        <div className="detail-row">
                            <span className="detail-label">Rate:</span>
                            <span className="detail-value">{employee.rate}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Department:</span>
                            <span className="detail-value">{/* mock */ 'mock'}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Load Index:</span>
                            <span className={`detail-value index-badge index-badge--${employee.status}`}>
                                {employee.currentIndex.toFixed(1)}
                            </span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Last Activity:</span>
                            <span className="detail-value">{/* mock */ 'mock'}</span>
                        </div>
                    </div>

                    <div className="index-factors">
                        <h3>Index Impact Factors</h3>
                        {indexFactors.map(factor => (
                            <div key={factor.name} className="factor-item">
                                <div className="factor-header">
                                    <span className="factor-label">{factor.label}</span>
                                    <span className="factor-weight">{factor.weight}%</span>
                                </div>
                                <div className="factor-value">{/* mock */ 'mock'}</div>
                                <div className="factor-description">{factor.description}</div>
                            </div>
                        ))}
                    </div>

                    {employee.skills && employee.skills.length > 0 && (
                        <div className="employee-skills">
                            <h3>Skills</h3>
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
