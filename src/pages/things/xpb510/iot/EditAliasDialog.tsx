import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { Button } from 'components/extends/Button'
import { TextField } from 'components/formik'
import { XPB_EVENT_ACTIONS } from 'constant'
import { useFormik } from 'formik'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { FC } from 'react'
import { ExternalDataSource } from 'types/xpb510/iot/iot'
import { formikField } from 'utils/formik'

type DialogProps = {
  data: ExternalDataSource
  open: boolean
  onClose: () => void
}

export const EditAliasDialog: FC<DialogProps> = ({ data, open, onClose }) => {
  const { sendWsMessage } = useSendWsMessage()
  const formik = useFormik({
    initialValues: {
      alias: data.alias,
    },
    onSubmit(values) {
      sendWsMessage(XPB_EVENT_ACTIONS.XPB_510_EXTERNAL_DATA_SET_SOURCE_ALIAS, {
        alias: values.alias,
        portNumber: data.portNumber,
      })
    },
  })

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogTitle typography='h2'>Edit Alias</DialogTitle>
        <TextField label='Alias' {...formikField(formik, 'alias')} />
      </DialogContent>
      <DialogActions>
        <Button
          icon='apply'
          text='Confirm'
          color='info'
          onClick={() => {
            formik.submitForm()
            onClose()
          }}
        />
        <Button icon='cancel' text='back' color='error' onClick={onClose} />
      </DialogActions>
    </Dialog>
  )
}
