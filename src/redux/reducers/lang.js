import { SET_LANG_SUCCESS } from '../action-types/lang'
import { getItem } from '../../utils/storage'
 
const initValue = getItem('i18nextLng') || window.navigator || 'zh'
function lang(prevState = initValue, action){
  switch(action.type) {
    case SET_LANG_SUCCESS:
      return action.data
    default:
      return prevState
  }
}

export default lang
