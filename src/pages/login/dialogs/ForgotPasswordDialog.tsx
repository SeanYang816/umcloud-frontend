import { Button, Dialog, DialogContent, Stack, Typography } from '@mui/material'

type ForgotPasswordDialogProps = {
  open: boolean
  onClose: () => void
}

export const ForgotPasswordDialog = ({
  open,
  onClose,
}: ForgotPasswordDialogProps) => {
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogContent>
        <Stack>
          <Typography textAlign='center' gutterBottom>
            Please contact the system administrator for assistance in making
            changes
          </Typography>
          <Button variant='contained' onClick={onClose}>
            OK
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
