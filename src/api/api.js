import axios from 'axios'
import {Message} from 'element-ui'

let base = "http://127.0.0.1:9000";
//响应时间
axios.defaults.timeout = 60 * 1000;

function getUserToken() {
  let user = sessionStorage.getItem('user');
  let userToken = "";
  if (user) {
    user = JSON.parse(user);
    userToken = user.token || '';
  }
  return userToken;
}

axios.interceptors.request.use(
  config => {
    config.headers['x-access-token'] = getUserToken();
    config.headers['x-access-type'] = 'web';
    return config;
  },
  err => {
    return Promise.reject(err)
  });


axios.interceptors.response.use((res) => {
  if (res.status !== 200) {
    Message.error({
      message: "请求错误" + " : " + res.status
    });
    return Promise.reject(res);
  } else {
    //错误
    if (res.data.code === 1 || res.data.code === -1) {
      Message.error({
        message: res.data.message
      });
    }
  }
  return res;

}, (error) => {
  let hintStr = "网络错误";
  if ((error) && (error.response) && (error.response.status)) {
    hintStr += ":" + error.response.status;
  }
  Message.error({
    message: hintStr
  });
  return Promise.reject(error);
});


export function getUploadImgUrl() {
  return base + '/file/uploadImgNormal?token=' + getUserToken();
}


//用户登录
export const login = params => {
  return axios.post(`${base}/login`, params).then(res => res.data);
};

//注销
export const logout = params => {
  return axios.post(`${base}/logout`, params).then(res => res.data);
};


//重新发送激活邮件
export const send = params => {
  return axios.post(`${base}/sendMail`, params).then(res => res.data);
};


//注册
export const register = params => {
  return axios.post(`${base}/user/register`, params).then(res => res.data);
};

//激活
export const activation = params => {
  return axios.post(`${base}/user/activation`, params).then(res => res.data);
};

//重新发送激活邮件
export const sendMail = params => {
  return axios.post(`${base}/user/sendMail`, params).then(res => res.data);
};


