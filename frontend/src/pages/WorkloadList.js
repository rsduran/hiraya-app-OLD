import React, { useState, useEffect } from 'react';
import { Box, useTheme, ThemeProvider } from '@primer/react';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import TableHeader from '../components/workloadList/TableHeader';
import SecurityCoverageTable from '../components/workloadList/SecurityCoverageTable';
import { ThemedBox } from '../components/workloadList/StyledComponents';
import ColorModeSwitcher from '../ColorModeSwitcher';
import { io } from 'socket.io-client';

const WorkloadList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageIndex, setPageIndex] = useState(0);
    const pageSize = 10;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { colorMode } = useTheme();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const fetchWorkloads = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/workloads');
            if (!response.ok) {
                throw new Error('Failed to fetch workloads');
            }
            const workloads = await response.json();
            setData(workloads);
        } catch (error) {
            console.error('Error fetching workloads:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkloads();

        const socket = io('http://localhost:5000');

        socket.on('connect', () => {
            console.log('Connected to WebSocket');
        });

        socket.on('workload_updated', () => {
            console.log('Workload updated');
            fetchWorkloads();
        });

        socket.on('task_added', () => {
            console.log('Task added');
            fetchWorkloads();
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <ThemeProvider>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    bg: colorMode === 'day' ? 'canvas.default' : 'canvas.inset',
                    color: 'fg.default',
                    position: 'relative',
                }}
            >
                <Box sx={{ position: 'absolute', top: 0, right: 0, p: 3, zIndex: 100 }}>
                    <ColorModeSwitcher />
                </Box>

                <Navbar toggleSidebar={toggleSidebar} />

                <Box position="relative" flex={1} overflow="hidden">
                    <Sidebar
                        isSidebarOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                    />
                    <Box
                        sx={{
                            overflow: 'auto',
                            bg: colorMode === 'day' ? 'canvas.default' : 'canvas.inset', // Ensure this is consistent
                            height: '100%',
                        }}
                    >
                        <Box p={4}>
                            <ThemedBox>
                                <TableHeader />
                                <SecurityCoverageTable
                                    data={data}
                                    loading={loading}
                                    pageIndex={pageIndex}
                                    pageSize={pageSize}
                                    setPageIndex={setPageIndex}
                                />
                            </ThemedBox>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default WorkloadList;
