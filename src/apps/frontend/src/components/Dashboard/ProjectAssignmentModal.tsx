import React, { useState } from 'react';
import { Employee, ProjectStatus } from "@task-tracker/shared/src/types";
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
    const [projectStatus, setProjectStatus] = useState<ProjectStatus>('submitted'); // State for project status
    const [submissionDate, setSubmissionDate] = useState(''); // State for submission date

    // Define possible project statuses for the select dropdown
    const statusOptions: ProjectStatus[] = ['submitted', 'waiting_feedback', 'passed_stage', 'rejected', 'no_updates'];

    const handleSubmit = () => {
        if (!projectName.trim()) {
            alert('Project Name cannot be empty.'); // Using alert for simplicity, consider a better UI notification
            return;
        }
        if (!submissionDate) {
            alert('Submission Date cannot be empty.'); // Using alert for simplicity
            return;
        }
        console.log(`Assigning project '${ projectName }' to employee ${ employee.name } (ID: ${ employee.id })`);
        onClose(); // Close modal after submission
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Assign Project to Employee { employee.name }</h2>
                <div>
                    <label htmlFor="projectName">Project Name:</label>
                    <input
                        id="projectName"
                        type="text"
                        value={ projectName }
                        onChange={ (e) => setProjectName(e.target.value) }
                    />
                </div>
                <div>
                    <label htmlFor="projectStatus">Project Status:</label>
                    <select
                        id="projectStatus"
                        value={projectStatus}
                        onChange={(e) => setProjectStatus(e.target.value as ProjectStatus)}
                    >
                        {statusOptions.map(status => (
                            <option key={status} value={status}>
                                {status.replace(/_/g, ' ').charAt(0).toUpperCase() + status.replace(/_/g, ' ').slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="submissionDate">Submission Date:</label>
                    <input
                        id="submissionDate"
                        type="date"
                        value={submissionDate}
                        onChange={(e) => setSubmissionDate(e.target.value)}
                    />
                </div>
                <div className="modal-actions">
                    <button onClick={ handleSubmit }>Assign Project</button>
                    <button onClick={ onClose }>Cancel</button>
                </div>
            </div>
        </div>
    );
};
