import React from 'react'
import { Box, Heading, Text } from '@primer/react'

const TableHeader = () => {
    return (
        <>
            <Heading as="h2" id="workloads" sx={{ color: 'fg.default' }}>
                Workload List
            </Heading>
            <Box mb={3} />
            <Text id="workloads-subtitle" sx={{ color: 'fg.default' }}>
                View and manage your workloads. Click on a workload to see its tasks.
            </Text>
            <Box mt={3} />
        </>
    )
}

export default TableHeader