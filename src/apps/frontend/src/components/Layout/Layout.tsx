import React from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';

/**
 * Available tabs in the application layout.
 */
type TabType = 'dashboard' | 'analytics' | 'add-employee';

/**
 * Props for the Layout component.
 *
 * @interface LayoutProps
 * @property {React.ReactNode} children - The main content to render within the layout.
 * @property {TabType} activeTab - Currently selected navigation tab.
 * @property {(tab: TabType) => void} onTabChange - Callback invoked when a tab is clicked.
 * @property {string} [title] - Optional title to pass to the Header component.
 */
export interface LayoutProps {
    children: React.ReactNode;
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
    title?: string;
}

/**
 * Layout component that composes the Header, Navigation, and main content area.
 *
 * @component
 * @param {LayoutProps} props - The props for the component.
 * @param {React.ReactNode} props.children - Content rendered inside the layout.
 * @param {TabType} props.activeTab - Currently active navigation tab.
 * @param {(tab: TabType) => void} props.onTabChange - Function to handle tab changes.
 * @param {string} [props.title] - Optional title displayed in the Header.
 * @returns {React.ReactElement} The rendered layout.
 *
 * @example
 * ```
 * <Layout
 *   activeTab="dashboard"
 *   onTabChange={setActiveTab}
 *   title="Task Tracker Dashboard"
 * >
 *   <Dashboard />
 * </Layout>
 * ```
 */
export const Layout: React.FC<LayoutProps> = ({
                                                  children,
                                                  activeTab,
                                                  onTabChange,
                                                  title
                                              }: LayoutProps): React.ReactElement => {
    return (
        <div className="layout">
            <Header title={title} />
            <Navigation activeTab={activeTab} onTabChange={onTabChange} />
            <main className="layout-main">
                <div className="layout-content">
                    {children}
                </div>
            </main>
        </div>
    );
};
