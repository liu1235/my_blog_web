<!-- 博客详情模块 -->
<template>
  <div class="detailBox commonBox" v-if="detailFlag">
            <span class="s-round-date">
                <span class="month" v-html="showInitDate(detailObj.releaseTime,'month')+'月'"></span>
                <span class="day" v-html="showInitDate(detailObj.releaseTime,'date')"></span>
            </span>
    <header>
      <h1>
        <a :href="'/detail?bid=' + detailObj.id" target="_blank">
          {{detailObj.title}}
        </a>
      </h1>
      <h2>
        <i class="fa fa-fw fa-user"></i>发表于 <span>{{detailObj.releaseTime}}</span> •
        <i class="fa fa-fw fa-eye"></i>{{detailObj.readCount}} 次围观 •
        <i class="fa fa-fw fa-comments"></i>活捉 {{detailObj.commentCount}} 条 •
        <span class="rateBox">
                        <i class="fa fa-fw fa-heart"></i>{{likeCount}}点赞
                        <i class="fa fa-fw fa-star"></i>{{collectCount}}收藏
                    </span>
      </h2>
      <div class="ui label">
        <a :href="'/blog?classId=' + detailObj.classId">{{detailObj.className}}</a>
      </div>
    </header>
    <div>
      <article class="markdown-body" style="text-align:left" v-html="detailObj.content"></article>
    </div>

    <div class="dShareBox bdsharebuttonbox" data-tag="share_1">
      分享到:
      <!--      <a class="ds-weibo fa fa-fw fa-weibo" @click="share('sina')"></a>-->
      <a class="ds-qq fa fa-fw fa-qq" @click="share('QQ')"></a>
      <a class="ds-wechat fa fa-fw fa-weixin" @click="share('wechat')"></a>
      <div class="dlikeColBox">
        <div class="dlikeBox" @click="likeBlog">
          <i :class="likeArt?'fa fa-fw fa-heart':'fa fa-fw fa-heart-o'"></i>喜欢 | {{likeCount}}
        </div>
        <div class="dcollectBox" @click="collectBlog">
          <i :class="collectArt ? 'fa fa-fw fa-star':'fa fa-fw fa-star-o'"></i>收藏 | {{collectCount}}
        </div>
      </div>
    </div>
  </div>
  <div class="detailBox commonBox" v-else>
    <header>
        <h1>博客被系统吞啦（；´д｀）ゞ.....</h1>
    </header>
  </div>
</template>

<script>
  import {initDate} from '../utils/server.js'
  import {collect, getBlogDetail, like} from '../api/api.js'
  import 'github-markdown-css/github-markdown.css' //导入

  export default {

    data() { //选项 / 数据
      return {
        // pdonate: true,//打开赞赏控制,
        detailObj: '',//返回详情数据
        likeArt: false,//是否点赞
        likeCount: 0,//点赞数量
        collectCount: 0,//收藏数量
        collectArt: false,//是否收藏
        detailFlag: false,//是否获取到内容
      }
    },

    methods: { //事件处理器

      showInitDate: function (date, full) {//年月日的编辑
        return initDate(date, full);
      },

      share: function (type) {
        let param = encodeURIComponent(document.location.href) + "&title=" + this.detailObj.title + "&pics=&summary=" + this.detailObj.description;
        //qq空间分享接口
        if (type === 'qzone') {
          window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + param)
        } else if (type === 'sina') { //新浪微博接口的传参
          let para = document.location.href + "&title=" + this.detailObj.description + "&pics=";
          window.open('http://service.weibo.com/share/share.php?url=' + para);
        } else if (type === 'QQ') {  //qq好友接口的传参
          window.open('http://connect.qq.com/widget/shareqq/index.html?url=' + param)
        } else if (type === 'wechat') {
          let encodePath = encodeURIComponent(window.location.href);
          let targetUrl = 'http://qr.liantu.com/api.php?text=' + encodePath;
          window.open(targetUrl, 'weixin', 'height=320, width=320')
        }
      },

      /**
       * 点赞
       */
      likeBlog: function () {
        //判断是否登录
        if (localStorage.getItem('userInfo')) {
          let tip = '';
          if (!this.likeArt) {
            this.likeCount += 1;
            this.likeArt = true;
            tip = '已点赞';
          } else {
            this.likeCount -= 1;
            this.likeArt = false;
            tip = '已取消点赞'
          }
          let param = {
            blogId: this.detailObj.id,
            status: this.likeArt ? 1 : 0
          };
          like(param).then((res) => {
            if (this.GLOBAL.isResponseSuccess(res)) {
              this.$message({
                message: tip,
                type: 'success'
              });
            }
          });
        } else {//未登录 前去登录。
          this.noLogin();
        }
      },


      /**
       * 收藏
       */
      collectBlog: function () {
        //判断是否登录
        if (localStorage.getItem('userInfo')) {
          let tip = '';
          if (!this.collectArt) {
            this.collectCount += 1;
            this.collectArt = true;
            tip = '已收藏';
          } else {
            this.collectCount -= 1;
            this.collectArt = false;
            tip = '已取消收藏';
          }
          let param = {
            blogId: this.detailObj.id,
            status: this.collectArt ? 1 : 0
          };
          collect(param).then((res) => {
            if (this.GLOBAL.isResponseSuccess(res)) {
              this.$message({
                message: tip,
                type: 'success'
              });
            }
          });
        } else {//未登录 前去登录。
          this.noLogin();
        }

      },


      //未登录时
      noLogin: function () {
        this.$confirm('登录后即可点赞和收藏，是否前往登录页面?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {//确定，跳转至登录页面
          //储存当前页面路径，登录成功后跳回来
          localStorage.setItem('returnUrl', this.$route.fullPath);
          this.$router.push({path: '/login?login=1'});
        }).catch(() => {//取消关闭弹窗
        });
      },


      detail: function () {
        //获取博客id
        let bid = this.$route.query.bid === undefined ? 1 : parseInt(this.$route.query.bid);
        //获取详情接口
        getBlogDetail({id: bid}).then((res) => {
          if (this.GLOBAL.isResponseSuccess(res)) {
            this.detailObj = res.data.blog;
            //点赞状态(1:点赞；0：未点赞)
            this.likeArt = res.data.like.likeStatus === 1;
            //收藏状态(1:收藏；0：未收藏)
            this.collectArt = res.data.like.collectStatus === 1;
            //点赞数
            this.likeCount = this.detailObj.likeCount;
            //收藏数
            this.collectCount = this.detailObj.collectCount;
            this.detailFlag = true;
          } else {
            this.detailFlag = false;
          }
        });
      }


    }
    ,
    watch: {
      // 如果路由有变化，会再次执行该方法 用于移动端
      '$route':
        'detail'
    }
    ,

    created() { //生命周期函数
      this.detail();
    }
    ,

  }
