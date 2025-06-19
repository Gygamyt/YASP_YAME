import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Analytics } from './components/Analytics';
import { AddEmployeeForm } from './components/Forms';
import './styles/globals.css';
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Toaster} from "react-hot-toast";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

type TabType = 'dashboard' | 'analytics' | 'add-employee';

function App() {
    const [activeTab, setActiveTab] = useState<TabType>('dashboard');

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard />;
            case 'analytics':
                return <Analytics />;
            case 'add-employee':
                return (
                    <AddEmployeeForm
                        onSuccess={() => setActiveTab('dashboard')}
                        onCancel={() => setActiveTab('dashboard')}
                    />
                );
            default:
                return <Dashboard />;
        }
    };

    const getPageTitle = () => {
        switch (activeTab) {
            case 'dashboard':
                return 'Дашборд загрузки сотрудников';
            case 'analytics':
                return 'Аналитика команды';
            case 'add-employee':
                return 'Добавление сотрудника';
            default:
                return 'Task Tracker';
        }
    };

    return (
        <QueryClientProvider client={queryClient}>
            <Layout
                activeTab={activeTab}
                onTabChange={handleTabChange}
                title={getPageTitle()}
            >
                {renderContent()}
            </Layout>

            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: 'var(--color-surface)',
                        color: 'var(--color-text)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-base)',
                        fontSize: 'var(--font-size-sm)',
                    },
                    success: {
                        iconTheme: {
                            primary: 'var(--color-success)',
                            secondary: 'white',
                        },
                        style: {
                            border: '1px solid var(--color-success)',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: 'var(--color-error)',
                            secondary: 'white',
                        },
                        style: {
                            border: '1px solid var(--color-error)',
                        },
                    },
                }}
            />

            {process.env.NODE_ENV === 'development' && (
                <ReactQueryDevtools
                    initialIsOpen={false}
                />
            )}

        </QueryClientProvider>
    );
}

export default App;
