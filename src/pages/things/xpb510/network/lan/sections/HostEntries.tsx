import { StyledMuiReactTable } from 'components/StyledMuiReactTable'
import { Button } from 'components/extends/Button'
import { Select, TextField } from 'components/fields'
import { validation } from 'config'
import { MRT_ColumnDef } from 'material-react-table'
import { optionsConverter } from 'utils/optionsConverter'
import { DeleteHostEntriesProps, GetLanPage } from '../type'
import { FormikProps } from 'formik'
import { FormikValuesType } from 'types'

type HostEntriesProps = {
  formik: FormikProps<FormikValuesType>
  data: GetLanPage
  list: DeleteHostEntriesProps[]
  onAdd: () => void
  onDelete: (_arg0: string) => void
}

export const HostEntries = ({
  formik,
  data,
  list,
  onAdd,
  onDelete,
}: HostEntriesProps) => {
  const suggest = data?.suggest

  const columns: MRT_ColumnDef<DeleteHostEntriesProps>[] = [
    {
      id: 'hostName',
      header: 'HostName',
      accessorFn: (row) => row.key,
      Cell: ({ renderedCellValue }) => {
        const key = renderedCellValue as string
        const value = formik.values[`hostEntires_${key}_name`] as string

        return (
          <TextField
            {...formik.getFieldProps(`hostEntires_${key}_name`)}
            errorMessage={
              formik.touched[`hostEntires_${key}_name`] &&
              !validation.hostname.reg.test(value)
                ? validation.hostname.error
                : false
            }
          />
        )
      },
    },
    {
      id: 'ipv4Addr',
      header: 'IP Address',
      accessorFn: (row) => row.key,
      Cell: ({ renderedCellValue }) => {
        const key = renderedCellValue as string
        const value = formik.values[`hostEntires_${key}_ip`] as string

        return (
          <Select
            {...formik.getFieldProps(`hostEntires_${key}_ip`)}
            options={optionsConverter(suggest, key + '.ip')}
            errorMessage={
              formik.touched[`hostEntires_${key}_ip`] &&
              !validation.ip4addr.reg.test(value)
                ? validation.ip4addr.error
                : false
            }
          />
        )
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      accessorFn: (row) => (
        <Button
          icon='delete'
          text='delete'
          color='error'
          onClick={() => onDelete(row.key)}
        />
      ),
    },
  ]

  return (
    <StyledMuiReactTable
      title='Host Entries'
      rows={list}
      columns={columns}
      onAdd={onAdd}
    />
  )
}
