import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

/** 状态定义 */
export const state = {
  //关于我的信息
  keywords: '',//关键词
  errorImg: 'this.onerror=null;this.src="../../static/img/tou.jpg"'
};

export default new Vuex.Store({
  state,
})
