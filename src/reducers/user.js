import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILED
} from '../constants/actionTypes'

const initialUserState = {
  home: {
    loginError: '',
    signupError: '',
    userinfo: {
      list: [],
      current: {},
      isFetching: false,
      fetchingText: '加载中',
      isLoadMore: false,
      isRefreshing: false,
      page: 1,
      pagesize: 20
    }
  }
}

function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case POST_LOGIN_REQUEST:
      return { ...state, home: { ...state.home, loginError: '' } }
    case POST_LOGIN_SUCCESS:
      return {
        ...state,
        home: { ...state.home, loginError: '' },
        account: { ...state.account, user: action.payload }
      }
    case POST_LOGIN_FAILED:
      return {
        ...state,
        home: { ...state.home, loginError: action.payload.rawMessage }
      }
   
    default:
      return state
  }
}

function merge(o1, o2) {
  if (o2) {
    const result = o1.map(item1 => {
      return Object.assign(
        item1,
        o2.find(item2 => {
          return item2 && item1.value === item2.value
        })
      )
    })
    return result
  }
}

export { userReducer }
