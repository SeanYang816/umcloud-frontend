import { actionUpdaters, actions } from './bgw5105'
import { xpbActionGetters, xpbActionSetters } from './xpb510'

export const allActionsGetters = {
  ...actions,
  ...xpbActionGetters,
}

export const allActionUpdaters = {
  ...xpbActionSetters,
  ...actionUpdaters,
}
