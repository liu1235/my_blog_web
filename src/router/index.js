let routes = [
  //首页
  {
    path: '/',
    component: resolve => require(['../pages/Home.vue'], resolve),
    name: 'Home'
  },
  //首页
  {
    path: '/home',
    component: resolve => require(['../pages/Home.vue'], resolve),
    name: 'Home1'
  },

  //博客
  {
    path: '/blog',
    component: resolve => require(['../pages/Blog.vue'], resolve),
    name: 'Blog'
  },

  //详情
  {
    path: '/detail',
    component: resolve => require(['../pages/Detail.vue'], resolve),
    name: 'Detail'
  },


  //伙伴
  {
    path: '/friendsLink',
    component: resolve => require(['../pages/FriendsLink.vue'], resolve),
    name: 'FriendsLink'
  },

  //归档
  {
    path: '/archive',
    component: resolve => require(['../pages/Archive.vue'], resolve),
    name: 'Archive'
  },

  //留言板
  {
    path: '/message',
    component: resolve => require(['../pages/Message.vue'], resolve),
    name: 'Message'
  },

  //关于
  {
    path: '/about',
    component: resolve => require(['../pages/About.vue'], resolve),
    name: 'About'
  },

  //注册登录
  {
    path: '/login',
    component: resolve => require(['../pages/Login.vue'], resolve),
    name: 'Login'
  },

  //注册消息
  {
    path: '/msg',
    component: resolve => require(['../pages/Msg.vue'], resolve),
    name: 'Msg'
  },

  //用户个人中心
  {
    path: '/userInfo',
    component: resolve => require(['../pages/UserInfo.vue'], resolve),
    name: 'UserInfo'
  },


  {
    path: '/likeCollect',
    component: resolve => require(['../pages/LikeCollect.vue'], resolve),
    name: 'LikeCollect'
  },

  {path: '*', redirect: {path: '/'}}
];

export default routes;
