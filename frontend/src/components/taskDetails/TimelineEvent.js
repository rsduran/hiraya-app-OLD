import React from 'react'
import { Timeline, Avatar, PointerBox, Box, Text, Label } from '@primer/react'
import { KebabHorizontalIcon, SmileyIcon } from '@primer/octicons-react'

const TimelineEvent = ({ avatarUrl, username, date, role, content }) => {
    return (
        <Timeline.Item>
            <Timeline.Badge>
                <Avatar
                    src={avatarUrl}
                    size={40}
                    alt={`${username}'s avatar`}
                />
            </Timeline.Badge>
            <Timeline.Body width="100%">
                <PointerBox
                    caret="left-top"
                    bg="canvas.default"
                    borderColor="border.default"
                    p={0}
                    ml={3}
                    mt={0}
                    sx={{ position: 'relative', borderRadius: '6px' }}
                >
                    <Box
                        bg="canvas.subtle"
                        py={2}
                        px={3}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom="1px solid"
                        borderColor="border.default"
                        borderRadius="6px 6px 0 0"
                        height="40px"
                    >
                        <Box display="flex" alignItems="center">
                            <Text
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '14px',
                                    color: 'fg.default',
                                }}
                            >
                                {username}
                            </Text>
                            <Text
                                sx={{
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    color: 'fg.muted',
                                    ml: 2,
                                }}
                            >
                                commented {date}
                            </Text>
                        </Box>
                        <Box display="flex" alignItems="center">
                            {role && (
                                <Label
                                    sx={{
                                        textTransform: 'capitalize',
                                        mr: 2,
                                    }}
                                >
                                    {role}
                                </Label>
                            )}
                            <Box
                                as="button"
                                aria-label="Options"
                                sx={{
                                    color: 'fg.muted',
                                    bg: 'transparent',
                                    border: 'none',
                                    p: 1,
                                    cursor: 'pointer',
                                    '&:hover': { color: 'accent.fg' },
                                }}
                            >
                                <KebabHorizontalIcon />
                            </Box>
                        </Box>
                    </Box>
                    <Box px={3} py={3}>
                        <Text
                            sx={{
                                fontWeight: 400,
                                fontSize: '14px',
                                color: 'fg.default',
                                lineHeight: '1.5',
                            }}
                        >
                            {content}
                        </Text>
                    </Box>
                    <Box
                        display="flex"
                        alignItems="center"
                        px={3}
                        pb={3}
                        pt={1}
                    >
                        <Box
                            as="button"
                            aria-label="Add reaction"
                            sx={{
                                color: 'fg.muted',
                                bg: 'transparent',
                                border: 'none',
                                p: 0,
                                cursor: 'pointer',
                                '&:hover': { color: 'accent.fg' },
                            }}
                        >
                            <SmileyIcon />
                        </Box>
                    </Box>
                </PointerBox>
            </Timeline.Body>
        </Timeline.Item>
    )
}

export default TimelineEvent
