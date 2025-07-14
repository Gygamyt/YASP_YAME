/**
 * Project’s review status. todo add more variants and update components for them
 */
export type RequestStatus =
    | 'submitted'
    | 'waiting_feedback'
    | 'passed_stage'
    | 'rejected'
    | 'no_updates';

/**
 * Details about a project.
 * @interface ProjectDetails
 * @property {number} id - Unique project identifier. todo add GUID generation
 * @property {string} submittedAt - Submission date in ISO format.
 * @property {RequestStatus} status - Current project status.
 * @property {string} name - Project name.
 * todo add optional parameters e.g. sale manager or something
 * todo also do not forget to update components
 */
export interface ProjectDetails {
    id: number;
    submittedAt: string;
    status: RequestStatus;
    name: string;
}
