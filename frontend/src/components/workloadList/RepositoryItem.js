import React, { useState, useEffect } from 'react';
import { Box, Link, useTheme } from '@primer/react';
import { FileIcon, ChevronDownIcon, ChevronRightIcon } from '@primer/octicons-react';
import { StyledIconButton, StyledFileLink } from './StyledComponents';

const RepositoryItem = ({ row }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        const expandedWorkloads = JSON.parse(localStorage.getItem('expandedWorkloads') || '{}');
        setIsOpen(!!expandedWorkloads[row.id]);
    }, [row.id]);

    const toggleTree = (e) => {
        e.stopPropagation();
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        
        const expandedWorkloads = JSON.parse(localStorage.getItem('expandedWorkloads') || '{}');
        if (newIsOpen) {
            expandedWorkloads[row.id] = true;
        } else {
            delete expandedWorkloads[row.id];
        }
        localStorage.setItem('expandedWorkloads', JSON.stringify(expandedWorkloads));
    };

    const handleWorkloadClick = (e) => {
        e.preventDefault();
        window.open(`/workloads/${row.id}`, '_blank');
    };

    const handleTaskClick = (e, taskId) => {
        e.preventDefault();
        window.open(`/workloads/${row.id}/tasks/${taskId}`, '_blank');
    };

    return (
        <Box display="flex" flexDirection="column" width="100%">
            <Box display="flex" alignItems="center">
                <StyledIconButton
                    icon={isOpen ? ChevronDownIcon : ChevronRightIcon}
                    aria-label={isOpen ? 'Collapse' : 'Expand'}
                    onClick={toggleTree}
                    size="small"
                    sx={{ mr: 1 }}
                />
                <Link href={`/workloads/${row.id}`} onClick={handleWorkloadClick} color={theme.colors.fg.default}>
                    {row.name}
                </Link>
            </Box>
            {isOpen && row.tasks && row.tasks.length > 0 && (
                <Box ml={4} mt={2}>
                    {row.tasks.map((task) => (
                        <Box
                            key={task.id}
                            display="flex"
                            alignItems="center"
                            mb={1}
                            ml={3}
                        >
                            <FileIcon size={16} color={theme.colors.fg.muted} />
                            <StyledFileLink
                                href={`/workloads/${row.id}/tasks/${task.id}`}
                                onClick={(e) => handleTaskClick(e, task.id)}
                                style={{ marginLeft: '8px' }}
                            >
                                {task.title}
                            </StyledFileLink>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default RepositoryItem;