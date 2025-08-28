import { combineReducers } from 'redux'
import { reducers as bgw5105Reducers } from './bgw5105'
import { reducers as status } from './xpb510/status'
import { reducers as iot } from './xpb510/iot'
import { reducers as network } from './xpb510/network'
import { reducers as administrator } from './xpb510/administrator'
import { device } from './device'

export const reducers = combineReducers({
  bgw5105: bgw5105Reducers,
  xpb510: combineReducers({
    administrator, // placeholder reducer
    network, // placeholder reducer
    status,
    iot,
  }),
  device,
})
