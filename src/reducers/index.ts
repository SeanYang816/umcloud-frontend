import { combineReducers } from 'redux'
import { authentication } from './authentication'
import { firewall } from './firewall'
import { alg } from './alg'
import { routing } from './routing'
import { administrator } from './administrator'
import { localTime } from './localTime'
import { status } from './status'
import { device } from './device'
import { basicConfig } from './basicConfig'
import { wireless } from './wireless'
import { network } from './network'
import { config } from './config'
import { global } from './global'

export const reducers = combineReducers({
  global: global,
  authentication: authentication,
  device: device,
  basicConfig: basicConfig,
  network: network,
  wireless: wireless,
  firewall: firewall,
  alg: alg,
  routing: routing,
  administrator: administrator,
  localTime: localTime,
  status: status,
  config: config,
})
