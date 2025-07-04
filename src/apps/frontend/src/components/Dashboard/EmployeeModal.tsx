import React, { useEffect, useRef, useState } from 'react';
import './EmployeeModalStyles.css';
import { Employee } from '@task-tracker/shared/src/types/employee';

/**
 * Props for the EmployeeModal component.
 *
 * @interface EmployeeModalProps
 * @property {Employee} employee - The employee object whose details are displayed.
 * @property {() => void} onClose - Callback invoked to close the modal.
 */
export interface EmployeeModalProps {
    employee: Employee;
    onClose: () => void;
}

/**
 * EmployeeModal displays detailed information about an employee in a centered card overlay.
 * It supports an accordion for the "Active Requests" factor, showing a list of submitted projects.
 *
 * @component
 * @param {EmployeeModalProps} props
 * @param {Employee} props.employee - The employee data to display.
 * @param {() => void} props.onClose - Function to call when closing the modal.
 * @returns {React.ReactElement} The rendered EmployeeModal component.
 *
 * @example
 * ```
 * <EmployeeModal employee={selectedEmployee} onClose={handleClose} />
 * ```
 */
export const EmployeeModal: React.FC<EmployeeModalProps> = ({employee, onClose}) => {
    /**
     * Name of the currently expanded factor section.
     */
    const [expanded, setExpanded] = useState<string | null>(null);

    /**
     * Refs to each accordion content container, keyed by factor name.
     */
    const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

    /**
     * Measured heights of each accordion content for smooth expand/collapse.
     */
    const [contentHeights, setContentHeights] = useState<Record<string, number>>({});

    /**
     * Calculate and store the scrollHeight of each accordion section
     * whenever the number of active requests changes.
     */
    useEffect(() => {
        const heights: Record<string, number> = {};
        Object.entries(contentRefs.current).forEach(([name, el]) => {
            if (el) heights[name] = el.scrollHeight;
        });
        setContentHeights(heights);
    }, [employee.activeRequests.length]);

    /**
     * Configuration of factors displayed in the accordion. Mock data.
     */
    const indexFactors = [
        {
            name: 'activeRequests',
            label: 'Active Requests',
            value: employee.activeRequests.length,
            weight: 30,
            description: `Number of sent CV's`,
            expandable: true,
        },
        {
            name: 'interviewLoad',
            label: 'Interview Load',
            value: employee.plannedInterviews,
            weight: 25,
            description: 'Number of scheduled interviews',
            expandable: false,
        },
    ];

    /**
     * Toggle the expanded state for a given factor.
     *
     * @param {string} factorName - The key of the factor to toggle.
     * @returns {void}
     */
    const handleFactorClick = (factorName: string) => {
        setExpanded(expanded === factorName ? null : factorName);
    };

    /**
     * Handles clicks on the backdrop to close the modal when clicking outside content.
     *
     * @param {React.MouseEvent<HTMLDivElement>} e - The click event.
     */
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    /**
     * Close the modal when the Escape key is pressed.
     */
    useEffect(() => {
        const onEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onEsc);
        return () => document.removeEventListener('keydown', onEsc);
    }, [onClose]);

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-card" role="dialog" aria-modal="true">
                {/* Header */}
                <div className="modal-header">
                    <h2 className="modal-title">{employee.name}</h2>
                    <button
                        className="modal-close-btn"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                {/* Body */}
                <div className="modal-body">
                    {/* Details */}
                    <div className="modal-details section--highlight">
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
                            <span
                                className={`index-badge index-badge--${employee.status}`}
                            >
                {employee.currentIndex.toFixed(1)}
              </span>
                        </div>
                    </div>

                    {/* Factors with Accordion */}
                    <div className="modal-factors section--highlight-alt">
                        <h3 className="factors-title">Load Factors</h3>
                        {indexFactors.map((f) => (
                            <div key={f.name} className="factor-item">
                                <div
                                    className={`factor-header ${
                                        f.expandable ? 'factor-header--clickable' : ''
                                    }`}
                                    onClick={() => f.expandable && handleFactorClick(f.name)}
                                >
                                    <div className="factor-left">
                                        <span className="factor-label">{f.label}</span>
                                    </div>
                                    <div className="factor-right">
                                        <span className="factor-value">{f.value}</span>
                                        {f.expandable && (
                                            <span className="factor-toggle-icon">
                        {expanded === f.name ? '▼' : '▶'}
                      </span>
                                        )}
                                    </div>
                                </div>

                                {/* Accordion content */}
                                <div
                                    ref={(el) => (contentRefs.current[f.name] = el)}
                                    className={`factor-expanded-content${
                                        expanded === f.name ? ' is-open' : ''
                                    }`}
                                    style={{
                                        height:
                                            expanded === f.name
                                                ? `${contentHeights[f.name]}px`
                                                : '0px',
                                    }}
                                >
                                    {employee.activeRequests.length === 0 ? (
                                        <div className="no-projects">No active requests</div>
                                    ) : (
                                        employee.activeRequests.map((proj) => (
                                            <div key={proj.id} className="project-item">
                                                <div className="project-row">
                                                    <span className="project-name-accordion">{proj.name}</span><span
                                                    className="project-date-accordion">Date of sending CV:{' '}{new Date(proj.submittedAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className="factor-description">{f.description}</div>
                            </div>
                        ))}
                    </div>

                    {/* Skills */}
                    {employee.skills.length > 0 && (
                        <div className="modal-skills section--highlight">
                            <h3 className="skills-title">Skills</h3>
                            <div className="skills-list">
                                {employee.skills.map((skill, idx) => (<span key={idx} className="skill-tag">{skill}</span>))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
