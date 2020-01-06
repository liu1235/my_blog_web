const RESP_CODE = {
  SUCCESS: 0,      //成功
  ERROR: 1,       //错误
  LOGIN_FAIL: 3,  //没有登录
  VALID_FAIL: 4, //校验失败
  AUTH_FAIL: 6,    //没有权限
  PARAM_FAIL: 100,  //参数错误
  USERNAME_OR_PASSWORD_IS_WRONG: 1001,  //账号密码错误
  EMAIL_NOT_ACTIVATED: 1002,  //账号未激活
  ACCOUNT_ACTIVATION_TIMEOUT: 1003,  //账号激活超时
};


function isResponseSuccess(data) {
  return data.code === RESP_CODE.SUCCESS;
}

export default {
  RESP_CODE,
  isResponseSuccess,
}
