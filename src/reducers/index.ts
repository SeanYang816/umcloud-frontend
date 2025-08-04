import { combineReducers } from 'redux'
import { reducers as bgw5105Reducers } from './bgw5105'

export const reducers = combineReducers({
  bgw5105: bgw5105Reducers,
})
