import { combineReducers } from 'redux'
import { overview } from './overview'
import { realtimeGraphs } from './realtimeGraphs'
import { routes } from './routes'
import { systemLog } from './systemLog'

export const reducers = combineReducers({
  overview,
  realtimeGraphs,
  routes,
  systemLog,
})
