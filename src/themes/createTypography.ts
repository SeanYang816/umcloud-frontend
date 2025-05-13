import { Theme } from '@mui/material'

export const createTypography = (_theme: Theme) => ({
  fontSize: 16,
  fontFamily: 'Open Sans, san-serif, Arial',
  h1: {
    fontSize: '28px',
  },
  h2: {
    fontSize: '26px',
  },
  h3: {
    fontSize: '24px',
  },
  h4: {
    fontSize: '20px',
  },
  h5: {
    fontSize: '18px',
  },
  h6: {
    fontSize: '16px',
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '0.9rem',
    lineHeight: 1.4,
  },
  subtitle1: {
    fontSize: '0.9rem',
  },
  subtitle2: {
    fontSize: '0.8rem',
  },
  caption: {
    fontSize: '0.7rem',
  },
  overline: {
    fontSize: '0.7rem',
  },
})
