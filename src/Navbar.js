import React from 'react'
import {
    TextInput,
    Tooltip,
    Avatar,
    Box,
    Text,
    IconButton,
    ActionMenu,
    ActionList,
    useTheme,
} from '@primer/react'
import {
    BellIcon,
    PlusIcon,
    GitBranchIcon,
    MarkGithubIcon,
    ThreeBarsIcon,
} from '@primer/octicons-react'

const Navbar = ({ toggleSidebar, borderColor }) => {
    const { colorMode } = useTheme()

    const NavItem = ({ children, tooltip }) => (
        <Tooltip aria-label={tooltip} direction="s">
            {children}
        </Tooltip>
    )

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={2}
            bg={colorMode === 'day' ? 'canvas.default' : 'canvas.inset'}
            borderBottom="1px solid"
            borderColor={borderColor}
        >
            <Box display="flex" alignItems="center">
                <NavItem tooltip="Menu">
                    <IconButton
                        icon={ThreeBarsIcon}
                        aria-label="Menu"
                        sx={{
                            color: 'fg.default',
                            bg: 'transparent',
                            ':hover': { bg: 'actionListItem.default.hoverBg' },
                            mr: 2,
                        }}
                        onClick={toggleSidebar}
                    />
                </NavItem>
                <MarkGithubIcon size={32} color="fg.default" />
                <Text
                    fontSize={1}
                    fontWeight={600}
                    ml={2}
                    sx={{
                        fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
                    }}
                    color="fg.default"
                >
                    Dashboard
                </Text>
            </Box>
            <Box display="flex" alignItems="center">
                <TextInput
                    placeholder="Type / to search or ask Copilot"
                    sx={{ width: '300px' }}
                />
                <Box
                    sx={{
                        height: '20px',
                        width: '1px',
                        bg: 'border.default',
                        mx: 3,
                    }}
                />
                <NavItem tooltip="Create new...">
                    <ActionMenu>
                        <ActionMenu.Anchor>
                            <IconButton
                                icon={PlusIcon}
                                aria-label="Create new..."
                                sx={{
                                    color: 'fg.default',
                                    bg: 'transparent',
                                    ':hover': {
                                        bg: 'actionListItem.default.hoverBg',
                                    },
                                }}
                            />
                        </ActionMenu.Anchor>
                        <ActionMenu.Overlay>
                            <ActionList>
                                <ActionList.Item>
                                    New repository
                                </ActionList.Item>
                                <ActionList.Item>
                                    Import repository
                                </ActionList.Item>
                                <ActionList.Item>New gist</ActionList.Item>
                                <ActionList.Item>
                                    New organization
                                </ActionList.Item>
                            </ActionList>
                        </ActionMenu.Overlay>
                    </ActionMenu>
                </NavItem>
                <NavItem tooltip="You have no unread notifications">
                    <IconButton
                        icon={BellIcon}
                        aria-label="Notifications"
                        sx={{
                            color: 'fg.default',
                            bg: 'transparent',
                            ':hover': { bg: 'actionListItem.default.hoverBg' },
                            ml: 2,
                        }}
                    />
                </NavItem>
                <NavItem tooltip="Create a pull request">
                    <IconButton
                        icon={GitBranchIcon}
                        aria-label="Pull requests"
                        sx={{
                            color: 'fg.default',
                            bg: 'transparent',
                            ':hover': { bg: 'actionListItem.default.hoverBg' },
                            ml: 2,
                        }}
                    />
                </NavItem>
                <Avatar
                    src="/placeholder.svg?height=32&width=32"
                    size={32}
                    sx={{ ml: 2 }}
                />
            </Box>
        </Box>
    )
}

export default Navbar
