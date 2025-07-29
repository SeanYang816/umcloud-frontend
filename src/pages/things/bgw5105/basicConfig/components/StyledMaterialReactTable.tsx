import { useTheme } from '@mui/material'
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
  MRT_RowData,
} from 'material-react-table'

type StyledMaterialReactTableProps<T extends MRT_RowData> = {
  rows: T[]
  columns: MRT_ColumnDef<T>[]
}

export const StyledMaterialReactTable = <T extends MRT_RowData>({
  rows,
  columns,
}: StyledMaterialReactTableProps<T>) => {
  const theme = useTheme()
  const table = useMaterialReactTable({
    data: rows,
    columns,

    enableTopToolbar: false,
    enableSorting: false,
    enableColumnActions: false,

    muiTablePaperProps: {
      sx: {
        boxShadow: 'none',
        border: `1px ${theme.palette.grey[300]} solid`,
      },
    },

    muiTableContainerProps: {
      sx: {
        boxShadow: 'none',
      },
    },
  })

  return <MaterialReactTable table={table} />
}
