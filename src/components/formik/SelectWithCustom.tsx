import * as React from 'react'
import { Box, TextField as MuiTextField } from '@mui/material'
import { Select, SelectOption } from './Select'
import type { SelectFieldProps } from './Select'

type Props = Omit<SelectFieldProps, 'value' | 'onChange' | 'options'> & {
  value: string
  onChange: (_e: { target: { name: string; value: string } }) => void
  options: SelectOption[]
  /** the option value that triggers custom mode (already in your options) */
  triggerValue: string
  customPlaceholder?: string
  /** optional: start opened if needed (defaults to false) */
  defaultCustomMode?: boolean
  /** optional: clear field when entering custom mode (defaults to true) */
  clearOnEnterCustom?: boolean
}

export const SelectWithCustom: React.FC<Props> = ({
  name,
  value,
  onChange,
  onBlur,
  label,
  options,
  error,
  helperText,
  fullWidth = true,
  triggerValue,
  customPlaceholder = 'Enter value',
  defaultCustomMode = false,
  clearOnEnterCustom = true,
  ...rest
}) => {
  // ONLY user selection controls this
  const [customMode, setCustomMode] = React.useState(defaultCustomMode)

  return (
    <Box>
      <Select
        name={name}
        label={label}
        options={options} // contains the triggerValue option
        value={customMode ? triggerValue : value}
        onChange={(e) => {
          const next = e.target.value
          if (next === triggerValue) {
            setCustomMode(true)
            if (clearOnEnterCustom) {
              onChange({ target: { name, value: '' } }) // let user type fresh
            }
            // else keep existing value; select still shows triggerValue
          } else {
            setCustomMode(false)
            onChange({ target: { name, value: next } })
          }
        }}
        onBlur={onBlur}
        error={error}
        helperText={helperText}
        fullWidth={fullWidth}
        {...rest}
      />

      {customMode && (
        <Box sx={{ mt: -1 }}>
          <MuiTextField
            fullWidth={fullWidth}
            size='small'
            variant='outlined'
            placeholder={customPlaceholder}
            value={value}
            onChange={(e) =>
              onChange({ target: { name, value: e.target.value } })
            }
            onBlur={onBlur}
            error={error}
            helperText={helperText}
            // autofocus feels great when entering custom mode:
          />
        </Box>
      )}
    </Box>
  )
}
