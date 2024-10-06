import React, { useState } from 'react'
import { Box, Text, Button, Textarea, useTheme, Avatar } from '@primer/react'
import { PencilIcon, EyeIcon } from '@primer/octicons-react'
import { marked } from 'marked'
import EditorToolbar from './EditorToolbar'

const AddComment = ({ onCommentSubmit }) => {
    const [selectedTab, setSelectedTab] = useState('write')
    const [content, setContent] = useState('')
    const { theme } = useTheme()

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
                newContent = `${before}**${text.substring(
                    start,
                    end
                )}**${after}`
                break
            case 'italic':
                newContent = `${before}_${text.substring(start, end)}_${after}`
                break
            case 'quote':
                newContent = `${before}> ${text.substring(
                    start,
                    end
                )}\n${after}`
                break
            case 'code':
                newContent = `${before}\`\`\`\n${text.substring(
                    start,
                    end
                )}\n\`\`\`${after}`
                break
            case 'link':
                newContent = `${before}[${text.substring(
                    start,
                    end
                )}](url)${after}`
                break
            case 'unordered-list':
                newContent = `${before}- ${text.substring(
                    start,
                    end
                )}\n${after}`
                break
            case 'ordered-list':
                newContent = `${before}1. ${text.substring(
                    start,
                    end
                )}\n${after}`
                break
            case 'task-list':
                newContent = `${before}- [ ] ${text.substring(
                    start,
                    end
                )}\n${after}`
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

    const renderMarkdown = () => {
        return { __html: marked(content) }
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
                ? 'fg.default' // Always use dark font color in light mode
                : isSelected
                ? 'fg.onEmphasis' // Use light font color when selected in dark mode
                : 'fg.default',
            border: 'none',
            borderRadius: tabName === 'write' ? '6px 0 0 0' : '0 6px 0 0',
            '&:hover': {
                bg: isSelected
                    ? isLight
                        ? 'canvas.subtle'
                        : 'accent.emphasis'
                    : 'canvas.subtle',
                color: isLight
                    ? 'fg.default' // Keep dark font color even on hover in light mode
                    : isSelected
                    ? 'fg.onEmphasis'
                    : 'fg.default',
            },
        }
    }

    const handleSubmit = () => {
        onCommentSubmit(content)
        setContent('')
    }

    const handleClearComment = () => {
        setContent('')
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4, mt: 4 }}>
            <Avatar
                src="https://avatars.githubusercontent.com/u/583231?v=4" // Different avatar for Tech Lead
                size={40}
                alt="Tech Lead avatar"
                sx={{ mr: 2 }}
            />
            <Box sx={{ flex: 1 }}>
                <Text
                    sx={{
                        fontWeight: 600,
                        fontSize: '16px',
                        lineHeight: '24px',
                        color: 'fg.default',
                        mb: 2,
                    }}
                >
                    Add a comment
                </Text>
                <Box
                    bg="canvas.default"
                    borderColor="border.default"
                    borderWidth={1}
                    borderStyle="solid"
                    borderRadius="6px"
                    overflow="hidden"
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid',
                            borderColor: 'border.default',
                            bg: 'canvas.subtle',
                        }}
                    >
                        <EditorToolbar onIconClick={insertMarkdownSyntax} />
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                justifyContent: 'flex-end',
                                position: 'relative',
                                zIndex: 1,
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
                                placeholder="Add your comment here..."
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
                                        boxShadow:
                                            '0 0 0 2px rgba(3, 102, 214, 0.3)',
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
                        mt: 3,
                    }}
                >
                    <Button onClick={handleClearComment} variant="danger" sx={{ px: 4, py: 3, mr: 2 }}>
                        Clear comment
                    </Button>
                    <Button onClick={handleSubmit} variant="primary" sx={{ px: 4, py: 3 }}>
                        Comment
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default AddComment