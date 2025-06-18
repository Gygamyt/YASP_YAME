import React from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';

export interface LayoutProps {
    children: React.ReactNode;
    activeTab: string;
    onTabChange: (tab: string) => void;
    title?: string;
}

export const Layout: React.FC<LayoutProps> = ({
                                                  children,
                                                  activeTab,
                                                  onTabChange,
                                                  title
                                              }) => {
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
