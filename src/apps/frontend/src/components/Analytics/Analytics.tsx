import React from 'react';
import { useEmployees } from '../../hooks/useEmployees';
import { StatsGrid } from './StatsGrid';

export const Analytics: React.FC = () => {
    const { data: employees, isLoading, error } = useEmployees();

    if (isLoading) {
        return (
            <div className="analytics-loading">
                <div className="loading-spinner"></div>
                <p>Загрузка аналитических данных...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="analytics-error">
                <h3>Ошибка загрузки аналитики</h3>
                <p>Не удалось загрузить аналитические данные</p>
                <button onClick={() => window.location.reload()} className="btn btn--primary">
                    Попробовать снова
                </button>
            </div>
        );
    }

    return (
        <div className="analytics">
            <div className="analytics-header">
                <h1>Аналитика команды</h1>
                <p className="analytics-subtitle">
                    Обзор загрузки и производительности сотрудников
                </p>
            </div>

            <StatsGrid employees={employees || []} />
        </div>
    );
};
