import React from 'react'
import { Box, InputLabel, Typography } from '@mui/material'

type CustomDisplayFieldProps = {
  label: string
  text: string
}

export const DisplayField: React.FC<CustomDisplayFieldProps> = ({
  label,
  text,
}) => {
  return (
    <Box sx={{ margin: '0 0 24px' }}>
      <InputLabel sx={{ marginBottom: '8px' }}>{label}</InputLabel>
      <Typography>{text}</Typography>
    </Box>
  )
}
