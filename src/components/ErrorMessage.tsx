import { Typography } from '@mui/material'

export const ErrorMessage = ({ message }: { message: string | boolean }) => {
  return (
    <Typography
      variant='subtitle2'
      color='error'
      sx={{ marginTop: '2px', textWrap: 'wrap' }}
    >
      * {message}
    </Typography>
  )
}
