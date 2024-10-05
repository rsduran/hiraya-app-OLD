import React, { useState } from 'react'
import { Box, Heading, TabNav, Label, Breadcrumbs } from '@primer/react'
import {
    CommentDiscussionIcon,
    GitCommitIcon,
    ChecklistIcon,
    FileDiffIcon,
} from '@primer/octicons-react'
import PullRequestTimeline from './PullRequestTimeline'
import PullRequestSidebar from './PullRequestSidebar'

const PullRequestPage = () => {
    const [selectedTab, setSelectedTab] = useState('conversation')

    return (
        <Box sx={{ maxWidth: '1280px', margin: '0 auto', p: 4 }}>
            <Breadcrumbs sx={{ mb: 2 }}>
                <Breadcrumbs.Item href="#">Task Set</Breadcrumbs.Item>
                <Breadcrumbs.Item selected>Test title</Breadcrumbs.Item>
            </Breadcrumbs>

            <Heading
                sx={{
                    fontSize: 32,
                    fontWeight: 400,
                    color: 'fg.default',
                    lineHeight: '40px',
                    mb: 3,
                }}
            >
                Test title
            </Heading>

            <TabNav aria-label="Pull Request">
                <TabNav.Link
                    href="#conversation"
                    selected={selectedTab === 'conversation'}
                    onClick={() => setSelectedTab('conversation')}
                >
                    <CommentDiscussionIcon /> Conversation <Label>0</Label>
                </TabNav.Link>
                <TabNav.Link
                    href="#commits"
                    selected={selectedTab === 'commits'}
                    onClick={() => setSelectedTab('commits')}
                >
                    <GitCommitIcon /> Commits <Label>1</Label>
                </TabNav.Link>
                <TabNav.Link
                    href="#checks"
                    selected={selectedTab === 'checks'}
                    onClick={() => setSelectedTab('checks')}
                >
                    <ChecklistIcon /> Checks <Label>0</Label>
                </TabNav.Link>
                <TabNav.Link
                    href="#files"
                    selected={selectedTab === 'files'}
                    onClick={() => setSelectedTab('files')}
                >
                    <FileDiffIcon /> Files changed <Label>1</Label>
                </TabNav.Link>
            </TabNav>

            <Box sx={{ display: 'flex', mt: 4 }}>
                <Box sx={{ flex: 1, mr: 4 }}>
                    <PullRequestTimeline />
                </Box>
                <Box sx={{ width: '400px' }}>
                    <PullRequestSidebar />
                </Box>
            </Box>
        </Box>
    )
}

export default PullRequestPage
