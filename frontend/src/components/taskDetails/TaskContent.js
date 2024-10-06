import React from 'react'
import { Box, Heading, TabNav, Label, Breadcrumbs, Avatar, Timeline, Text, PointerBox } from '@primer/react'
import { CommentDiscussionIcon, KebabHorizontalIcon, SmileyIcon, TagIcon } from '@primer/octicons-react'
import AddComment from './AddComment'
import PullRequestSidebar from './PullRequestSidebar'

const TaskContent = ({ taskData }) => {
    return (
        <Box sx={{ maxWidth: '1280px', margin: '0 auto', p: 4 }}>
            <Breadcrumbs sx={{ mb: 2 }}>
                <Breadcrumbs.Item href={`/workloads/${taskData.workloadId}`}>{taskData.workloadName}</Breadcrumbs.Item>
                <Breadcrumbs.Item selected>{taskData.title}</Breadcrumbs.Item>
            </Breadcrumbs>

            <Heading
                sx={{
                    fontSize: 32,
                    fontWeight: 400,
                    color: 'fg.default',
                    lineHeight: '40px',
                    mb: 3,
                }}
            >
                {taskData.title}
            </Heading>

            <TabNav aria-label="Task">
                <TabNav.Link href="#conversation" selected>
                    <CommentDiscussionIcon /> Conversation <Label>1</Label>
                </TabNav.Link>
            </TabNav>

            <Box sx={{ display: 'flex', mt: 4 }}>
                <Box sx={{ flex: 1, mr: 4 }}>
                    <Timeline>
                        {/* Timeline Item with Comment Box */}
                        <Timeline.Item>
                            <Timeline.Badge>
                                <Avatar src="https://github.com/ghost.png" size={40} />
                            </Timeline.Badge>
                            <Timeline.Body width="100%">
                                <PointerBox
                                    caret="left-top"
                                    bg="canvas.default"
                                    borderColor="border.default"
                                    caretColor="canvas.subtle"
                                    p={0}
                                    ml={3}
                                    mt={0}
                                    sx={{ position: 'relative', borderRadius: '6px' }}
                                >
                                    {/* Header with Username, Date, and Options */}
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
                                            <Text sx={{ fontWeight: 600, fontSize: '14px', color: 'fg.default' }}>
                                                rsduran
                                            </Text>
                                            <Text sx={{ fontWeight: 400, fontSize: '14px', color: 'fg.muted', ml: 2 }}>
                                                commented {taskData.createdAt}
                                            </Text>
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            {/* Owner Role Label */}
                                            <Label sx={{ textTransform: 'capitalize', mr: 2 }}>Owner</Label>
                                            {/* Options Icon */}
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

                                    {/* Comment Content */}
                                    <Box px={3} py={3}>
                                        <Text sx={{ fontWeight: 400, fontSize: '14px', color: 'fg.default', lineHeight: '1.5' }}>
                                            {taskData.description}
                                        </Text>
                                    </Box>

                                    {/* Reaction Button */}
                                    <Box display="flex" alignItems="center" px={3} pb={3} pt={1}>
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

                        <Timeline.Item>
                            <Timeline.Badge>
                                <TagIcon />
                            </Timeline.Badge>
                            <Timeline.Body>
                                <Text>
                                    <Text fontWeight="bold">rsduran</Text> created the task {taskData.createdAt}
                                </Text>
                            </Timeline.Body>
                        </Timeline.Item>

                        <Timeline.Break />
                    </Timeline>

                    <AddComment />
                </Box>
                <Box sx={{ width: '400px' }}>
                    <PullRequestSidebar />
                </Box>
            </Box>
        </Box>
    )
}

export default TaskContent
