import * as React from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  RadioGroupProps as MuiRadioGroupProps,
} from '@mui/material'

type OnChangeStr = (_e: { target: { name: string; value: string } }) => void

export type RadioOption = {
  label: React.ReactNode
  value: string
  disabled?: boolean
}

export type FormikRadiosProps = {
  /** Formik field name */
  name: string
  /** String value from/to backend/Formik */
  value: string
  /** Formik-style onChange that receives { target: { name, value } } */
  onChange: OnChangeStr
  /** Forward blur so Formik can set touched */
  onBlur?: MuiRadioGroupProps['onBlur']
  /** Group label (optional) */
  label?: React.ReactNode
  /** Options to render */
  options: RadioOption[]
  /** Horizontal layout */
  row?: boolean
  /** Error state for styles (optional) */
  error?: boolean
  /** Helper or error message (optional) */
  helperText?: React.ReactNode
  /** Size for radios */
  size?: 'small' | 'medium'
} & Omit<MuiRadioGroupProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'row'>

export const Radios: React.FC<FormikRadiosProps> = ({
  name,
  value,
  onChange,
  onBlur,
  label,
  options,
  row = true,
  error,
  helperText,
  size = 'small',
  ...props
}) => {
  const handleChange = (
    _e: React.ChangeEvent<HTMLInputElement>,
    next: string,
  ) => {
    onChange({ target: { name, value: next } })
  }

  const groupId = props.id ?? name

  return (
    <Box mt={1}>
      <FormControl error={!!error} component='fieldset' variant='standard'>
        {label && <FormLabel id={`${groupId}-label`}>{label}</FormLabel>}
        <RadioGroup
          id={groupId}
          aria-labelledby={`${groupId}-label`}
          name={name}
          value={value ?? ''}
          onChange={handleChange}
          onBlur={onBlur}
          row={row}
          {...props}
        >
          {options.map((opt) => (
            <FormControlLabel
              key={opt.value}
              value={opt.value}
              control={<Radio size={size} />}
              label={opt.label}
              disabled={opt.disabled}
            />
          ))}
        </RadioGroup>
        {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
      </FormControl>
    </Box>
  )
}
