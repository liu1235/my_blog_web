<!-- 头部公用 -->
<template>
  <div class="">
    <div class="headBack">
      <el-row class="container">
        <el-col :span="24">
          <!-- pc端导航 -->
          <div class="headBox">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"

                     :router="true">
              <el-menu-item index="/home"><i class="fa fa-wa fa-home"></i> 首页</el-menu-item>
              <el-submenu index="/blog">
                <template slot="title"><i class="fa fa-wa fa-archive"></i> 分类</template>
                <el-menu-item v-for="(item, index) in classList"
                              :key="'class' + index"
                              :index="'/blog?classId=' + item.classId">
                  {{item.className}}
                </el-menu-item>
              </el-submenu>
              <el-menu-item index="/archive"><i class="fa fa-wa fa-archive"></i> 归档</el-menu-item>
                            <el-menu-item index="/friendsLink"><i class="fa fa-wa fa-users"></i> 伙伴</el-menu-item>
              <el-menu-item index="/message"><i class="fa fa-wa fa-pencil"></i> 留言板</el-menu-item>
              <el-menu-item index="/about"><i class="fa fa-wa fa-vcard"></i> 关于我</el-menu-item>
              <div class="pcSearchBox" v-show="showSearch">
                <i class="el-icon-search pcSearchIcon"></i>
                <div class="pcSearchInput" :class="input ? 'hasSearched' : ''">
                  <el-input placeholder="搜索" v-model="input"
                            @keyup.enter.native="searchEnterFun">
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="searchEnterFun"></i>
                  </el-input>
                </div>
              </div>
              <div class="userInfo">
                <div v-show="!hasLogin" class="noLogin">
                  <a href="#" @click="login(1)">登录&nbsp;</a>|<a href="#" @click="login(0)">&nbsp;注册</a>
                </div>
                <div v-show="hasLogin" class="hasLogin">
                  <i class="fa fa-fw fa-user-circle userImg"></i>
                  <ul class="hasLogin-info">
                    <li>
                      <a href="/#/userInfo">个人中心</a>
                    </li>
                    <li>
                      <a href="/#/likeCollect?like=1">喜欢列表</a>
                    </li>
                    <li>
                      <a href="/#/likeCollect?like=2">收藏列表</a>
                    </li>
                    <li>
                      <a href="javaScript:void(0)" @click="logout">退出登录</a>
                    </li>
                  </ul>
                </div>
              </div>
            </el-menu>
          </div>


          <!-- 移动端导航 -->
          <div class="mobileBox">
            <div class="hideMenu">
              <i @click="pMenu=!pMenu" class="el-icon-menu"></i>
              <el-collapse-transition>
                <el-menu :default-active="activeIndex" class="listMenu"
                         v-show="!pMenu" @open="handleOpen"
                         @close="handleClose"
                         :unique-opened="true" :router="true">
                  <el-menu-item index="/home"><i class="fa fa-wa fa-home"></i> 首页</el-menu-item>
                  <el-submenu index="/blog">
                    <template slot="title"><i class="fa fa-wa fa-archive"></i> 分类</template>
                    <el-menu-item v-for="item in classList" :key="'class'+ item.classId"
                                  :index="'/blog?classId='+item.classId">{{item.className}}
                    </el-menu-item>
                  </el-submenu>
                  <el-menu-item index="/archive"><i class="fa fa-wa fa-archive"></i> 归档</el-menu-item>
                  <el-menu-item index="/friendsLink"><i class="fa fa-wa fa-users"></i> 伙伴</el-menu-item>
                  <el-menu-item index="/message"><i class="fa fa-wa fa-pencil"></i>留言板</el-menu-item>
                  <el-menu-item index="/about"><i class="fa fa-wa fa-vcard"></i>关于我</el-menu-item>
                  <el-menu-item v-show="!hasLogin" index="" @click="login(1)">登录</el-menu-item>
                  <el-menu-item v-show="!hasLogin" index="" @click="login(0)">注册</el-menu-item>
                  <el-submenu v-show="hasLogin" index="3">
                    <template slot="title"><i class="fa fa-wa fa-user-circle-o"></i>我的</template>
                    <el-menu-item index="/userInfo">个人中心</el-menu-item>
                    <el-menu-item index="/likeCollect?like=1">喜欢的文章</el-menu-item>
                    <el-menu-item index="/likeCollect?like=2">收藏的文章</el-menu-item>
                    <el-menu-item index="" @click="logout">退出登录</el-menu-item>
                  </el-submenu>
                </el-menu>
              </el-collapse-transition>
              <div class="searchBox" v-show="showSearch">
                <el-input placeholder="搜索" v-model="input"
                          @keyup.enter.native="searchEnterFun">
                </el-input>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="headImgBox"
         :style="{backgroundImage:'url(static/img/headbg01.jpg)'}">
      <div class="scene">
        <div><span id="luke"></span></div>
      </div>
      <div class="h-information">
        <a href="/#/about">
          <img src="/static/img/tou.png" alt="">
        </a>
        <h2 class="h-description">
          <a href="/#/about">Write the Code. Change the World.</a>
        </h2>
      </div>
    </div>
  </div>
