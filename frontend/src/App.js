import React from 'react';
import { ThemeProvider, BaseStyles } from '@primer/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HirayaLandingPage from './HirayaLandingPage';
import Dashboard from './pages/Dashboard';
import WorkloadList from './pages/WorkloadList';
import TaskSet from './pages/TaskSet';
import TaskDetails from './pages/TaskDetails';
import WorkloadTaskPage from './pages/WorkloadTaskPage';
import ColorModeSwitcher from './ColorModeSwitcher';

function App() {
    return (
        <ThemeProvider colorMode="auto">
            <BaseStyles>
                <Router>
                    <ColorModeSwitcher />
                    <Routes>
                        <Route path="/" element={<HirayaLandingPage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/workloads" element={<WorkloadList />} />
                        <Route path="/taskset" element={<TaskSet />} />
                        <Route path="/workload-task" element={<WorkloadTaskPage />} />
                        <Route path="/workloads/:workloadId/tasks/:taskId" element={<TaskDetails />} />
                    </Routes>
                </Router>
            </BaseStyles>
        </ThemeProvider>
    );
}

export default App;