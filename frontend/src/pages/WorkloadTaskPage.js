import React, { useState } from 'react'
import {
    Box,
    Text,
    Button,
    FormControl,
    TextInput,
    RadioGroup,
    Radio,
    Textarea,
    ActionMenu,
    ActionList,
    useTheme,
    ThemeProvider,
} from '@primer/react'
import {
    PencilIcon,
    EyeIcon,
    BoldIcon,
    ItalicIcon,
    QuoteIcon,
    CodeIcon,
    LinkIcon,
    ListUnorderedIcon,
    ListOrderedIcon,
    TasklistIcon,
    FileIcon,
    MentionIcon,
} from '@primer/octicons-react'
import { marked } from 'marked'
import Navbar from '../common/Navbar'
import Sidebar from '../common/Sidebar'
import ColorModeSwitcher from '../ColorModeSwitcher'

const EditorToolbar = ({ onIconClick }) => (
    <ActionMenu>
        <ActionMenu.Button
            variant="invisible"
            sx={{
                height: '100%',
                borderRadius: '6px 0 0 0',
                '&:hover': { bg: 'canvas.subtle' },
            }}
        >
            Editor Tools
        </ActionMenu.Button>
        <ActionMenu.Overlay>
            <ActionList>
                <ActionList.Item onSelect={() => onIconClick('bold')}>
                    <BoldIcon /> Bold
                </ActionList.Item>
                <ActionList.Item onSelect={() => onIconClick('italic')}>
                    <ItalicIcon /> Italic
                </ActionList.Item>
                <ActionList.Item onSelect={() => onIconClick('quote')}>
                    <QuoteIcon /> Quote
                </ActionList.Item>
                <ActionList.Item onSelect={() => onIconClick('code')}>
                    <CodeIcon /> Code
                </ActionList.Item>
                <ActionList.Item onSelect={() => onIconClick('link')}>
                    <LinkIcon /> Link
                </ActionList.Item>
                <ActionList.Divider />
                <ActionList.Item onSelect={() => onIconClick('unordered-list')}>
                    <ListUnorderedIcon /> Unordered List
                </ActionList.Item>
                <ActionList.Item onSelect={() => onIconClick('ordered-list')}>
                    <ListOrderedIcon /> Ordered List
                </ActionList.Item>
                <ActionList.Item onSelect={() => onIconClick('task-list')}>
                    <TasklistIcon /> Task List
                </ActionList.Item>
                <ActionList.Divider />
                <ActionList.Item onSelect={() => onIconClick('attach-file')}>
                    <FileIcon /> Attach File
                </ActionList.Item>
                <ActionList.Item onSelect={() => onIconClick('mention')}>
                    <MentionIcon /> Mention
                </ActionList.Item>
            </ActionList>
        </ActionMenu.Overlay>
    </ActionMenu>
)

