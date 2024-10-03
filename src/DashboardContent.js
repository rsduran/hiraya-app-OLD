import React from 'react'
import {
    Box,
    Button,
    Text,
    TextInput,
    FormControl,
    Radio,
    RadioGroup,
    Link,
    useTheme,
} from '@primer/react'
import {
    CodeIcon,
    FileCodeIcon,
    ChevronRightIcon,
} from '@primer/octicons-react'

const DashboardContent = () => {
    const globalStyles = {
        fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    }

    return (
        <Box sx={globalStyles}>
            <StartWritingCodeHeader />
            <Box display="flex" justifyContent="space-between">
                <NewRepositoryForm />
                <RepositoriesNeedingHelp />
            </Box>
        </Box>
    )
}

const StartWritingCodeHeader = () => (
    <Box display="flex" alignItems="center" mb={3}>
        <CodeIcon size={16} color="fg.muted" />
        <Text
            fontWeight={400}
            fontSize="14px"
            lineHeight="21px"
            color="fg.muted"
            ml={2}
        >
            Start writing code
        </Text>
    </Box>
)

const NewRepositoryForm = () => (
    <Box
        width="calc(50% - 8px)"
        bg="canvas.subtle"
        borderColor="border.default"
        borderWidth={1}
        borderStyle="solid"
        borderRadius={2}
        p={4}
    >
        <Text
            fontWeight={600}
            fontSize="14px"
            lineHeight="21px"
            color="fg.default"
            mb={2}
        >
            Start a new repository for rsduran
        </Text>
        <Text
            fontWeight={400}
            fontSize="14px"
            lineHeight="21px"
            color="fg.muted"
            mb={3}
            display="block"
        >
            A repository contains all of your project's files, revision history,
            and collaborator discussion.
        </Text>
        <Box as="form">
            <FormControl>
                <FormControl.Label
                    fontWeight={600}
                    fontSize="14px"
                    lineHeight="20px"
                    color="fg.default"
                    htmlFor="repo-name"
                >
                    Repository name *
                </FormControl.Label>
                <TextInput
                    id="repo-name"
                    aria-label="Repository name"
                    placeholder="name your new repository..."
                    sx={{ width: '100%', mb: 3 }}
                />
            </FormControl>
            <RadioGroup name="visibility" mt={3}>
                <FormControl>
                    <Radio value="public" id="public" />
                    <FormControl.Label
                        fontWeight={600}
                        fontSize="14px"
                        lineHeight="20px"
                        color="fg.default"
                        htmlFor="public"
                    >
                        Public
                    </FormControl.Label>
                </FormControl>
                <Text
                    fontWeight={400}
                    fontSize="12px"
                    lineHeight="16px"
                    color="fg.muted"
                    ml={4}
                    mb={2}
                >
                    Anyone on the internet can see this repository
                </Text>
                <FormControl>
                    <Radio value="private" id="private" defaultChecked />
                    <FormControl.Label
                        fontWeight={600}
                        fontSize="14px"
                        lineHeight="20px"
                        color="fg.default"
                        htmlFor="private"
                    >
                        Private
                    </FormControl.Label>
                </FormControl>
                <Text
                    fontWeight={400}
                    fontSize="12px"
                    lineHeight="16px"
                    color="fg.muted"
                    ml={4}
                    mb={3}
                >
                    You choose who can see and commit to this repository
                </Text>
            </RadioGroup>
            <Button variant="primary" mt={3}>
                Create a new repository
            </Button>
        </Box>
    </Box>
)

const RepositoriesNeedingHelp = () => {
    const { colorMode } = useTheme()

    return (
        <Box
            width="calc(50% - 8px)"
            bg="canvas.subtle"
            borderColor="border.default"
            borderWidth={1}
            borderStyle="solid"
            borderRadius={2}
            p={4}
        >
            <Text
                fontWeight={600}
                fontSize="14px"
                lineHeight="21px"
                color="fg.default"
                mb={3}
            >
                Repositories that need your help
            </Text>
            <Box>
                <RepoCard
                    name="tcurdt"
                    repo="jdeb"
                    description="This library provides an Ant task and a Maven plugin to create Debian packages from Java builds in a truly cross platform manner."
                    icon={<FileCodeIcon size={16} />}
                />
                <RepoCard
                    name="gradle"
                    repo="gradle"
                    description="Adaptable, fast automation for all"
                    icon={<FileCodeIcon size={16} />}
                />
                <RepoCard
                    name="joaomatossilva"
                    repo="DateTimeExtensions"
                    description="This project is a merge of several common DateTime operations on the form of extensions to System.DateTime, including natural date difference text (precise and human rounded), holidays and working days calculations on several culture locales."
                    icon={<FileCodeIcon size={16} />}
                />
            </Box>
            <Button
                as={Link}
                variant="outline"
                mt={3}
                sx={{
                    '&:hover': {
                        bg:
                            colorMode === 'day'
                                ? 'neutral.subtle'
                                : 'neutral.emphasisPlus',
                        textDecoration: 'none',
                    },
                }}
            >
                See more repos with good first issues
                <ChevronRightIcon size={16} ml={1} />
            </Button>
        </Box>
    )
}

const RepoCard = ({ name, repo, description, icon }) => (
    <Box display="flex" flexDirection="column" mb={3}>
        <Box display="flex" alignItems="center" mb={1}>
            <Box mr={2}>{React.cloneElement(icon, { color: 'fg.muted' })}</Box>
            <Box>
                <Link
                    href="#"
                    sx={{
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '18px',
                        color: 'accent.fg',
                        textDecoration: 'none',
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                >
                    {name}
                </Link>
                <Text color="fg.muted" as="span" mx={1}>
                    /
                </Text>
                <Link
                    href="#"
                    sx={{
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '18px',
                        color: 'accent.fg',
                        textDecoration: 'none',
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                >
                    {repo}
                </Link>
            </Box>
        </Box>
        <Text
            fontWeight={400}
            fontSize="12px"
            lineHeight="18px"
            color="fg.muted"
        >
            {description}
        </Text>
    </Box>
)

export default DashboardContent
