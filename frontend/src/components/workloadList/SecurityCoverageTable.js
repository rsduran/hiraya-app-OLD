import React from 'react'
import {
    Box,
    Spinner,
    useTheme,
    LabelGroup,
    ActionMenu,
    ActionList,
} from '@primer/react'
import { DataTable, Table } from '@primer/react/experimental'
import { KebabHorizontalIcon } from '@primer/octicons-react'
import RepositoryItem from './RepositoryItem'
import { StyledLabel, StyledKebabIconButton } from './StyledComponents'

const uppercase = (str) => str.charAt(0).toUpperCase() + str.slice(1)

const SecurityCoverageTable = ({
    data,
    loading,
    pageIndex,
    pageSize,
    setPageIndex,
}) => {
    const { theme } = useTheme()

    const columns = [
        {
            header: 'Repository',
            field: 'name',
            rowHeader: true,
            width: '30%',
            renderCell: (row) => <RepositoryItem row={row} />,
        },
        {
            header: 'Type',
            field: 'type',
            width: '20%',
            align: 'center',
            renderCell: (row) => (
                <StyledLabel theme={theme}>{uppercase(row.type)}</StyledLabel>
            ),
        },
        {
            header: 'Updated',
            field: 'updatedAt',
            width: '20%',
            align: 'center',
            renderCell: (row) => new Date(row.updatedAt).toLocaleDateString(),
            sortBy: (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
        },
        {
            header: 'Status',
            field: 'securityFeatures.dependabot',
            width: '20%',
            align: 'center',
            renderCell: (row) =>
                row.securityFeatures.dependabot.length > 0 ? (
                    <LabelGroup>
                        {row.securityFeatures.dependabot.map((feature) => (
                            <StyledLabel key={feature} theme={theme}>
                                {uppercase(feature)}
                            </StyledLabel>
                        ))}
                    </LabelGroup>
                ) : null,
        },
        {
            header: 'Actions',
            field: 'actions',
            width: '10%',
            align: 'center',
            renderCell: (row) => (
                <ActionMenu>
                    <ActionMenu.Anchor>
                        <StyledKebabIconButton
                            icon={KebabHorizontalIcon}
                            aria-label={`Actions for ${row.name}`}
                            theme={theme}
                        />
                    </ActionMenu.Anchor>
                    <ActionMenu.Overlay>
                        <ActionList>
                            <ActionList.Item>Edit row</ActionList.Item>
                            <ActionList.Item variant="danger">
                                Delete row
                            </ActionList.Item>
                        </ActionList>
                    </ActionMenu.Overlay>
                </ActionMenu>
            ),
        },
    ]

    const paginatedData = data.slice(
        pageIndex * pageSize,
        (pageIndex + 1) * pageSize
    )

    return (
        <Box>
            {loading ? (
                <Spinner />
            ) : (
                <Table.Container>
                    <DataTable
                        aria-labelledby="repositories"
                        aria-describedby="repositories-subtitle"
                        data={paginatedData}
                        columns={columns}
                        initialSortColumn="updatedAt"
                        initialSortDirection="DESC"
                    />
                    <Table.Pagination
                        pageSize={pageSize}
                        totalCount={data.length}
                        currentPage={pageIndex + 1}
                        aria-label="Pagination"
                        onPageChange={(page) => setPageIndex(page - 1)}
                    />
                </Table.Container>
            )}
        </Box>
    )
}

export default SecurityCoverageTable