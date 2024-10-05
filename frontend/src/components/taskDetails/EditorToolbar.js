import React from 'react'
import { ActionBar } from '@primer/react'
import {
    BoldIcon,
    ItalicIcon,
    QuoteIcon,
    CodeIcon,
    LinkIcon,
    ListUnorderedIcon,
    ListOrderedIcon,
    TasklistIcon,
    PaperclipIcon,
    MentionIcon,
} from '@primer/octicons-react'

const EditorToolbar = ({ onIconClick }) => {
    const toolbarItems = [
        { label: 'Bold', icon: BoldIcon, action: 'bold' },
        { label: 'Italic', icon: ItalicIcon, action: 'italic' },
        { label: 'Quote', icon: QuoteIcon, action: 'quote' },
        { label: 'Code', icon: CodeIcon, action: 'code' },
        { label: 'Link', icon: LinkIcon, action: 'link' },
        {
            label: 'Bullet List',
            icon: ListUnorderedIcon,
            action: 'unordered-list',
        },
        {
            label: 'Numbered List',
            icon: ListOrderedIcon,
            action: 'ordered-list',
        },
        { label: 'Task List', icon: TasklistIcon, action: 'task-list' },
        { label: 'Attach File', icon: PaperclipIcon, action: 'attach-file' },
        { label: 'Mention', icon: MentionIcon, action: 'mention' },
    ]

    return (
        <ActionBar aria-label="Formatting toolbar">
            {toolbarItems.map((item, index) => (
                <React.Fragment key={index}>
                    <ActionBar.IconButton
                        icon={item.icon}
                        aria-label={item.label}
                        onClick={() => onIconClick(item.action)}
                    />
                    {(index === 4 || index === 7) && <ActionBar.Divider />}
                </React.Fragment>
            ))}
        </ActionBar>
    )
}

export default EditorToolbar
