import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    Box,
    ThemeProvider,
    useTheme,
    ActionMenu,
    ActionList,
    Button,
    TextInput,
    Heading,
} from '@primer/react'
import { RepoIcon, PinIcon } from '@primer/octicons-react'
import Navbar from '../common/Navbar'
import Sidebar from '../common/Sidebar'
import ColorModeSwitcher from '../ColorModeSwitcher'

const TaskSet = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [workload, setWorkload] = useState(null)
    const [sortOrder, setSortOrder] = useState('newest')
    const [typeFilter, setTypeFilter] = useState('all')
    const [priorityFilter, setPriorityFilter] = useState('all')
    const { colorMode } = useTheme()
    const { workloadId } = useParams()

    useEffect(() => {
        const fetchWorkload = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/workloads/${workloadId}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch workload')
                }
                const data = await response.json()
                setWorkload(data)
            } catch (error) {
                console.error('Error fetching workload:', error)
            }
        }

        fetchWorkload()
    }, [workloadId])

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    const handleTaskClick = (taskId) => {
        window.open(`/workloads/${workloadId}/tasks/${taskId}`, '_blank')
    }

    const sortTasks = (tasks) => {
        if (sortOrder === 'oldest') {
            return [...tasks].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        } else {
            // 'newest' and 'recently updated' use the same logic for now
            return [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        }
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
                        {workload && (
                            <>
                                <Heading sx={{ mb: 3, fontSize: 4 }}>{workload.name}</Heading>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 3,
                                        flexWrap: 'wrap',
                                        gap: 2,
                                    }}
                                >
                                    <TextInput
                                        aria-label="Find a task"
                                        name="task-search"
                                        placeholder="Find a task..."
                                        sx={{ flex: 1, minWidth: 200 }}
                                    />
                                    <ActionMenu>
                                        <ActionMenu.Button>Type: {typeFilter}</ActionMenu.Button>
                                        <ActionMenu.Overlay>
                                            <ActionList selectionVariant="single">
                                                <ActionList.Item 
                                                    selected={typeFilter === 'all'}
                                                    onSelect={() => setTypeFilter('all')}
                                                >
                                                    All
                                                </ActionList.Item>
                                                <ActionList.Item 
                                                    selected={typeFilter === 'public'}
                                                    onSelect={() => setTypeFilter('public')}
                                                >
                                                    Public
                                                </ActionList.Item>
                                                <ActionList.Item 
                                                    selected={typeFilter === 'private'}
                                                    onSelect={() => setTypeFilter('private')}
                                                >
                                                    Private
                                                </ActionList.Item>
                                            </ActionList>
                                        </ActionMenu.Overlay>
                                    </ActionMenu>
                                    <ActionMenu>
                                        <ActionMenu.Button>Priority: {priorityFilter}</ActionMenu.Button>
                                        <ActionMenu.Overlay>
                                            <ActionList selectionVariant="single">
                                                <ActionList.Item 
                                                    selected={priorityFilter === 'all'}
                                                    onSelect={() => setPriorityFilter('all')}
                                                >
                                                    All
                                                </ActionList.Item>
                                                <ActionList.Item 
                                                    selected={priorityFilter === 'high'}
                                                    onSelect={() => setPriorityFilter('high')}
                                                >
                                                    High
                                                </ActionList.Item>
                                                <ActionList.Item 
                                                    selected={priorityFilter === 'medium'}
                                                    onSelect={() => setPriorityFilter('medium')}
                                                >
                                                    Medium
                                                </ActionList.Item>
                                                <ActionList.Item 
                                                    selected={priorityFilter === 'low'}
                                                    onSelect={() => setPriorityFilter('low')}
                                                >
                                                    Low
                                                </ActionList.Item>
                                            </ActionList>
                                        </ActionMenu.Overlay>
                                    </ActionMenu>
                                    <ActionMenu>
                                        <ActionMenu.Button>Sort: {sortOrder}</ActionMenu.Button>
                                        <ActionMenu.Overlay>
                                            <ActionList selectionVariant="single">
                                                <ActionList.Item 
                                                    selected={sortOrder === 'newest'}
                                                    onSelect={() => setSortOrder('newest')}
                                                >
                                                    Newest
                                                </ActionList.Item>
                                                <ActionList.Item 
                                                    selected={sortOrder === 'oldest'}
                                                    onSelect={() => setSortOrder('oldest')}
                                                >
                                                    Oldest
                                                </ActionList.Item>
                                                <ActionList.Item 
                                                    selected={sortOrder === 'recently updated'}
                                                    onSelect={() => setSortOrder('recently updated')}
                                                >
                                                    Recently updated
                                                </ActionList.Item>
                                            </ActionList>
                                        </ActionMenu.Overlay>
                                    </ActionMenu>
                                    <Button variant="primary">
                                        <RepoIcon />
                                        <Box as="span" sx={{ ml: 2 }}>
                                            New
                                        </Box>
                                    </Button>
                                </Box>
                                <Box>
                                    {sortTasks(workload.tasks).map((task) => (
                                        <Box
                                            key={task.id}
                                            sx={{
                                                borderColor: 'border.default',
                                                borderTopStyle: 'solid',
                                                borderTopWidth: 1,
                                                pt: 3,
                                                pb: 3,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'flex-start',
                                                }}
                                            >
                                                <Box>
                                                    <Box
                                                        as="a"
                                                        href={`/workloads/${workloadId}/tasks/${task.id}`}
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            handleTaskClick(task.id)
                                                        }}
                                                        sx={{
                                                            fontSize: 3,
                                                            fontWeight: 'bold',
                                                            color: 'accent.fg',
                                                            textDecoration: 'none',
                                                            '&:hover': {
                                                                textDecoration: 'underline',
                                                            },
                                                        }}
                                                    >
                                                        {task.title}
                                                    </Box>
                                                    <Box
                                                        as="span"
                                                        sx={{
                                                            ml: 2,
                                                            px: 2,
                                                            py: 1,
                                                            fontSize: 0,
                                                            fontWeight: 'bold',
                                                            borderRadius: '2em',
                                                            bg: 'neutral.muted',
                                                            color: 'fg.muted',
                                                        }}
                                                    >
                                                        {workload.visibility}
                                                    </Box>
                                                    {task.description && (
                                                        <Box sx={{ mt: 2, color: 'fg.muted' }}>
                                                            {task.description}
                                                        </Box>
                                                    )}
                                                </Box>
                                                <Button variant="outline" sx={{ ml: 3 }}>
                                                    <PinIcon />
                                                    <Box as="span" sx={{ ml: 2 }}>
                                                        Pin Task
                                                    </Box>
                                                </Button>
                                            </Box>
                                            <Box sx={{ mt: 3, fontSize: 0, color: 'fg.muted' }}>
                                                <Box
                                                    as="span"
                                                    sx={{
                                                        mr: 3,
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Box
                                                        as="span"
                                                        sx={{
                                                            display: 'inline-block',
                                                            width: 12,
                                                            height: 12,
                                                            borderRadius: '50%',
                                                            backgroundColor: 'gray.5',
                                                            border: '1px solid',
                                                            borderColor: 'border.default',
                                                            mr: 1,
                                                        }}
                                                    />
                                                    Placeholder
                                                </Box>
                                                <Box as="span">Updated {new Date(task.createdAt).toLocaleString()}</Box>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default TaskSet