import * as React from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  FormHelperText,
  OutlinedInput,
} from '@mui/material'

export type SelectOption = {
  label: React.ReactNode
  value: string
}

type MuiOnBlur = NonNullable<MuiSelectProps<string>['onBlur']>
type OnChangeLike = (_e: { target: { name: string; value: string } }) => void

export type SelectFieldProps = {
  name: string
  value: string
  onChange: OnChangeLike
  onBlur?: MuiOnBlur
  /** Should be a string so the notch width can be computed correctly */
  label?: string
  options: SelectOption[]
  error?: boolean
  helperText?: React.ReactNode
  fullWidth?: boolean
  /** Keep the InputLabel always floating (default: true) */
  shrinkLabel?: boolean
  /** Show placeholder while empty (helps UX) */
  displayEmpty?: boolean
} & Omit<
  MuiSelectProps<string>,
  'value' | 'onChange' | 'onBlur' | 'label' | 'error' | 'displayEmpty'
>

export const Select: React.FC<SelectFieldProps> = ({
  name,
  value,
  onChange,
  onBlur,
  label,
  options,
  error,
  helperText,
  fullWidth = true,
  size = 'small',
  variant = 'outlined',
  shrinkLabel = true,
  displayEmpty = true,
  ...rest
}) => {
  const labelId = React.useId()
  const selectId = React.useId()

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl
        fullWidth={fullWidth}
        size={size}
        variant={variant}
        error={error}
      >
        {label && (
          <InputLabel id={labelId} shrink={shrinkLabel}>
            {label}
          </InputLabel>
        )}

        <MuiSelect
          labelId={labelId}
          id={selectId}
          name={name}
          value={value ?? ''}
          // IMPORTANT: provide an OutlinedInput with the same label and forced notched state
          input={
            <OutlinedInput
              label={label ?? ''}
              // Open the notch when the label is shrunk
              notched={Boolean(shrinkLabel)}
            />
          }
          displayEmpty={displayEmpty}
          onChange={(e) =>
            onChange({
              target: {
                name,
                value: (e.target as HTMLInputElement).value,
              },
            })
          }
          onBlur={onBlur}
          {...rest}
        >
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </MuiSelect>

        {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
      </FormControl>
    </Box>
  )
}
