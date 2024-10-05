import React from 'react'
import { Button, ThemeProvider, BaseStyles, Box } from '@primer/react'
import { ProjectIcon, PlusIcon, GraphIcon, TasklistIcon, PackageIcon, ListUnorderedIcon } from '@primer/octicons-react'
import { Link } from 'react-router-dom'
import ColorModeSwitcher from './ColorModeSwitcher'

const HirayaLandingPage = () => {
    const handleCreateTask = () => {
        // This function is empty for now, but can be used to add functionality later
        console.log('Create Task button clicked')
    }

    return (
        <ThemeProvider>
            <BaseStyles>
                <Box className="flex flex-col items-center justify-center min-h-screen">
                    <ColorModeSwitcher />
                    <h1 className="text-4xl font-bold mb-8">
                        Welcome to Hiraya
                    </h1>
                    <p className="text-xl mb-8">
                        Streamline your tasks with our powerful management app
                    </p>

                    <Box className="space-y-4">
                        <Button variant="primary" leadingIcon={PlusIcon} onClick={handleCreateTask}>
                            Create Task
                        </Button>
                        <Button as={Link} to="/workloads" variant="primary" leadingIcon={ProjectIcon}>
                            Workloads
                        </Button>
                        <Button as={Link} to="/dashboard" variant="primary" leadingIcon={GraphIcon}>
                            Dashboard
                        </Button>
                        <Button as={Link} to="/taskdetails" variant="primary" leadingIcon={TasklistIcon}>
                            Task Details
                        </Button>
                        <Button as={Link} to="/taskset" variant="primary" leadingIcon={PackageIcon}>
                            Task Set
                        </Button>
                        <Button as={Link} to="/workload-task" variant="primary" leadingIcon={ListUnorderedIcon}>
                            Workload & Task Management
                        </Button>
                    </Box>
                </Box>
            </BaseStyles>
        </ThemeProvider>
    )
}

export default HirayaLandingPage