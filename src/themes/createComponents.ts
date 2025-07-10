import { CSSObject, Theme } from '@mui/material'

export const createComponents = (theme: Theme) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        fontSize: theme.spacing(2),
        fontWeight: 600,
        padding: `${theme.spacing(0.25)} ${theme.spacing(1.5)}`,
      },
    },
  },
  MuiFormControl: {
    styleOverrides: {
      root: {
        marginTop: theme.spacing(2),
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {},
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        fontSize: '1rem',
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      root: {
        zIndex: 10000, // Match the z-index of the Dialog
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      root: {
        zIndex: 10000,
      },
      paper: {
        maxWidth: '550px',
        borderRadius: '10px',
        border: `1px ${theme.palette.grey[700]} solid`,
        boxShadow: theme.shadows[0],
      },
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        textAlign: 'center' as const,
        padding: `${theme.spacing(3)} ${theme.spacing(6)}`,
      },
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        padding: `${theme.spacing(3)} ${theme.spacing(6)}`,
      },
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        justifyContent: 'flex-start',
        textAlign: 'center' as const,
        padding: `0 ${theme.spacing(6)} ${theme.spacing(3)}`,
      },
    },
  },
  MuiBackdrop: {
    styleOverrides: {
      root: {
        zIndex: 9998,
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: {
        marginBottom: `${theme.spacing(2)}`,
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        fontSize: '14px',
        textTransform: 'none',
      } as CSSObject,
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {},
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  MuiCardActions: {
    styleOverrides: {
      root: {
        padding: theme.spacing(2),
      },
    },
  },
})
