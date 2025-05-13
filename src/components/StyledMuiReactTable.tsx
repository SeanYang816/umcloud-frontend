import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_RowData,
} from 'material-react-table'
import { CardHeader } from 'components/extends/CardHeader'
import { Card, CardContent, CardActions } from '@mui/material'
import { Button } from './extends/Button'

type tableProps<T extends MRT_RowData> = {
  title: string
  rows: T[]
  columns: MRT_ColumnDef<T>[]
  onAdd?: () => void
}

export const StyledMuiReactTable = <T extends MRT_RowData>({
  title,
  rows,
  columns,
  onAdd,
}: tableProps<T>) => {
  return (
    <Card>
      <CardHeader noLine title={title} />
      <CardContent>
        <MaterialReactTable
          data={rows}
          columns={columns}
          enableTopToolbar={false}
          enableBottomToolbar={false}
          enableColumnActions={false}
          enableSorting={false}
          muiTablePaperProps={{
            elevation: 0,
            sx: {
              textAlign: 'center',
              borderRadius: '0',
              border: '1px solid #e0e0e0',
            },
          }}
          muiTableHeadCellProps={{
            align: 'center',
            sx: {
              verticalAlign: 'center',
            },
          }}
          muiTableBodyCellProps={{
            align: 'center',
          }}
          muiTableBodyRowProps={{
            sx: {
              ':nth-of-type(even)': {
                backgroundColor: '#f5f5f5',
              },
            },
          }}
          initialState={{
            density: 'compact',
            pagination: { pageIndex: 0, pageSize: 100 },
          }}
        />
      </CardContent>
      {onAdd && (
        <CardActions>
          <Button icon='add' text='add' onClick={onAdd} />
        </CardActions>
      )}
    </Card>
  )
}
