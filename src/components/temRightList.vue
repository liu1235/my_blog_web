<!-- 右侧固定导航栏 -->
<template>
  <div class="rightListBox">
    <section>
      <div class="r1-head">
        <img src="static/img/headtou02.jpg" alt="">
        <h1>
          <span>liuzw</span>
        </h1>
      </div>
      <div class="r1-body">
        <p>你能抓到我么？</p>
        <div class="catch-me">
          <div class="">
            <el-tooltip class="item" content="Github" placement="top">
              <a :href="catchMeObj.git" target="_blank"><i class="fa fa-fw fa-github"></i></a>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="QQ" placement="top">
              <a :href="catchMeObj.qq" target="_blank"><i class="fa fa-fw fa-qq"></i></a>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="微博" placement="top">
              <a :href="catchMeObj.sina" target="_blank"><i class="fa fa-fw fa-weibo"></i></a>
            </el-tooltip>
          </div>
          <div class="">
            <el-tooltip class="item" effect="dark" content="微信" placement="top">
              <a :href="catchMeObj.wechat" target="_blank"><i class="fa fa-fw fa-wechat"></i></a>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="CSDN" placement="top">
              <a :href="catchMeObj.csdn" target="_blank"><i class="">C</i></a>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="简历" placement="top">
              <a :href="catchMeObj.job" target="_blank"><i class="fa fa-fw fa-file-word-o"></i></a>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="更多" placement="top">
              <a href="/about"><i class="el-icon-more"></i></a>
            </el-tooltip>
          </div>
        </div>
      </div>
    </section>
    <section :class="fixDo?'rs2 fixed':'rs2'" @click="likeMeFun">
      <p>
        Do you like me?
      </p>
      <div class="">
        <i :class="likeMe?'heart active':'heart'"></i>
        <span>{{likeNum}}</span>
      </div>
    </section>
    <section></section>
    <section class="rs3">
      <h2 class="ui label">
        这些人都排着队来跟我说话
      </h2>
      <ul class="rs3-textWidget">
        <li class="rs3-item" v-for="(item,index) in artCommentList" :key="'artCommentList'+index">
          <a :href="'/detail?bid='+item.id" target="_blank">
            <div class="rs3-photo">
              <img :src="item.avatar" :onerror="$store.state.errorImg" alt="">
            </div>
            <div class="rs3-inner">
              <p class="rs3-author">{{item.nickname}} 在「{{item.title}}」中说:</p>
              <p class="rs3-text">{{item.content}}</p>
            </div>
          </a>
        </li>
      </ul>
    </section>
    <section class="rs4">
      <h2 class="ui label">
        大家都排队来看这些
      </h2>
      <ul>
        <li v-for="(item,index) in topBlogList" :key="'topBlogList'+ index">
          <a href="#" target="_blank">
            <router-link :to='{path:"/detail", query:{bid: item.id}}'>{{item.title}}</router-link>
          </a> —— {{item.browse_count}} 次围观
        </li>
      </ul>
    </section>
    <!-- 右侧上滑小图片 -->
    <div :class="gotoTop ? 'toTop hidden':'toTop goTop hidden'"
         @click="toTopFun">
      <img src="static/img/scroll.png" alt="">
    </div>
  </div>
</template>


<script>
  import {addLikeMeData, likeMeData, topBlogList} from '../api/api.js'

  export default {
    data() { //选项 / 数据
      return {
        fixDo: false,
        likeMe: false,
        gotoTop: false,//返回顶部
        topBlogList: '',//浏览量最多
        artCommentList: '',//评论量最多
        likeNum: 0,//do you like me 点击量
        initLikeNum: 0,//初始化喜欢数量
        catchMeObj: {//抓住我 个人信息
          git: 'https://github.com/Aimee1608',
          qq: 'static/img/aimee/QQ.jpg',
          sina: 'https://weibo.com/u/2242812941',
          wechat: 'static/img/aimee/erwm.jpg',
          csdn: 'http://blog.csdn.net/Aimee1608',
          job: 'http://aimee.mangoya.cn'
        },
      }
    },

    methods: { //事件处理器
      //do you like me  点击
      likeMeFun: function () {
        if (!this.likeMe) {
          this.likeMe = true;
          this.likeNum += 1;
          addLikeMeData({}).then(() => {
          });
        } else {
          let that = this;
          setTimeout(function () {
            that.likeMe = false;
          }, 3000);
        }

      },

      toTopFun: function () {
        this.gotoTop = false;
        let timer = null;
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(function fn() {
          let oTop = document.body.scrollTop || document.documentElement.scrollTop;
          if (oTop > 0) {
            scrollBy(0, -50);
            timer = requestAnimationFrame(fn);
          } else {
            cancelAnimationFrame(timer);
          }
        });
      },
    },
    components: { //定义组件

    },

    created() { //生命周期函数
      let that = this;
      window.onscroll = function () {
        let t = document.documentElement.scrollTop || document.body.scrollTop;
        that.gotoTop = t > 1000;
        that.fixDo = t > 1200;
      };

      //查询浏览量最多的10篇文章数据
      topBlogList().then((res) => {
        if (this.GLOBAL.isResponseSuccess(res)) {
          this.topBlogList = res.data;
        }
      });

      //查询文章评论量最大的10篇文章
      // ShowArtCommentCount(function (data) {
      //   // console.log('评论最多10文章数据',data);
      //   this.artCommentList = data;
      // });

      //
      likeMeData({}).then((res) => {
        if (this.GLOBAL.isResponseSuccess(res)) {
          this.likeNum = res.data;
        }
      });

    }
  }
