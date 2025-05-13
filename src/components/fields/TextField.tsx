import {
  Box,
  FormControl,
  InputLabel,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material'
import { ErrorMessage } from 'components/ErrorMessage'
import { HelperText } from 'components/extends/HelperText'
import React from 'react'

type CustomTextFieldProps = {
  label?: React.ReactNode
  fullWidth?: boolean
  helperText?: string | boolean | undefined
  errorMessage?: string | boolean | undefined
} & MuiTextFieldProps

export const TextField = ({
  label,
  fullWidth = true, // Set default value
  helperText,
  errorMessage,
  ...props
}: CustomTextFieldProps) => {
  return (
    <Box>
      {label && <InputLabel>{label}</InputLabel>}
      <FormControl fullWidth={fullWidth} sx={{ margin: '0 0 24px' }}>
        <MuiTextField
          fullWidth={fullWidth}
          size='small'
          sx={{ margin: '0', padding: '8px 0 0' }}
          {...props}
        />
        {helperText && <HelperText>{helperText}</HelperText>}
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </FormControl>
    </Box>
  )
}
