import React from 'react';

/**
 * Props for the AnalyticsCard component.
 *
 * @interface AnalyticsCardProps
 * @property {string} title - The main title displayed on the card.
 * @property {string | number} value - The primary value or metric shown.
 * @property {string} icon - Icon element or markup to display in the header.
 * @property {'primary' | 'success' | 'warning' | 'danger' | 'info'} color -
 *   Color theme of the card, mapping to contextual statuses.
 * @property {string} [subtitle] - Optional subtitle or description below the title.
 * @property {{ value: number; isPositive: boolean }} [trend] - Optional trend indicator:
 *   value is the percentage change, isPositive determines direction arrow.
 */
export interface AnalyticsCardProps {
    title: string;
    value: string | number;
    icon: string;
    color: 'primary' | 'success' | 'warning' | 'danger' | 'info';
    subtitle?: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

/**
 * AnalyticsCard component renders a styled card for displaying a single analytics metric.
 * Supports an icon, value, title, optional subtitle, and an optional trend indicator.
 *
 * @component
 * @param {AnalyticsCardProps} props - Component props.
 * @param {string} props.title - Main heading of the card.
 * @param {string | number} props.value - Numeric or textual metric to display.
 * @param {string} props.icon - Icon markup or element.
 * @param {'primary' | 'success' | 'warning' | 'danger' | 'info'} props.color - Theme color.
 * @param {string} [props.subtitle] - Additional description below the title.
 * @param {{ value: number; isPositive: boolean }} [props.trend] - Trend data for percentage change.
 * @returns {React.ReactElement} The rendered analytics card.
 *
 * @example
 * ```
 * <AnalyticsCard
 *   title="Total Users"
 *   value={1250}
 *   icon="<UserIcon />"
 *   color="info"
 *   subtitle="Compared to last week"
 *   trend={{ value: 12.5, isPositive: true }}
 * />
 * ```
 */
export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
                                                                title,
                                                                value,
                                                                icon,
                                                                color,
                                                                subtitle,
                                                                trend
                                                            }: AnalyticsCardProps): React.ReactElement => {
    return (
        <div className={`analytics-card analytics-card--${color}`}>
            <div className="analytics-card-header">
                <div className="analytics-card-icon">{icon}</div>
                {trend && (
                    <div
                        className={`analytics-card-trend ${
                            trend.isPositive ? 'trend-up' : 'trend-down'
                        }`}
                    >
                        {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
                    </div>
                )}
            </div>

            <div className="analytics-card-content">
                <div className="analytics-card-value">{value}</div>
                <div className="analytics-card-title">{title}</div>
                {subtitle && (
                    <div className="analytics-card-subtitle">{subtitle}</div>
                )}
            </div>
        </div>
    );
};
