import React from 'react'
import {
  Box,
  InputLabel,
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  Stack,
} from '@mui/material'
import { HelperText } from 'components/extends/HelperText'

type CustomCheckboxProps = {
  label?: string
  checked: boolean
  helperText?: string
} & MuiCheckboxProps

export const Checkbox: React.FC<CustomCheckboxProps> = ({
  label = '',
  helperText,
  checked,
  ...props
}) => {
  return (
    <Box sx={{ margin: '0 0 8px' }}>
      <Stack direction='row' alignItems='center'>
        <InputLabel>{label}</InputLabel>
        <MuiCheckbox checked={checked} size='small' {...props} />
      </Stack>
      {helperText && <HelperText>{helperText}</HelperText>}
    </Box>
  )
}
