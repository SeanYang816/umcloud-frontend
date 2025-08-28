import { allActionsGetters, allActionUpdaters } from 'actions'
import { actions } from 'actions/bgw5105'
import { toastHandler } from 'config/statusCode'
import { isNil } from 'lodash'
import { ReactNode, createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useWebSocket from 'react-use-websocket'
import { SendJsonMessage } from 'react-use-websocket/dist/lib/types'
import {
  updateNotification,
  updateWebSocketStatus,
} from 'reducers/bgw5105/global'
import { RootStateProps } from 'types'

export const ServerEvent = {
  Ping: 'ping',
  WS_Error: 'wsError',
} as const

export type ServerEventType = (typeof ServerEvent)[keyof typeof ServerEvent]

export type WebSocketContextProps = {
  sendJsonMessage: SendJsonMessage
} | null

// eslint-disable-next-line react-refresh/only-export-components
export const WebsocketContext = createContext<WebSocketContextProps>(null)

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch()
  const token = useSelector(
    (state: RootStateProps) => state.bgw5105.authentication.token,
  )

  const { sendJsonMessage } = useWebSocket(
    window.__CONFIG__.VITE_APP_WS_BACKEND_URI,
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
          const isUpdater = !isNil(allActionUpdaters[json.event])
          const action = isUpdater
            ? allActionUpdaters[json.event]
            : allActionsGetters[json.event]
          console.log(isUpdater)
          console.log(json)
          console.log(action)
          const status = json?.result?.status || json?.status

          switch (event) {
            case ServerEvent.Ping:
              sendJsonMessage({ event: 'pong' })
              break
            case ServerEvent.WS_Error:
              dispatch(updateNotification(json))
              break
            default:
              if (action) {
                const { result: data, requestId: requestId, ...rest } = json
                const dataAndRequestId = { ...data, requestId, ...rest }
                if (typeof action === 'function') {
                  dispatch(action?.(dataAndRequestId))
                }
                if (isUpdater) {
                  toastHandler(status)
                }
              } else {
                const event = json?.requestId
                if (event) {
                  const { result: data, ...rest } = json
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
