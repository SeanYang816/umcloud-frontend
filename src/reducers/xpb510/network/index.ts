import { combineReducers } from 'redux'
import { firewall } from './firewall'
import { lan } from './lan'
import { alg } from './alg'
import { routing } from './routing'

export const reducers = combineReducers({
  firewall,
  lan,
  alg,
  routing,
})
