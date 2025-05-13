import { Theme } from '@mui/material'

export const createPalette = (theme: Theme) => ({
  landscape: {
    main: '#D4E2E2',
    contrastText: theme.palette.common.white,
  },
  reverse: {
    main: theme.palette.common.white,
    contrastText: theme.palette.grey[600],
  },
  primary: {
    main: '#46b8da',
    contrastText: theme.palette.common.white,
  },
  secondary: {
    main: theme.palette.grey[600],
    contrastText: theme.palette.common.white,
  },
  warning: {
    main: '#eea236',
    contrastText: theme.palette.common.white,
  },
  info: {
    main: '#2e6da4',
    contrastText: theme.palette.common.white,
  },
  success: {
    main: '#66C560',
    contrastText: theme.palette.common.white,
  },
  error: {
    main: '#d34154',
    dark: '#8f1525',
    contrastText: theme.palette.common.white,
  },
})
