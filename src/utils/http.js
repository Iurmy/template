import axios from 'axios';
import { message } from 'antd';
const headers = {
  Accept: 'application/json',
};

function request(method, url, axiosConfig = {}) {
  const options = Object.assign(
    {},
    {
      method,
      url,
      headers,
      responseType: 'json',
    },
    headers,
    axiosConfig,
  );
  return new Promise((resolve,reject)=>{
    axios(options).then((ret)=>{
      if (ret.status !== 200) {
        throw new Error('获取请求失败');
      } else if(ret.data.flag === 1){
        message.error(ret.data.msg);
        reject(ret)
      }else{
        resolve(ret)
      }
    }).catch((err)=>{
      reject(err)
    });
  })
 
}

export function post(url, { data = {}, params = {}, transformResponse = [] }) {
  let dataParams = new URLSearchParams();
  for (let i in data) {
    dataParams.append(i, data[i]);
  }
  return request('post', url, { data:dataParams, params, transformResponse});
}

export function put(url, { data = {}, params = {}, transformResponse = [] }) {
  return request('put', url, { data, params, transformResponse });
}

export function get(url, { params = {}, transformResponse = [] }) {
  return request('get', url, { transformResponse, params });
}

export function destroy(url) { // delete
  return request('delete', url, {});
}