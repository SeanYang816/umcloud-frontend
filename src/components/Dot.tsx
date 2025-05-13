import { Box, useTheme } from '@mui/material'

type DotProps = {
  variant: 'success' | 'error'
}

export const Dot = ({ variant = 'error' }: DotProps) => {
  const theme = useTheme()

  const createColor = (variant: string) => {
    switch (variant) {
      case 'success':
        return theme.palette.success.main
      case 'error':
      default:
        return theme.palette.error.main
    }
  }

  return (
    <Box
      mr={1}
      ml={1}
      width={theme.spacing(2)}
      height={theme.spacing(2)}
      borderRadius={theme.spacing(2)}
      sx={{
        backgroundColor: createColor(variant),
      }}
    />
  )
}
