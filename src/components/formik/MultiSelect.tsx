import * as React from 'react'
import {
  FormControl,
  TextField,
  Autocomplete,
  Box,
  FormHelperText,
} from '@mui/material'
import type { AutocompleteProps } from '@mui/material/Autocomplete'

type OnChangeArrayLike = (_e: {
  target: { name: string; value: string[] }
}) => void

export type SelectOptionProps = { label: string; value: string }

type MultiSelectProps = {
  name: string
  label?: string
  value: string[]
  options: SelectOptionProps[]
  variant?: 'filled' | 'standard' | 'outlined'
  fullWidth?: boolean
  helperText?: React.ReactNode
  placeholder?: string
  onChange: OnChangeArrayLike
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  freeSolo?: boolean
  error?: boolean
  /** Show "+n" collapsed chips when many selections */
  limitTags?: number
} & Omit<
  AutocompleteProps<string, true, false, boolean>,
  | 'multiple'
  | 'options'
  | 'value'
  | 'onChange'
  | 'renderInput'
  | 'freeSolo'
  | 'onBlur'
>

export const MultiSelect: React.FC<MultiSelectProps> = ({
  name,
  label,
  value,
  options = [],
  variant = 'outlined',
  fullWidth = true,
  placeholder = '',
  onChange,
  onBlur,
  freeSolo = false,
  helperText,
  error,
  limitTags = 3,
  ...autoProps
}) => {
  const [inputValue, setInputValue] = React.useState('')

  const handleChange = (_: unknown, newValue: Array<string>) => {
    const unique = Array.from(
      new Set(newValue.map((v) => v.trim()).filter(Boolean)),
    )
    onChange({ target: { name, value: unique } })
  }

  const handleInputChange = (_: unknown, newInput: string) => {
    setInputValue(newInput)
  }

  const labels = options.map((o) => o.label)

  return (
    <Box mt={-2}>
      <FormControl variant={variant} fullWidth={fullWidth} error={error}>
        <Autocomplete<string, true, false, boolean>
          multiple
          freeSolo={freeSolo}
          options={labels}
          value={value || []}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onChange={handleChange}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onBlur={onBlur as any}
          filterSelectedOptions
          limitTags={limitTags}
          renderInput={(params) => (
            <TextField
              {...params}
              name={name}
              label={label}
              variant={variant}
              size='small'
              placeholder={placeholder}
              error={error}
              onBlur={onBlur}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              slotProps={{ inputLabel: { shrink: true } } as any}
              onKeyDown={(e) => {
                if (
                  freeSolo &&
                  (e.key === 'Enter' || e.key === 'Tab') &&
                  inputValue.trim()
                ) {
                  e.preventDefault()
                  const next = Array.from(
                    new Set([...(value || []), inputValue.trim()]),
                  )
                  onChange({ target: { name, value: next } })
                  setInputValue('')
                }
              }}
            />
          )}
          {...autoProps}
        />
        {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
      </FormControl>
    </Box>
  )
}
