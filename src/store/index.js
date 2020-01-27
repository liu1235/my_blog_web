import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

/** 状态定义 */
export const state = {
  loading: false,
  userList: [], //用户列表
  //关于我的信息
  aboutMeObj:
    {
      name: "liuzw",
      brief: "" +
      "<p>&nbsp; &nbsp; &nbsp; &nbsp;" +
      "  欢迎来到我的博客！我是" +
      "  <i><b>liuzw</b></i>，是一个程序猿，喜欢各种有趣的事物</p>" +
      "<p>&nbsp; &nbsp; &nbsp; &nbsp;</p>" +
      "<p><i>&nbsp; &nbsp; &nbsp; &nbsp;</i>爱美食，爱动手做美食，想长胖的尽管来。</p>" +
      "" +
      "<p>&nbsp; &nbsp; &nbsp; ==========================</p>" +
      "<p>&nbsp; &nbsp; &nbsp; &nbsp;" +
      "  <i>" +
      "    <a target=\"_blank\" href=\"https://github.com/liu1235\">Github</a>&nbsp; &nbsp; &nbsp;&nbsp;" +
      "    <a target=\"_blank\" href=\"http://aimee.mangoya.cn/\">Resume</a>&nbsp; &nbsp;" +
      "    <a target=\"_blank\" href=\"http://blog.csdn.net/Aimee1608\">CSDN</a>" +
      "  </i>" +
      "</p>" +
      "<p>" +
      "  <i>&nbsp; &nbsp; &nbsp; &nbsp;" +
      "    <a target=\"_blank\" href=\"http://mangoya.cn/static/img/aimee/erwm.jpg\">微信</a>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" +
      "    <a target=\"_blank\" href=\"http://mangoya.cn/static/img/aimee/gzh.jpg\">公众号</a>&nbsp; &nbsp; &nbsp;&nbsp;" +
      "  </i>" +
      "  <i>&nbsp;" +
      "    <a target=\"_blank\" href=\"https://weibo.com/u/2242812941?refer_flag=1001030101_&amp;is_hot=1\">微博</a>&nbsp; &nbsp;" +
      "    &nbsp;&nbsp;" +
      "    <a target=\"_blank\" href=\"http://mangoya.cn/src/img/aimee/QQ.jpg\">QQ</a>" +
      "  </i>" +
      "</p>" +
      "<p>&nbsp; &nbsp; &nbsp;&nbsp;</p>",
      image: "http://mangoya.cn/upload/introme/20180207/cb886d95af0483fb9dac5ed52cbce8a4.png",
      wechat_image: "/upload/introme/20180207/fb43b468e2f39ec3498c8e2798ecd4d8.jpg",
      alipay_image: "/upload/introme/20180207/c0ca34d27e8069b88ffc6670d8b0aef4.jpg",
      time: "2018-06-25 16:17:25",
      state: 1
    },
  host: "http://" + window.location.host,//接口路径
  keywords: '',//关键词
  errorImg: 'this.onerror=null;this.src="../../static/img/tou.jpg"'
};

export default new Vuex.Store({
  state,
})
