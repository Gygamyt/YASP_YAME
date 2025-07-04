import React from 'react';

/**
 * Available navigation tabs.
 */
type TabType = 'dashboard' | 'analytics' | 'add-employee';

/**
 * Props for the Navigation component.
 *
 * @interface NavigationProps
 * @property {TabType} activeTab - Currently selected navigation tab.
 * @property {(tab: TabType) => void} onTabChange - Callback invoked when a tab is clicked.
 */
export interface NavigationProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

/**
 * Describes a single navigation item.
 *
 * @interface NavItem
 * @property {TabType} id - Unique identifier for the tab (must match TabType).
 * @property {string} label - Display text for the navigation item.
 * @property {React.ReactNode} icon - Icon to render alongside the label.
 * @property {number} [badge] - Optional badge count to display.
 */
export interface NavItem {
    id: TabType;
    label: string;
    icon: React.ReactNode;
    badge?: number;
}

/**
 * Navigation component that renders a set of tab buttons.
 * Highlights the active tab and notifies parent of tab changes.
 *
 * @component
 * @param {NavigationProps} props - Component props.
 * @param {TabType} props.activeTab - The currently active tab.
 * @param {(tab: TabType) => void} props.onTabChange - Handler called when a tab button is clicked.
 * @returns {React.ReactElement} The rendered navigation bar.
 *
 * @example
 * ```
 * <Navigation
 *   activeTab="dashboard"
 *   onTabChange={(tab) => console.log('Switched to', tab)}
 * />
 * ```
 */
export const Navigation: React.FC<NavigationProps> = ({activeTab, onTabChange}: NavigationProps): React.ReactElement => {
    /**
     * List of navigation items to render.
     * @type {NavItem[]}
     */
    const navItems: NavItem[] = [
        {
            id: 'dashboard',
            label: 'Дашборд',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z"/>
                </svg>
            )
        },
        {
            id: 'analytics',
            label: 'Аналитика',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22,21H2V3H4V19H6V17H10V19H12V16H16V19H18V17H22V21Z"/>
                </svg>
            )
        },
        {
            id: 'add-employee',
            label: 'Добавить сотрудника',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z"/>
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
                        {item.badge != null && (
                            <span className="nav-badge">{item.badge}</span>
                        )}
                    </button>
                ))}
            </div>
        </nav>
    );
};
