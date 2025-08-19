import { BGW_EVENT_ACTIONS } from 'constant'
import {
  getBgp,
  updateBgp,
  getOspf,
  updateOspf,
  getOspfEdit,
  updateOspfEdit,
  getRip,
  updateRip,
  getRipEdit,
  updateRipEdit,
  getStaticRoutes,
  updateStaticRoutes,
} from 'reducers/bgw5105/routing'

export const getRoutings = {
  [BGW_EVENT_ACTIONS.ROUTING_GET_STATIC_ROUTES_PAGE]: getStaticRoutes,
  [BGW_EVENT_ACTIONS.ROUTING_GET_RIP_PAGE]: getRip,
  [BGW_EVENT_ACTIONS.ROUTING_GET_RIP_EDIT_PAGE]: getRipEdit,
  [BGW_EVENT_ACTIONS.ROUTING_GET_OSPF_PAGE]: getOspf,
  [BGW_EVENT_ACTIONS.ROUTING_GET_OSPF_EDIT_PAGE]: getOspfEdit,
  [BGW_EVENT_ACTIONS.ROUTING_GET_BGP_PAGE]: getBgp,
}

export const updateRoutings = {
  [BGW_EVENT_ACTIONS.ROUTING_SET_STATIC_ROUTES_PAGE]: updateStaticRoutes,
  [BGW_EVENT_ACTIONS.ROUTING_ADD_STATIC_IPV4_ROUTES]: updateStaticRoutes,
  [BGW_EVENT_ACTIONS.ROUTING_DELETE_STATIC_IPV4_ROUTES]: updateStaticRoutes,
  [BGW_EVENT_ACTIONS.ROUTING_SET_RIP_PAGE]: updateRip,
  [BGW_EVENT_ACTIONS.ROUTING_SET_RIP_EDIT_PAGE]: updateRipEdit,
  [BGW_EVENT_ACTIONS.ROUTING_SET_OSPF_PAGE]: updateOspf,
  [BGW_EVENT_ACTIONS.ROUTING_SET_OSPF_EDIT_PAGE]: updateOspfEdit,
  [BGW_EVENT_ACTIONS.ROUTING_SET_BGP_PAGE]: updateBgp,
  [BGW_EVENT_ACTIONS.ROUTING_ADD_BGP_IPV4_NEIGHBOR]: updateBgp,
  [BGW_EVENT_ACTIONS.ROUTING_DELETE_BGP_IPV4_NEIGHBOR]: updateBgp,
}