</script>

<style lang="less">
  .rightListBox {
    position: relative;
  }

  .rightListBox section {
    transition: all 0.2s linear;
    position: relative;
    background: #fff;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 5px;
  }

  .rightListBox section:hover {
    transform: translate(0, -2px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
  }

  .rightListBox .r1-head {
    text-align: center;
    border-radius: 4px 4px 0 0;
    position: relative;
    /*box-shadow: inset 0 -70px 100px -50px rgba(0,0,0,.5);*/
  }

  .rightListBox .r1-head img {
    width: 100%;
    min-height: 100px;
  }

  .rightListBox .r1-head h1 {
    position: absolute;
    bottom: 5px;
    margin: 0 0 0 -65px;
    font-size: 20px;
    letter-spacing: 0.5px;
    color: #fff;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, .7);
    font-weight: 700;
    width: 130px;
    left: 50%;
  }

  .rightListBox .r1-head h1 span {
    opacity: 0.3;
  }

  .rightListBox .r1-body p {
    font-size: 14px;
    margin: 5px 0 8px 0;
    font-weight: 700;
    text-align: center;
  }

  .rightListBox .r1-body .catch-me {
    text-align: center;
  }

  .rightListBox .r1-body .catch-me a {
    display: inline-block;
    margin-bottom: 7px;
    position: relative;
    text-decoration: none;
  }

  .rightListBox .r1-body .catch-me a:hover i {
    color: #fff;
    background: #F4692C;
  }

  .rightListBox .r1-body .catch-me a i {
    display: inline-block;
    font-size: 18px;
    width: 42px;
    height: 42px;
    line-height: 42px;
    border-radius: 42px;
    color: rgba(0, 0, 0, 0.5);
    background: rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    font-style: normal;
    margin: 0 3.2px;
  }

  /*************do you like me*******************/
  .rightListBox .rs2 {
    /*padding:10px 0 4px 0;*/
    min-height: 100px;
  }

  .rightListBox .rs2.fixed {
    position: fixed;
    top: 40px;
    width: 22%;
  }

  .rightListBox .rs2 p {
    color: #DF2050;
    cursor: pointer;
    font-size: 20px;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    margin-top: 10px;
    font-weight: 500;
  }

  .rightListBox .rs2 div {
    color: #DF2050;
    cursor: pointer;
    text-align: center;
    font-size: 40px;
    position: absolute;
    width: 100%;
    height: 100px;
    line-height: 100px;
    left: 0;
    top: 30px;
  }

  .rightListBox .rs2 div i.heart {
    display: inline-block;
    text-align: center;
    width: 100px;
    height: 100px;
    margin-left: -20px;
    margin-top: -5px;
    background: url(../../static/img/heart.png) no-repeat 0 0;
    cursor: pointer;
    -webkit-transition: background-position 1s steps(28);
    transition: background-position 1s steps(28);
    -webkit-transition-duration: 0s;
    transition-duration: 0s;
    vertical-align: middle;
  }

  .rightListBox .rs2 div i.heart:hover {
    transform: scale(1.15);
    -webkit-transform: scale(1.15);
  }

  .rightListBox .rs2 div i.heart.active {
    -webkit-transition-duration: 1s;
    transition-duration: 1s;
    background-position: -2800px 0;
  }

  .rightListBox .rs2 div span {
    margin-left: -30px;
  }

  /**********排队来说*************/
  .rightListBox .rs3 .rs3-item {
    font-size: 13px;
    line-height: 20px;
  }

  .rightListBox .rs3 .rs3-item a {
    display: block;
    padding: 5px;
    transition: all .3s ease-out;
    border-bottom: 1px solid #ddd;
    margin: 5px 0;
  }

  .rightListBox .rs3 .rs3-item a:hover {
    background: rgba(230, 244, 250, .5);
    border-radius: 5px;
  }

  .rightListBox .rs3 .rs3-photo {
    float: left;
  }

  .rightListBox .rs3 .rs3-photo img {
    border-radius: 50%;
    width: 32px;
    height: 32px;
    object-fit: cover;
  }

  .rightListBox .rs3 .rs3-inner {
    margin-left: 40px;
  }

  .rightListBox .rs3 .rs3-inner .rs3-author {
    font-weight: 700;
  }

  .rightListBox .rs3 .rs3-inner .rs3-text {
    font-size: 12px;
    text-align: justify;
  }

  .rightListBox .rs3 .rs3-item:last-child a {
    border-bottom: none;
  }

  /************排队看这些***************/
  .rightListBox .rs4 li {
    padding: 8px 0;
    text-align: justify;
  }

  .rightListBox .rs4 li a {
    font-weight: 600;
  }

  .rightListBox .rs4 li a:hover {
    color: #64609E;
  }


  /*回到顶部*/
  /*返回到顶部*/

  .toTop {
    position: fixed;
    right: 40px;
    top: -150px;
    z-index: 99;
    width: 70px;
    height: 900px;
    transition: all .5s 0.3s ease-in-out;
    cursor: pointer;
  }

  .goTop {
    top: -950px;
  }

  .toTop img {
    width: 100%;
    height: auto;
  }

</style>
