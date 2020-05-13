<!-- 用户中心 -->
<template>
  <div>
    <wbc-nav/>
    <div class="container">
      <div v-show="isEdit" class="commonBox">
        <header>
          <h1>
            编辑个人资料
          </h1>
        </header>
        <section>
          <ul class="userInfoBox">
            <li class="avatarList">
              <span class="leftTitle">头像</span>
              <el-upload
                class="avatar-uploader"
                action="/api/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="userInfo.headPhoto"
                  :src="userInfo.headPhoto ? userInfo.headPhoto : '/static/img/tou.jpg'"
                     :onerror="$store.state.errorImg" class="avatar" alt="">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">点击上传头像，只能上传jpg/png文件，且不超过1mb</div>
              </el-upload>
            </li>
            <li class="username">
              <span class="leftTitle">昵称</span>
              <el-input v-model="userInfo.userName" placeholder="昵称"></el-input>
              <i class="fa fa-wa fa-asterisk"></i>
            </li>
            <li>
              <span class="leftTitle">电子邮件</span>
              <span>{{userInfo.email}}</span>
            </li>
            <li>
              <span class="leftTitle">性别</span>
              <template>
                <el-radio-group v-model="userInfo.sex">
                  <el-radio class="radio" :label="1">男</el-radio>
                  <el-radio class="radio" :label="0">女</el-radio>
                </el-radio-group>
              </template>
            </li>
            <li>
              <span class="leftTitle">个性标签</span>
              <template>
                <el-checkbox-group v-model="userInfo.tags">
                  <el-checkbox v-for="(item,index) in userTab" :key="'userTab' + index" :label="item">{{item}}
                  </el-checkbox>
                </el-checkbox-group>
              </template>
            </li>
            <li>
              <span class="leftTitle">是否展示友链</span>
              <el-switch
                v-model="state"
                active-color="#13ce66"
                inactive-color="#aaa">
              </el-switch>
            </li>
            <li v-show="state">
              <span class="leftTitle">网站名称</span>
              <el-input v-model="userInfo.websiteName" placeholder="网站名称"></el-input>
              <i v-show="state" class="fa fa-wa fa-asterisk"></i>
            </li>
            <li v-show="state">
              <span class="leftTitle">网站地址</span>
              <el-input v-model="userInfo.websiteAddress" placeholder="网站" value="userWeb"></el-input>
              <i v-show="state" class="fa fa-wa fa-asterisk"></i>
            </li>
            <li v-show="state">
              <span class="leftTitle">网站简介</span>
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="userInfo.websiteIntroduction">
              </el-input>
              <i v-show="state" class="fa fa-wa fa-asterisk"></i>
            </li>
            <li v-show="state" class="avatarList">
              <span class="leftTitle">网站logo</span>
              <el-upload
                class="avatar-uploader"
                action="/api/upload"
                :show-file-list="false"
                :on-success="handleLogoSuccess"
                :before-upload="beforeLogoUpload">
                <img v-if="userInfo.websiteLogo"
                     :src="userInfo.websiteLogo ? userInfo.websiteLogo : 'static/img/tou.jpg'"
                     :onerror="$store.state.errorImg" class="avatar" alt="">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">点击上传头像，只能上传jpg/png文件，且不超过1mb</div>
              </el-upload>
            </li>
          </ul>
          <div class=" saveInfoBtn">
            <a class="colors-bg" href="#" @click="isEdit=!isEdit">返 回</a>
            <a class="colors-bg" href="#" @click="saveInfoFun">保 存</a>
          </div>
        </section>
      </div>

      <div v-show="!isEdit" class="commonBox">
        <header>
          <h1>
            个人中心
            <span class="gotoEdit" @click="isEdit=!isEdit"><i class="fa fa-wa fa-edit"></i>编辑</span>
          </h1>

        </header>
        <section>
          <ul class="userInfoBox">
            <li class="avatarList">
              <span class="leftTitle">头像</span>
              <div class="avatar-uploader">
                <img :src="userInfo.headPhoto ? userInfo.headPhoto : '/static/img/tou.jpg'"
                     :onerror="$store.state.errorImg" class="avatar" alt="">
              </div>
            </li>
            <li class="username">
              <span class="leftTitle">昵称</span>
              <span>{{userInfo.userName}}</span>

            </li>
            <li>
              <span class="leftTitle">电子邮件</span>
              <span>{{userInfo.email ? userInfo.email : "无"}}</span>
            </li>
            <li>
              <span class="leftTitle">性别</span>
              <span>{{userInfo.sex === 1 ? '男' : '女'}}</span>
            </li>
            <li>
              <span class="leftTitle">个性标签</span>

              <span class="i-class" v-for="(tag,index) in userInfo.tags" :key="'tags' + index">
                    {{tag}}
              </span>

            </li>
            <li>
              <span class="leftTitle">是否展示友链</span>
              <el-switch
                v-model="state"
                disabled>
              </el-switch>
            </li>
            <li>
              <span class="leftTitle">网站名称</span>
              <span>{{userInfo.name ? userInfo.websiteName : "无"}}</span>
            </li>
            <li>
              <span class="leftTitle">网站地址</span>
              <p class="rightInner">{{userInfo.websiteAddress ? userInfo.websiteAddress : "无"}}</p>
            </li>
            <li>
              <span class="leftTitle">网站简介</span>
              <p class="rightInner">{{userInfo.websiteIntroduction ? userInfo.websiteIntroduction : "无"}}</p>
            </li>
            <li class="avatarList">
              <span class="leftTitle">网站logo</span>
              <div class="avatar-uploader">
                <img :src="userInfo.websiteLogo ? userInfo.websiteLogo : '/static/img/tou.jpg'"
                     :onerror="$store.state.errorImg" class="avatar" alt="">
              </div>
            </li>
          </ul>

        </section>
      </div>
    </div>
    <wbc-footer/>
  </div>
