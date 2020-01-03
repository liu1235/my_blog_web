const RESP_CODE ={
    SUCCESS: 0,      //成功
    ERROR: 1,       //错误
    LOGIN_FAIL: 3,  //没有登录
    VALID_FAIL: 4, //校验失败
    AUTH_FAIL: 6,    //没有权限
    PARAM_FAIL: 8,  //参数错误
    METHOD_NOT_FOUND: 10, //接口不存在
};


function isResponseSuccess (data) {
   return data.code === RESP_CODE.SUCCESS;
}

export default
{
    RESP_CODE,
    isResponseSuccess,
}