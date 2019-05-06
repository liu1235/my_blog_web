let routes = [
  //首页
  {
    path: '/',
    component: resolve => require(['../pages/Home.vue'], resolve),
    meta: {
      auth: true
    },
    name: 'Home'
  },
  //首页
  {
    path: '/home',
    component: resolve => require(['../pages/Home.vue'], resolve),
    meta: {
      auth: true
    },
    name: 'Home'
  },

  //分类
  {
    path: '/share',
    component: resolve => require(['../pages/Share.vue'], resolve),
    meta: {
      auth: true
    },
    name: 'Share'
  },

  //分享详情
  {
    path: '/detailShare',
    component: resolve => require(['../pages/DetailShare.vue'], resolve),
    meta: {
      auth: true
    },
    name: 'DetailShare'
  },

  //赞赏
  {
    path: '/reward',
    component: resolve => require(['../pages/Reward.vue'], resolve),
    meta: {
      auth: true
    },
    name: 'Reward'
  },

  //伙伴
  {
    path: '/friendsLink',
    component: resolve => require(['../pages/FriendsLink.vue'], resolve),
    meta: {
      auth: true
    },
    name: 'FriendsLink'
  },

  //留言板
  {
    path: '/message',
    component: resolve => require(['../pages/Message.vue'], resolve),
    meta: {
      auth: true
    },
    name: 'Message'
  },

  //关于
  {
    path: '/about',
    component: resolve => require(['../pages/About.vue'], resolve),
    meta: {
      auth: true
    },
    name: 'About'
  },

  //注册登录
  {
    path: '/login',
    component: resolve => require(['../pages/Login.vue'], resolve),
    meta: {
      auth: false
    },
    name: 'Login'
  },

  //注册消息
  {
    path: '/msg',
    component: resolve => require(['../pages/Msg.vue'], resolve),
    meta: {
      auth: false
    },
    name: 'Msg'
  },

  //用户个人中心
  {
    path: '/userInfo',
    component: resolve => require(['../pages/UserInfo.vue'], resolve),
    meta: {
      auth: true
    },
    name: 'UserInfo'
  },


  {
    path: '/likeCollect',
    component: resolve => require(['../pages/LikeCollect.vue'], resolve),
    meta: {
      auth: true
    },
    name: 'LikeCollect'
  },

  {path: '*', redirect: {path: '/404'}}
];

export default routes;
