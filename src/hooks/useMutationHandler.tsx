import { toast } from 'react-toastify'

export const useMutationHandler = <ResultType, DataType>(
  performMutation: (data?: DataType) => Promise<ResultType>,
  actionName: string,
) => {
  const handleMutation = async (data?: DataType) => {
    try {
      const result = await performMutation(data)
      toast.success(`${actionName} succeeded`)

      return result
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error)
        toast.error(`${actionName} failed. ${error.message}`)
        throw new Error(`${actionName} failed. ${error.message}`)
      } else {
        console.error(error)
        toast.error(`${actionName} failed. Unknown error occurred`)
        throw new Error(`${actionName} failed. Unknown error occurred`)
      }
    }
  }

  return handleMutation
}
