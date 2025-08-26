import * as React from 'react'
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Typography,
  Box,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
// If you're using React Router or Next.js, import your router and use it in handleNavigate()

type NavItem =
  | { label: string; href: string } // simple link
  | {
      label: string
      items: { label: string; href: string }[] // dropdown
    }

const NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Products',
    items: [
      { label: 'New Arrivals', href: '/products/new' },
      { label: 'Best Sellers', href: '/products/best' },
      { label: 'Sale', href: '/products/sale' },
    ],
  },
  {
    label: 'Services',
    items: [
      { label: 'Web Development', href: '/services/web' },
      { label: 'Mobile Apps', href: '/services/mobile' },
      { label: 'Cloud', href: '/services/cloud' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function HeaderNav() {
  // Track which dropdown is open and where it's anchored
  const [openMenu, setOpenMenu] = React.useState<{
    label: string
    anchorEl: HTMLElement | null
  } | null>(null)

  const handleOpenMenu =
    (label: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpenMenu({ label, anchorEl: e.currentTarget })
    }

  const handleCloseMenu = () => setOpenMenu(null)

  const isMenuOpen = (label: string) => openMenu?.label === label

  const handleNavigate = (href: string) => {
    // Replace with your router
    // e.g. react-router: navigate(href)
    // e.g. next/router: router.push(href)
    window.location.href = href
  }

  return (
    <AppBar position='static' elevation={0}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          MyApp
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {NAV.map((item) => {
            if ('href' in item) {
              // Simple link button
              return (
                <Button
                  key={item.label}
                  color='inherit'
                  onClick={() => handleNavigate(item.href)}
                  aria-label={item.label}
                >
                  {item.label}
                </Button>
              )
            }

            // Dropdown button
            const { label, items } = item
            const menuOpen = isMenuOpen(label)

            return (
              <React.Fragment key={label}>
                <Button
                  color='inherit'
                  onClick={handleOpenMenu(label)}
                  endIcon={<KeyboardArrowDownIcon />}
                  aria-haspopup='menu'
                  aria-controls={menuOpen ? `${label}-menu` : undefined}
                  aria-expanded={menuOpen ? 'true' : undefined}
                >
                  {label}
                </Button>

                <Menu
                  id={`${label}-menu`}
                  anchorEl={openMenu?.anchorEl ?? null}
                  open={menuOpen}
                  onClose={handleCloseMenu}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                >
                  {items.map((sub) => (
                    <MenuItem
                      key={sub.label}
                      onClick={() => {
                        handleCloseMenu()
                        handleNavigate(sub.href)
                      }}
                    >
                      {sub.label}
                    </MenuItem>
                  ))}
                </Menu>
              </React.Fragment>
            )
          })}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
