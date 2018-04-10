import { post } from '../../utils/http'
import md5 from 'js-md5'


// 第三方账号登录
export function signUpOrlogInWithAuthData(payload) {}

// 用户名和密码登录
export function logIn(payload) {
  const { tel, password } = payload
  return post('/hsuyihua/passport/login',{
    data:{
      tel:tel,
      password:password,
      token: md5('zhaodantel=' + tel + '&password=' + password)
    }
  }).then((value)=>{
    localStorage.setItem('loginned', JSON.stringify(new Date().getTime()));

    return value;
    
  },(error)=>{
    throw new Error(error);
  });
}


