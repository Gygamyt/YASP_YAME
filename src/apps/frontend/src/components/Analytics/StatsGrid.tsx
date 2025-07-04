import React from 'react';
import { AnalyticsCard } from './AnalyticsCard';
import { Employee } from '@task-tracker/shared/src/types/employee';

/**
 * Props for the StatsGrid component.
 *
 * @interface StatsGridProps
 * @property {Employee[]} employees - Array of employee objects to compute analytics for.
 */
export interface StatsGridProps {
    employees: Employee[];
}

/**
 * StatsGrid component calculates key team analytics metrics (counts, averages, percentages)
 * and renders them as a grid of AnalyticsCard components.
 *
 * @component
 * @param {StatsGridProps} props - Component properties.
 * @param {Employee[]} props.employees - List of employees to analyze.
 * @returns {React.ReactElement} A grid of analytics cards summarizing team metrics.
 *
 * @example
 * ```
 * const employees = [...]; // fetched or mocked data
 * <StatsGrid employees={employees} />;
 * ```
 */
export const StatsGrid: React.FC<StatsGridProps> = ({employees}) => {
    /**
     * Computes aggregated analytics from the employees array.
     * Returns zeroed metrics when the list is empty or undefined.
     *
     * @returns {{
     *   totalEmployees: number;
     *   averageIndex: number;
     *   averageResponseTime: number;
     *   totalActiveRequests: number;
     *   availableCount: number;
     *   busyCount: number;
     *   overloadedCount: number;
     *   loadPercentage: number;
     * }}
     *   Object containing all computed metrics.
     */
    const analyticsData = React.useMemo(() => {
        if (!employees || employees.length === 0) {
            return {
                totalEmployees: 0,
                averageIndex: 0,
                averageResponseTime: 0,
                totalActiveRequests: 0,
                availableCount: 0,
                busyCount: 0,
                overloadedCount: 0,
                loadPercentage: 0
            };
        }

        const statusGroups = {
            available: employees.filter(emp => emp.status === 'green'),
            busy: employees.filter(emp => emp.status === 'yellow'),
            overloaded: employees.filter(emp => emp.status === 'red')
        };

        const totalEmployees = employees.length;
        const averageIndex =
            employees.reduce((sum, emp) => sum + emp.currentIndex, 0) /
            totalEmployees;
        // @ts-ignore: assume responseTime field exists on Employee
        const averageResponseTime = employees.reduce((sum, emp) => sum + emp.responseTime, 0) / totalEmployees;
        // @ts-ignore: assume activeRequests is a number
        const totalActiveRequests = employees.reduce((sum, emp) => sum + emp.activeRequests, 0);
        const loadPercentage =
            ((statusGroups.busy.length + statusGroups.overloaded.length) /
                totalEmployees) *
            100;

        return {
            totalEmployees,
            averageIndex,
            averageResponseTime,
            totalActiveRequests,
            availableCount: statusGroups.available.length,
            busyCount: statusGroups.busy.length,
            overloadedCount: statusGroups.overloaded.length,
            loadPercentage
        };
    }, [employees]);

    /**
     * Configuration for each analytics card to render.
     * Includes title, value, icon, color, and subtitle.
     *
     * @type {Array<{
     *   title: string;
     *   value: string | number;
     *   icon: string;
     *   color: 'primary' | 'info' | 'warning' | 'success' | 'danger';
     *   subtitle: string;
     * }>}
     */
    const statsCards = [
        {
            title: 'Всего сотрудников',
            value: analyticsData.totalEmployees,
            icon: '👥',
            color: 'primary' as const,
            subtitle: 'Активных в системе'
        },
        {
            title: 'Средний индекс загрузки',
            value: analyticsData.averageIndex.toFixed(1),
            icon: '📊',
            color: 'info' as const,
            subtitle: 'По всей команде'
        },
        {
            title: 'Среднее время отклика',
            value: `${analyticsData.averageResponseTime.toFixed(1)}д`,
            icon: '⏱️',
            color: 'warning' as const,
            subtitle: 'На запросы'
        },
        {
            title: 'Активных запросов',
            value: analyticsData.totalActiveRequests,
            icon: '📋',
            color: 'info' as const,
            subtitle: 'В работе'
        },
        {
            title: 'Доступны',
            value: analyticsData.availableCount,
            icon: '✅',
            color: 'success' as const,
            subtitle: 'Готовы к работе'
        },
        {
            title: 'Средняя загрузка',
            value: analyticsData.busyCount,
            icon: '⚠️',
            color: 'warning' as const,
            subtitle: 'Умеренно загружены'
        },
        {
            title: 'Перегружены',
            value: analyticsData.overloadedCount,
            icon: '🔴',
            color: 'danger' as const,
            subtitle: 'Требуют внимания'
        },
        {
            title: 'Коэффициент загрузки',
            value: `${analyticsData.loadPercentage.toFixed(0)}%`,
            icon: '📈',
            color: 'primary' as const,
            subtitle: 'Общая нагрузка команды'
        }
    ];

    return (
        <div className="stats-grid">
            {statsCards.map((card, index) => (
                <AnalyticsCard
                    key={index}
                    title={card.title}
                    value={card.value}
                    icon={card.icon}
                    color={card.color}
                    subtitle={card.subtitle}
                />
            ))}
        </div>
    );
};
