import React, { useState } from 'react'
import { Box, ThemeProvider, useTheme } from '@primer/react'
import Navbar from '../common/Navbar'
import Sidebar from '../common/Sidebar'
import RepoExplorer from '../components/taskSet/RepoExplorer'
import ColorModeSwitcher from '../ColorModeSwitcher'

const TaskSet = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const { colorMode } = useTheme()

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <ThemeProvider>
            <Box
                sx={{
                    minHeight: '100vh',
                    bg: colorMode === 'day' ? 'canvas.default' : 'canvas.inset',
                    color: 'fg.default',
                }}
            >
                <Box sx={{ position: 'absolute', top: 0, right: 0, p: 3, zIndex: 100 }}>
                    <ColorModeSwitcher />
                </Box>

                <Navbar toggleSidebar={toggleSidebar} />
                <Box position="relative">
                    <Sidebar
                        isSidebarOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                    />
                    <Box
                        sx={{
                            maxWidth: 1280,
                            mx: 'auto',
                            p: 4,
                            position: 'relative',
                        }}
                    >
                        <RepoExplorer />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default TaskSet