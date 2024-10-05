import React, { useState } from 'react'
import { Box, Link, useTheme } from '@primer/react'
import {
    FileIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@primer/octicons-react'
import { StyledIconButton, StyledFileLink } from './StyledComponents'

const RepositoryItem = ({ row }) => {
    const [isOpen, setIsOpen] = useState(false)
    const { theme } = useTheme()

    const toggleTree = (e) => {
        e.stopPropagation()
        setIsOpen(!isOpen)
    }

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
            {isOpen && (
                <Box ml={4} mt={2}>
                    {row.files.map((file) => (
                        <Box
                            key={file.name}
                            display="flex"
                            alignItems="center"
                            mb={1}
                            ml={3}
                        >
                            <FileIcon size={16} />
                            <StyledFileLink
                                onClick={(e) => e.preventDefault()}
                                style={{ marginLeft: '8px' }}
                                theme={theme}
                            >
                                {file.name}
                            </StyledFileLink>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    )
}

export default RepositoryItem
