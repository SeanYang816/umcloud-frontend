import { toast } from 'react-toastify'

export const toastHandler = (status: string) => {
  switch (status.toString()) {
    case '0':
      toast.success('success')
      break
    default:
      toast.error('error')
      break
  }
}

// WTF error where from
