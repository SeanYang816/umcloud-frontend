// hooks/useAutoRefresh.ts
import { useCallback, useEffect, useRef, useState } from 'react'

export const AUTO_REFRESH_DEFAULTS = {
  auto: true,
  intervalMs: 60_000, // 1 minute
  minIntervalMs: 60_000, // 1 minute
  pauseOnHidden: true,
  initialFetch: true,
} as const

type UseAutoRefreshOptions = {
  /** Called on each refresh (manual + timer). Return a Promise if async. */
  fetcher: () => void | Promise<void>
  /** Start with auto refresh ON? (default 10s interval) */
  auto?: boolean
  /** Initial interval in ms (default 10s). */
  intervalMs?: number
  /** Enforce a minimum interval (default 10s). */
  minIntervalMs?: number
  /** If provided, we consider refresh "done" when this value changes. */
  doneSignal?: unknown
  /** Pause auto refresh when tab is hidden (default true). */
  pauseOnHidden?: boolean
  /** Run an initial fetch on mount (default true). */
  initialFetch?: boolean
}

export function useAutoRefresh({
  fetcher,
  auto = AUTO_REFRESH_DEFAULTS.auto,
  intervalMs: initialInterval = AUTO_REFRESH_DEFAULTS.intervalMs,
  minIntervalMs = AUTO_REFRESH_DEFAULTS.minIntervalMs,
  doneSignal,
  pauseOnHidden = AUTO_REFRESH_DEFAULTS.pauseOnHidden,
  initialFetch = AUTO_REFRESH_DEFAULTS.initialFetch,
}: UseAutoRefreshOptions) {
  const [isAutoRefresh, setIsAutoRefresh] = useState(auto)
  const [intervalMs, _setIntervalMs] = useState(
    Math.max(initialInterval, minIntervalMs),
  )
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefreshed, setLastRefreshed] = useState<number | null>(null)

  const inFlight = useRef(false)
  const lastSignalRef = useRef(doneSignal)

  const setIntervalMs = useCallback(
    (ms: number) => _setIntervalMs(Math.max(ms, minIntervalMs)),
    [minIntervalMs],
  )

  const refresh = useCallback(async () => {
    if (inFlight.current) return
    inFlight.current = true
    setIsRefreshing(true)
    try {
      await fetcher()
      if (doneSignal === undefined) {
        setLastRefreshed(Date.now())
        setIsRefreshing(false)
        inFlight.current = false
      }
    } catch {
      setIsRefreshing(false)
      inFlight.current = false
    }
  }, [fetcher, doneSignal])

  useEffect(() => {
    if (doneSignal === undefined) return
    if (lastSignalRef.current !== doneSignal && isRefreshing) {
      lastSignalRef.current = doneSignal
      setLastRefreshed(Date.now())
      setIsRefreshing(false)
      inFlight.current = false
    } else {
      lastSignalRef.current = doneSignal
    }
  }, [doneSignal, isRefreshing])

  useEffect(() => {
    if (!initialFetch) return
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isAutoRefresh) return
    if (pauseOnHidden && typeof document !== 'undefined' && document.hidden) {
      const onVisible = () => {
        if (!document.hidden) {
          refresh()
          document.removeEventListener('visibilitychange', onVisible)
        }
      }
      document.addEventListener('visibilitychange', onVisible)

      return () => document.removeEventListener('visibilitychange', onVisible)
    }
    const id = setInterval(() => refresh(), intervalMs)

    return () => clearInterval(id)
  }, [isAutoRefresh, intervalMs, pauseOnHidden, refresh])

  const start = useCallback(() => setIsAutoRefresh(true), [])
  const stop = useCallback(() => setIsAutoRefresh(false), [])

  return {
    // state
    isAutoRefresh,
    intervalMs,
    isRefreshing,
    lastRefreshed,
    // actions
    setIsAutoRefresh,
    setIntervalMs,
    refresh,
    start,
    stop,
  }
}