const WorkloadTaskPage = () => {
    const [selectedTab, setSelectedTab] = useState('write')
    const [content, setContent] = useState('')
    const [workloadName, setWorkloadName] = useState('')
    const [taskTitle, setTaskTitle] = useState('')
    const [selectedWorkload, setSelectedWorkload] = useState('Create new workload')
    const { theme, colorMode } = useTheme()

    // Mock data for existing workloads
    const existingWorkloads = [
        'Create new workload',
        'Workload 1',
        'Workload 2',
        'Workload 3',
    ]

    const renderMarkdown = () => {
        return { __html: marked(content) }
    }

    const insertMarkdownSyntax = (syntax) => {
        const textarea = document.getElementById('markdown-textarea')
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const text = textarea.value
        const before = text.substring(0, start)
        const after = text.substring(end, text.length)
        let newContent = ''

        switch (syntax) {
            case 'bold':
                newContent = `${before}**${text.substring(start, end)}**${after}`
                break
            case 'italic':
                newContent = `${before}_${text.substring(start, end)}_${after}`
                break
            case 'quote':
                newContent = `${before}> ${text.substring(start, end)}\n${after}`
                break
            case 'code':
                newContent = `${before}\`\`\`\n${text.substring(start, end)}\n\`\`\`${after}`
                break
            case 'link':
                newContent = `${before}[${text.substring(start, end)}](url)${after}`
                break
            case 'unordered-list':
                newContent = `${before}- ${text.substring(start, end)}\n${after}`
                break
            case 'ordered-list':
                newContent = `${before}1. ${text.substring(start, end)}\n${after}`
                break
            case 'task-list':
                newContent = `${before}- [ ] ${text.substring(start, end)}\n${after}`
                break
            case 'attach-file':
                newContent = `${before}![File](file_url)${after}`
                break
            case 'mention':
                newContent = `${before}@${text.substring(start, end)}${after}`
                break
            default:
                break
        }

        setContent(newContent)
        textarea.focus()
    }

    const getTabStyles = (tabName) => {
        const isSelected = selectedTab === tabName
        const isLight = theme?.colorScheme === 'light'

        return {
            bg: isSelected
                ? isLight
                    ? 'canvas.default'
                    : 'accent.emphasis'
                : 'transparent',
            color: isLight
                ? 'fg.default'
                : isSelected
                ? 'fg.onEmphasis'
                : 'fg.default',
            border: 'none',
            borderRadius: tabName === 'write' ? '6px 0 0 0' : '0 6px 0 0',
            height: '100%',
            '&:hover': {
                bg: isSelected
                    ? isLight
                        ? 'canvas.subtle'
                        : 'accent.emphasis'
                    : 'canvas.subtle',
                color: isLight
                    ? 'fg.default'
                    : isSelected
                    ? 'fg.onEmphasis'
                    : 'fg.default',
            },
        }
    }

    return (
        <ThemeProvider>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <Box sx={{ position: 'absolute', top: 0, right: 0, p: 3, zIndex: 100 }}>
                    <ColorModeSwitcher />
                </Box>
                <Navbar />
                <Box 
                    sx={{ 
                        display: 'flex', 
                        flex: 1, 
                        overflow: 'hidden',
                        bg: colorMode === 'day' ? 'canvas.default' : 'canvas.inset',
                    }}
                >
                    <Sidebar />
                    <Box 
                        sx={{ 
                            flex: 1, 
                            overflow: 'auto', 
                            padding: 4,
                            display: 'flex',
                            justifyContent: 'center', 
                            alignItems: 'flex-start', 
                        }}
                    >
                        <Box
                            width="100%"
                            maxWidth="600px"
                            borderColor="border.default"
                            borderWidth={1}
                            borderStyle="solid"
                            borderRadius={2}
                            p={4}
                            bg={colorMode === 'day' ? 'canvas.subtle' : 'canvas.default'}
                        >
                            <Text
                                fontWeight={600}
                                fontSize="16px"
                                lineHeight="24px"
                                color="fg.default"
                                mb={3}
                            >
                                Start a new Workload to put your task
                            </Text>
                            <Text
                                fontWeight={400}
                                fontSize="14px"
                                lineHeight="21px"
                                color="fg.muted"
                                mb={4}
                                display="block"
                            >
                                A Workload contains all of your tasks and helps you organize
                                your work efficiently.
                            </Text>

                            <FormControl mb={4}>
                                <FormControl.Label htmlFor="existing-workload">
                                    Select an existing workload
                                </FormControl.Label>
                                <ActionMenu>
                                    <ActionMenu.Button>{selectedWorkload}</ActionMenu.Button>
                                    <ActionMenu.Overlay width="medium">
                                        <ActionList selectionVariant="single">
                                            {existingWorkloads.map((workload, index) => (
                                                <ActionList.Item
                                                    key={index}
                                                    selected={workload === selectedWorkload}
                                                    onSelect={() => setSelectedWorkload(workload)}
                                                >
                                                    {workload}
                                                </ActionList.Item>
                                            ))}
                                        </ActionList>
                                    </ActionMenu.Overlay>
                                </ActionMenu>
                            </FormControl>

                            <Box mb={3} />

                            {selectedWorkload === 'Create new workload' && (
                                <FormControl mb={4}>
                                    <FormControl.Label htmlFor="workload-name">
                                        Workload name
                                    </FormControl.Label>
                                    <TextInput
                                        id="workload-name"
                                        value={workloadName}
                                        onChange={(e) => setWorkloadName(e.target.value)}
                                        placeholder="Name your new workload..."
                                        sx={{ width: '100%' }}
                                    />
                                    <Box mb={3} />
                                </FormControl>
                            )}

                            <RadioGroup name="visibility" mb={4}>
                                <FormControl>
                                    <Radio value="public" id="public" />
                                    <FormControl.Label htmlFor="public">
                                        Public
                                    </FormControl.Label>
                                </FormControl>
                                <Text fontSize="12px" color="fg.muted" ml={4} mb={2}>
                                    Anyone can see this workload
                                </Text>
                                <FormControl>
                                    <Radio value="private" id="private" defaultChecked />
                                    <FormControl.Label htmlFor="private">
                                        Private
                                    </FormControl.Label>
                                </FormControl>
                                <Text fontSize="12px" color="fg.muted" ml={4} mb={3}>
                                    Only you can see this workload
                                </Text>
                            </RadioGroup>

                            <FormControl mb={4}>
                                <FormControl.Label htmlFor="task-title">
                                    Add a task title
                                </FormControl.Label>
                                <TextInput
                                    id="task-title"
                                    value={taskTitle}
                                    onChange={(e) => setTaskTitle(e.target.value)}
                                    placeholder="Enter task title..."
                                    sx={{ width: '100%' }}
                                />
                                <Box mb={3} />
                            </FormControl>

                            <Text fontWeight={600} fontSize="14px" mb={2}>
                                Add a description
                            </Text>
                            <Box
                                bg="canvas.default"
                                borderColor="border.default"
                                borderWidth={1}
                                borderStyle="solid"
                                borderRadius="6px"
                                overflow="hidden"
                                mb={4}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'stretch',
                                        borderBottom: '1px solid',
                                        borderColor: 'border.default',
                                        bg: 'canvas.subtle',
                                        height: '32px',
                                    }}
                                >
                                    <EditorToolbar onIconClick={insertMarkdownSyntax} />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                        }}
                                    >
                                        <Button
                                            onClick={() => setSelectedTab('write')}
                                            sx={getTabStyles('write')}
                                        >
                                            <PencilIcon /> Write
                                        </Button>
                                        <Button
                                            onClick={() => setSelectedTab('preview')}
                                            sx={getTabStyles('preview')}
                                        >
                                            <EyeIcon /> Preview
                                        </Button>
                                    </Box>
                                </Box>

                                {selectedTab === 'write' && (
                                    <Box sx={{ p: 2, bg: 'canvas.default' }}>
                                        <Textarea
                                            id="markdown-textarea"
                                            placeholder="Add your task description here..."
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            sx={{
                                                width: '100%',
                                                border: '1px solid',
                                                borderColor: 'border.default',
                                                borderRadius: 2,
                                                resize: 'vertical',
                                                minHeight: '200px',
                                                bg: 'canvas.default',
                                                color: 'fg.default',
                                                '::placeholder': { color: 'fg.muted' },
                                                ':focus': {
                                                    outline: 'none',
                                                    boxShadow: '0 0 0 2px rgba(3, 102, 214, 0.3)',
                                                },
                                            }}
                                        />
                                    </Box>
                                )}

                                {selectedTab === 'preview' && (
                                    <Box
                                        sx={{
                                            p: 4,
                                            minHeight: '200px',
                                            bg: 'canvas.default',
                                            color: 'fg.default',
                                        }}
                                    >
                                        <div dangerouslySetInnerHTML={renderMarkdown()} />
                                    </Box>
                                )}
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Button variant="primary">
                                    {selectedWorkload !== 'Create new workload'
                                        ? 'Create Task'
                                        : 'Create Workload and Task'}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default WorkloadTaskPage