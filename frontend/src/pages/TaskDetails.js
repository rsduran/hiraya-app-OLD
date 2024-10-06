import React, { useState, useEffect } from 'react';
import { Box, ThemeProvider, useTheme } from '@primer/react';
import { useParams } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import FileExplorer from '../components/taskDetails/FileExplorer';
import TaskContent from '../components/taskDetails/TaskContent';
import ColorModeSwitcher from '../ColorModeSwitcher';

const TaskDetails = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [taskData, setTaskData] = useState(null);
    const { colorMode } = useTheme();
    const { workloadId, taskId } = useParams();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const fetchTaskData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/workloads/${workloadId}/tasks/${taskId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch task data');
                }
                const data = await response.json();
                setTaskData(data);
            } catch (error) {
                console.error('Error fetching task data:', error);
            }
        };

        if (workloadId && taskId) {
            fetchTaskData();
        }
    }, [workloadId, taskId]);

    return (
        <ThemeProvider>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <Box sx={{ position: 'absolute', top: 0, right: 0, p: 3, zIndex: 100 }}>
                    <ColorModeSwitcher />
                </Box>
                <Navbar toggleSidebar={toggleSidebar} />
                <Box 
                    sx={{ 
                        display: 'flex', 
                        flex: 1, 
                        overflow: 'hidden',
                        bg: colorMode === 'day' ? 'canvas.default' : 'canvas.inset',
                    }}
                >
                    <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                    <FileExplorer workloadId={workloadId} taskId={taskId} />
                    <Box sx={{ flex: 1, overflow: 'auto', padding: 4 }}>
                        {taskData ? (
                            <>
                                <TaskContent taskData={taskData} />
                            </>
                        ) : (
                            <Box>Loading...</Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default TaskDetails;