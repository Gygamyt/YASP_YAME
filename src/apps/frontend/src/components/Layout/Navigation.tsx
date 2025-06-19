import React from 'react';

// Define TabType consistently with other components
type TabType = 'dashboard' | 'analytics' | 'add-employee';

export interface NavigationProps {
    activeTab: TabType; // Change from string to TabType
    onTabChange: (tab: TabType) => void; // Change from string to TabType
}

export interface NavItem {
    id: TabType; // Change from string to TabType
    label: string;
    icon: React.ReactNode;
    badge?: number;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
    // Navigation items configuration with proper typing
    const navItems: NavItem[] = [
        {
            id: 'dashboard',
            label: 'Дашборд',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z" />
                </svg>
            )
        },
        {
            id: 'analytics',
            label: 'Аналитика',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22,21H2V3H4V19H6V17H10V19H12V16H16V19H18V17H22V21Z" />
                </svg>
            )
        },
        {
            id: 'add-employee',
            label: 'Добавить сотрудника',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z" />
                </svg>
            )
        }
    ];

    return (
        <nav className="navigation">
            <div className="nav-container">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        className={`nav-item ${activeTab === item.id ? 'nav-item--active' : ''}`}
                        onClick={() => onTabChange(item.id)}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                        {item.badge && (
                            <span className="nav-badge">{item.badge}</span>
                        )}
                    </button>
                ))}
            </div>
        </nav>
    );
};
