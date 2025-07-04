import React from 'react';
import { useEmployees } from '../../hooks/useEmployees';
import { StatsGrid } from './StatsGrid';

/**
 * Analytics component that displays team workload and performance metrics.
 * Fetches employee data and renders loading, error, or analytics view states.
 *
 * @component
 * @returns {React.ReactElement} The analytics dashboard component.
 *
 * @example
 * ```
 * <Analytics />
 * ```
 */
export const Analytics: React.FC = (): React.ReactElement => {
    /**
     * Hook to fetch employees data.
     */
    const { data: employees, isLoading, error } = useEmployees();

    if (isLoading) {
        return (
            <div className="analytics-loading">
                <div className="loading-spinner"></div>
                <p>Loading analytics data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="analytics-error">
                <h3>Error loading analytics</h3>
                <p>Unable to fetch analytics data</p>
                <button
                    onClick={() => window.location.reload()}
                    className="btn btn--primary"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="analytics">
            {/* Header section with title and subtitle */}
            <div className="analytics-header">
                <h1>Team Analytics</h1>
                <p className="analytics-subtitle">
                    Overview of employee workload and performance
                </p>
            </div>

            {/* StatsGrid visualizes statistics for the provided employee list */}
            <StatsGrid employees={employees || []} />
        </div>
    );
};
