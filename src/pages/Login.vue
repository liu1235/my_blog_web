<!-- 登录注册 -->
<template>
  <div>
    <div class="container">
      <h1 class="loginTitle">
        <a href="/">liuzw 博客</a>
      </h1>
      <!-- 登录注册 -->
      <div v-show="!err2005" class="">
        <div v-if="login === 1" class="loginBox">
          <div class="lr-title">
            <h1>登录</h1>
            <p>
              新用户<a href="/login?login=0" class="colors">注册</a>
            </p>
          </div>
          <el-alert
            v-show="loginErr"
            :title="loginTitle"
            type="error"
            show-icon :closable="false">
          </el-alert>
          <el-input
            type="email"
            placeholder="邮箱"
            v-model="email">
          </el-input>
          <el-alert
            v-show="emailErr"
            title="请输入邮箱"
            type="error"
            show-icon :closable="false">
          </el-alert>
          <el-input
            type="password"
            placeholder="密码"
            @keyup.enter.native="loginEnterFun"
            v-model="password">
          </el-input>
          <el-alert
            v-show="passwordErr"
            title="请输入密码"
            type="error"
            show-icon :closable="false">
          </el-alert>
          <h3><a href="">忘记密码？</a></h3>
          <div class="lr-btn colors-bg" @click="gotoHome">登录</div>
          <div class="otherLogin">
            <a href="#"><i class="fa fa-fw fa-wechat"></i></a>
            <a href="#"><i class="fa fa-fw fa-qq"></i></a>
            <a href="#"><i class="fa fa-fw fa-weibo"></i></a>
          </div>
        </div>
        <div v-else class="registerBox">
          <div class="lr-title">
            <h1>注册</h1>
            <p>
              已有账号<a href="/login?login=1" class="colors">登录</a>
            </p>
          </div>
          <el-alert
            v-show="registerErr"
            :title="registerTitle"
            type="error"
            show-icon :closable="false">
          </el-alert>
          <el-input
            type="text"
            placeholder="用户名"
            v-model="newUsername">
          </el-input>
          <el-alert
            v-show="newUsernameErr"
            title="用户名错误"
            type="error"
            show-icon :closable="false">
          </el-alert>
          <el-input
            type="email"
            placeholder="邮箱"
            v-model="newEmail">
          </el-input>
          <el-alert
            v-show="newEmailErr"
            title="邮箱错误"
            type="error"
            show-icon :closable="false">
          </el-alert>
          <el-input
            type="password"
            placeholder="密码:6-12位英文、数字、下划线"
            v-model="newPassword">
          </el-input>
          <el-alert
            v-show="newPasswordErr"
            title="密码错误"
            type="error"
            show-icon :closable="false">
          </el-alert>
          <el-input
            type="password"
            placeholder="确认密码"
            @keyup.enter.native="registerEnterFun"
            v-model="newPassword2">
          </el-input>
          <el-alert
            v-show="newPassword2Err"
            title="重复密码有误"
            type="error"
            show-icon :closable="false">
          </el-alert>
          <div class="lr-btn colors-bg" @click="newRegister" v-loading.fullscreen.lock="fullscreenLoading"
               element-loading-text="提交中">注册
          </div>
        </div>
      </div>
      <!-- 注册进度状态 -->
      <div v-show="err2005" class="registerSuc">
        <div class="sucIcon">
          <el-steps :space="100" :active="step" finish-status="success">
            <el-step title="注册"></el-step>
            <el-step title="验证"></el-step>
            <el-step title="登录"></el-step>
          </el-steps>
        </div>
        <div v-show="urlState===0" class="sucContent">
          账号激活链接已发送至您的邮箱：{{newEmail}}
          <p>请您在24小时内登录邮箱，按邮件中的提示完成账号激活操作</p>
        </div>
        <div v-show="urlState === 'urlInvalid'" class="sucContent">
          账号已激活，现在去登录 &nbsp;&nbsp;<span class="colors-bg lastbtn" @click="goLogin">登录</span>
        </div>
        <div v-show="urlState === 'urlErr'" class="sucContent">
          OwO邮箱激活地址已超时，验证失败，请重新注册 &nbsp;&nbsp;<span class="colors-bg lastbtn" @click="goRegister">注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getRegister, UserLogin} from '../utils/server.js'

  export default {
    name: 'Login',
    data() { //选项 / 数据
      return {
        username: '',//用户名
        email: '',//邮箱
        password: '',//密码
        newUsername: '',//新用户注册名
        newEmail: '',//新用户注册邮箱
        newPassword: '',//新用户注册密码
        newPassword2: '',//新用户注册重复密码
        login: 0,//是否已经登录
        emailErr: false,//登录邮箱错误
        passwordErr: false,//的轮毂密码错误
        loginErr: false,//登录错误
        loginTitle: '用户名或密码错误',
        newUsernameErr: false,//新用户注册用户名错误
        newEmailErr: false,//新用户注册邮箱错误
        newPasswordErr: false,//新用户注册密码错误
        newPassword2Err: false,//新用户注册重复密码错误
        registerErr: false,//已注册错误
        registerTitle: '该邮箱已注册',
        err2005: false,//是否展示注册进度条状态
        step: 1,//注册进度
        fullscreenLoading: false,//全屏loading
        urlState: 0,//重新注册
      }
    },
    methods: { //事件处理器
      routeChange: function () {
        let that = this;
        that.login = that.$route.query.login === undefined ? 1 : parseInt(that.$route.query.login);//获取传参的login
        that.urlState = that.$route.query.urlState === undefined ? 0 : that.$route.query.urlState;//获取传参的usrlstate状态码
        if (that.urlState === 0) {
          that.err2005 = false;
          that.step = 1;
        } else if (that.urlState === 'urlInvalid') {
          that.err2005 = true;
          that.step = 2
        } else if (that.urlState === 'urlErr') {
          that.err2005 = true;
          that.step = 1;
        }
      },
      loginEnterFun: function (e) {
        let keyCode = window.event ? e.keyCode : e.which;
        if (keyCode === 13) {
          this.gotoHome();
        }
      },
      gotoHome: function () {//用户登录
        let that = this;
        let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        let pReg = /^(\w){6,12}$/;

        that.emailErr = !reg.test(that.email);
        that.passwordErr = !(that.password && pReg.test(that.password));

        if (!that.emailErr && !that.passwordErr) {
          UserLogin(that.email, that.password, function (msg) {
            // console.log(msg);
            if (msg.code === 1010) {//登录成功
              localStorage.setItem('userInfo', JSON.stringify(msg.data));
              localStorage.setItem('accessToken', msg.token);
              if (localStorage.getItem('logUrl')) {
                that.$router.push({path: localStorage.getItem('logUrl')});
              } else {
                that.$router.push({path: '/'});
              }

            } else if (msg.code === 2008 || msg.code === 2007) {//邮箱或密码错误
              that.loginErr = true;
              that.loginTitle = '邮箱或密码错误';
            } else if (msg.code === 2009) {//邮箱注册码未激活
              that.loginErr = true;
              that.loginTitle = '该邮箱注册码未激活，请前往邮箱激活';
            } else if (msg.code === 2005) {//邮箱注册码未激活已超时
              that.err2005 = true;
            } else {
              that.loginErr = true;
              that.loginTitle = '登录失败';
            }
          })
        }
      },

      registerEnterFun: function (e) {
        let keyCode = window.event ? e.keyCode : e.which;
        // console.log('回车注册',keyCode,e);
        if (keyCode === 13) {
          this.newRegister();
        }
      },

      //注册提交
      newRegister: function () {
        let that = this;
        let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        let pReg = /^(\w){6,12}$/;
        that.newUsernameErr = !that.newUsername;
        that.newEmailErr = !reg.test(that.newEmail);
        if (that.newPassword && pReg.test(that.newPassword)) {
          that.newPasswordErr = false;
          that.newPassword2Err = that.newPassword !== that.newPassword2;
        } else {
          that.newPasswordErr = true;
        }
        if (!that.newUsernameErr && !that.newEmailErr && !that.newPasswordErr) {
          that.fullscreenLoading = true;

          getRegister(that.newUsername, that.newPassword, that.newEmail, function (msg) {
            if (msg.code === 1010) {//注册成功
              let timer = setTimeout(function () {//注册中
                that.fullscreenLoading = false;
                that.err2005 = true;
                that.step = 1;
                clearTimeout(timer);
              }, 3000)
            } else if (msg.code === 2002) {//该邮箱已注册
              that.fullscreenLoading = false;
              that.registerErr = true;
              that.registerTitle = '该邮箱已注册,可直接登录';
            } else {
              that.fullscreenLoading = false;
              that.registerErr = true;
              that.registerTitle = '注册失败';
            }
          })
        }
      },

      //邮箱验证成功,去登陆
      goLogin: function () {
        this.err2005 = false;
        this.$router.push({path: '/login?login=1'});
      },

      //去注册
      goRegister: function () {
        this.err2005 = false;
        this.$router.push({path: '/login?login=0'});
      }

    },
    components: { //定义组件

    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'routeChange'
    },

    //生命周期函数
    created() {
      this.routeChange();
    }
  }
