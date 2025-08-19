import { BGW_EVENT_ACTIONS } from 'constant'
import { getAlg, updateAlg } from 'reducers/bgw5105/alg'

export const getAlgs = {
  [BGW_EVENT_ACTIONS.ALG_GET_ALG_PAGE]: getAlg,
}
export const updateAlgs = {
  [BGW_EVENT_ACTIONS.ALG_SET_ALG_PAGE]: updateAlg,
}
