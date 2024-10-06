import React from 'react'
import {
    Box,
    Spinner,
    useTheme,
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
            header: 'Workload',
            field: 'name',
            rowHeader: true,
            width: '40%',
            renderCell: (row) => <RepositoryItem row={row} />,
        },
        {
            header: 'Visibility',
            field: 'visibility',
            width: '15%',
            align: 'center',
            renderCell: (row) => (
                <StyledLabel>{uppercase(row.visibility)}</StyledLabel>
            ),
        },
        {
            header: 'Tasks',
            field: 'tasks',
            width: '15%',
            align: 'center',
            renderCell: (row) => (row.tasks ? row.tasks.length : 0),
        },
        {
            header: 'Updated',
            field: 'updatedAt',
            width: '20%',
            align: 'center',
            renderCell: (row) => {
                const date = new Date(row.updatedAt)
                return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`
            },
            sortBy: (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
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
                        />
                    </ActionMenu.Anchor>
                    <ActionMenu.Overlay>
                        <ActionList>
                            <ActionList.Item>Edit workload</ActionList.Item>
                            <ActionList.Item variant="danger">
                                Delete workload
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
                        aria-labelledby="workloads"
                        aria-describedby="workloads-subtitle"
                        data={paginatedData}
                        columns={columns}
                        initialSortColumn="updatedAt"
                        initialSortDirection="DESC"
                        sx={{
                            '& th': { color: theme.colors.fg.default },
                            '& td': { color: theme.colors.fg.default },
                        }}
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