import React, { useState, useCallback, ReactNode } from 'react'

interface DialogControllerProps {
  children: (_props: {
    open: boolean
    onOpen: () => void
    onClose: () => void
    onToggle: () => void
  }) => ReactNode
}

export const DialogController: React.FC<DialogControllerProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false)
  const onOpen = useCallback(() => setOpen(true), [])
  const onClose = useCallback(() => setOpen(false), [])
  const onToggle = useCallback(() => setOpen((prev) => !prev), [])

  return <>{children({ open, onOpen, onClose, onToggle })}</>
}
