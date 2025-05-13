import { SERVER_ACTIONS } from 'constant'
import { getAlg, updateAlg } from 'reducers/alg'

export const getAlgs = {
  [SERVER_ACTIONS.ALG_GET_ALG_PAGE]: getAlg,
}
export const updateAlgs = {
  [SERVER_ACTIONS.ALG_SET_ALG_PAGE]: updateAlg,
}
