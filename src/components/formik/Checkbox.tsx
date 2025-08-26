import * as React from 'react'
import {
  Box,
  InputLabel,
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  Stack,
} from '@mui/material'
import { HelperText } from 'components/extends/HelperText'

type OnChange10 = (_e: { target: { name: string; value: '1' | '0' } }) => void

export type FormikCheckbox10Props = {
  /** Formik field name */
  name: string
  /** String value from/to backend/Formik: "1" or "0" */
  value: '1' | '0'
  /** Formik-style onChange that returns "1" | "0" */
  onChange: OnChange10
  /** Forward blur so Formik can set touched */
  onBlur?: MuiCheckboxProps['onBlur']
  /** Visual label */
  label?: React.ReactNode
  /** Error state for styles (optional) */
  error?: boolean
  /** Helper or error message (optional) */
  helperText?: React.ReactNode
} & Omit<MuiCheckboxProps, 'checked' | 'onChange' | 'onBlur' | 'name' | 'value'>

export const Checkbox: React.FC<FormikCheckbox10Props> = ({
  name,
  value,
  onChange,
  onBlur,
  label = '',
  helperText,
  error,
  size = 'small',
  ...props
}) => {
  const id = props.id ?? name
  const checked = value === '1'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ target: { name, value: e.target.checked ? '1' : '0' } })
  }

  return (
    <Box mt={1}>
      <Stack direction='row' alignItems='center'>
        {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
        <MuiCheckbox
          id={id}
          name={name}
          checked={checked}
          onChange={handleChange}
          onBlur={onBlur}
          size={size}
          sx={
            error
              ? {
                  outline: '1px solid',
                  outlineColor: 'error.main',
                  borderRadius: 0.5,
                }
              : undefined
          }
          {...props}
        />
      </Stack>
      {helperText && <HelperText>{helperText}</HelperText>}
    </Box>
  )
}