</script>

<style>
  /*登录注册标题*/
  .loginTitle {
    text-align: center;
    font-size: 26px;
    padding-top: 50px;
    margin-bottom: 20px;
  }

  .loginBox, .registerBox {
    background: #fff;
    padding: 40px;
    max-width: 320px;
    margin: 0 auto;
  }

  .loginBox {
    padding-bottom: 0;
  }

  .lr-title {
    position: relative;
    height: 32px;
    line-height: 32px;
    margin-bottom: 20px;
  }

  .lr-title h1 {
    font-size: 24px;
    color: #666;
    font-weight: bold;
    /*width:50%;*/
  }

  .lr-title p {
    font-size: 12px;
    color: #999;
    position: absolute;
    right: 0;
    top: 0;
  }

  .lr-btn {
    color: #fff;
    text-align: center;
    letter-spacing: 5px;
    padding: 8px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 30px;
  }

  .loginBox .el-input, .registerBox .el-input {
    margin-bottom: 20px;
  }

  .loginBox .el-alert, .registerBox .el-alert {
    top: -18px;
    background-color: #888;
  }

  .loginBox .el-input input, .registerBox .el-input input {
    border-radius: 4px;
  }

  .loginBox h3, .registerBox h3 {
    text-align: right;
    margin-bottom: 20px;
  }

  .loginBox h3 a, .registerBox h3 a {
    font-size: 13px;
    color: #999;
  }

  .loginBox .otherLogin {
    max-width: 320px;
    padding: 30px 40px;
    background: #ddd;
    text-align: center;
    margin-left: -40px;
    margin-right: -40px;
    visibility: hidden;
  }

  .loginBox .otherLogin p {
    margin-bottom: 20px;
    font-size: 16px;
  }

  .loginBox .otherLogin a i {
    display: inline-block;
    width: 42px;
    height: 42px;
    line-height: 42px;
    font-size: 18px;
    border-radius: 50%;
    color: #fff;
    margin: 0 10px;
  }

  .loginBox .otherLogin a i.fa-wechat {
    background: #7bc549;
  }

  .loginBox .otherLogin a i.fa-qq {
    background: #56b6e7;
  }

  .loginBox .otherLogin a i.fa-weibo {
    background: #ff763b;
  }

  /*登录成功*/
  .registerSuc {
    padding: 40px;
    margin: 0 auto;
  }

  .registerSuc .sucIcon {
    text-align: center;
    margin-bottom: 30px;
    padding-left: 60px;
  }

  .registerSuc .sucContent {
    line-height: 1.5;
    font-size: 15px;
    text-align: center;
  }

  .registerSuc .sucContent p {
    margin-top: 10px;
    font-size: 13px;
    color: #999;
  }

  .registerSuc .sucContent .lastbtn {
    display: inline-block;
    font-size: 14px;
    padding: 3px 10px;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
  }

  .registerSuc .sucContent .el-icon-close {
    fong-size: 13px;
  }
</style>
