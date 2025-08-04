import { useEffect } from 'react'
import { Form } from './Form'
import { useSelector } from 'react-redux'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { SERVER_ACTIONS } from 'constant'
import { RootStateProps } from 'types'
import { PageHeader } from 'components/PageHeader'

export const Alg = () => {
  const data = useSelector((state: RootStateProps) => state.alg.alg)
  const result = data?.result ?? {}
  const options = data?.options ?? {}

  const { sendWsGetMessage } = useSendWsMessage()

  useEffect(() => {
    sendWsGetMessage(SERVER_ACTIONS.ALG_GET_ALG_PAGE)
  }, [sendWsGetMessage])

  return (
    <>
      <PageHeader
        title='ALG'
        subtitle='This section allows you to enable or disable communications of the listed protocols/applications to pass through your router between your network and the Internet. These are special protocols/applications that are unable to natively pass through your router without the use of ALG (application layer gateway).'
      />

      <Form result={result} options={options} />
    </>
  )
}
