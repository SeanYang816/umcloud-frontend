import { actionUpdaters, actions } from 'actions'
import { toastHandler } from 'config/statusCode'
import { isNil } from 'lodash'
import { ReactNode, createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useWebSocket from 'react-use-websocket'
import { SendJsonMessage } from 'react-use-websocket/dist/lib/types'
import { updateNotification, updateWebSocketStatus } from 'reducers/global'
import { DefaultRootStateProps } from 'types'

enum ServerEvent {
  Ping = 'ping',
  WS_Error = 'wsError',
}

export type WebSocketContextProps = {
  sendJsonMessage: SendJsonMessage
} | null

export const WebsocketContext = createContext<WebSocketContextProps>(null)

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch()
  const token = useSelector(
    (state: DefaultRootStateProps) => state.authentication.token,
  )

  const { sendJsonMessage } = useWebSocket(
    import.meta.env.VITE_APP_WS_BACKEND_URI,
    {
      queryParams: {
        token,
      },
      onOpen: () => {
        sendJsonMessage({ event: 'pong' })
        dispatch(updateWebSocketStatus(true))
      },
      shouldReconnect: () => true,
      retryOnError: true,
      onMessage: (e) => {
        try {
          const json = JSON.parse(e.data)
          const event = json?.event
          const isUpdater = !isNil(actionUpdaters[json.event])
          const action = isUpdater
            ? actionUpdaters[json.event]
            : actions[json.event]
          const status = json?.result?.status

          switch (event) {
            case ServerEvent.Ping:
              sendJsonMessage({ event: 'pong' })
              break
            case ServerEvent.WS_Error:
              dispatch(updateNotification(json))
              break
            default:
              if (action) {
                const { result: data, requestId: requestId } = json
                const dataAndRequestId = { ...data, requestId }
                dispatch(action?.(dataAndRequestId))
                if (isUpdater) {
                  toastHandler(status)
                }
              } else {
                const event = json?.requestId
                if (event) {
                  const { result: data } = json
                  dispatch(actions[event]?.(data))
                }
              }
              break
          }
        } catch (err) {
          console.error(err, e)
        }
      },
      onError: (e) => {
        console.error(e)
      },
      onClose: (e) => {
        console.error(e)
        dispatch(updateWebSocketStatus(false))
      },
    },
  )

  return (
    <WebsocketContext.Provider value={{ sendJsonMessage }}>
      {children}
    </WebsocketContext.Provider>
  )
}
