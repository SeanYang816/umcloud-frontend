import { StyledMuiReactTable } from 'components/StyledMuiReactTable'
import { Button } from 'components/extends/Button'
import { TextField } from 'components/formik'
import { validation } from 'config'
import { MRT_ColumnDef } from 'material-react-table'
import { FormikProps } from 'formik'
import { FormikValuesType } from 'types'
import { DeleteStaticARPProps } from 'pages/things/bgw5105/network/Lan/type'
import { formikField } from 'utils/formik'

type StaticArpProps = {
  formik: FormikProps<FormikValuesType>
  list: DeleteStaticARPProps[]
  onAdd: () => void
  onDelete: (_arg0: string) => void
}

export const StaticArp = ({
  formik,
  list,
  onAdd,
  onDelete,
}: StaticArpProps) => {
  const columns: MRT_ColumnDef<DeleteStaticARPProps>[] = [
    {
      id: 'macAddr',
      header: 'MAC-Address',
      accessorFn: (row) => row.key,
      Cell: ({ renderedCellValue }) => {
        const key = renderedCellValue as string
        const value = formik.values[`staticArp_${key}_macaddr`] as string

        return (
          <TextField
            {...formikField(formik, `staticArp_${key}_macaddr`)}
            helperText={
              formik.touched[`hostEntires_${key}_macaddr`] &&
              !validation.macaddr.reg.test(value)
                ? validation.macaddr.error
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
        const value = formik.values[`staticArp_${key}_ipaddr`] as string

        return (
          <TextField
            {...formikField(formik, `staticArp_${key}_ipaddr`)}
            helperText={
              formik.touched[`hostEntires_${key}_ipaddr`] &&
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
      title='Static ARP'
      rows={list}
      columns={columns}
      onAdd={onAdd}
    />
  )
}
