import React from 'react'
import {
    ActionMenu,
    ActionList,
    Button,
    TextInput,
    Box,
    Heading,
} from '@primer/react'
import { RepoIcon, StarIcon } from '@primer/octicons-react'

const RepoExplorer = () => {
    const repos = [
        {
            name: 'hiraya-app',
            visibility: 'Public',
            language: 'JavaScript',
            updatedAt: 'Updated 5 hours ago',
        },
        {
            name: 'react-template',
            visibility: 'Public template',
            description:
                'The quickest way to start playing around with Primer React',
            language: 'JavaScript',
            updatedAt: 'Updated yesterday',
        },
        {
            name: 'three-tier-app',
            visibility: 'Public',
            description:
                'Simple three-tier to-do app built as an end-to-end DevOps project, showcasing containerization, CI/CD, and Kubernetes orchestration.',
            language: 'TypeScript',
            updatedAt: 'Updated 5 days ago',
        },
        {
            name: 'quiz-app-image-links',
            visibility: 'Public',
            language: 'TypeScript',
            updatedAt: 'Updated last week',
        },
    ]

    const languageColors = {
        JavaScript: '#f1e05a',
        TypeScript: '#2b7489',
        Python: '#3572A5',
        Java: '#b07219',
        // Add more languages and their colors as needed
    }

    return (
        <Box
            sx={{
                maxWidth: 1012,
                mx: 'auto',
            }}
        >
            <Heading sx={{ mb: 3, fontSize: 4 }}>Task set</Heading>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 3,
                    flexWrap: 'wrap',
                    gap: 2,
                }}
            >
                <TextInput
                    aria-label="Find a repository"
                    name="repo-search"
                    placeholder="Find a repository..."
                    sx={{ flex: 1, minWidth: 200 }}
                />
                <ActionMenu>
                    <ActionMenu.Button>Type</ActionMenu.Button>
                    <ActionMenu.Overlay>
                        <ActionList>
                            <ActionList.Item>All</ActionList.Item>
                            <ActionList.Item>Public</ActionList.Item>
                            <ActionList.Item>Private</ActionList.Item>
                        </ActionList>
                    </ActionMenu.Overlay>
                </ActionMenu>
                <ActionMenu>
                    <ActionMenu.Button>Language</ActionMenu.Button>
                    <ActionMenu.Overlay>
                        <ActionList>
                            <ActionList.Item>All</ActionList.Item>
                            <ActionList.Item>JavaScript</ActionList.Item>
                            <ActionList.Item>TypeScript</ActionList.Item>
                        </ActionList>
                    </ActionMenu.Overlay>
                </ActionMenu>
                <ActionMenu>
                    <ActionMenu.Button>Sort</ActionMenu.Button>
                    <ActionMenu.Overlay>
                        <ActionList>
                            <ActionList.Item>Best match</ActionList.Item>
                            <ActionList.Item>Most stars</ActionList.Item>
                            <ActionList.Item>Recently updated</ActionList.Item>
                        </ActionList>
                    </ActionMenu.Overlay>
                </ActionMenu>
                <Button variant="primary">
                    <RepoIcon />
                    <Box as="span" sx={{ ml: 2 }}>
                        New
                    </Box>
                </Button>
            </Box>
            <Box>
                {repos.map((repo) => (
                    <Box
                        key={repo.name}
                        sx={{
                            borderColor: 'border.default',
                            borderTopStyle: 'solid',
                            borderTopWidth: 1,
                            pt: 3,
                            pb: 3,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                            }}
                        >
                            <Box>
                                <Box
                                    as="a"
                                    href={`https://github.com/your-username/${repo.name}`}
                                    sx={{
                                        fontSize: 3,
                                        fontWeight: 'bold',
                                        color: 'accent.fg',
                                        textDecoration: 'none',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    {repo.name}
                                </Box>
                                <Box
                                    as="span"
                                    sx={{
                                        ml: 2,
                                        px: 2,
                                        py: 1,
                                        fontSize: 0,
                                        fontWeight: 'bold',
                                        borderRadius: '2em',
                                        bg: 'neutral.muted',
                                        color: 'fg.muted',
                                    }}
                                >
                                    {repo.visibility}
                                </Box>
                                {repo.description && (
                                    <Box sx={{ mt: 2, color: 'fg.muted' }}>
                                        {repo.description}
                                    </Box>
                                )}
                            </Box>
                            <Button variant="outline" sx={{ ml: 3 }}>
                                <StarIcon />
                                <Box as="span" sx={{ ml: 2 }}>
                                    Star
                                </Box>
                            </Button>
                        </Box>
                        <Box sx={{ mt: 3, fontSize: 0, color: 'fg.muted' }}>
                            <Box
                                as="span"
                                sx={{
                                    mr: 3,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Box
                                    as="span"
                                    sx={{
                                        display: 'inline-block',
                                        width: 12,
                                        height: 12,
                                        borderRadius: '50%',
                                        backgroundColor:
                                            languageColors[repo.language] ||
                                            'gray.5',
                                        mr: 1,
                                    }}
                                />
                                {repo.language}
                            </Box>
                            <Box as="span">{repo.updatedAt}</Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default RepoExplorer
