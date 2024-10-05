import React, { useState } from 'react'
import { TextInput, Box, Text, IconButton, ActionList, useTheme } from '@primer/react'
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
} from '@primer/octicons-react'
import hirayaLogo from '../images/hiraya-logo.png'

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const [showMore, setShowMore] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const { theme, colorMode } = useTheme()

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
            color="fg.default"
            transition="width 0.3s ease"
            overflow="hidden"
            p={isSidebarOpen ? 3 : 0}
            borderTopRightRadius={isSidebarOpen ? 15 : 0}
            borderRight="1px solid"
            borderColor="border.default"
            zIndex={30}
            boxShadow={isSidebarOpen ? theme.shadows.medium : 'none'}
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
                <img
                    src={hirayaLogo}
                    alt="Hiraya Logo"
                    width="32"
                    height="32"
                />
                <IconButton
                    icon={XIcon}
                    variant="invisible"
                    aria-label="Close"
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
                        <ActionList.Item key={index} sx={{ paddingLeft: '8px' }}>
                            <ActionList.LeadingVisual>
                                <item.icon />
                            </ActionList.LeadingVisual>
                            {item.text}
                        </ActionList.Item>
                    ))}
                </ActionList>
            </Box>

            <ActionList.Divider />

            <Box mb={2}>
                <ActionList sx={{ padding: 0 }}>
                    {[
                        { icon: GlobeIcon, text: 'Explore' },
                        { icon: MegaphoneIcon, text: 'Marketplace' },
                    ].map((item, index) => (
                        <ActionList.Item key={index} sx={{ paddingLeft: '8px' }}>
                            <ActionList.LeadingVisual>
                                <item.icon />
                            </ActionList.LeadingVisual>
                            {item.text}
                        </ActionList.Item>
                    ))}
                </ActionList>
            </Box>

            <ActionList.Divider />

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
                        <SearchIcon size={16} style={{ marginRight: '2px' }} />
                        <TextInput
                            placeholder="Find a repository"
                            sx={{
                                bg: 'transparent',
                                border: 'none',
                                boxShadow: 'none',
                                ':focus': { boxShadow: 'none' },
                                flexGrow: 1,
                                paddingLeft: 0,
                            }}
                        />
                        <IconButton
                            icon={XIcon}
                            aria-label="Close"
                            variant="invisible"
                            sx={{ ml: 1 }}
                            onClick={() => setShowSearch(false)}
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
                        >
                            Repositories
                        </Text>
                        <IconButton
                            icon={SearchIcon}
                            aria-label="Search"
                            variant="invisible"
                            onClick={() => setShowSearch(true)}
                        />
                    </Box>
                )}
            </Box>
            <Box overflowY="auto" flexGrow={1} mt={2}>
                <ActionList sx={{ padding: 0 }}>
                    {repositories.map((repo, index) => (
                        <ActionList.Item key={index} sx={{ paddingLeft: '8px' }}>
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
                                fontSize: '12px',
                                paddingLeft: '8px',
                                ':hover': { color: 'accent.fg' },
                            }}
                        >
                            Show more
                        </ActionList.Item>
                    )}
                </ActionList>
            </Box>

            <Box as="footer" fontSize="12px" mt={2}>
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
                                color="accent.fg"
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
                        color="accent.fg"
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
                        color="accent.fg"
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