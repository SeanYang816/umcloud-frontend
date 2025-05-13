import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, FormControl, FormHelperText, InputLabel } from '@mui/material'
import { ErrorMessage } from 'components/ErrorMessage'
import { FormikHelpers } from 'formik'
import { FormikValuesType } from 'types'

interface CustomMultiTextFieldProps {
  name: string
  type?: string
  value: string[]
  label?: string
  fullWidth?: boolean
  helperText?: string | boolean | undefined
  errorMessage?: string | boolean | undefined
  setFieldValue: FormikHelpers<FormikValuesType>['setFieldValue']
}

export const MultiTextField: React.FC<CustomMultiTextFieldProps> = ({
  name,
  type = 'text',
  value,
  label,
  fullWidth = true,
  helperText,
  errorMessage,
  setFieldValue,
  ...props
}) => {
  const [fields, setFields] = useState<string[]>(value)

  const addField = () => {
    setFields([...fields, ''])
  }

  const deleteField = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index)
    setFields(updatedFields)
    setFieldValue(name, updatedFields)
  }

  const handleFieldChange = (index: number, updatedValue: string) => {
    const updatedFields = [...fields]
    updatedFields[index] = updatedValue
    setFields(updatedFields)
    setFieldValue(name, updatedFields)
  }

  useEffect(() => {
    setFields(value)
  }, [value])

  return (
    <Box sx={{ margin: '0 0 16px' }}>
      {label && <InputLabel>{label}</InputLabel>}
      <FormControl fullWidth={fullWidth}>
        {fields.map((field, index) => (
          <Box
            sx={{
              display: 'flex',
              '&:not(:first-child)': {
                marginTop: '5px',
              },
            }}
            key={index}
          >
            <TextField
              {...props}
              type={type}
              label={`Field ${index + 1}`}
              value={field}
              fullWidth={fullWidth}
              size='small'
              onChange={(e) => handleFieldChange(index, e.target.value)}
            />
            {index === fields.length - 1 ? (
              <Button
                variant='text'
                startIcon={<AddIcon />}
                onClick={addField}
              />
            ) : (
              <Button
                variant='text'
                startIcon={<DeleteIcon />}
                onClick={() => deleteField(index)}
              />
            )}
          </Box>
        ))}
        {helperText && (
          <FormHelperText sx={{ margin: '3px 0 3px 2px' }}>
            {helperText}
          </FormHelperText>
        )}
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </FormControl>
    </Box>
  )
}
