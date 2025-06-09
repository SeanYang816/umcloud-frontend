import React, { useState } from 'react'
import {
  TextField,
  TextFieldProps,
  IconButton,
  InputAdornment,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

type StyledPasswordFieldProps = TextFieldProps & {
  white?: boolean
}

export const StyledPasswordField: React.FC<StyledPasswordFieldProps> = ({
  white,
  error,
  helperText,
  sx,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      {/* Prevent Chrome autofill bug */}
      <input
        style={{ display: 'none' }}
        type='password'
        autoComplete='current-password'
        tabIndex={-1}
      />
      <TextField
        fullWidth
        variant='outlined'
        type={showPassword ? 'text' : 'password'}
        error={error}
        helperText={helperText}
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
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={() => setShowPassword((v) => !v)} edge='end'>
                {showPassword ? (
                  <VisibilityOff sx={{ color: 'red' }} />
                ) : (
                  <Visibility sx={{ color: '#27D4EF' }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        slotProps={{
          inputLabel: {
            shrink: true,
            // ❌ Do NOT use style here
          },
        }}
        {...props}
      />
    </>
  )
}