</template>
<script>
  import {getFirstClass, logout} from '../api/api.js'
  import {Typeit} from '../utils/plug.js'

  export default {

    data() { //选项 / 数据
      return {
        userInfo: '', //用户信息
        hasLogin: false, //是否已登录
        classList: '', //技术分类
        activeIndex: '/', //当前选择的路由模块
        state: '', //icon点击状态
        pMenu: true, //手机端菜单打开
        input: '', //input输入内容
        headTou: '', //头像
        showSearch: false,//是否显示搜索框
      }
    },

    methods: { //事件处理器
      //分组菜单打开
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      //分组菜单关闭
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },

      //input 输入 enter
      searchEnterFun: function () {
        this.$store.state.keywords = this.input;
      },

      //pc菜单选择
      handleSelect(key, keyPath) {
        //    console.log(key, keyPath);
      },

      //用户登录和注册跳转
      login: function (msg) {
        localStorage.setItem('returnUrl', this.$route.fullPath);
        if (msg === 0) {
          this.$router.push({
            path: '/login?loginStatus=0'
          });
        } else {
          this.$router.push({
            path: '/login?loginStatus=1'
          });
        }
      },

      // 用户退出登录
      logout: function () {
        this.$confirm('是否确认退出?', '退出提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          logout().then((res) => {
            if (this.GLOBAL.isResponseSuccess(res)) {
              localStorage.removeItem('userInfo');
              this.hasLogin = false;
              this.$message({
                type: 'success',
                message: '退出成功!'
              });
              window.location.reload();
            }
          });
        });

      },

      routeChange: function () {
        this.pMenu = true;
        this.activeIndex = this.$route.path === '/' ? '/home' : this.$route.path;
        if (localStorage.getItem('userInfo')) { //存储用户信息
          this.hasLogin = true;
          this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        } else {
          this.hasLogin = false;
        }
        //文章分类
        this.getFirstClassList();

        if ((this.$route.name === "Blog" || this.$route.name === "Home" || this.$route.name === "Home1") && this.$store.state.keywords) {
          this.input = this.$store.state.keywords;
        } else {
          this.input = '';
          this.$store.state.keywords = '';
        }
      },

      //获取一级分类列表
      getFirstClassList() {
          getFirstClass({}).then((res) => {
            if (this.GLOBAL.isResponseSuccess(res)) {
              this.classList = res.data;
            }
          });
      }

    },

    components: { //定义组件

    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'routeChange'
    },

    created() { //生命周期函数
      //判断当前页面是否被隐藏
      let hiddenProperty = 'hidden' in document ? 'hidden' :
        'webkitHidden' in document ? 'webkitHidden' :
          'mozHidden' in document ? 'mozHidden' :
            null;
      let visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');

      let onVisibilityChange = function () {
        if (document[hiddenProperty]) { //被隐藏
          document.title = '休息啦(つд⊂)';
        } else {
          document.title = '开始搬砖啦(*´∇｀*)'; //当前窗口打开
          this.hasLogin = !!localStorage.getItem('userInfo');
        }
      };
      document.addEventListener(visibilityChangeEvent, onVisibilityChange);

      //判断是否显示搜索框
      this.showSearch = this.$route.name === "Blog" || this.$route.name === "Home" ||
        this.$route.name === "Home1" || this.$route.name === "LikeCollect";
      this.routeChange();
    },

    //页面元素加载完成
    mounted() {
      let timer = setTimeout(function () {
        //打字机效果
        Typeit("#luke");
        clearTimeout(timer);
      }, 500);
    }
  }
