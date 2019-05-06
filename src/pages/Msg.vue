<!-- 登录注册 -->
<template>
  <div>
    <div class="container">
      <h1 class="loginTitle">
        <a href="/">liuzw 博客</a>
      </h1>
      <!-- 注册进度状态 -->
      <div v-show="err2005" class="registerSuc">
        <div class="sucIcon">
          <el-steps :space="100" :active="step" :process-status="stepStatus">
            <el-step title="注册"></el-step>
            <el-step title="验证"></el-step>
            <el-step title="登录"></el-step>
          </el-steps>
        </div>
        <div v-show="urlState === 'default'" class="sucContent">
          账号激活链接已发送至您的邮箱：{{email}}
          <p>请您在24小时内登录邮箱，按邮件中的提示完成账号激活操作</p>
        </div>
        <div v-show="urlState === 'Illegal'" class="sucContent">
          <p>非法激活请求</p> &nbsp;&nbsp;<span class="colors-bg lastbtn" @click="goRegister">注册</span>
        </div>
        <div v-show="urlState === 'urlInvalid'" class="sucContent">
          账号已激活，现在去登录 &nbsp;&nbsp;<span class="colors-bg lastbtn" @click="goLogin">登录</span>
        </div>
        <div v-show="urlState === 'urlErr'" class="sucContent">
          邮箱激活地址已超时，验证失败，请重新激活 &nbsp;&nbsp;<span class="colors-bg lastbtn" @click="activating">激活</span>
        </div>
        <div v-show="urlState === 'emailErr'" class="sucContent">
          邮箱不存在,是否前往注册页面注册 &nbsp;&nbsp;<span class="colors-bg lastbtn" @click="goRegister">注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {activation} from '../api/api.js'

  export default {
    name: 'Login',
    data() {
      return {
        err2005: false,//是否展示注册进度条状态
        step: 1,//注册进度
        stepStatus: '',
        urlState: 'default',//重新注册
        email:'',//邮箱
      }
    },

    methods: {
      //事件处理器
      routeChange: function () {
        Object.assign(this.$data, this.$options.data());
        //获取传参的urlState状态码
        this.urlState = this.$route.query.urlState === undefined ? 'default' : this.$route.query.urlState;
        this.email = this.$route.query.email === undefined ? '' : this.$route.query.email;
        if (this.urlState === 'default') {
          this.err2005 = true;
          this.step = 1;
        } else if (this.urlState === 'urlInvalid') {
          let param = this.$route.query.param === undefined ? '' : this.$route.query.param;
          //去后端进行激活操作
          if (param === null || param === '' || param === undefined) {
            this.$router.push({path: '/msg?urlState=emailErr'});
          }
          let params = {
            param: param,
          };
          activation(params).then((res) => {
            if (res.code === 0) {
              this.err2005 = true;
              this.step = 1
              this.stepStatus = "success";
            } else if (res.code === 1003) {
              this.$router.push({path: '/msg?urlState=urlErr'});
            } else if (res.code === 1004) {
              this.$router.push({path: '/msg?urlState=emailErr'});
            } else if (res.code === 1005) {
              this.$router.push({path: '/msg?urlState=Illegal'});
            }
          }, () => {
          });
        } else if (this.urlState === 'urlErr') {
          this.err2005 = true;
          this.step = 1;
          this.stepStatus = "error";
        } else if (this.urlState === 'emailErr') {
          this.err2005 = true;
          this.step = 1;
          this.stepStatus = "error";
        } else if (this.urlState === 'Illegal') {
          this.err2005 = true;
          this.step = 1;
          this.stepStatus = "error";
        }
      },

      //邮箱验证成功,去登陆
      goLogin: function () {
        this.err2005 = false;
        this.$router.push({path: '/login?loginStatus=1'});
      },

      //注册
      goRegister: function () {
        this.err2005 = false;
        this.$router.push({path: '/login?loginStatus=0'});
      },

      //重新激活
      activating: function () {
        // this.err2005 = false;
        // this.$router.push({path: '/login?loginStatus=0'});
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


</style>
