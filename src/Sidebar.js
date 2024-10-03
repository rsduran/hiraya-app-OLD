import React, { useState } from 'react'
import { TextInput, Box, Text, IconButton, ActionList } from '@primer/react'
import {
    XIcon,
    HomeIcon,
    IssueOpenedIcon,
    GitPullRequestIcon,
    ProjectIcon,
    CommentDiscussionIcon,
    CodespacesIcon,
    CopilotIcon,
    SearchIcon,
    GlobeIcon,
    MegaphoneIcon,
    MarkGithubIcon,
} from '@primer/styled-octicons'

const Sidebar = ({
    isSidebarOpen,
    toggleSidebar,
    textColor,
    borderColor,
    sidebarBoxShadow,
    hoverColor,
}) => {
    const [showMore, setShowMore] = useState(false)
    const [showSearch, setShowSearch] = useState(false)

    const repositories = [
        'rsduran/quiz-app',
        'rsduran/quiz-app-image-links',
        'rsduran/three-tier-app',
        'rsduran/athena-cli',
        'rsduran/rsduran',
    ]

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            width={isSidebarOpen ? '300px' : '0'}
            height="100vh"
            bg="canvas.subtle"
            color={textColor}
            transition="width 0.3s ease"
            overflow="hidden"
            p={isSidebarOpen ? 3 : 0}
            borderRight={`1px solid ${borderColor}`}
            borderTopRightRadius={isSidebarOpen ? 15 : 0}
            zIndex={30}
            boxShadow={sidebarBoxShadow}
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
                <MarkGithubIcon size={32} />
                <IconButton
                    icon={XIcon}
                    variant="invisible"
                    aria-label="Close"
                    color={textColor}
                    sx={{ ':hover': { color: hoverColor } }}
                    onClick={toggleSidebar}
                />
            </Box>
            <Box mb={2}>
                <ActionList sx={{ padding: 0 }}>
                    {[
                        { icon: HomeIcon, text: 'Home' },
                        { icon: IssueOpenedIcon, text: 'Issues' },
                        { icon: GitPullRequestIcon, text: 'Pull requests' },
                        { icon: ProjectIcon, text: 'Projects' },
                        { icon: CommentDiscussionIcon, text: 'Discussions' },
                        { icon: CodespacesIcon, text: 'Codespaces' },
                        { icon: CopilotIcon, text: 'Copilot' },
                    ].map((item, index) => (
                        <ActionList.Item
                            key={index}
                            as="a"
                            href="#"
                            sx={{
                                color: textColor,
                                textDecoration: 'none',
                                paddingLeft: '8px',
                            }}
                        >
                            <ActionList.LeadingVisual>
                                <item.icon />
                            </ActionList.LeadingVisual>
                            {item.text}
                        </ActionList.Item>
                    ))}
                </ActionList>
            </Box>

            <ActionList.Divider sx={{ backgroundColor: borderColor, my: 1 }} />

            <Box mb={2}>
                <ActionList sx={{ padding: 0 }}>
                    {[
                        { icon: GlobeIcon, text: 'Explore' },
                        { icon: MegaphoneIcon, text: 'Marketplace' },
                    ].map((item, index) => (
                        <ActionList.Item
                            key={index}
                            as="a"
                            href="#"
                            sx={{
                                color: textColor,
                                textDecoration: 'none',
                                paddingLeft: '8px',
                            }}
                        >
                            <ActionList.LeadingVisual>
                                <item.icon />
                            </ActionList.LeadingVisual>
                            {item.text}
                        </ActionList.Item>
                    ))}
                </ActionList>
            </Box>

            <ActionList.Divider sx={{ backgroundColor: borderColor, my: 1 }} />

            <Box mt={2}>
                {showSearch ? (
                    <Box
                        display="flex"
                        alignItems="center"
                        bg="canvas.subtle"
                        borderRadius={2}
                        p={1}
                        sx={{ paddingLeft: '8px' }}
                    >
                        <SearchIcon
                            size={16}
                            color={textColor}
                            style={{ marginRight: '2px' }}
                        />
                        <TextInput
                            placeholder="Find a repository"
                            sx={{
                                bg: 'transparent',
                                border: 'none',
                                boxShadow: 'none',
                                ':focus': { boxShadow: 'none' },
                                color: textColor,
                                '::placeholder': { color: textColor },
                                flexGrow: 1,
                                paddingLeft: 0,
                            }}
                        />
                        <IconButton
                            icon={XIcon}
                            aria-label="Close"
                            variant="invisible"
                            color={textColor}
                            onClick={() => setShowSearch(false)}
                            sx={{ ':hover': { color: hoverColor }, ml: 1 }}
                        />
                    </Box>
                ) : (
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ paddingLeft: '8px' }}
                    >
                        <Text
                            fontSize="12px"
                            lineHeight="20px"
                            fontWeight="600"
                            color={textColor}
                        >
                            Repositories
                        </Text>
                        <IconButton
                            icon={SearchIcon}
                            aria-label="Search"
                            variant="invisible"
                            color={textColor}
                            onClick={() => setShowSearch(true)}
                            sx={{ ':hover': { color: hoverColor } }}
                        />
                    </Box>
                )}
            </Box>
            <Box overflowY="auto" flexGrow={1} mt={2}>
                <ActionList sx={{ padding: 0 }}>
                    {repositories.map((repo, index) => (
                        <ActionList.Item
                            key={index}
                            as="a"
                            href="#"
                            sx={{
                                color: textColor,
                                textDecoration: 'none',
                                paddingLeft: '8px',
                            }}
                        >
                            <ActionList.LeadingVisual>
                                <Box
                                    width={16}
                                    height={16}
                                    borderRadius="50%"
                                    bg="#238636"
                                />
                            </ActionList.LeadingVisual>
                            {repo}
                        </ActionList.Item>
                    ))}
                    {!showMore && (
                        <ActionList.Item
                            onSelect={() => setShowMore(true)}
                            sx={{
                                color: textColor,
                                fontSize: '12px',
                                paddingLeft: '8px',
                                ':hover': { color: '#58a6ff' },
                            }}
                        >
                            Show more
                        </ActionList.Item>
                    )}
                </ActionList>
            </Box>

            <Box as="footer" fontSize="12px" color={textColor} mt={2}>
                <Text>© 2024 GitHub, Inc.</Text>
                <Box display="flex" flexWrap="wrap" mt={1}>
                    {[
                        'About',
                        'Blog',
                        'Terms',
                        'Privacy',
                        'Security',
                        'Status',
                    ].map((link, index) => (
                        <Text key={index} mr={2}>
                            <Box
                                as="a"
                                href="#"
                                color="#58a6ff"
                                sx={{
                                    textDecoration: 'none',
                                    ':hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                {link}
                            </Box>
                        </Text>
                    ))}
                </Box>
                <Box mt={1}>
                    <Box
                        as="a"
                        href="#"
                        color="#58a6ff"
                        sx={{
                            textDecoration: 'none',
                            ':hover': { textDecoration: 'underline' },
                        }}
                    >
                        Do not share my personal information
                    </Box>
                </Box>
                <Box mt={1}>
                    <Box
                        as="a"
                        href="#"
                        color="#58a6ff"
                        sx={{
                            textDecoration: 'none',
                            ':hover': { textDecoration: 'underline' },
                        }}
                    >
                        Manage cookies
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Sidebar
