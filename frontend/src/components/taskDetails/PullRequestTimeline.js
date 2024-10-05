import React from 'react'
import { Timeline, Label, Box } from '@primer/react'
import {
    TagIcon,
    MilestoneIcon,
    GitPullRequestIcon,
} from '@primer/octicons-react'
import TimelineEvent from './TimelineEvent'
import TimelineAction from './TimelineAction'
import AddComment from './AddComment'
import DescriptionCommentBox from './DescriptionCommentBox'

const PullRequestTimeline = () => {
    return (
        <Box>
            <Timeline>
                <DescriptionCommentBox
                    avatarUrl="https://github.com/octocat.png"
                    username="octocat"
                    date="2 days ago"
                    role="Owner"
                    content="This is the initial description of the pull request."
                />
                <TimelineAction
                    icon={<TagIcon />}
                    username="collaborator1"
                    action={
                        <>
                            added the <Label>enhancement</Label> label
                        </>
                    }
                    date="1 day ago"
                />
                <TimelineAction
                    icon={<MilestoneIcon />}
                    username="collaborator2"
                    action="modified the milestone: v2.0"
                    date="1 day ago"
                />
                <TimelineEvent
                    avatarUrl="https://github.com/collaborator3.png"
                    username="collaborator3"
                    date="23 hours ago"
                    content="I've reviewed the changes and they look good to me. Great work!"
                />
                <TimelineAction
                    icon={<GitPullRequestIcon />}
                    username="bot"
                    action="linked a pull request that will close this issue"
                    date="22 hours ago"
                />
                <Timeline.Break />
            </Timeline>
            <AddComment />
        </Box>
    )
}

export default PullRequestTimeline
