import { MRT_ColumnDef } from 'material-react-table'
import { Select, TextField } from 'components/fields'
import { StyledMuiReactTable } from 'components/StyledMuiReactTable'
import { DeleteButton } from 'components/DeleteButton'
import { optionsConverter } from 'utils/optionsConverter'
import { isEmpty } from 'lodash'
import { booleanList, validation } from 'config'
import { StringStringType, OptionsOrSuggestType } from 'types'

type NeighborFormType = {
  neighborList: StringStringType[]
  suggest: OptionsOrSuggestType
  onChange: (arg1: string, arg2: string, arg3: string) => void
  onAdd: () => void
  onDelete: (arg1: string) => void
}

export const NeighborForm = ({
  neighborList,
  suggest,
  onChange,
  onAdd,
  onDelete,
}: NeighborFormType) => {
  const columns: MRT_ColumnDef<StringStringType>[] = [
    {
      header: 'neighbor',
      accessorFn: (row) => (
        <Select
          value={row.neighbor_ip}
          options={optionsConverter(
            suggest,
            `cbid.bgpd.${row.key}.neighbor_ip`,
          )}
          onChange={(e) =>
            onChange(row.key, e.target.value as string, 'neighbor_ip')
          }
          errorMessage={
            !isEmpty(row.neighbor_ip) &&
            !validation.ip4addr.reg.test(row.neighbor_ip)
              ? validation.ip4addr.error
              : false
          }
        />
      ),
      size: 150,
    },
    {
      header: 'Key authentication',
      accessorFn: (row) => (
        <Select
          value={row.authentication}
          options={booleanList}
          onChange={(e) =>
            onChange(row.key, e.target.value as string, 'authentication')
          }
        />
      ),
      size: 150,
    },
    {
      header: 'Key string',
      accessorFn: (row) => (
        <TextField
          value={row.key_string}
          onChange={(e) => onChange(row.key, e.target.value, 'key_string')}
        />
      ),
      size: 150,
    },
    {
      header: 'Remote AS',
      accessorFn: (row) => (
        <TextField
          value={row.remote_as}
          onChange={(e) => onChange(row.key, e.target.value, 'remote_as')}
        />
      ),
      size: 150,
    },
    {
      accessorKey: '編輯',
      header: '',
      size: 150,
      Cell: ({ row }) => (
        <DeleteButton id={row.original.key} onDelete={onDelete} />
      ),
    },
  ]

  return (
    <StyledMuiReactTable
      title='Neighbor'
      rows={neighborList}
      columns={columns}
      onAdd={onAdd}
    />
  )
}
