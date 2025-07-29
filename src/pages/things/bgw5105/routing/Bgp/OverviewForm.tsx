import { MRT_ColumnDef } from 'material-react-table'
import { Select } from 'components/fields'
import { optionsConverter } from 'utils/optionsConverter'
import { StyledMuiReactTable } from 'components/StyledMuiReactTable'
import { OptionsOrSuggestType, StringStringType } from 'types'

type OverviewFormType = {
  options: OptionsOrSuggestType
  overviewList: StringStringType[]
  onChange: (arg1: string, arg2: string, arg3: string) => void
}
export const OverviewForm = ({
  options,
  overviewList,
  onChange,
}: OverviewFormType) => {
  const columns: MRT_ColumnDef<StringStringType>[] = [
    {
      header: 'Name',
      accessorFn: (row) => row.name,
      size: 50,
    },
    {
      header: 'Enable',
      accessorFn: (row) => (
        <Select
          value={row.bgp_enable}
          options={optionsConverter(options, `cbid.bgpd.${row.key}.bgp_enable`)}
          onChange={(e) =>
            onChange(row.key, e.target.value as string, 'bgp_enable')
          }
        />
      ),
      size: 150,
    },
  ]

  return (
    <StyledMuiReactTable
      title='Overview'
      rows={overviewList}
      columns={columns}
    />
  )
}
