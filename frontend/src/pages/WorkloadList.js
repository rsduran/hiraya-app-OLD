import React, { useState, useEffect } from 'react'
import { Box, ThemeProvider, useTheme } from '@primer/react'
import Navbar from '../common/Navbar'
import Sidebar from '../common/Sidebar'
import TableHeader from '../components/workloadList/TableHeader'
import SecurityCoverageTable from '../components/workloadList/SecurityCoverageTable'
import { ThemedBox } from '../components/workloadList/StyledComponents'
import ColorModeSwitcher from '../ColorModeSwitcher'

// Helper function to generate random long names
const generateLongName = (prefix) => {
    const adjectives = [
        'Amazing',
        'Innovative',
        'Groundbreaking',
        'Revolutionary',
        'Cutting-edge',
    ]
    const nouns = ['Project', 'Application', 'System', 'Platform', 'Framework']
    return `${prefix} ${
        adjectives[Math.floor(Math.random() * adjectives.length)]
    } ${nouns[Math.floor(Math.random() * nouns.length)]}`
}

// Helper function to generate random files with long names
const generateFiles = () => {
    const fileCount = Math.floor(Math.random() * 3) + 1
    return Array(fileCount)
        .fill()
        .map((_, index) => ({
            name: `${generateLongName('File')}${index + 1}.${
                ['js', 'tsx', 'css'][Math.floor(Math.random() * 3)]
            }`,
        }))
}

// Modified mock data to include files with long names
const mockData = Array(50)
    .fill()
    .map((_, index) => ({
        name: generateLongName(`Repository ${index + 1}`),
        files: generateFiles(),
        type: ['public', 'private', 'internal'][Math.floor(Math.random() * 3)],
        updatedAt: new Date(
            Date.now() - Math.floor(Math.random() * 10000000000)
        ).toISOString(),
        securityFeatures: {
            dependabot:
                Math.random() > 0.5 ? ['alerts', 'security_updates'] : [],
            codeScanning: Math.random() > 0.5 ? ['enabled'] : [],
        },
    }))

const WorkloadList = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [pageIndex, setPageIndex] = useState(0)
    const pageSize = 10
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const { theme, colorMode } = useTheme()

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setData(mockData)
            setLoading(false)
        }

        fetchData()
    }, [])

    return (
        <ThemeProvider>
            <Box display="flex" flexDirection="column" height="100vh">
                <Box sx={{ position: 'absolute', top: 0, right: 0, p: 3, zIndex: 100 }}>
                    <ColorModeSwitcher />
                </Box>

                <Navbar toggleSidebar={toggleSidebar} />
                <Box position="relative" flex={1} overflow="hidden">
                    <Sidebar
                        isSidebarOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                        textColor={theme.colors.fg.default}
                        borderColor={theme.colors.border.default}
                        sidebarBoxShadow={theme.shadows.medium}
                        hoverColor={theme.colors.accent.fg}
                    />
                    <Box
                        overflow="auto"
                        bg={colorMode === 'day' ? theme.colors.canvas.default : theme.colors.canvas.inset}
                        height="100%"
                    >
                        <Box p={4}>
                            <ThemedBox style={{ background: 'transparent' }}>
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
    )
}

export default WorkloadList