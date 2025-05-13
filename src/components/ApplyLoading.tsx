import {
  Backdrop,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material'

type ApplyLoadingProps = {
  open: boolean
  headerHeight: number
}

export const ApplyLoading = ({ open, headerHeight }: ApplyLoadingProps) => {
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
          <Typography variant='h3'>
            Applying changes, please wait ...
          </Typography>
        </Stack>
      </Paper>
    </Backdrop>
  )
}
