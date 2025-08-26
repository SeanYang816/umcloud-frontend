import { SelectChangeEvent } from '@mui/material'
import { FormikProps } from 'formik'
import React from 'react'
import { FormikValuesType, SelectOptionProps } from 'types'

export const checkboxProps = (
  fieldName: string,
  label: string,
  formik: FormikProps<FormikValuesType>,
) => {
  const { getFieldProps } = formik

  // Convert the value to a boolean
  const checked =
    formik.values[fieldName] === true || formik.values[fieldName] === '1'

  // Handle toggling between checked and unchecked
  const onChange = () => {
    const currentValue = formik.values[fieldName]
    const newValue =
      typeof currentValue === 'boolean'
        ? !currentValue
        : currentValue === '1'
          ? '0'
          : '1'
    formik.setFieldValue(fieldName, newValue)
  }

  return {
    ...getFieldProps(fieldName),
    label,
    checked,
    onChange,
  }
}

export const radiosProps = (
  fieldName: string,
  label: string,
  options: Array<SelectOptionProps>,
  formik: FormikProps<FormikValuesType>,
) => {
  const { getFieldProps } = formik

  return {
    ...getFieldProps(fieldName),
    label,
    options,
  }
}

export const toggleButtonProps = (
  fieldName: string,
  label: string,
  text: string | [string, string],
  onClick: () => void,
  formik: FormikProps<FormikValuesType>,
) => {
  const { getFieldProps } = formik

  return {
    ...getFieldProps(fieldName),
    label,
    onClick,
    text,
  }
}

export const textfieldProps = (
  fieldName: string,
  label: React.ReactNode,
  formik: FormikProps<FormikValuesType>,
) => {
  const { getFieldProps, touched, errors } = formik

  return {
    ...getFieldProps(fieldName),
    label,
    errorMessage: touched[fieldName] && errors[fieldName],
  }
}

export const multiTextfieldProps = (
  fieldName: string,
  label: string,
  formik: FormikProps<FormikValuesType>,
) => {
  const { setFieldValue, getFieldProps, errors, touched } = formik

  return {
    ...getFieldProps(fieldName),
    label,
    name: fieldName,
    setFieldValue,
    errorMessage: touched[fieldName] && errors[fieldName],
  }
}

export const multiSelectProps = (
  fieldName: string,
  label: string,
  options: Array<SelectOptionProps> = [],
  formik: FormikProps<FormikValuesType>,
) => {
  const { getFieldProps, touched, errors, setFieldValue } = formik

  return {
    ...getFieldProps(fieldName),
    label,
    name: fieldName,
    options,
    setFieldValue,
    errorMessage: touched[fieldName] && errors[fieldName],
  }
}

export const selectProps = (
  fieldName: string,
  label: React.ReactNode,
  options: Array<SelectOptionProps> = [],
  formik: FormikProps<FormikValuesType>,
) => {
  const { getFieldProps, touched, errors } = formik

  return {
    ...getFieldProps(fieldName),
    label,
    options,
    errorMessage: touched[fieldName] && errors[fieldName],
  }
}

export const handleSelectInputChange = (
  e: SelectChangeEvent<unknown>,
  formik: FormikProps<FormikValuesType>,
): void => {
  const { name, value } = e.target
  formik.setFieldValue(name as string, value as string)
}

export const handleToggle = (
  name: string,
  value: boolean,
  formik: FormikProps<FormikValuesType>,
) => {
  formik.setFieldValue(name, value)
}

// ------
export const getFormikProps = <T>(name: keyof T, formik: FormikProps<T>) => {
  const fieldName = name as string

  return {
    ...formik.getFieldProps(fieldName),
    error: Boolean(formik.touched[name] && formik.errors[name]),
    helperText:
      formik.touched[name] && formik.errors[name]
        ? (formik.errors[name] as string)
        : undefined,
  }
}

// ----- new -----

// formikField.ts

export type ChangeEventLike<T> = {
  target: {
    value: T
    name?: string // optional so both styles work
  }
}

export function formikField<
  FormValues extends Record<string, unknown>,
  T = string,
>(formik: FormikProps<FormValues>, name: keyof FormValues & string) {
  const { value, onChange, onBlur } = formik.getFieldProps(name)
  const touched = formik.touched[name]
  const error = formik.errors[name]

  return {
    name,
    // Cast to T for consumers that expect a stricter type (e.g., string Select)
    value: (value as unknown as T) ?? ('' as unknown as T),
    onChange: onChange as (_e: ChangeEventLike<T>) => void,
    onBlur,
    error: Boolean(touched && error),
    helperText: (touched && (error as string)) || undefined,
  } as const
}

export function formikBoolField<FormValues extends Record<string, unknown>>(
  formik: FormikProps<FormValues>,
  name: keyof FormValues & string,
) {
  const touched = formik.touched[name]
  const error = formik.errors[name]

  return {
    name,
    checked: Boolean(formik.values[name]),
    // matches your Checkbox's onChange signature: ({ target: { name, value: boolean } })
    onChange: ({
      target: { value },
    }: {
      target: { name: string; value: boolean }
    }) => formik.setFieldValue(name, value),
    onBlur: () => formik.setFieldTouched(name, true),
    error: Boolean(touched && error),
    helperText: (touched && (error as string)) || undefined,
  } as const
}

export function formikArrayField<FormValues extends Record<string, unknown>>(
  formik: FormikProps<FormValues>,
  name: keyof FormValues & string,
) {
  const touched = formik.touched[name]
  const error = formik.errors[name]

  return {
    name,
    value: (formik.values[name] as unknown as string[]) ?? [],
    onChange: ((e: ChangeEventLike<string[]>) =>
      formik.setFieldValue(name, e.target.value)) as (
      _e: ChangeEventLike<string[]>,
    ) => void,
    onBlur: () => formik.setFieldTouched(name, true),
    error: Boolean(touched && error),
    helperText: (touched && (error as string)) || undefined,
  } as const
}
