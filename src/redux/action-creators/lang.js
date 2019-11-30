import { SET_LANG_SUCCESS } from '../action-types/lang'

//设置当前的语言信息
export const setLangSuccess = lang => {
  return {
    type: SET_LANG_SUCCESS,
    data: lang
  }
}
