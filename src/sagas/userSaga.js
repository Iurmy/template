import { put, fork, take, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { replace, goBack } from 'react-router-redux'
import { Toast } from 'antd'
import {
  POST_LOGIN_REQUEST
} from '../constants/actionTypes'
import * as action from '../actions'
import { userService } from '../services/leanclound'



function* postLoginWorker(payload) {
  try {
    console.log(payload)
    yield put(action.fetchRequest({ text: '登录中' }))
    const response = yield call(userService.logIn, payload)
    yield put(action.fetchSuccess())
    yield put(action.postLoginSuccess(response))
    let reg = new RegExp("(^|&)redirect_uri=([^&]*)(&|$)");
    let url = window.location.search.substr(1).match(reg);
    if(url!=null){
      yield put(replace(unescape(url[2])))
    }else{
      yield put(replace('/home'))
    }
  } catch (error) {
    yield put(action.fetchFailed())
    yield put(action.postLoginFailed(error))
  }
}



function* watchLogin() {
  while (true) {
    const { payload } = yield take(POST_LOGIN_REQUEST)
    yield fork(postLoginWorker, payload)
  }
}







export {
  watchLogin
}
