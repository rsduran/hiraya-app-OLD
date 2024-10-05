import React, { useState } from 'react'
import { Box, ThemeProvider, useTheme } from '@primer/react'
import Navbar from '../common/Navbar'
import Sidebar from '../common/Sidebar'
import FileExplorer from '../components/taskDetails/FileExplorer'
import PullRequestPage from '../components/taskDetails/PullRequestPage'
import ColorModeSwitcher from '../ColorModeSwitcher'

const TaskDetails = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const { theme, colorMode } = useTheme()

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <ThemeProvider>
            <Box
                sx={{
                    bg: colorMode === 'day' ? 'canvas.default' : 'canvas.inset',
                    height: '100vh',
                    color: 'fg.default',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{ position: 'absolute', top: 0, right: 0, p: 3, zIndex: 100 }}>
                    <ColorModeSwitcher />
                </Box>

                <Navbar toggleSidebar={toggleSidebar} />
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                    textColor="fg.default"
                    borderColor="border.default"
                    sidebarBoxShadow={theme.shadows.shadow.medium}
                    hoverColor="accent.fg"
                />
                <Box
                    sx={{
                        display: 'flex',
                        flex: 1,
                        overflow: 'hidden',
                    }}
                >
                    <FileExplorer />
                    <Box sx={{ flex: 1, overflowY: 'auto' }}>
                        <PullRequestPage />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default TaskDetails