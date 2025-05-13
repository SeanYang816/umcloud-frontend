import { Box, Typography } from '@mui/material'
import React, { memo } from 'react'

type CardNoteProps = {
  children: React.ReactNode
}

export const CardNote = memo(({ children }: CardNoteProps) => {
  return (
    <Box>
      <Typography component='span' color='#e6a23c' fontWeight={900} mr={1}>
        Note:
      </Typography>
      <Typography component='span'>{children}</Typography>
    </Box>
  )
})

CardNote.displayName = 'CardNote'
