import React from 'react'
import {
  FormControl,
  FormHelperText,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import { ChangeEventLike } from 'utils/formik'

// If you don't already have this somewhere:

type Option = { label: string; value: string; disabled?: boolean }

type MultiCheckboxProps = {
  // from formikArrayField(...)
  name: string
  value: string[]
  onChange: (_e: ChangeEventLike<string[]>) => void
  onBlur?: () => void
  error?: boolean
  helperText?: string

  // component-specific
  label?: string
  options: Option[]
  disabled?: boolean
  row?: boolean
}

export const MultiCheckbox: React.FC<MultiCheckboxProps> = ({
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  label,
  options,
  disabled,
  row = true,
}) => {
  const current = value ?? []

  const toggle = (val: string) => {
    const next = value.includes(val)
      ? value.filter((v) => v !== val)
      : [...value, val]

    // OK for both callers: name is optional
    onChange({ target: { value: next, name } })
  }

  return (
    <FormControl
      component='fieldset'
      disabled={disabled}
      error={!!error}
      variant='standard'
    >
      {label && <FormLabel component='legend'>{label}</FormLabel>}
      <FormGroup row={row}>
        {options.map((opt) => (
          <FormControlLabel
            key={opt.value}
            label={opt.label}
            control={
              <Checkbox
                size='small'
                name={name}
                checked={current.includes(opt.value)}
                onChange={() => toggle(opt.value)}
                onBlur={onBlur}
                disabled={disabled || opt.disabled}
              />
            }
          />
        ))}
      </FormGroup>
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