</script>

<style lang="less">

  .detailBox .article-content {
    font-size: 15px;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
    overflow-x: hidden;
  }

  .detailBox .article-content p {
    margin: 10px 0;
    line-height: 24px;
    word-wrap: break-word;
    word-break: break-all;
    overflow-x: hidden;
  }

  .detailBox .article-content pre {
    word-wrap: break-word;
    word-break: break-all;
    overflow-x: hidden;
  }

  .detailBox .article-content img {
    max-width: 100% !important;
    height: auto !important;
    overflow-x: hidden;
  }

  .detailBox .article-content a {
    color: #df2050 !important;
  }

  .detailBox .article-content a:hover {
    text-decoration: underline;
    color: #f00 !important;
  }

  .detailBox .article-content i {
    font-style: italic;
  }

  .detailBox .article-content strong {
    font-weight: bold;
  }

  .detailBox .article-content ul {
    list-style-type: disc !important;
    list-style: disc !important;
    padding-left: 40px !important;

    li {
      list-style-type: disc !important;
      list-style: disc !important;
    }
  }

  .detailBox .article-content h1, .detailBox .article-content h2, .detailBox .article-content h3 {
    font-size: 200%;
    font-weight: bold;
  }

  .detailBox .article-content h4, .detailBox .article-content h5, .detailBox .article-content h6 {
    font-size: 150%;
    font-weight: bold;
  }

  .detailBox .viewDetail {
    margin: 10px 0;
    line-height: 24px;
    text-align: center;
  }

  /*分享图标*/
  .dShareBox {
    margin-top: 40px;
    position: relative;
  }

  .dShareBox a {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 32px;
    font-size: 18px;
    border-radius: 50%;
    line-height: 32px;
    text-align: center;
    vertical-align: middle;
    margin: 4px;
    background: #fff;
    transition: background 0.6s ease-out;
  }

  .dShareBox .ds-weibo {
    border: 1px solid #ff763b;
    color: #ff763b;
  }

  .dShareBox .ds-weibo:hover {
    color: #fff;
    background: #ff763b;
  }

  .dShareBox .ds-qq {
    color: #56b6e7;
    border: 1px solid #56b6e7;
  }

  .dShareBox .ds-qq:hover {
    color: #fff;
    background: #56b6e7;
  }

  .dShareBox .ds-qzone {
    color: #56b6e7;
    border: 1px solid #56b6e7;
  }

  .dShareBox .ds-qzone:hover {
    color: #fff;
    background: #56b6e7;
  }

  .dShareBox .ds-wechat {
    color: #7bc549;
    border: 1px solid #7bc549;
  }

  .dShareBox .ds-wechat:hover {
    color: #fff;
    background: #7bc549;
  }

  .dShareBox .ds-wechat:hover .wechatShare {
    opacity: 1;
    visibility: visible;
  }

  .detailBox .bdshare-button-style0-32 a {
    float: none;
    background-image: none;
    text-indent: inherit;
  }

  /*点赞 收藏*/
  .dlikeColBox {
    display: inline-block;
    float: right;
  }

  .dlikeBox, .dcollectBox {
    display: inline-block;
    padding: 0 10px;
    height: 35px;
    color: #e26d6d;
    line-height: 35px;
    border-radius: 35px;
    border: 1px solid #e26d6d;
    cursor: pointer;
  }

  /*赞赏*/
  .donate-word {
    margin: 40px 0;
    text-align: center;
  }

  .donate-word span {
    display: inline-block;
    width: 80px;
    height: 34px;
    line-height: 34px;
    color: #fff;
    background: #e26d6d;
    margin: 0 auto;
    border-radius: 4px;
    cursor: pointer;
  }

  .donate-body {
    display: none;
  }

  .donate-body-show {
    display: block;
  }

  .donate-item {
    text-align: right;
  }

  .donate-item:last-child {
    text-align: left;
  }

  .donate-item img {
    width: 100%;
    display: block;
    height: auto;
  }

  .donate-item div {
    display: inline-block;
    width: 150px;
    padding: 0 6px;
    box-sizing: border-box;
    text-align: center;
  }

  .donate-item div span {
    display: inline-block;
    width: 100%;
    margin: 10px 0;
    text-align: center;
  }

  .donate-body .donate-item:first-of-type div {
    color: #44b549;
  }

  .donate-body .donate-item:nth-of-type(2) div {
    color: #00a0e9;
  }

  .bd_weixin_popup {
    position: fixed !important;
  }
</style>
