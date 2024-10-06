import React, { useState, useEffect } from 'react'
import { Box } from '@primer/react'
import { TreeView } from '@primer/react'
import { FileIcon } from '@primer/octicons-react'

const FileExplorer = ({ workloadId, taskId }) => {
    const [workloadData, setWorkloadData] = useState(null)

    useEffect(() => {
        // Fetch workload data
        const fetchWorkloadData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/workloads/${workloadId}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch workload data')
                }
                const data = await response.json()
                setWorkloadData(data)
            } catch (error) {
                console.error('Error fetching workload data:', error)
            }
        }

        fetchWorkloadData()
    }, [workloadId])

    const handleWorkloadClick = () => {
        window.open(`/workloads/${workloadId}`, '_blank')
    }

    const handleTaskClick = (taskId) => {
        window.open(`/workloads/${workloadId}/tasks/${taskId}`, '_blank')
    }

    const hoverStyle = {
        '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer',
        },
    }

    return (
        <Box
            bg="canvas.subtle"
            p={3}
            sx={{
                width: '300px',
                height: '100vh',
                overflowY: 'auto',
                borderRight: '1px solid',
                borderColor: 'border.default',
            }}
        >
            {workloadData && (
                <TreeView aria-label="Files">
                    <TreeView.Item 
                        id={workloadData.id} 
                        defaultExpanded
                        onSelect={handleWorkloadClick}
                    >
                        <TreeView.LeadingVisual>
                            <TreeView.DirectoryIcon />
                        </TreeView.LeadingVisual>
                        <Box as="span" sx={hoverStyle}>
                            {workloadData.name}
                        </Box>
                        <TreeView.SubTree>
                            {workloadData.tasks.map((task) => (
                                <TreeView.Item 
                                    key={task.id} 
                                    id={task.id}
                                    onSelect={() => handleTaskClick(task.id)}
                                >
                                    <TreeView.LeadingVisual>
                                        <FileIcon />
                                    </TreeView.LeadingVisual>
                                    <Box as="span" sx={hoverStyle}>
                                        {task.title}
                                    </Box>
                                </TreeView.Item>
                            ))}
                        </TreeView.SubTree>
                    </TreeView.Item>
                </TreeView>
            )}
        </Box>
    )
}

export default FileExplorer