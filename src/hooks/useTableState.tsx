import React, { useEffect, useState } from 'react'
import {
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_RowSelectionState,
  MRT_SortingState,
} from 'material-react-table'
import { Pagination } from 'components/Pagination'
import { Box, Paper, Stack, Typography } from '@mui/material'

// Define the return type of the hook
interface ManualStateKitReturn {
  globalFilter: string
  sorting: MRT_SortingState
  columnFilters: MRT_ColumnFiltersState
  pagination: MRT_PaginationState
  rowSelection: MRT_RowSelectionState
  setSorting: React.Dispatch<React.SetStateAction<MRT_SortingState>>
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>
  setColumnFilters: React.Dispatch<React.SetStateAction<MRT_ColumnFiltersState>>
  setPagination: React.Dispatch<React.SetStateAction<MRT_PaginationState>>
  setRowSelection: React.Dispatch<React.SetStateAction<MRT_RowSelectionState>>
  Pagination: () => React.ReactElement
}

// Make pageIndex and pageSize optional in the function argument
type TableStateProps = {
  pageIndex?: number
  pageSize?: number
  total: number
  rowsLength: number
  resetRowSelectionFn?: () => void
}

export const useTableState = ({
  pageIndex = 0,
  pageSize = 25,
  total,
  rowsLength,
  resetRowSelectionFn,
}: TableStateProps): ManualStateKitReturn => {
  // Default empty object as argument
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex,
    pageSize,
  })
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({})
  const selectedRowCount = Object.keys(rowSelection).length

  // Reset pagination to page 0 when filters change
  useEffect(() => {
    setPagination((prev) => {
      const maxPageIndex = Math.floor((total - 1) / prev.pageSize)

      // Check if the filter has changed or if `pageIndex` exceeds the max available pages
      if (
        globalFilter ||
        columnFilters.length > 0 ||
        prev.pageIndex > maxPageIndex
      ) {
        return { pageIndex: 0, pageSize: prev.pageSize }
      }

      // If there are no rows in the current page, adjust the pageIndex
      if (rowsLength === 0 && total > 0 && prev.pageIndex > 0) {
        return { pageIndex: prev.pageIndex - 1, pageSize: prev.pageSize }
      }

      return prev
    })
  }, [globalFilter, columnFilters, rowsLength, pageSize, total])

  return {
    globalFilter,
    sorting,
    columnFilters,
    pagination,
    rowSelection,
    setSorting,
    setGlobalFilter,
    setColumnFilters,
    setPagination,
    setRowSelection,
    Pagination: () => (
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 1,
          borderTop: '1px solid rgba(224, 224, 224, 1)',
        }}
      >
        {selectedRowCount ? (
          <Stack direction='row' gap={2}>
            <Typography pl={1}>
              {selectedRowCount} of {total} row(s) selected
            </Typography>
            <Typography
              onClick={resetRowSelectionFn}
              color='#09CEF6'
              sx={{
                cursor: 'pointer',
              }}
            >
              Clear selection
            </Typography>
          </Stack>
        ) : (
          <Box />
        )}
        <></>
        <Pagination
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          rowCount={total}
          setPageIndex={(index) =>
            setPagination({
              pageIndex: index,
              pageSize: pagination.pageSize,
            })
          }
          setPageSize={(size) =>
            setPagination({
              pageIndex: pagination.pageIndex,
              pageSize: size,
            })
          }
        />
      </Paper>
    ),
  }
}