</template>

<script>
  import header from '../components/header.vue'
  import footer from '../components/footer.vue'
  import {getUserInfo, updateUser, download} from '../api/api.js' //获取用户信息，保存用户信息

  export default {
    name: 'UserInfo',
    data() { //选项 / 数据
      return {
        isEdit: false,
        userInfo: { //用户的信息
          headPhoto: '',
          sex: null,
          showFlag: 0,
          tags: [],
          userName: '',
          websiteAddress: '',
          websiteIntroduction: '',
          websiteLogo: '',
          websiteName: ''
        },
        state: true, //是否展示友链开关
        userTab: [//用户标签
          "天然呆",
          "小萌新",
          "学霸",
          "萌萌哒",
          "技术宅",
          "忠实粉",
          "码农",
        ],
      }
    },

    methods: {

      //上传头像
      handleAvatarSuccess(res, file) {
        if (this.GLOBAL.isResponseSuccess(res)) {
          this.userInfo.headPhoto = download(res.data);
        } else {
          this.$message.error('上传图片失败');
        }
      },

      //判断头像大小
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }
        return isJPG && isLt2M;
      },

      //上传网站logo
      handleLogoSuccess(res, file) {
        if (this.GLOBAL.isResponseSuccess(res)) {
          this.userInfo.websiteLogo = download(res.data);
        } else {
          this.$message.error('上传图片失败');
        }
      },

      //控制网站logo图片大小
      beforeLogoUpload(file) {
        const isJPG = file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 1;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }
        return isJPG && isLt2M;
      },

      //保存编辑的用户信息
      saveInfoFun: function () {

        if (!this.userInfo.userName) { //昵称为必填
          this.$message.error('昵称为必填项，请填写昵称');
          return;
        }
        if (this.state) {
          let pattern = /^(http(s)?:\/\/)[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'\*\+,;=.]+$/;

          if (!this.userInfo.websiteAddress || !pattern.test(this.userInfo.websiteAddress)) {//如果展示友链 网址为必填项
            this.$message.error('请正确填写网址，如http://www.xxx.com');
            return;
          }
          if (!this.userInfo.websiteName) {//如果展示友链 网址为必填项
            this.$message.error('请填写网站名称');
            return;
          }
          if (!this.userInfo.websiteAddress) {//如果展示友链 网址为必填项
            this.$message.error('请填写网站简介');
            return;
          }
        }
        this.userInfo.showFlag = Number(this.state);

        updateUser(this.userInfo).then((res) => {
          if (this.GLOBAL.isResponseSuccess(res)) {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.isEdit = false;
            this.routeChange();
          }
        })

      },

      //展示页面信息
      routeChange: function () {
        getUserInfo().then(res => {
          if (this.GLOBAL.isResponseSuccess(res)) {
            if (res.data) {
              this.userInfo = res.data;
              if (this.userInfo.tags == null) {
                this.userInfo.tags = [];
              }
              this.state = this.userInfo.showFlag === 1;
            }
          }
        })
      }
    },

    components: { //定义组件
      'wbc-nav': header,
      'wbc-footer': footer
    },

    created() { //生命周期函数
      this.routeChange();
    }
  }
</script>

<style>
  .userInfoBox .avatarList {
    position: relative;
  }

  .avatar-uploader {
    display: inline-block;
    vertical-align: top;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 120px;
    height: 120px;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
  }

  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: block;
    object-fit: cover;
  }

  .gotoEdit {
    font-size: 15px;
    float: right;
    cursor: pointer;
    color: #999;
  }

  .gotoEdit:hover {
    color: #333;
  }

  /*个人设置*/
  .userInfoBox .leftTitle {
    display: inline-block;
    width: 100px;
    padding: 10px 0;
  }

  .userInfoBox .rightInner {
    display: inline-block;
    max-width: calc(100% - 140px);
    vertical-align: top;
  }

  .userInfoBox li {
    padding: 20px;
    border-bottom: 1px solid #ddd;
  }

  .userInfoBox li:last-child {
    border-bottom: 1px solid transparent;
  }

  .userInfoBox .el-input, .userInfoBox .el-textarea {
    max-width: 300px;
    min-width: 100px;
  }

  .userInfoBox .el-input__inner {
    border-radius: 4px;
  }

  .userInfoBox .el-textarea {
    vertical-align: top;
  }

  .saveInfoBtn {
    margin: 20px 0;
    text-align: center;
  }

  .saveInfoBtn a {
    color: #fff;
    padding: 6px 20px;
    margin: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
  }

  .userInfoBox .fa-asterisk {
    color: #DF2050;
  }

  .i-class {
    display: inline-block;
    margin-left: 10px;
    background: #dff0d8;
    color: #3c763d;
    border-radius: 5px;
    padding: 3px 6px;
    font-size: 12px;
    font-weight: 400;
  }
</style>
