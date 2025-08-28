import { genRequestId } from 'utils'
import { useSelector } from 'react-redux'
import {
  WebSocketContextProps,
  WebsocketContext,
} from 'providers/WebSocketProvider'
import { Context, useCallback, useContext } from 'react'
import { RootStateProps } from 'types'
import { BGW_EVENT_ACTIONS } from 'constant'
import sleep from 'utils/sleep'

export const useSendWsMessage = () => {
  const context = useContext(WebsocketContext as Context<WebSocketContextProps>)
  const { mac, serialNumber } = useSelector(
    (state: RootStateProps) => state.device,
  )

  if (context) {
    const { sendJsonMessage } = context

    const sendWsGetMessage = useCallback(
      (
        event: string,
        key?: string,
        customRequestId?: string,
        params?: object,
      ) => {
        sendJsonMessage({
          event,
          data: {
            requestId: customRequestId
              ? `${customRequestId}-${genRequestId()}`
              : genRequestId(),
            target: {
              mac,
              serialNumber: serialNumber,
              index: key,
            },
            ...params,
          },
        })
      },
      [mac, sendJsonMessage, serialNumber],
    )

    const sendWsSetMessage = useCallback(
      async (event: string, props: object, key?: string) => {
        const requestId = genRequestId()
        await sendJsonMessage({
          event,
          data: {
            requestId,
            target: {
              mac: mac,
              serialNumber: serialNumber,
              index: key,
            },
            payload: {
              'cbi.submit': '1',
              ...props,
            },
          },
        })
        await sleep(500)
        await sendWsGetMessage(BGW_EVENT_ACTIONS.CONFIG_GET_CHANGES)
      },
      [mac, sendJsonMessage, sendWsGetMessage, serialNumber],
    )

    const sendWsApplyChanges = useCallback(() => {
      const requestId = genRequestId()
      sendJsonMessage({
        event: BGW_EVENT_ACTIONS.CONFIG_SAVE_CHANGES,
        data: {
          requestId,
          target: {
            mac: mac,
            serialNumber: serialNumber,
          },
          payload: {
            redir: '/cgi-bin/luci',
          },
        },
      })
    }, [mac, sendJsonMessage, serialNumber])

    const sendWsRevertChanges = useCallback(async () => {
      const requestId = genRequestId()
      await sendJsonMessage({
        event: BGW_EVENT_ACTIONS.CONFIG_REVERT_CHANGES,
        data: {
          requestId,
          target: {
            mac: mac,
            serialNumber: serialNumber,
          },
          payload: {
            redir: '/cgi-bin/luci',
          },
        },
      })
      await sleep(500)
      await sendWsGetMessage(BGW_EVENT_ACTIONS.CONFIG_GET_CHANGES)
    }, [mac, sendJsonMessage, sendWsGetMessage, serialNumber])

    const sendWsMessage = useCallback(
      async (event: string, params?: object) => {
        sendJsonMessage({
          event,
          data: {
            requestId: genRequestId(),
            mac,
            serialNumber: serialNumber,
            ...params,
          },
        })
      },
      [mac, sendJsonMessage, serialNumber],
    )

    return {
      sendWsMessage,
      sendJsonMessage,
      sendWsGetMessage,
      sendWsSetMessage,
      sendWsApplyChanges,
      sendWsRevertChanges,
    }
  }
  throw new Error('something is wrong')
}
