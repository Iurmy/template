import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILED,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILED
} from '../constants/actionTypes'

export const postLoginRequest = function(payload) {
  return { type: POST_LOGIN_REQUEST, payload }
}

export const postLoginSuccess = function(payload) {
  return { type: POST_LOGIN_SUCCESS, payload }
}

export const postLoginFailed = function(payload) {
  return { type: POST_LOGIN_FAILED, payload }
}

export const fetchRequest = function(payload) {
  return { type: FETCH_REQUEST, payload }
}

export const fetchSuccess = function() {
  return { type: FETCH_SUCCESS }
}

export const fetchFailed = function() {
  return { type: FETCH_FAILED }
}
