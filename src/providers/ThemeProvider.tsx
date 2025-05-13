import React, { ReactNode } from 'react'
import {
  CssBaseline,
  ThemeProvider as Provider,
  createTheme,
  useTheme,
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
  const theme = useTheme()
  const components = createComponents(theme)
  const palette = createPalette(theme)
  const typography = createTypography(theme)

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
