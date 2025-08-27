import { combineReducers } from 'redux'
import { climateControl } from './climateControl'
import { externalData } from './externalData'

export const reducers = combineReducers({
  externalData,
  climateControl,
})
