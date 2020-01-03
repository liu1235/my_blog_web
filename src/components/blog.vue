<!-- 文章列表 -->
<template>
  <el-row class="shareListBox">
    <div  class="shareTitle">
      <div class="ui label">
        <a href="#" @click="searchData()">{{className}}啊啊啊啊啊</a>
      </div>
      <ul  class="shareClassTwo">
        <li v-for="item in sonClassList">
          <a href="#" @click="searchData(item.classId)"
             :class="item.classId === classTwoId?'active':''">{{item.className}}</a>
        </li>
      </ul>
    </div>

    <el-col :span="24" class="s-item commonBox" v-for="item in list" :key="'blog' + item.id">
            <span class="s-round-date">
                <span class="month" v-html="showInitDate(item.createDate,'month')+'月'"></span>
                <span class="day" v-html="showInitDate(item.createDate,'date')"></span>
            </span>
      <header>
        <h1>
          <a :href="'/detailShare?aid='+ item.id" target="_blank">
            {{item.title}}
          </a>
        </h1>
        <h2>
          <i class="fa fa-fw fa-user"></i>发表于
          <i class="fa fa-fw fa-clock-o"></i><span v-html="showInitDate(item.createDate,'all')">{{showInitDate(item.createDate,'all')}}</span>
          •
          <i class="fa fa-fw fa-eye"></i>{{item.readCount}} 次围观 •
          <i class="fa fa-fw fa-comments"></i>活捉 {{item.commentCount}} 条 •
          <span class="rateBox">
                        <i class="fa fa-fw fa-heart"></i>{{item.likeCount}}点赞 •
                        <i class="fa fa-fw fa-star"></i>{{item.collectCount}}收藏
                    </span>
        </h2>
        <div class="ui label">
          <a href="#" @click="searchData(item.classId)">{{item.className}} {{item.classId}}</a>
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
      <a v-show="hasMore" class="colors-bg" href="#" @click="showMore">点击加载更多</a>
      <a v-show="!hasMore" class="colors-bg" href="#">暂无更多数据</a>
    </el-col>
  </el-row>
</template>

<script>
  import {initDate} from '../utils/server.js'
  import {getBlogList} from '../api/api.js'

  export default {
    name: 'blog',
    data() { //选项 / 数据
      return {
        classId: 0,
        className: '',
        sonClassList: '',//二级分类
        classTwoId: 5,
        keywords: '',
        hasMore: true,
        shareClass: [
          {
            classId: 1, className: '技术分享', detShare: [
              {classId: 5, className: '移动端H5', pid: 1},
              {classId: 6, className: 'pc端web', pid: 1},
              {classId: 7, className: '小程序', pid: 1},
              {classId: 8, className: 'php', pid: 1},
              {classId: 9, className: 'nodejs', pid: 1},
              {classId: 10, className: '软件', pid: 1},
              {classId: 11, className: '其他', pid: 1}
            ]
          },
          {classId: 2, className: '闲言碎语'},
          {classId: 3, className: '事件簿'},
          {classId: 4, className: '创作集'}
        ],
        list: [], //博客列表
        pageNum: 1, //当前页码
        pageSize: 10,//页数
      }
    },

    //事件处理器
    methods: {
      showInitDate: function (oldDate, full) {
        return initDate(oldDate, full)
      },

      //展示博客列表数据数据
      showBlogList: function () {
        let param = {
          classId: this.$route.query.classId === undefined ? null : parseInt(this.$route.query.classId),
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          title: this.$store.state.keywords
        };

        getBlogList(param).then((res) => {
          if (this.GLOBAL.isResponseSuccess(res)) {
            let dataList = res.data.list;
            console.info("------", dataList)
            this.hasMore = !(dataList.length > 0 && dataList.length < 10);
            this.list = this.list.concat(dataList);
          }
        });
      },

      //搜索
      searchData(classId) {
        this.pageNum = 1;
        this.list = [];
        this.$route.query.classId = classId;
        this.showBlogList();
      },

      //查看更多
      showMore: function () {
        this.pageNum = this.pageNum + 1;
        this.showBlogList()
      },

      routeChange: function () {
        this.showBlogList();
      }
    },
    components: { //定义组件

    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'routeChange',
      '$store.state.keywords': 'searchData'
    },

    created() { //生命周期函数
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
