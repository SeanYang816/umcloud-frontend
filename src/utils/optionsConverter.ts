import { isEmpty } from 'lodash'
import { Options, OptionsOrSuggestType } from 'types'

export const optionsConverter = (
  options: OptionsOrSuggestType | Options = {},
  propertyName = '',
) => {
  console.info(options, propertyName)
  if (isEmpty(options) || !options?.[propertyName]) return []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const src = options[propertyName] as any

  // ✅ Only modify this part:
  if (Array.isArray(src)) {
    // keep existing behavior for array inputs
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return src.map((k: any) => ({
      label: k?.text ?? k?.label ?? String(k?.value ?? ''),
      value: String(k?.value ?? ''),
    }))
  }

  // when backend sends an object map: { valueKey: label }
  if (src && typeof src === 'object') {
    return Object.entries(src).map(([value, label]) => ({
      label: String(label),
      value,
    }))
  }

  return []
}
