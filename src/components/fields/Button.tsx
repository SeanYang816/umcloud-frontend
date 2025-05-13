import React from 'react'
import {
  InputLabel,
  Button as MuiButton,
  ButtonProps,
  Box,
} from '@mui/material'
import { boolToStrNum } from 'utils'

type ButtonComponentProps = {
  text: string | [string, string]
  label?: string
  value?: boolean
  type?: ButtonProps['type']
  color?: ButtonProps['color']
  variant?: ButtonProps['variant']
  toggle?: boolean
  fullWidth?: boolean
  onClick: () => void
  component?: ButtonProps['component']
}

export const Button: React.FC<ButtonComponentProps> = ({
  type,
  text = 'button',
  label = '',
  color = 'primary',
  variant = 'contained',
  toggle = false,
  fullWidth = false,
  onClick,
  component = 'button',
  ...props
}) => {
  const toggleColor =
    toggle && Array.isArray(text) ? (!props.value ? 'primary' : 'error') : color
  const currentValue = Array.isArray(text)
    ? text[boolToStrNum(!!props.value)]
    : text

  return (
    <Box>
      {label && <InputLabel>{label}</InputLabel>}
      <MuiButton
        fullWidth={fullWidth}
        disableRipple // prevent unnecessary re-render
        {...props}
        type={type}
        color={toggleColor}
        variant={variant}
        component={component}
        onClick={onClick}
        size='small'
        style={{ fontSize: '16px' }}
      >
        {currentValue.toUpperCase()}
      </MuiButton>
    </Box>
  )
}
