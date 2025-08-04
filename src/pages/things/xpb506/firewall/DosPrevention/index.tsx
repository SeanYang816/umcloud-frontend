import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { SERVER_ACTIONS } from 'constant'
import { RootStateProps } from 'types'
import { Form } from './Form'
import { PageHeader } from 'components/PageHeader'

export const DosPrevention = () => {
  const { sendWsGetMessage } = useSendWsMessage()
  const data = useSelector(
    (state: RootStateProps) => state.bgw5105.firewall.dosPrevention,
  )
  const result = data?.result ?? {}

  useEffect(() => {
    sendWsGetMessage(SERVER_ACTIONS.FIREWALL_GET_DOS_PREVENTION_PAGE)
  }, [sendWsGetMessage])

  return (
    <>
      <PageHeader
        title='DoS Prevention'
        subtitle='This section allows you to enable Denial of Service (DoS) attack prevention which provides an additional safeguard to your network. Enabling DoS Prevention can help to prevent attacks such as SYN flood, ICMP flood, and furtive port scanning by unwanted intruders.'
      />
      <Form result={result} />
    </>
  )
}
