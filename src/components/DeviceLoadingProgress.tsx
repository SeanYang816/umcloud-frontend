import {
  Backdrop,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material'

type DeviceLoadingProgressProps = {
  isLoading: boolean
}

export const DeviceLoadingProgress = ({
  isLoading,
}: DeviceLoadingProgressProps) => {
  return (
    <>
      {isLoading && (
        <Backdrop
          open={isLoading}
          sx={{
            position: 'absolute',
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
      )}
    </>
  )
}
