import { isUndefined } from 'lodash'
import { FormikValuesType } from 'types'

export function extractLastPartOfKeys(
  inputObject: FormikValuesType,
): FormikValuesType {
  return Object.keys(inputObject).reduce((acc: FormikValuesType, key) => {
    const lastPart = key.split('.').pop()
    if (!isUndefined(lastPart)) {
      acc[lastPart!] = inputObject[key]
    }

    return acc
  }, {})
}
