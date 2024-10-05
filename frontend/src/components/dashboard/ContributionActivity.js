import React, { useState } from 'react'
import {
    Box,
    Text,
    Link,
    Heading,
    Timeline,
    Label,
    Button,
} from '@primer/react'
import {
    CalendarIcon,
    GitBranchIcon,
    GitCommitIcon,
    FoldIcon,
    UnfoldIcon,
} from '@primer/octicons-react'

const fontFamily =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'

const ContributionActivity = () => {
    return (
        <Box
            sx={{
                width: '100%',
                color: 'fg.default',
                p: 4,
                borderRadius: 2,
            }}
        >
            <Heading
                sx={{
                    fontSize: '16px',
                    fontWeight: 400,
                    mb: 4,
                    fontFamily,
                    color: 'fg.default',
                    lineHeight: '24px',
                }}
            >
                Contribution activity
            </Heading>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <MonthSection month="October 2024" hasActivity={false} />
                <MonthSection month="September 2024" hasActivity={true}>
                    <Timeline>
                        <CommitActivity />
                        <RepositoryActivity />
                    </Timeline>
                </MonthSection>
            </Box>
        </Box>
    )
}

const MonthSection = ({ month, hasActivity, children }) => {
    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Heading
                    as="h3"
                    sx={{
                        fontSize: '12px',
                        fontWeight: 600,
                        fontFamily,
                        color: 'fg.default',
                        lineHeight: '18px',
                        mr: 2,
                    }}
                >
                    {month}
                </Heading>
                <Box
                    sx={{ flexGrow: 1, height: '1px', bg: 'border.default' }}
                />
            </Box>
            {!hasActivity && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    <Text
                        sx={{
                            color: 'fg.muted',
                            fontFamily,
                            fontSize: '14px',
                            lineHeight: '18px',
                        }}
                    >
                        rsduran has no activity yet for this period.
                    </Text>
                </Box>
            )}
            {children}
        </Box>
    )
}

const FoldableSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true)
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                    cursor: 'pointer',
                    ':hover': { color: 'accent.fg' }, // Theme-aware hover color
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Text
                    sx={{
                        fontWeight: 400,
                        fontFamily,
                        fontSize: '16px',
                        lineHeight: '20px',
                        color: isHovered ? 'accent.fg' : 'fg.default', // Theme-aware text color
                    }}
                >
                    {title}
                </Text>
                <Button
                    variant="invisible"
                    sx={{
                        color: isHovered ? 'accent.fg' : 'fg.default', // Theme-aware icon color
                        bg: 'transparent',
                        p: 0,
                        ':hover': { bg: 'transparent' },
                    }}
                >
                    {isOpen ? <FoldIcon size={16} /> : <UnfoldIcon size={16} />}
                </Button>
            </Box>
            {isOpen && children}
        </Box>
    )
}

const CommitActivity = () => {
    const repositories = [
        { name: 'rsduran/quiz-app', date: 'Sep 30', tech: 'TypeScript' },
        {
            name: 'rsduran/quiz-app-image-links',
            date: 'Sep 28',
            tech: 'TypeScript',
        },
        { name: 'rsduran/three-tier-app', date: 'Sep 25', tech: 'TypeScript' },
        { name: 'rsduran/rsduran', date: 'Sep 20', tech: '' },
        {
            name: 'rsduran/slack-clone',
            date: 'Sep 15',
            tech: 'TypeScript • Built by',
        },
    ]

    return (
        <Timeline.Item>
            <Timeline.Badge sx={{ mt: '3px' }}>
                <GitCommitIcon />
            </Timeline.Badge>
            <Timeline.Body sx={{ width: '100%' }}>
                <FoldableSection title="Created 433 commits in 5 repositories">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            ml: 2,
                        }}
                    >
                        {repositories.map((repo) => (
                            <Box
                                key={repo.name}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Link
                                        href="#"
                                        sx={{
                                            color: 'accent.fg', // Theme-aware link color
                                            fontFamily,
                                            fontSize: '14px',
                                            lineHeight: '18px',
                                            fontWeight: 400,
                                            ':hover': {
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >
                                        {repo.name}
                                    </Link>
                                    {repo.tech && (
                                        <Label variant="small" sx={{ ml: 2 }}>
                                            {repo.tech}
                                        </Label>
                                    )}
                                </Box>
                                <Text sx={{ fontSize: 1, color: 'fg.muted' }}>
                                    {repo.date}
                                </Text>
                            </Box>
                        ))}
                    </Box>
                </FoldableSection>
            </Timeline.Body>
        </Timeline.Item>
    )
}

const RepositoryActivity = () => {
    const repositories = [
        {
            name: 'rsduran/quiz-app-image-links',
            tech: 'TypeScript',
            date: 'Sep 27',
        },
        {
            name: 'rsduran/slack-clone',
            tech: 'TypeScript • Built by',
            date: 'Sep 23',
        },
        { name: 'rsduran/rsduran', tech: '', date: 'Sep 15' },
        { name: 'rsduran/three-tier-app', tech: 'TypeScript', date: 'Sep 14' },
        { name: 'rsduran/Reddit-Project', tech: 'TypeScript', date: 'Sep 10' },
    ]

    return (
        <Timeline.Item>
            <Timeline.Badge sx={{ mt: '3px' }}>
                <GitBranchIcon />
            </Timeline.Badge>
            <Timeline.Body sx={{ width: '100%' }}>
                <FoldableSection title="Created 5 repositories">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            ml: 2,
                        }}
                    >
                        {repositories.map((repo) => (
                            <Box
                                key={repo.name}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CalendarIcon
                                        sx={{ mr: 3, color: 'accent.fg' }} // Theme-aware icon color
                                    />
                                    <Link
                                        href="#"
                                        sx={{
                                            color: 'accent.fg', // Theme-aware link color
                                            fontFamily,
                                            fontSize: '14px',
                                            lineHeight: '18px',
                                            fontWeight: 400,
                                            ':hover': {
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >
                                        {repo.name}
                                    </Link>
                                    {repo.tech && (
                                        <Label variant="small" sx={{ ml: 2 }}>
                                            {repo.tech}
                                        </Label>
                                    )}
                                </Box>
                                <Text sx={{ fontSize: 1, color: 'fg.muted' }}>
                                    {repo.date}
                                </Text>
                            </Box>
                        ))}
                    </Box>
                </FoldableSection>
            </Timeline.Body>
        </Timeline.Item>
    )
}

export default ContributionActivity
