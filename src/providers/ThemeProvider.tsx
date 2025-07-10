import React, { ReactNode } from 'react'
import {
  CssBaseline,
  ThemeProvider as Provider,
  createTheme,
} from '@mui/material'
import {
  createPalette,
  createTypography,
  createComponents,
  breakpoints,
} from '../themes'

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Use default input (or your own base theme if needed)
  const baseTheme = createTheme()

  const palette = createPalette(baseTheme)
  const typography = createTypography(baseTheme)
  const components = createComponents(baseTheme)

  const themes = createTheme({
    palette,
    typography,
    breakpoints,
    components,
  })

  return (
    <Provider theme={themes}>
      <CssBaseline />
      {children}
    </Provider>
  )
}
