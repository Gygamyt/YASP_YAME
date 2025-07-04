import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Analytics } from './components/Analytics';
import { AddEmployeeForm } from './components/Forms';
import './styles/globals.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

/**
 * Available application tabs.
 */
type TabType = 'dashboard' | 'analytics' | 'add-employee';

/**
 * Main application component that sets up React Query provider,
 * global toaster, and renders content based on the active tab.
 *
 * @component
 * @returns {React.ReactElement} The root app component.
 *
 * @example
 * ```
 * import App from './App';
 * ReactDOM.render(<App />, document.getElementById('root'));
 * ```
 */
function App() {
    /**
     * React Query client instance with default query settings.
     * @constant {QueryClient}
     */
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000,
                refetchOnWindowFocus: false,
                retry: 1,
            },
        },
    });

    /**
     * Currently active tab in the layout.
     */
    const [activeTab, setActiveTab] = useState<TabType>('dashboard');

    /**
     * Handles changing the active tab.
     *
     * @param {TabType} tab - The tab to activate.
     * @returns {void}
     */
    const handleTabChange = (tab: TabType): void => {
        setActiveTab(tab);
    };

    /**
     * Renders the main content based on the selected tab.
     *
     * @returns {React.ReactNode} The component corresponding to the active tab.
     */
    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard/>;
            case 'analytics':
                return <Analytics/>;
            case 'add-employee':
                return (
                    <AddEmployeeForm
                        onSuccess={() => setActiveTab('dashboard')}
                        onCancel={() => setActiveTab('dashboard')}
                    />
                );
            default:
                return <Dashboard/>;
        }
    };

    /**
     * Generates the page title based on the active tab.
     *
     * @returns {string} Page title to display in the header.
     */
    const getPageTitle = (): string => {
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
                <ReactQueryDevtools initialIsOpen={false}/>
            )}
        </QueryClientProvider>
    );
}

export default App;
