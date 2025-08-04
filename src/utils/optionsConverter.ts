import { isEmpty } from 'lodash'
import { OptionsOrSuggestType } from 'types'

export const optionsConverter = (
  options: OptionsOrSuggestType = {},
  propertyName = '',
) => {
  console.log(options, propertyName)
  if (isEmpty(options) || !options?.[propertyName]) return []

  return options[propertyName].map((k) => ({
    label: k.text,
    value: k.value,
  }))
}
