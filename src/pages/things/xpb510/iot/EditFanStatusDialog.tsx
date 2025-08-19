import { Air, AutoMode, PowerSettingsNew } from '@mui/icons-material'
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material'
import { XPB_EVENT_ACTIONS } from 'constant'
import { useFormik } from 'formik'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import React, { FC } from 'react'
import { FanMode, FanStatus } from 'types/xpb510/iot/iot'

type EditFanStatusDialogProps = {
  data: FanStatus
  open: boolean
  onClose: () => void
}

const FAN_MODE_BUTTONS: {
  mode: FanMode
  label: string
  icon: React.ElementType
}[] = [
  { mode: 0, label: 'Off', icon: PowerSettingsNew },
  { mode: 1, label: 'On', icon: Air },
  { mode: 2, label: 'Auto', icon: AutoMode },
]

export const EditFanStatusDialog: FC<EditFanStatusDialogProps> = ({
  data,
  open,
  onClose,
}) => {
  const { sendWsSetMessage } = useSendWsMessage()

  const formik = useFormik({
    initialValues: {
      body: {
        fanMode: data.fanMode,
        threshold: data.threshold,
        deviation: data.deviation,
      },
    },
    enableReinitialize: true, // <-- ensures form updates when `data` changes
    onSubmit: async (values) => {
      sendWsSetMessage(
        XPB_EVENT_ACTIONS.XPB_510_CLIMATE_CONTROL_SET_FAN_STATUS,
        values,
      )
      onClose()
    },
  })

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle variant='h2'>Fan Status</DialogTitle>
      <DialogContent>
        <Stack spacing={3} mt={1}>
          <ButtonGroup>
            {FAN_MODE_BUTTONS.map(({ mode, label, icon: Icon }) => (
              <Button
                key={mode}
                variant={
                  formik.values.body.fanMode === mode ? 'contained' : 'outlined'
                }
                size='small'
                onClick={() => formik.setFieldValue('body.fanMode', mode)}
                startIcon={<Icon />}
                sx={{ minWidth: 80 }}
              >
                {label}
              </Button>
            ))}
          </ButtonGroup>

          <TextField
            label='Target Threshold (°C)'
            type='number'
            name='body.threshold'
            value={formik.values.body.threshold}
            onChange={formik.handleChange}
            fullWidth
          />

          <TextField
            label='Temperature Deviation (°C)'
            type='number'
            name='body.deviation'
            value={formik.values.body.deviation}
            onChange={formik.handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant='contained' color='secondary' onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant='contained'
          color='success'
          onClick={() => formik.handleSubmit()}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
