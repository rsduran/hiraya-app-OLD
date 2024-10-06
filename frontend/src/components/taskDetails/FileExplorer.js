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
                    <TreeView.Item id={workloadData.id} defaultExpanded>
                        <TreeView.LeadingVisual>
                            <TreeView.DirectoryIcon />
                        </TreeView.LeadingVisual>
                        {workloadData.name}
                        <TreeView.SubTree>
                            {workloadData.tasks.map((task) => (
                                <TreeView.Item key={task.id} id={task.id}>
                                    <TreeView.LeadingVisual>
                                        <FileIcon />
                                    </TreeView.LeadingVisual>
                                    {task.title}
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