import React, { useState, useEffect } from 'react'
import { Box, Heading, TabNav, Label, Breadcrumbs, Avatar, Timeline, Text, PointerBox } from '@primer/react'
import { CommentDiscussionIcon, KebabHorizontalIcon, SmileyIcon, TagIcon } from '@primer/octicons-react'
import { marked } from 'marked'
import AddComment from './AddComment'
import PullRequestSidebar from './PullRequestSidebar'

const CommentBox = ({ user, content, createdAt, isOwner, isReviewer }) => (
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
                    {user}
                </Text>
                <Text sx={{ fontWeight: 400, fontSize: '14px', color: 'fg.muted', ml: 2 }}>
                    commented {new Date(createdAt).toLocaleString()}
                </Text>
            </Box>
            <Box display="flex" alignItems="center">
                {isOwner && <Label sx={{ textTransform: 'capitalize', mr: 2 }}>Owner</Label>}
                {isReviewer && <Label sx={{ textTransform: 'capitalize', mr: 2, bg: 'attention.subtle', color: 'attention.fg' }}>Reviewer</Label>}
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
            <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
        </Box>
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
)

const TaskContent = ({ taskData }) => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetchComments()
    }, [taskData.id])

    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/workloads/${taskData.workloadId}/tasks/${taskData.id}/comments`)
            if (response.ok) {
                const data = await response.json()
                setComments(data)
            }
        } catch (error) {
            console.error('Error fetching comments:', error)
        }
    }

    const handleCommentSubmit = async (content) => {
        try {
            const response = await fetch(`http://localhost:5000/api/workloads/${taskData.workloadId}/tasks/${taskData.id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content, user: 'Tech Lead' }),
            })
            if (response.ok) {
                fetchComments()
            }
        } catch (error) {
            console.error('Error submitting comment:', error)
        }
    }

    return (
        <Box sx={{ maxWidth: '1280px', margin: '0 auto', p: 4 }}>
            <Breadcrumbs sx={{ mb: 2 }}>
                <Breadcrumbs.Item href={`/workloads/${taskData.workloadId}`}>{taskData.workloadName}</Breadcrumbs.Item>
                <Breadcrumbs.Item selected>{taskData.title}</Breadcrumbs.Item>
            </Breadcrumbs>

            <Heading sx={{ fontSize: 32, fontWeight: 400, color: 'fg.default', lineHeight: '40px', mb: 3 }}>
                {taskData.title}
            </Heading>

            <TabNav aria-label="Task">
                <TabNav.Link href="#conversation" selected>
                    <CommentDiscussionIcon /> Conversation <Label>{comments.length + 1}</Label>
                </TabNav.Link>
            </TabNav>

            <Box sx={{ display: 'flex', mt: 4 }}>
                <Box sx={{ flex: 1, mr: 4 }}>
                    <Timeline>
                        <Timeline.Item>
                            <Timeline.Badge>
                                <Avatar src="https://github.com/ghost.png" size={40} />
                            </Timeline.Badge>
                            <Timeline.Body width="100%">
                                <CommentBox 
                                    user="rsduran"
                                    content={taskData.description}
                                    createdAt={taskData.createdAt}
                                    isOwner={true}
                                    isReviewer={false}
                                />
                            </Timeline.Body>
                        </Timeline.Item>

                        <Timeline.Item>
                            <Timeline.Badge>
                                <TagIcon />
                            </Timeline.Badge>
                            <Timeline.Body>
                                <Text>
                                    <Text fontWeight="bold">rsduran</Text> created the task {new Date(taskData.createdAt).toLocaleString()}
                                </Text>
                            </Timeline.Body>
                        </Timeline.Item>

                        {comments.length === 0 && <Timeline.Break />}

                        {comments.map((comment, index) => (
                            <Timeline.Item key={index}>
                                <Timeline.Badge>
                                    <Avatar src="https://avatars.githubusercontent.com/u/583231?v=4" size={40} />
                                </Timeline.Badge>
                                <Timeline.Body width="100%">
                                    <CommentBox 
                                        user={comment.user}
                                        content={comment.content}
                                        createdAt={comment.createdAt}
                                        isOwner={false}
                                        isReviewer={comment.user === 'Tech Lead'}
                                    />
                                </Timeline.Body>
                            </Timeline.Item>
                        ))}

                        {comments.length > 0 && <Timeline.Break />}
                    </Timeline>

                    <AddComment onCommentSubmit={handleCommentSubmit} />
                </Box>
                <Box sx={{ width: '400px' }}>
                    <PullRequestSidebar />
                </Box>
            </Box>
        </Box>
    )
}

export default TaskContent