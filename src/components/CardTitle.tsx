import { Box, Typography, useTheme } from '@mui/material'
import { memo } from 'react'

type CardTitleProps = {
  title: string
}

export const CardTitle = memo(({ title }: CardTitleProps) => {
  const theme = useTheme()

  return (
    <Box>
      <Box
        component='span'
        p={0.25}
        mr={1}
        sx={{ backgroundColor: theme.palette.info.main }}
      />
      <Typography component='span' variant='h4'>
        {title}
      </Typography>
    </Box>
  )
})

CardTitle.displayName = 'CardTitle'
