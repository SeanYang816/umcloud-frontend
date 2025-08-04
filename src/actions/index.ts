import { actionUpdaters, actions } from './bgw5105'
import { getActions } from './xpb510'

export const allActionsGetters = {
  ...actions,
  ...getActions,
}

export const allActionUpdaters = {
  ...actionUpdaters,
}
