<!-- 文章列表 -->
<template>
  <el-row class="shareListBox">
    <div v-if="this.$route.name === 'Share' && !this.$route.query.keywords" class="shareTitle">
      <div class="ui label">
        <a :href="'/share?classId='+classId">{{className}}</a>
      </div>
      <ul v-if="sonClassList" class="shareClassTwo">
        <li v-for="(item,index) in sonClassList">
          <a :href="'/share?classId='+classId+'&classTwoId='+item.class_id"
             :class="item.class_id === classTwoId?'active':''">{{item.cate_name}}</a>
        </li>
      </ul>
    </div>
    <el-col :span="24" class="s-item commonBox" v-for="(item,index) in articleList" :key="'article'+index">
            <span class="s-round-date">
                <span class="month" v-html="showInitDate(item.create_time,'month')+'月'"></span>
                <span class="day" v-html="showInitDate(item.create_time,'date')"></span>
            </span>
      <header>
        <h1>
          <a :href="'/detailShare?aid='+item.id" target="_blank">
            {{item.title}}
          </a>
        </h1>
        <h2>
          <i class="fa fa-fw fa-user"></i>发表于
          <i class="fa fa-fw fa-clock-o"></i><span v-html="showInitDate(item.create_time,'all')">{{showInitDate(item.create_time,'all')}}</span>
          •
          <i class="fa fa-fw fa-eye"></i>{{item.browse_count}} 次围观 •
          <i class="fa fa-fw fa-comments"></i>活捉 {{item.comment_count}} 条 •
          <span class="rateBox">
                        <i class="fa fa-fw fa-heart"></i>{{item.like_count?item.like_count:0}}点赞 •
                        <i class="fa fa-fw fa-star"></i>{{item.collect_count?item.collect_count:0}}收藏
                    </span>
        </h2>
        <div class="ui label">
          <a :href="'/share?classId='+item.class_id">{{item.cate_name}}</a>
        </div>
      </header>
      <div class="article-content">
        <p style="text-indent:2em;">
          {{item.description}}
        </p>
        <p style="max-height:300px;overflow:hidden;text-align:center;">
          <img :src="item.image" alt="" class="maxW">
        </p>
      </div>
      <div class="viewDetail">
        <a class="colors-bg" :href="'/detailShare?aid='+item.id" target="_blank">
          阅读全文>>
        </a>
      </div>
    </el-col>
    <el-col class="viewMore">
      <a v-show="hasMore" class="colors-bg" href="#" @click="addMoreFun">点击加载更多</a>
      <a v-show="!hasMore" class="colors-bg" href="#">暂无更多数据</a>
    </el-col>
  </el-row>
</template>

<script>
  import {ArtClassData, initDate, ShowArticleAll} from '../utils/server.js'

  export default {
    name: 'Share',
    data() { //选项 / 数据
      return {
        artId: 0,
        classId: 0,
        sendId: '',
        className: '',
        sonClassList: '',//二级分类
        classTwoId: 5,
        keywords: '',
        hasMore: true,
        level: 1,
        shareClass: [
          {
            classId: 1, name: '技术分享', detShare: [
              {classId: 5, name: '移动端H5', pid: 1},
              {classId: 6, name: 'pc端web', pid: 1},
              {classId: 7, name: '小程序', pid: 1},
              {classId: 8, name: 'php', pid: 1},
              {classId: 9, name: 'nodejs', pid: 1},
              {classId: 10, name: '软件', pid: 1},
              {classId: 11, name: '其他', pid: 1}
            ]
          },
          {classId: 2, name: '闲言碎语'},
          {classId: 3, name: '事件簿'},
          {classId: 4, name: '创作集'}
        ],
        queryClass: 1,
        articleList: '',
      }
    },

    //事件处理器
    methods: {
      showInitDate: function (oldDate, full) {
        return initDate(oldDate, full)
      },

      //展示数据
      showSearchShowList: function (initPage) {

        this.classId = (this.$route.query.classId === undefined ? 0 : parseInt(this.$route.query.classId));//获取传参的classId
        //获取传参的keywords
        this.keywords = this.$store.state.keywords;
        this.classTwoId = this.$route.query.classTwoId === undefined ? '' : parseInt(this.$route.query.classTwoId);//获取传参的classtwoId
        this.sendId = this.classTwoId ? this.classTwoId : this.classId;
        this.level = this.keywords ? 0 : this.classTwoId ? 0 : 1;

        ArtClassData(function (msg) {
          this.shareClass = msg;
        });


        //判断当前显示的分类名称 以及子分类
        for (let i = 0; i < this.shareClass.length; i++) {
          if (this.classId === this.shareClass[i].class_id) {
            this.className = this.shareClass[i].cate_name;
            if (this.shareClass[i].childsSon && this.shareClass[i].childsSon.length > 0) {
              this.sonClassList = this.shareClass[i].childsSon;
            } else {
              this.sonClassList = '';
            }
          }
        }


        //初始化 文章id为0开始
        this.artId = initPage ? 0 : this.artId;
        ShowArticleAll(this.artId, this.sendId, this.keywords, this.level, (result) => {
          if (result.code === 1001) {
            let msg = result.data;
            this.hasMore = !(msg.length > 0 && msg.length < 10);
            this.articleList = initPage ? msg : this.articleList.concat(msg);
            this.artId = msg[msg.length - 1].id;
          } else {
            this.hasMore = false;
            this.articleList = initPage ? [] : this.articleList;
          }
        })
      },

      //查看更多
      addMoreFun: function () {
        this.showSearchShowList(false);
      },


      routeChange: function () {
        this.showSearchShowList(true);
      }
    },
    components: { //定义组件

    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'routeChange',
      '$store.state.keywords': 'routeChange'
    },

    created() { //生命周期函数
      // console.log(this.$route);

      this.routeChange();
    }
  }
</script>

<style>
  /*分享标题*/
  .shareTitle {
    margin-bottom: 40px;
    position: relative;
    border-radius: 5px;
    background: #fff;
    padding: 15px;
  }

  .shareClassTwo {
    width: 100%;
  }

  .shareClassTwo li {
    display: inline-block;
  }

  .shareClassTwo li a {
    display: inline-block;
    padding: 3px 7px;
    margin: 5px 10px;
    color: #fff;
    border-radius: 4px;
    background: #64609E;
    border: 1px solid #64609E;
    transition: transform 0.2s linear;
    -webkit-transition: transform 0.2s linear;
  }

  .shareClassTwo li a:hover {
    transform: translate(0, -3px);
    -webkit-transform: translate(0, -3px);
  }

  .shareClassTwo li a .active {
    background: #fff;
    color: #64609E;

  }

  /*文章列表*/
  .shareListBox {
    transition: all 0.5s ease-out;
    font-size: 15px;
  }


  /*.shareListBox .viewMore a:hover,.s-item .viewDetail a:hover{
      background: #48456C;
  }*/
</style>
