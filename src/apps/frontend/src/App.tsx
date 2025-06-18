import {useState} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {Header} from './components/Layout';
import {Dashboard} from './components/Dashboard';
import {Analytics} from './components/Analytics';
import {AddEmployeeForm} from './components/Forms';
import './styles/globals.css';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 10 * 60 * 1000, // 10 minutes
        },
    },
});

type TabType = 'dashboard' | 'analytics' | 'add-employee';

function App() {
    const [activeTab, setActiveTab] = useState<TabType>('dashboard');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard/>;
            case 'analytics':
                return <Analytics/>;
            case 'add-employee':
                return <AddEmployeeForm/>;
            default:
                return <Dashboard/>;
        }
    };

    return (
        <QueryClientProvider client={queryClient}>
            <div className="app">
                <Header/>
                <div className="container">
                    <nav className="nav">
                        <button
                            className={`nav__btn btn ${activeTab === 'dashboard' ? 'active' : 'btn--secondary'}`}
                            onClick={() => setActiveTab('dashboard')}
                        >
                            Дашборд
                        </button>
                        <button
                            className={`nav__btn btn ${activeTab === 'analytics' ? 'active' : 'btn--secondary'}`}
                            onClick={() => setActiveTab('analytics')}
                        >
                            Аналитика
                        </button>
                        <button
                            className={`nav__btn btn ${activeTab === 'add-employee' ? 'active' : 'btn--secondary'}`}
                            onClick={() => setActiveTab('add-employee')}
                        >
                            Добавить сотрудника
                        </button>
                    </nav>

                    <main className="tab-content active">
                        {renderTabContent()}
                    </main>
                </div>
            </div>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
}

export default App;
