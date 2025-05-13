import { SERVER_ACTIONS } from 'constant'
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
} from 'reducers/routing'

export const getRoutings = {
  [SERVER_ACTIONS.ROUTING_GET_STATIC_ROUTES_PAGE]: getStaticRoutes,
  [SERVER_ACTIONS.ROUTING_GET_RIP_PAGE]: getRip,
  [SERVER_ACTIONS.ROUTING_GET_RIP_EDIT_PAGE]: getRipEdit,
  [SERVER_ACTIONS.ROUTING_GET_OSPF_PAGE]: getOspf,
  [SERVER_ACTIONS.ROUTING_GET_OSPF_EDIT_PAGE]: getOspfEdit,
  [SERVER_ACTIONS.ROUTING_GET_BGP_PAGE]: getBgp,
}

export const updateRoutings = {
  [SERVER_ACTIONS.ROUTING_SET_STATIC_ROUTES_PAGE]: updateStaticRoutes,
  [SERVER_ACTIONS.ROUTING_ADD_STATIC_IPV4_ROUTES]: updateStaticRoutes,
  [SERVER_ACTIONS.ROUTING_DELETE_STATIC_IPV4_ROUTES]: updateStaticRoutes,
  [SERVER_ACTIONS.ROUTING_SET_RIP_PAGE]: updateRip,
  [SERVER_ACTIONS.ROUTING_SET_RIP_EDIT_PAGE]: updateRipEdit,
  [SERVER_ACTIONS.ROUTING_SET_OSPF_PAGE]: updateOspf,
  [SERVER_ACTIONS.ROUTING_SET_OSPF_EDIT_PAGE]: updateOspfEdit,
  [SERVER_ACTIONS.ROUTING_SET_BGP_PAGE]: updateBgp,
  [SERVER_ACTIONS.ROUTING_ADD_BGP_IPV4_NEIGHBOR]: updateBgp,
  [SERVER_ACTIONS.ROUTING_DELETE_BGP_IPV4_NEIGHBOR]: updateBgp,
}
