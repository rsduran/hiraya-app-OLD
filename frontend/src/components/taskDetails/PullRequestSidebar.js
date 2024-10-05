import React, { useState } from 'react'
import { Box, Text } from '@primer/react'
import { GearIcon } from '@primer/octicons-react'

const PullRequestSidebar = () => {
    // Track which section is hovered
    const [hoveredSection, setHoveredSection] = useState(null)

    const sections = [
        { title: 'Reviewers', content: 'No reviews' },
        { title: 'Assignees', content: 'No one—assign yourself' },
        { title: 'Labels', content: 'None yet' },
        { title: 'Projects', content: 'None yet' },
        { title: 'Milestone', content: 'No milestone' },
        {
            title: 'Development',
            content:
                'Use closing keywords in the description to automatically close issues',
        },
        { title: 'Helpful resources', content: 'GitHub Community Guidelines' },
    ]

    return (
        <Box
            sx={{
                border: '1px solid',
                borderColor: 'border.default',
                borderRadius: 2,
                bg: 'canvas.subtle',
            }}
        >
            {sections.map((section, index) => (
                <Box
                    key={index}
                    sx={{
                        p: 3,
                        borderBottom:
                            index === sections.length - 1
                                ? 'none'
                                : '1px solid',
                        borderColor: 'border.default',
                    }}
                    onMouseEnter={() => setHoveredSection(index)}
                    onMouseLeave={() => setHoveredSection(null)}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 1,
                        }}
                    >
                        <Text
                            sx={{
                                fontWeight: 'bold',
                                color:
                                    hoveredSection === index
                                        ? 'accent.fg' // Link-like blue color
                                        : 'fg.default',
                                cursor: 'pointer',
                            }}
                        >
                            {section.title}
                        </Text>
                        {index < 5 && (
                            <Box
                                as="button"
                                aria-label="Settings"
                                sx={{
                                    color:
                                        hoveredSection === index
                                            ? 'accent.fg' // Link-like blue color
                                            : 'fg.muted',
                                    bg: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                <GearIcon />
                            </Box>
                        )}
                    </Box>
                    <Text sx={{ fontSize: 1, color: 'fg.muted' }}>
                        {section.content}
                    </Text>
                </Box>
            ))}
        </Box>
    )
}

export default PullRequestSidebar
