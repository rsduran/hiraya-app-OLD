import React, { useState } from 'react'
import { TextInput, Box, Text, IconButton, ActionList, useTheme, ActionMenu } from '@primer/react'
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
    SunIcon,
    MoonIcon,
} from '@primer/octicons-react'
import hirayaLogo from '../images/hiraya-logo.png'

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const [showMore, setShowMore] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const { setDayScheme, setNightScheme, colorScheme } = useTheme()

    const setScheme = (schemeValue) => {
        setDayScheme(schemeValue)
        setNightScheme(schemeValue)
    }

    const schemes = [
        { name: 'Light', value: 'light', icon: SunIcon },
        { name: 'Light colorblind', value: 'light_colorblind', icon: SunIcon },
        { name: 'Dark', value: 'dark', icon: MoonIcon },
        { name: 'Dark colorblind', value: 'dark_colorblind', icon: MoonIcon },
        { name: 'Dark high contrast', value: 'dark_high_contrast', icon: MoonIcon },
        { name: 'Dark Dimmed', value: 'dark_dimmed', icon: MoonIcon },
    ]

    const current = schemes.find((scheme) => scheme.value === colorScheme)

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
            transition="width 0.3s ease"
            overflow="hidden"
            p={isSidebarOpen ? 3 : 0}
            borderRight={isSidebarOpen ? "1px solid" : "none"}
            borderColor={isSidebarOpen ? "border.default" : "transparent"}
            borderTopRightRadius={isSidebarOpen ? 15 : 0}
            zIndex={30}
            boxShadow={isSidebarOpen ? "shadow.medium" : "none"}
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
                <ActionList>
                    {[
                        { icon: HomeIcon, text: 'Home' },
                        { icon: IssueOpenedIcon, text: 'Issues' },
                        { icon: GitPullRequestIcon, text: 'Pull requests' },
                        { icon: ProjectIcon, text: 'Projects' },
                        { icon: CommentDiscussionIcon, text: 'Discussions' },
                        { icon: CodespacesIcon, text: 'Codespaces' },
                        { icon: CopilotIcon, text: 'Copilot' },
                    ].map((item, index) => (
                        <ActionList.Item key={index}>
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
                <ActionList>
                    {[
                        { icon: GlobeIcon, text: 'Explore' },
                        { icon: MegaphoneIcon, text: 'Marketplace' },
                    ].map((item, index) => (
                        <ActionList.Item key={index}>
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
                    >
                        <SearchIcon size={16} style={{ marginRight: '2px' }} color="fg.muted" />
                        <TextInput
                            placeholder="Find a repository"
                            sx={{
                                bg: 'transparent',
                                border: 'none',
                                boxShadow: 'none',
                                ':focus': { boxShadow: 'none' },
                                flexGrow: 1,
                                paddingLeft: 0,
                                color: 'fg.default',
                                '::placeholder': { color: 'fg.muted' },
                            }}
                        />
                        <IconButton
                            icon={XIcon}
                            aria-label="Close"
                            variant="invisible"
                            onClick={() => setShowSearch(false)}
                        />
                    </Box>
                ) : (
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Text
                            fontSize="12px"
                            lineHeight="20px"
                            fontWeight="600"
                            color="fg.default"
                        >
                            Repositories
                        </Text>
                        <IconButton
                            icon={SearchIcon}
                            aria-label="Search"
                            variant="invisible"
                            sx={{ color: 'fg.muted' }}
                            onClick={() => setShowSearch(true)}
                        />
                    </Box>
                )}
            </Box>
            <Box overflowY="auto" flexGrow={1} mt={2}>
                <ActionList>
                    {repositories.map((repo, index) => (
                        <ActionList.Item key={index}>
                            <ActionList.LeadingVisual>
                                <Box
                                    width={16}
                                    height={16}
                                    borderRadius="50%"
                                    bg="success.emphasis"
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

            <Box mt={2}>
                <ActionMenu>
                    <ActionMenu.Button size="small">
                        <current.icon />
                        <Box sx={{ display: 'inline-block', ml: 2 }}>
                            {current.name}
                        </Box>
                    </ActionMenu.Button>
                    <ActionMenu.Overlay align="end">
                        <ActionList selectionVariant="single">
                            {schemes.map((scheme) => (
                                <ActionList.Item
                                    key={scheme.value}
                                    selected={scheme.value === colorScheme}
                                    onSelect={() => setScheme(scheme.value)}
                                >
                                    {scheme.name}
                                </ActionList.Item>
                            ))}
                        </ActionList>
                    </ActionMenu.Overlay>
                </ActionMenu>
            </Box>
        </Box>
    )
}

export default Sidebar