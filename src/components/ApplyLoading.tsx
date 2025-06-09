import {
  Backdrop,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material'

type ApplyLoadingProps = {
  open: boolean
}

export const ApplyLoading = ({ open }: ApplyLoadingProps) => {
  return (
    <Backdrop
      open={open}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: (theme) => theme.zIndex.modal + 1,
      }}
    >
      <Paper
        sx={{
          p: 6,
          borderRadius: 4,
        }}
      >
        <Stack direction='row' alignItems='center' spacing={4}>
          <CircularProgress />
          <Typography variant='h5'>
            Applying changes, please wait ...
          </Typography>
        </Stack>
      </Paper>
    </Backdrop>
  )
}
