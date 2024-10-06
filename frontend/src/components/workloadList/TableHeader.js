import React from 'react'
import { Box, Heading, Text, useTheme } from '@primer/react'

const TableHeader = () => {
    const { theme } = useTheme()

    return (
        <>
            <Heading as="h2" id="workloads" sx={{ color: theme.colors.fg.default }}>
                Workload List
            </Heading>
            <Box mb={3} />
            <Text id="workloads-subtitle" sx={{ color: theme.colors.fg.muted }}>
                View and manage your workloads. Click on a workload to see its tasks.
            </Text>
            <Box mt={3} />
        </>
    )
}

export default TableHeader