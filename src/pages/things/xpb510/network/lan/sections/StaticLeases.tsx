import { StyledMuiReactTable } from 'components/StyledMuiReactTable'
import { Button } from 'components/extends/Button'
import { TextField } from 'components/fields'
import { validation } from 'config'
import { MRT_ColumnDef } from 'material-react-table'
import { DeleteStaticLeasesProps } from '../type'
import { FormikProps } from 'formik'
import { FormikValuesType } from 'types'

type StaticLeasesProps = {
  formik: FormikProps<FormikValuesType>
  list: DeleteStaticLeasesProps[]
  onAdd: () => void
  onDelete: (_arg0: string) => void
}

export const StaticLeases = ({
  formik,
  list,
  onAdd,
  onDelete,
}: StaticLeasesProps) => {
  const columns: MRT_ColumnDef<DeleteStaticLeasesProps>[] = [
    {
      id: 'hostName',
      header: 'HostName',
      accessorFn: (row) => row.key,
      Cell: ({ renderedCellValue }) => {
        const key = renderedCellValue as string
        const value = formik.values[`staticLeases_${key}_name`] as string

        return (
          <TextField
            {...formik.getFieldProps(`staticLeases_${key}_name`)}
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
      header: 'IPv4-Address',
      accessorFn: (row) => row.key,
      Cell: ({ renderedCellValue }) => {
        const key = renderedCellValue as string
        const value = formik.values[`staticLeases_${key}_ip`] as string

        return (
          <TextField
            {...formik.getFieldProps(`staticLeases_${key}_ip`)}
            errorMessage={
              formik.touched[`hostEntires_${key}_ip`] &&
              !validation.ip4addrOrIgnore.reg.test(value)
                ? validation.ip4addrOrIgnore.error
                : false
            }
          />
        )
      },
    },
    {
      id: 'macAddr',
      header: 'MAC-Address',
      accessorFn: (row) => row.key,
      Cell: ({ renderedCellValue }) => {
        const key = renderedCellValue as string
        const value = formik.values[`staticLeases_${key}_mac`] as string

        return (
          <TextField
            {...formik.getFieldProps(`staticLeases_${key}_mac`)}
            errorMessage={
              formik.touched[`hostEntires_${key}_mac`] &&
              !validation.macaddr.reg.test(value)
                ? validation.macaddr.error
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
      title='Static Leases'
      rows={list}
      columns={columns}
      onAdd={onAdd}
    />
  )
}
