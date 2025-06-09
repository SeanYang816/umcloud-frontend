import { Backdrop, IconButton, Paper, Stack, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { clearNotification } from 'reducers/global'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const ErrorDialog = () => {
  const dispatch = useDispatch()
  const notification = useSelector(
    (state: DefaultRootStateProps) => state.global.notification,
  )
  const navigate = useNavigate()

  const handleClose = () => {
    // Dispatch an action to clear the notification
    // dispatch(/* Your action to clear the notification */)
    dispatch(clearNotification())
  }

  useEffect(() => {
    if (notification.event) {
      navigate('/things')
    }
  }, [navigate, notification])

  return (
    <Backdrop
      open={!!notification.event}
      sx={{
        position: 'absolute',
      }}
    >
      <Paper
        sx={{
          p: 6,
          borderRadius: 4,
          position: 'relative', // Ensure the position is relative for absolute positioning of the close button
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        >
          <Close />
        </IconButton>
        <Stack direction='row' alignItems='center' spacing={4} mr={2}>
          <Typography variant='h3'>{notification.message}</Typography>
        </Stack>
      </Paper>
    </Backdrop>
  )
}
