import React from 'react'
import {
  Box,
  OutlinedInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  FilledInputProps,
} from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { ErrorMessage } from 'components/ErrorMessage'

type CustomTextFieldProps = {
  label?: React.ReactNode
  fullWidth?: boolean
  helperText?: string | boolean | undefined
  errorMessage?: string | boolean | undefined
} & FilledInputProps

export const PasswordField: React.FC<CustomTextFieldProps> = ({
  label,
  fullWidth = true, // Set default value
  helperText,
  errorMessage,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  return (
    <Box>
      {label && <InputLabel>{label}</InputLabel>}
      <FormControl fullWidth={fullWidth} sx={{ margin: '0 0 16px' }}>
        <OutlinedInput
          {...props}
          type={showPassword ? 'text' : 'password'}
          size='small'
          sx={{ margin: '8px 0' }}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton onClick={handleClickShowPassword} edge='end'>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {helperText && (
          <FormHelperText
            component='div'
            sx={{
              display: 'flex',
              margin: '3px 0 3px 2px',
              height: '15px',
              '& > svg': {
                height: '100%',
              },
            }}
          >
            <HelpIcon fontSize='small' />
            {helperText}
          </FormHelperText>
        )}
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </FormControl>
    </Box>
  )
}
