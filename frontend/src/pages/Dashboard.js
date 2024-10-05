import React, { useState } from 'react'
import { Box, useTheme } from '@primer/react'
import Navbar from '../common/Navbar'
import Sidebar from '../common/Sidebar'
import RepositoryList from '../components/dashboard/RepositoryList'
import DashboardContent from '../components/dashboard/DashboardContent'
import ContributionActivity from '../components/dashboard/ContributionActivity'
import ChangelogTimeline from '../components/dashboard/ChangelogTimeline'
import ColorModeSwitcher from '../ColorModeSwitcher'

const Dashboard = () => {
    const { colorMode } = useTheme()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

    const borderColor = 'border.default'

    return (
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

            {isSidebarOpen && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bg: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 20,
                        transition: 'opacity 0.3s ease',
                        opacity: isSidebarOpen ? 1 : 0,
                        pointerEvents: isSidebarOpen ? 'auto' : 'none',
                    }}
                    onClick={toggleSidebar}
                />
            )}

            <Navbar toggleSidebar={toggleSidebar} borderColor={borderColor} />
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                textColor="fg.default"
                borderColor={borderColor}
                sidebarBoxShadow="shadow.medium"
                hoverColor="accent.fg"
            />
            <Box sx={{ display: 'flex', flex: 1 }}>
                <Box
                    sx={{
                        width: '250px',
                        borderRight: '1px solid',
                        borderColor: borderColor,
                        overflowY: 'auto',
                    }}
                >
                    <RepositoryList borderStyle={borderColor} />
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        p: 4,
                    }}
                >
                    <DashboardContent />
                    <Box sx={{ mt: 4, flex: 1 }}>
                        <ContributionActivity />
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: '300px',
                        borderLeft: '1px solid',
                        borderColor: borderColor,
                        p: 3,
                    }}
                >
                    <ChangelogTimeline />
                </Box>
            </Box>
        </Box>
    )
}

export default Dashboard