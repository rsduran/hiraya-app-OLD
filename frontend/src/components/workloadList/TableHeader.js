import React from 'react'
import { Box, Heading, Text } from '@primer/react'

const TableHeader = () => {
    return (
        <>
            <Heading as="h2" id="repositories" sx={{ color: 'fg.default' }}>
                Security coverage
            </Heading>
            <Box mb={3} />
            <Text id="repositories-subtitle" sx={{ color: 'fg.default' }}>
                Organization members can only see data for the most
                recently-updated repositories. To see all repositories, talk to
                your organization administrator about becoming a security
                manager.
            </Text>
            <Box mt={3} />
        </>
    )
}

export default TableHeader
