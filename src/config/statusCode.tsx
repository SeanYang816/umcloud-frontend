import { toast } from 'react-toastify'

export const toastHandler = (status: string) => {
  switch (status) {
    case '0':
      toast.success('success')
      break
    default:
      toast.error('error')
      break
  }
}
