import {
  Backdrop,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material'

type WebsocketConnectingProps = {
  open: boolean
  headerHeight: number
}

export const WebsocketConnecting = ({
  open,
  headerHeight,
}: WebsocketConnectingProps) => {
  return (
    <Backdrop
      open={open}
      sx={{
        position: 'absolute',
        height: `calc(100vh - ${headerHeight}px)`,
      }}
    >
      <Paper
        sx={{
          p: 6,
          borderRadius: 4,
        }}
      >
        <Stack direction='row' alignItems='center' spacing={4} mr={2}>
          <CircularProgress />
          <Typography variant='h3'>Connecting, please wait ...</Typography>
        </Stack>
      </Paper>
    </Backdrop>
  )
}
