import { getBasicConfigs, updateBasicConfigs } from './basicConfig'
import { updateFirewalls, getFirewalls } from './firewall'
import { getAlgs, updateAlgs } from './alg'
import { getRoutings, updateRoutings } from './routing'
import { getAdministrators, updateAdministrators } from './administrator'
import { getLocalTimes } from './localTime'
import { getStatus } from './status'
import { getConfigs } from './config'
import { getWireless, updateWireless } from './wireless'

export const actionUpdaters = {
  ...updateWireless,
  ...updateBasicConfigs,
  ...updateFirewalls,
  ...updateAlgs,
  ...updateRoutings,
  ...updateAdministrators,
}

export const actions = {
  ...getWireless,
  ...getBasicConfigs,
  ...getFirewalls,
  ...getAlgs,
  ...getRoutings,
  ...getAdministrators,
  ...getStatus,
  ...getConfigs,
  ...getLocalTimes,
}
