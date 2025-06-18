import React from 'react';

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

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
                                                                title,
                                                                value,
                                                                icon,
                                                                color,
                                                                subtitle,
                                                                trend
                                                            }) => {
    return (
        <div className={`analytics-card analytics-card--${color}`}>
            <div className="analytics-card-header">
                <div className="analytics-card-icon">{icon}</div>
                {trend && (
                    <div className={`analytics-card-trend ${trend.isPositive ? 'trend-up' : 'trend-down'}`}>
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
