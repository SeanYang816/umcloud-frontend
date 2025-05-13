import { isEmpty } from 'lodash'
import { useMemo } from 'react'
import { OptionsOrSuggestType } from 'types'

export const useOptionsConverter = (
  options: OptionsOrSuggestType = {},
  rootId = '',
  key = '',
) => {
  return useMemo(() => {
    if (isEmpty(options) || !options[`${rootId}${key}`]) return []

    return options[`${rootId}${key}`].map((k) => ({
      label: k.text,
      value: k.value,
    }))
  }, [options, rootId, key])
}
