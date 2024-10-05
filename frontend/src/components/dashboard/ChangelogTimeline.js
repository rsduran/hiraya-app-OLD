import React from 'react'
import { Box, Text, useTheme } from '@primer/react'
import { DotFillIcon } from '@primer/octicons-react'

const ChangelogTimeline = () => {
    const { colorMode } = useTheme()
    const isDarkMode = colorMode === 'dark'

    return (
        <Box
            bg="canvas.subtle"
            color="fg.default"
            p={3}
            borderRadius={2}
            maxWidth={400}
            border="1px solid"
            borderColor="border.default"
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'"
            boxShadow="shadow.small"
        >
            <ChangelogHeader />
            <ChangelogList isDarkMode={isDarkMode} />
            <ViewChangelogLink isDarkMode={isDarkMode} />
        </Box>
    )
}

const ChangelogHeader = () => (
    <Text
        as="h2"
        fontSize="14px"
        fontWeight={600}
        mb={3}
        lineHeight="21px"
        color="fg.default"
    >
        Latest changes
    </Text>
)

const ChangelogList = ({ isDarkMode }) => {
    const changelogItems = [
        {
            date: '17 hours ago',
            description:
                'Secret scanning: on-demand revocation for GitHub PATs (Public Beta)',
        },
        {
            date: 'Yesterday',
            description:
                'Discover the GitHub Enterprise Cloud FAQ in the New GitHub Trust Center',
        },
        {
            date: '2 days ago',
            description: 'Announcing TISAX for GitHub',
        },
        {
            date: '2 days ago',
            description: 'Annotations in the GitHub Actions log view',
        },
    ]

    return (
        <Box position="relative">
            <TimelineLine isDarkMode={isDarkMode} />
            {changelogItems.map((item, index) => (
                <ChangelogItem
                    key={index}
                    item={item}
                    isDarkMode={isDarkMode}
                />
            ))}
        </Box>
    )
}

const TimelineLine = ({ isDarkMode }) => (
    <Box
        position="absolute"
        left="7px"
        top={0}
        bottom={0}
        width="2px"
        bg={
            isDarkMode ? 'rgba(145, 152, 161, 0.5)' : 'rgba(100, 100, 100, 0.5)'
        }
    />
)

const ChangelogItem = ({ item, isDarkMode }) => (
    <Box mb={3}>
        <Box display="flex" alignItems="center" mb={1}>
            <Box mr={2} position="relative" zIndex={1}>
                <DotFillIcon size={16} />
            </Box>
            <Text
                fontSize="12px"
                color="fg.muted"
                lineHeight="18px"
                fontWeight={400}
            >
                {item.date}
            </Text>
        </Box>
        <Box ml={4}>
            <Text
                as="a"
                href="#"
                fontSize="14px"
                color="fg.default"
                display="block"
                lineHeight="21px"
                fontWeight={400}
                sx={{
                    textDecoration: 'none',
                    '&:hover': {
                        color: 'accent.fg',
                        textDecoration: 'underline',
                    },
                }}
            >
                {item.description}
            </Text>
        </Box>
    </Box>
)

const ViewChangelogLink = ({ isDarkMode }) => (
    <Box ml={4} mt={2}>
        <Text
            as="span"
            fontSize="12px"
            color="fg.muted"
            display="inline-block"
            lineHeight="18px"
            fontWeight={400}
            sx={{
                cursor: 'pointer',
                '&:hover': {
                    color: 'accent.fg',
                },
            }}
            onClick={() => {
                console.log('View changelog clicked')
            }}
        >
            View changelog →
        </Text>
    </Box>
)

export default ChangelogTimeline
