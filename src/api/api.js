import axios from 'axios'
import {Message} from 'element-ui'
import router from '../router/index'
import global from '../Global'

let base = "/api";
//响应时间
axios.defaults.timeout = 60 * 1000;

function getUserToken() {
  let user = localStorage.getItem('userInfo');
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
    processResponseData(res.data);
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


/**
 * 错误信息提示
 */
export function processResponseData(data) {
  if (data.code === global.RESP_CODE.LOGIN_FAIL) { //没有登录
    localStorage.removeItem('userInfo');
    Message.error(data.message);
    router.replace({path: '/login'})
  } else if (data.code === global.RESP_CODE.ERROR) { //错误
    Message.error(data.message);
  } else if (data.code === global.RESP_CODE.VALID_FAIL) { //验证失败
    Message.error(data.message);
  } else if (data.code === global.RESP_CODE.AUTH_FAIL) { //无权限
    Message.error(data.message);
  } else if (data.code === global.RESP_CODE.PARAM_FAIL) { //统一接口部分参数为空
    Message.error(data.message);
  }
}


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


//获取博客列表数据
export const getBlogList = params => {
  return axios.post(`${base}/blog/list`, params).then(res => res.data);
};

//获取我喜欢的博客列表数据
export const getLikeBlogList = params => {
  return axios.post(`${base}/blog/like-blog-list`, params).then(res => res.data);
};

//获取我收藏的博客列表数据
export const getCollectBlogList = params => {
  return axios.post(`${base}/blog/collect-blog-list`, params).then(res => res.data);
};


//获取博客列表详情
export const getBlogDetail = params => {
  return axios.post(`${base}/blog/detail`, params).then(res => res.data);
};

//获取最热的十条博客
export const topBlogList = params => {
  return axios.post(`${base}/blog/top-blog-list`, params).then(res => res.data);
};

//获取最新十条评论的博客
export const topBlogCommentList = params => {
  return axios.post(`${base}/blog/top-blog-comment-list`, params).then(res => res.data);
};


//点赞博客
export const like = params => {
  return axios.post(`${base}/like-collect/like`, params).then(res => res.data);
};
//收藏博客
export const collect = params => {
  return axios.post(`${base}/like-collect/collect`, params).then(res => res.data);
};

//展示喜欢我统计数据
export const likeMeData = params => {
  return axios.post(`${base}/like-collect/like-me`, params).then(res => res.data);
};

//新增喜欢我统计数据
export const addLikeMeData = params => {
  return axios.post(`${base}/like-collect/add-like-me`, params).then(res => res.data);
};


//获取一级分类
export const getFirstClass = params => {
  return axios.post(`${base}/class/first`, params).then(res => res.data);
};

//获取二级分类
export const getSecondClass = params => {
  return axios.post(`${base}/class/second`, params).then(res => res.data);
};

//获取评论内容
export const getCommentList = params => {
  return axios.post(`${base}/comment/list`, params).then(res => res.data);
};

//添加评论
export const addComment = params => {
  return axios.post(`${base}/comment/add`, params).then(res => res.data);
};

//添加回复
export const addReply = params => {
  return axios.post(`${base}/comment/add-reply`, params).then(res => res.data);
};
