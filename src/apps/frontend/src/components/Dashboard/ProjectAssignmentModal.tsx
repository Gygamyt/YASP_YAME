import React, { useState, useEffect, useRef } from 'react';
import { Employee, RequestStatus } from "@task-tracker/shared/src/types";
import './ProjectAssignmentModalStyles.css';

/**
 * Props for the ProjectAssignmentModal component.
 * @interface ProjectAssignmentModalProps
 * @property {Employee} employee - The employee object to assign the project to.
 * @property {() => void} onClose - Callback function to close the modal.
 */
export interface ProjectAssignmentModalProps {
    employee: Employee;
    onClose: () => void;
}

/**
 * Modal component for assigning a project to an employee.
 *
 * @component
 * @param {ProjectAssignmentModalProps} props - The component props.
 * @returns {React.ReactElement} The project assignment modal.
 */
export const ProjectAssignmentModal: React.FC<ProjectAssignmentModalProps> = ({
                                                                                  employee,
                                                                                  onClose,
                                                                              }: ProjectAssignmentModalProps): React.ReactElement => {
    const [projectName, setProjectName] = useState('');
    const [projectStatus, setProjectStatus] = useState<RequestStatus>('submitted');
    const [submissionDate, setSubmissionDate] = useState('');

    // Refs for proper focus management
    const modalRef = useRef<HTMLDivElement>(null);
    const firstInputRef = useRef<HTMLInputElement>(null);

    // Define possible project statuses for the select dropdown
    const statusOptions: RequestStatus[] = ['submitted', 'waiting_feedback', 'passed_stage', 'rejected', 'no_updates'];

    const handleSubmit = () => {
        if (!projectName.trim()) {
            alert('Request Name cannot be empty.'); // Using alert for simplicity, consider a better UI notification
            return;
        }
        if (!submissionDate) {
            alert('Submission Date cannot be empty.'); // Using alert for simplicity
            return;
        }
        console.log(`Assigning Request '${projectName}' to employee ${employee.name} (ID: ${employee.id})`);
        onClose(); // Close modal after submission
    };

    /**
     * Handle keyboard events for modal
     */
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            onClose();
        }
    };

    /**
     * Focus management when modal opens
     */
    useEffect(() => {
        // Set focus to the modal container initially
        if (modalRef.current) {
            modalRef.current.focus();
        }

        // Optional: Focus first input after a slight delay
        const timer = setTimeout(() => {
            if (firstInputRef.current) {
                firstInputRef.current.focus();
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    /**
     * Format status text for display
     */
    const formatStatusText = (status: string): string => {
        return status
            .replace(/_/g, ' ')
            .charAt(0).toUpperCase() + status.replace(/_/g, ' ').slice(1);
    };

    return (
        <div className="modal-overlay">
            <div
                className="modal"
                ref={modalRef}
                tabIndex={-1}
                onKeyDown={handleKeyDown}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <h2 id="modal-title">
                    Assign Request to Employee {employee.name}
                </h2>

                <div className="form-group">
                    <label className="form-label" htmlFor="requestName">
                        Project Name:
                    </label>
                    <input
                        ref={firstInputRef}
                        className="form-control"
                        id="requestName"
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="projectStatus">
                        Project Status:
                    </label>
                    <select
                        className="form-control"
                        id="projectStatus"
                        value={projectStatus}
                        onChange={(e) => setProjectStatus(e.target.value as RequestStatus)}
                    >
                        {statusOptions.map((status) => (
                            <option key={status} value={status}>
                                {formatStatusText(status)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="submissionDate">
                        Submission Date:
                    </label>
                    <input
                        className="form-control"
                        id="submissionDate"
                        type="date"
                        value={submissionDate}
                        onChange={(e) => setSubmissionDate(e.target.value)}
                    />
                </div>

                <div className="modal-actions">
                    <button
                        className="btn btn--assign-project"
                        onClick={handleSubmit}
                    >
                        Assign Project
                    </button>
                    <button
                        className="btn btn--cancel"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
