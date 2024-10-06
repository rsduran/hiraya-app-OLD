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
    ThreeBarsIcon,
} from '@primer/octicons-react'
import hirayaLogo from '../images/hiraya-logo.png'

const Navbar = ({ toggleSidebar }) => {
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
            p={3} // Increased padding to increase height
            bg={colorMode === 'day' ? 'canvas.default' : 'canvas.inset'}
            borderBottom="1px solid"
            borderColor="border.default"
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
                            mr: 3, // Increased right margin
                            ml: 2, // Added left margin
                        }}
                        onClick={toggleSidebar}
                    />
                </NavItem>
                <img
                    src={hirayaLogo}
                    alt="Hiraya Logo"
                    width="32"
                    height="32"
                    style={{ marginRight: '16px' }} // Added right margin
                />
                <Text
                    fontSize={1}
                    fontWeight={600}
                    sx={{
                        fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
                    }}
                    color="fg.default"
                >
                    hiraya
                </Text>
            </Box>
            <Box display="flex" alignItems="center">
                <TextInput
                    placeholder="Type / to search..."
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
                    sx={{ ml: 2, mr: 2 }} // Added right margin
                />
            </Box>
        </Box>
    )
}

export default Navbar