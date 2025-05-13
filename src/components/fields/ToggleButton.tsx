import React from 'react'
import { Button, InputLabel, Box, ButtonProps } from '@mui/material'

interface ToggleButtonProps {
  text: string | [string, string]
  label?: string
  value: boolean
  variant?: ButtonProps['variant']
  onClick: () => void
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  text,
  label,
  onClick,
  variant = 'contained',
  ...props
}) => {
  const isArrayText = Array.isArray(text)

  return (
    <Box>
      {label && <InputLabel>{label}</InputLabel>}
      <Box
        // exclusive
        color={props.value ? 'primary' : 'error'}
        {...props}
      >
        {props.value ? (
          <Button
            color='primary'
            variant={variant}
            onClick={onClick}
            size='small'
            sx={{ fontSize: '16px', margin: '8px 0 16px 0' }}
          >
            {isArrayText ? text[0] : text}
          </Button>
        ) : (
          <Button
            color='error'
            variant={variant}
            onClick={onClick}
            size='small'
            sx={{ fontSize: '16px', margin: '8px 0 16px 0' }}
          >
            {isArrayText ? text[1] : text}
          </Button>
        )}
      </Box>
    </Box>
  )
}