</script>

<style>
  /*********头部导航栏********/

  /*头部导航栏盒子*/

  .headBack {
    width: 100%;
    background: rgba(40, 42, 44, 0.6);
    /*margin-bottom:30px;*/
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 100;
  }

  .headBox li.is-active {
    background: #48576a;
  }

  .headBox .el-menu {
    background: transparent;
    border-bottom: none !important;
  }

  .headBox .el-menu-demo li.el-menu-item,
  .headBox .el-menu--horizontal .el-submenu .el-submenu__title {
    height: 38px;
    line-height: 38px;
    border-bottom: none !important;
  }

  .headBox .el-submenu li.el-menu-item {
    height: 38px;
    line-height: 38px;
  }

  .headBox li .fa-wa {
    vertical-align: baseline;
  }

  .headBox ul li.el-menu-item,
  .headBox ul li.el-menu-item.is-active,
  .headBox ul li.el-menu-item:hover,
  .headBox .el-submenu div.el-submenu__title,
  .headBox .el-submenu__title i.el-submenu__icon-arrow {
    color: #fff;
  }

  .headBox .el-menu--horizontal .el-submenu > .el-menu {
    top: 38px;
    border: none;
    padding: 0;
  }

  .headBox > ul li.el-menu-item:hover,
  .headBox > ul li.el-submenu:hover .el-submenu__title {
    background: #48576a !important;
    /*border-bottom: none;*/
  }

  .el-menu--horizontal > ul.el-menu,
  .el-menu--horizontal > ul.el-menu .el-menu-item {
    background: rgba(40, 42, 44, .6);
    color: #fff;
  }

  .el-menu--horizontal > ul li.el-menu-item:hover,
  .el-menu--horizontal > ul li.el-submenu:hover .el-submenu__title {
    background: #48576a !important;
    border-bottom: none;
  }

  .el-menu--popup {
    padding: 0 !important;
  }

  .el-menu--popup-bottom-start {
    margin-top: 0 !important;
  }


  /*pc搜索框*/

  .headBox .pcSearchBox {
    padding: 0;
    max-width: 170px;
    /*min-width: 30px;*/
    height: 100%;
    line-height: 38px;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }

  .headBox .pcSearchBox:hover .pcSearchInput {
    opacity: 1;
    /*transform: scaleX(1);*/
    visibility: visible;
  }

  .headBox .pcSearchBox i.pcSearchIcon {
    color: #fff;
    padding-left: 10px;
  }

  .headBox .pcSearchBox .pcSearchInput {
    width: 180px;
    padding: 10px 20px 10px 20px;
    background: rgba(40, 42, 44, 0.6);
    border-radius: 0 0 2px 2px;
    position: absolute;
    right: 0;
    top: 38px;
    opacity: 0;
    visibility: hidden;
    /*transform: scaleX(0);*/
    transform-origin: right;
    transition: all 0.3s ease-out;
  }

  .headBox .pcSearchBox .hasSearched {
    opacity: 1;
    /*transform: scaleX(1);*/
    visibility: visible;
  }

  .headBox .pcSearchBox .el-input {
    width: 100%;
  }

  .headBox .el-input__inner {
    height: 30px;
    border: none;
    background: #fff;
    /*border: 1px solid #333;*/
    border-radius: 2px;
    padding-right: 10px;
  }

  .headBox .userInfo {
    height: 100%;
    line-height: 38px;
    position: absolute;
    right: 30px;
    top: 0;
    color: #fff;
  }

  .headBox .userInfo a {
    color: #fff;
    font-size: 13px;
    transition: all 0.2s ease-out;
  }

  .headBox .userInfo a:hover {
    color: #48576a;
  }

  .headBox .noLogin {
    text-align: right;
  }

  .headBox .hasLogin {
    text-align: right;
    position: relative;
    min-width: 80px;
    cursor: pointer;
  }

  .headBox .hasLogin:hover ul {
    visibility: visible;
    opacity: 1;
  }

  .headBox .hasLogin ul {
    background: rgba(40, 42, 44, 0.6);
    padding: 5px 10px;
    position: absolute;
    right: 0;
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s ease-out;
  }

  .headBox .hasLogin ul li {
    border-bottom: 1px solid #48576a;
  }

  .headBox .hasLogin ul li:last-child {
    border-bottom: 1px solid transparent;
  }

  /*******移动端*******/

  .mobileBox {
    position: relative;
    height: 38px;
    line-height: 38px;
    /*color: #fff;*/
  }

  .hideMenu {
    position: relative;
    width: 100%;
    height: 100%;
    line-height: 38px;
  }

  .hideMenu ul.listMenu {
    width: 100%;
    position: absolute;
    background: #48576a;
    left: 0;
    top: 100%;
    box-sizing: border-box;
    z-index: 999;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .12), 0 0 8px 0 rgba(0, 0, 0, .04);
    color: #fff;
    border-right: none;
  }

  .hideMenu .el-submenu .el-menu {
    background: rgba(40, 42, 44, 0.6);
  }

  .hideMenu .el-menu-item,
  .hideMenu .el-submenu__title {
    color: #fff;
  }

  .hideMenu > i {
    position: absolute;
    left: 10px;
    top: 12px;
    width: 30px;
    height: 30px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
  }

  .hideMenu .el-menu-item,
  .el-submenu__title {
    height: 40px;
    line-height: 40px;
  }

  .mobileBox .searchBox {
    padding-left: 40px;
    width: 100%;
    box-sizing: border-box;
  }

  .mobileBox .searchBox .el-input__inner {
    display: block;
    border-radius: 2px;
    border: none;
    height: 25px;
  }

  .hideMenu ul.listMenu.pshow {
    display: block;
  }

  .hideMenu ul.listMenu .el-submenu__icon-arrow,
  .mobileBox li.el-menu-item a {
    color: #fff;
  }

  .hideMenu > ul li.el-menu-item:hover,
  .hideMenu > ul li.el-menu-item.is-active {
    background: #48576a;
  }

  .hideMenu .el-menu-item,
  .hideMenu .el-submenu__title:hover {
    color: #fff;
    background: #48576a;
  }

  /*头部背景图*/

  .headImgBox {
    height: 650px;
    position: relative;
    width: 100%;
    background-size: cover;
    background-position: center 50%;
    background-repeat: no-repeat;
    margin-bottom: 90px;
  }

  .h-information {
    text-align: center;
    width: 70%;
    margin: auto;
    position: relative;
    top: 480px;
    padding: 40px 0;
    font-size: 16px;
    opacity: 0.98;
    background: rgba(230, 244, 249, 0.8);
    border-radius: 5px;
    z-index: 1;
    animation: b 1s ease-out;
    -webkit-animation: b 1s ease-out;
  }

  @-webkit-keyframes b {
    0% {
      -webkit-transform: translateY(90px);
      transform: translateY(90px);
    }
    80% {
      -webkit-transform: translateY(5px);
      transform: translateY(5px)
    }
    90% {
      -webkit-transform: translateY(-5px);
      transform: translateY(-5px)
    }
    to {
      -webkit-transform: translateY(0);
      transform: translateY(0)
    }
  }

  @keyframes b {
    0% {
      -webkit-transform: translateY(90px);
      transform: translateY(90px);
    }
    80% {
      -webkit-transform: translateY(5px);
      transform: translateY(5px)
    }
    90% {
      -webkit-transform: translateY(-5px);
      transform: translateY(-5px)
    }
    to {
      -webkit-transform: translateY(0);
      transform: translateY(0)
    }
  }

  .h-information img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    object-fit: cover;
  }

  .h-information img:hover {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }

  .h-information h2 {
    margin-top: 20px;
    font-size: 18px;
    font-weight: 700;
    /*font-family: 'Sigmar One';*/
  }

  .h-information h2 a {
    background: linear-gradient(to right, #DF2050, #48456D);
    -webkit-background-clip: text;
    color: transparent;
  }

  .headImgBox .scene {
    width: 100%;
    /*height:300px;*/
    text-align: center;
    font-size: 100px;
    font-weight: 200;
    color: #fff;
    position: absolute;
    left: 0;
    top: 160px;
    font-family: 'Sigmar One', Arial;
    text-shadow: 0 2px 2px #47456d;

  }

  .headImgBox .scene span {
    transform: matrix(1, 0, 0, 1, 0, 0);
    -webkit-transform: matrix(1, 0, 0, 1, 0, 0);
    text-shadow: 1px 1px 0 #ff3f1a, -1px -1px 0 #00a7e0;
  }

  @keyframes caret {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
</style>
