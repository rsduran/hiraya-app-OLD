import React from 'react'
import { Timeline, Box, Text } from '@primer/react'

const TimelineAction = ({ icon, username, action, date }) => {
    return (
        <Timeline.Item>
            <Timeline.Badge>{icon}</Timeline.Badge>
            <Timeline.Body>
                <Box ml={3}>
                    <Text as="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                        {username}
                    </Text>
                    {action}{' '}
                    <Text color="fg.muted" as="span">
                        {date}
                    </Text>
                </Box>
            </Timeline.Body>
        </Timeline.Item>
    )
}

export default TimelineAction
