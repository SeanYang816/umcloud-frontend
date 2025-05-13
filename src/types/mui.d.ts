import { PaletteColor, PaletteColorOptions } from '@mui/material'

export type MuiColor =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning'

export type MuiSize = 'small' | 'medium' | 'large'

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    reverse: true
  }
}

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    [key: string]: PaletteColor
    landscape: PaletteColor
  }

  interface PaletteOptions {
    landscape?: PaletteColorOptions
  }
}
