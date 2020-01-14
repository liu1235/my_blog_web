<!-- 登录注册 -->
<template>
  <div>
    <div class="container">
      <h1 class="loginTitle">
        <a href="/">liuzw 博客</a>
      </h1>
      <!-- 登录 -->
      <div v-if="loginStatus === 1" class="loginBox">
        <div class="lr-title">
          <h1>登录</h1>
          <p>
            新用户<a href="#" @click="changeStatus(0)" class="colors">注册</a>
          </p>
        </div>
        <el-alert
          v-show="loginErr"
          :title="loginTitle"
          type="error"
          show-icon :closable="false">
        </el-alert>
        <el-alert
          v-show="activating"
          title="账户未激活,是否激活"
          type="error"
          close-text="激活"
          @close="sendMail"
          show-icon>
        </el-alert>
        <el-input
          type="email"
          placeholder="邮箱"
          v-model="email">
        </el-input>
        <el-alert
          v-show="emailErr"
          title="请输入正确邮箱"
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
        <!--<h3><a href="">忘记密码？</a></h3>-->
        <div v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="提交中">
        </div>
        <div class="lr-btn colors-bg" @click="login">登录</div>
        <div class="otherLogin">
          <a href="#"><i class="fa fa-fw fa-wechat"></i></a>
          <a href="#"><i class="fa fa-fw fa-qq"></i></a>
          <a href="#"><i class="fa fa-fw fa-weibo"></i></a>
        </div>
      </div>

      <!-- 登录注册 -->
      <div v-else class="registerBox">
        <div class="lr-title">
          <h1>注册</h1>
          <p>
            已有账号<a href="#" @click="changeStatus(1)" class="colors">登录</a>
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
          title="用户名不能为空"
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
          title="邮箱不能为空或格式不正确"
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
          title="密码不能为空或格式不正确"
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
          title="两次密码输入不一致"
          type="error"
          show-icon :closable="false">
        </el-alert>
        <div class="lr-btn colors-bg" @click="newRegister" v-loading.fullscreen.lock="fullscreenLoading"
             element-loading-text="提交中">注册
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {login, register, send} from '../api/api.js'

  export default {
    name: 'Login',
    data() {
      return {
        username: '',//用户名
        email: '',//邮箱
        password: '',//密码
        newUsername: '',//新用户注册名
        newEmail: '',//新用户注册邮箱
        newPassword: '',//新用户注册密码
        newPassword2: '',//新用户注册重复密码
        loginStatus: 1,//是否已经登录
        emailErr: false,//登录邮箱格式错误
        passwordErr: false,//密码错误
        loginErr: false,//登录错误
        activating: false,
        loginTitle: '用户名或密码错误',
        newUsernameErr: false,//新用户注册用户名错误
        newEmailErr: false,//新用户注册邮箱错误
        newPasswordErr: false,//新用户注册密码错误
        newPassword2Err: false,//新用户注册重复密码错误
        registerErr: false,//已注册错误
        registerTitle: '该邮箱已注册',
        fullscreenLoading: false,//全屏loading
      }
    },


    methods: {

      routeChange: function () {
        let that = this;
        //获取传参的login
        that.loginStatus = that.$route.query.loginStatus === undefined ? 1 : parseInt(that.$route.query.loginStatus);
      },

      changeStatus(val) {
        this.loginStatus = val;
      },

      loginEnterFun: function (e) {
        let keyCode = window.event ? e.keyCode : e.which;
        if (keyCode === 13) {
          this.login();
        }
      },

      //用户登录
      login() {
        let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        this.emailErr = !reg.test(this.email);
        this.passwordErr = (this.password == null || this.password === '');
        if (!this.emailErr && !this.passwordErr) {
          let param = {
            email: this.email,
            password: this.password
          };
          login(param).then((res) => {
            if (this.GLOBAL.isResponseSuccess(data)) {
              localStorage.setItem('userInfo', JSON.stringify(res.data));
              localStorage.setItem('x-access-token', res.data.token);
              if (localStorage.getItem('logUrl')) {
                this.$router.push({path: localStorage.getItem('logUrl')});
              } else {
                this.$router.push({path: '/'});
              }
            } else if (this.GLOBAL.USERNAME_OR_PASSWORD_IS_WRONG === 1001) {//邮箱或密码错误
              this.loginErr = true;
              this.loginTitle = '邮箱或密码错误';
            } else if (this.GLOBAL.EMAIL_NOT_ACTIVATED === 1002) {//邮箱注册码未激活
              this.activating = true;
            } else {
              this.loginErr = true;
              this.loginTitle = '登录失败';
            }
          }, () => {
          });
        }
      },

      sendMail: function () {
        let that = this;
        that.fullscreenLoading = true;
        let param = {
          param: this.email,
        };
        send(param).then((res) => {
          if (res.code === 0) {
            setTimeout(function () {//注册中
              that.fullscreenLoading = false;
              that.$router.push({path: '/msg?urlState=default&email=' + that.email});
            }, 1500);
          }
        }, () => {
        });
      },


      //注册
      registerEnterFun: function (e) {
        let keyCode = window.event ? e.keyCode : e.which;
        if (keyCode === 13) {
          this.newRegister();
        }
      },

      //注册提交
      newRegister: function () {
        let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        let pReg = /^(\w){6,12}$/;
        this.newUsernameErr = !this.newUsername;
        this.newEmailErr = !reg.test(this.newEmail);
        if (this.newPassword && pReg.test(this.newPassword)) {
          this.newPasswordErr = false;
          this.newPassword2Err = this.newPassword !== this.newPassword2;
        } else {
          this.newPasswordErr = true;
        }
        if (this.newPassword2Err) {
          return;
        }
        if (!this.newUsernameErr && !this.newEmailErr && !this.newPasswordErr) {
          this.fullscreenLoading = true;
          let param = {
            userName: this.newUsername,
            password: this.newPassword,
            email: this.newEmail,
          };

          register(param).then((res) => {
            if (res.code === 0) {
              let that = this;
              setTimeout(function () {//注册中
                that.fullscreenLoading = false;
                that.$router.push({path: '/msg?urlState=default&email=' + that.newEmail});
              }, 2000);
            } else if (res.code === 1000) {//该邮箱已注册
              this.fullscreenLoading = false;
              this.registerErr = true;
              this.registerTitle = '该邮箱已注册,可直接登录';
            } else if (res.code === 1004) {//该邮箱不存在
              this.fullscreenLoading = false;
              this.registerErr = true;
              this.registerTitle = res.message;
            } else {
              this.fullscreenLoading = false;
              this.registerErr = true;
              this.registerTitle = '注册失败';
            }
          }, () => {
          });
        }
      },

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
    /*color: #999;*/
  }

  .loginBox .otherLogin {
    max-width: 320px;
    padding: 30px 40px;
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

</style>
