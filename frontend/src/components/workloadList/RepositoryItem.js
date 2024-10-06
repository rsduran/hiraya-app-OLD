import React, { useState } from 'react';
import { Box, Link, useTheme } from '@primer/react';
import { FileIcon, ChevronDownIcon, ChevronRightIcon } from '@primer/octicons-react';
import { StyledIconButton, StyledFileLink } from './StyledComponents';
import { useNavigate } from 'react-router-dom';

const RepositoryItem = ({ row }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useTheme();
    const navigate = useNavigate();

    const toggleTree = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const handleTaskClick = (taskId) => {
        navigate(`/workloads/${row.id}/tasks/${taskId}`);
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
                <Link href={`#${row.name}`} onClick={(e) => e.preventDefault()}>
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
                            <FileIcon size={16} />
                            <StyledFileLink
                                onClick={() => handleTaskClick(task.id)}
                                style={{ marginLeft: '8px', cursor: 'pointer' }}
                                theme={theme}
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