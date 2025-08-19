import { isEmpty } from 'lodash'
import { useMemo } from 'react'
import { SelectOptionProps } from 'types'

/**
 * Flexible options converter hook
 * - Accepts loosely typed `options: Record<string, unknown> | undefined`
 * - Works with both array-of-objects and key-value map structures
 * - Safely maps to `{label, value}`
 * - Returns `[]` when the source key is missing or empty
 */

const isObject = (x: unknown): x is Record<string, unknown> =>
  typeof x === 'object' && x !== null

export const useOptionsConverter = (
  options: Record<string, unknown> | undefined = {},
  rootId = '',
  key = '',
): SelectOptionProps[] => {
  return useMemo(() => {
    const sourceKey = `${rootId}${key}`
    const raw = isObject(options)
      ? (options as Record<string, unknown>)[sourceKey]
      : undefined

    if (!raw || isEmpty(raw)) return []

    // Case 1: Already an array of objects
    if (Array.isArray(raw)) {
      return raw
        .map((item) => {
          if (!isObject(item)) return null
          const label = item['text'] ?? item['label']
          const value = item['value'] ?? item['id']
          if (
            typeof label === 'string' &&
            (typeof value === 'string' || typeof value === 'number')
          ) {
            return { label, value }
          }

          return null
        })
        .filter((x): x is SelectOptionProps => x !== null)
    }

    // Case 2: Key-value map (e.g., { "1": "Jan", "2": "Feb" })
    if (isObject(raw)) {
      return Object.entries(raw).map(([value, label]) => ({
        label: String(label),
        value,
      }))
    }

    return []
  }, [options, rootId, key])
}
