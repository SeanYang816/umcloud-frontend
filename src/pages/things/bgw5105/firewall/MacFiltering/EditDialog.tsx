import { Dialog, DialogActions, DialogContent, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps, FormikValuesType } from 'types'
import { optionsConverter } from 'utils/optionsConverter'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { SERVER_ACTIONS } from 'constant'
import { TextField, Select } from 'components/fields'
import { useFormik } from 'formik'
import { modalValidationSchema } from './validationSchema'
import { selectProps, textfieldProps } from 'utils/formik'
import sleep from 'utils/sleep'
import { booleanList } from 'config'
import { Button } from 'components/extends/Button'

type EditDialogProps = {
  id: string
  open: boolean
  onClose: () => void
}

export const EditDialog = ({ id, open, onClose }: EditDialogProps) => {
  const data = useSelector(
    (state: DefaultRootStateProps) => state.firewall.macFilteringEdit,
  )
  const result = data?.result ?? {}
  const options = data?.options ?? {}
  const suggest = data?.suggest ?? {}
  const { sendWsSetMessage } = useSendWsMessage()
  const rootId = `cbid.firewall.${id}`
  const srcMacList = optionsConverter(suggest, `${rootId}.src_mac`)
  const scheduleList = optionsConverter(options, `${rootId}.time_schedule`)

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      __enabled: result[`${rootId}.__enabled`] ?? '1',
      name: result[`${rootId}.name`] ?? '',
      src_mac: result[`${rootId}.src_mac`] ?? '',
      time_schedule: result[`${rootId}.time_schedule`] ?? '',
    },
    enableReinitialize: true,
    validationSchema: modalValidationSchema,
    onSubmit: async (values) => {
      const payload = {
        [`${rootId}.src_mac`]: values.src_mac,
        [`${rootId}.__enabled`]: values.__enabled,
        [`${rootId}.time_schedule`]: values.time_schedule,
        [`${rootId}.name`]: values.name,
      }
      await sendWsSetMessage(
        SERVER_ACTIONS.FIREWALL_SET_MAC_FILTERING_EDIT_PAGE,
        payload,
        id,
      )
      await sleep(1000)
      await onClose()
    },
  })

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogContent>
        <Typography variant='subtitle2' gutterBottom>
          This page allows you to change advanced properties of the MAC
          filtering rule entry, such as matched mac address.
        </Typography>
        <Select
          {...selectProps('__enabled', 'Rule is enabled:', booleanList, formik)}
        />
        <TextField {...textfieldProps('name', 'Name:', formik)} />
        <Select
          {...selectProps('src_mac', 'Source MAC address:', srcMacList, formik)}
        />
        <Select
          {...selectProps('time_schedule', 'Schedule:', scheduleList, formik)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          icon='confirm'
          text='confirm'
          onClick={() => formik.handleSubmit()}
        />
        <Button icon='cancel' text='cancel' color='error' onClick={onClose} />
      </DialogActions>
    </Dialog>
  )
}
