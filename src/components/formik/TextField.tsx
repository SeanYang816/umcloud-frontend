import * as React from 'react'
import {
  Box,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material'

type OnChangeLike = (_e: { target: { name: string; value: string } }) => void

export type FormikTextFieldProps = {
  name: string
  value: string
  onChange: OnChangeLike
  onBlur?: MuiTextFieldProps['onBlur']
  label?: React.ReactNode
  error?: boolean
  helperText?: React.ReactNode
  fullWidth?: boolean
} & Omit<
  MuiTextFieldProps,
  // we provide our own typing/behavior for the following
  'value' | 'onChange' | 'onBlur' | 'label' | 'error' | 'helperText'
>

export const TextField: React.FC<FormikTextFieldProps> = ({
  name,
  value,
  onChange,
  onBlur,
  label,
  error,
  helperText,
  fullWidth = true,
  size = 'small',
  variant = 'outlined',
  ...rest
}) => {
  // pull out slotProps from the rest so we can merge them
  const { slotProps, ...other } = rest as {
    slotProps?: MuiTextFieldProps['slotProps']
  }

  // merge caller-provided slotProps but force the label to always shrink
  const mergedSlotProps: MuiTextFieldProps['slotProps'] = {
    ...slotProps,
    inputLabel: {
      ...slotProps?.inputLabel,
      shrink: true, // <-- keep label always floating
    },
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <MuiTextField
        name={name}
        label={label}
        value={value ?? ''}
        onChange={(e) => onChange({ target: { name, value: e.target.value } })}
        onBlur={onBlur}
        error={error}
        helperText={helperText}
        fullWidth={fullWidth}
        size={size}
        variant={variant}
        slotProps={mergedSlotProps}
        {...other}
      />
    </Box>
  )
}
