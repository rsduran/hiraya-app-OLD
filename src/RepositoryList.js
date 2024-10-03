import React, { useState } from 'react'
import { Box, Text, TextInput, Button, Link } from '@primer/react'
import { PlusIcon } from '@primer/octicons-react'

const fontFamily =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'

const repositories = [
    'rsduran/quiz-app',
    'rsduran/quiz-app-image-links',
    'rsduran/three-tier-app',
    'rsduran/athena-cli',
    'rsduran/rsduran',
    'rsduran/athena-docker',
    'rsduran/slack-clone',
    'rsduran/Reddit-Project',
    'rsduran/a-youtube-clone-app',
    'rsduran/a-reddit-clone-gitops',
    'rsduran/a-reddit-clone',
    'rsduran/a-swiggy-clone',
    'rsduran/examtopics-scraper',
]

const RepositoryList = ({ borderStyle }) => {
    const [showMore, setShowMore] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const visibleRepositories = showMore
        ? repositories
        : repositories.slice(0, 6)

    const handleShowMoreClick = () => {
        setIsLoading(true)
        setTimeout(() => {
            setShowMore(true)
            setIsLoading(false)
        }, 1000) // Simulate loading time
    }

    return (
        <Box
            bg="canvas.subtle"
            p={3}
            sx={{
                width: '100%',
                height: '100%',
                overflowY: 'auto',
                borderRight: `1px solid ${borderStyle}`,
            }}
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
                <Text
                    fontSize="14px"
                    fontWeight={600}
                    fontFamily={fontFamily}
                    color="fg.default"
                    lineHeight="21px"
                >
                    Top repositories
                </Text>
                <Button
                    variant="primary"
                    size="small"
                    sx={{
                        fontSize: '12px',
                        fontWeight: 500,
                        fontFamily: fontFamily,
                        color: 'fg.onEmphasis',
                        lineHeight: '20px',
                        padding: '3px 12px',
                    }}
                >
                    <PlusIcon size={16} />
                    <Text ml={1}>New</Text>
                </Button>
            </Box>
            <TextInput
                aria-label="Find a repository"
                name="repo-search"
                placeholder="Find a repository..."
                mb={2}
                width="100%"
                contrast
            />
            <Box as="div" m={0} p={0}>
                {visibleRepositories.map((repo, index) => (
                    <Box key={index} mb={1}>
                        <Link
                            href="#"
                            sx={{
                                color: 'fg.default',
                                fontFamily,
                                fontSize: '14px',
                                lineHeight: '20px',
                                textDecoration: 'none',
                                ':hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            {repo}
                        </Link>
                    </Box>
                ))}

                {!showMore && (
                    <Box mt={2}>
                        <Text
                            onClick={handleShowMoreClick}
                            sx={{
                                color: 'fg.muted',
                                cursor: 'pointer',
                                fontFamily,
                                fontSize: '12px',
                                fontWeight: 400,
                                lineHeight: '18px',
                                textDecoration: 'none',
                                ':hover': {
                                    color: 'accent.fg',
                                    textDecoration: 'none',
                                },
                            }}
                        >
                            {isLoading ? 'Loading more...' : 'Show more'}
                        </Text>
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default RepositoryList
