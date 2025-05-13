import { CircularProgress, Stack } from '@mui/material'

export const Loading = () => {
  return (
    <Stack alignItems='center' p={4}>
      <CircularProgress />
    </Stack>
  )
}
