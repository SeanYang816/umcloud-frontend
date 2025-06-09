import React from 'react'
import { TextField, TextFieldProps } from '@mui/material'

type StyledTextFieldProps = TextFieldProps & {
  white?: boolean
}

export const StyledTextField: React.FC<StyledTextFieldProps> = ({
  white,
  error,
  helperText,
  sx,
  ...props
}) => {
  return (
    <>
      {/* Hidden dummy input to prevent Chrome autofill */}
      <input
        style={{ display: 'none' }}
        type='text'
        autoComplete='username'
        tabIndex={-1}
      />

      <TextField
        fullWidth
        variant='outlined'
        error={error}
        helperText={helperText}
        slotProps={{
          inputLabel: {
            shrink: true, // ✅ Only shrink here — no inline color
          },
          input: {
            style: white ? { color: 'white' } : undefined,
            autoComplete: 'new-password',
          },
        }}
        sx={{
          ...(white && {
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: error ? '#f44336' : 'white',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: error ? '#f44336' : 'white',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: error ? '#f44336' : 'white',
              },
            },
            '& .MuiInputLabel-root': {
              color: error ? '#f44336' : 'white',
            },
            '& .MuiFormHelperText-root': {
              color: error ? '#f44336' : 'white',
            },
          }),
          ...sx,
        }}
        {...props}
      />
    </>
  )
}
