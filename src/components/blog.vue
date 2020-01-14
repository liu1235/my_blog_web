<!-- 文章列表 -->
<template>
  <el-row class="shareListBox">
    <div class="shareTitle" v-if="className !== ''">
      <div class="ui label">
        <a href="#" @click="searchByClassId()">{{className}}</a>
      </div>
      <ul class="shareClassTwo">
        <li v-for="item in sonClassList">
          <a href="#" @click="searchByClassId(item.classId)"
             class="active">{{item.className}}</a>
        </li>
      </ul>
    </div>

    <el-col :span="24" class="s-item commonBox" v-for="(item, index) in list" :key="'blog' + index">
            <span class="s-round-date">
                <span class="month" v-html="showInitDate(item.createDate,'month')+'月'"></span>
                <span class="day" v-html="showInitDate(item.createDate,'date')"></span>
            </span>
      <header>
        <h1>
          <a href="#">
            <router-link target="_blank" :to='{path:"/detail",query:{bid: item.id}}'>{{item.title}}</router-link>
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
          <a href="#" @click="searchByClassId(item.classId)">{{item.className}}</a>
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
        <a class="colors-bg" href="#">
          <router-link target="_blank" :to='{path:"/detail",query:{bid: item.id}}'>阅读全文>></router-link>
        </a>
      </div>
    </el-col>
    <el-col class="viewMore">
      <a v-show="hasMore" class="colors-bg" href="#" @click="showMore">点击加载更多</a>
      <a v-show="!hasMore" class="colors-bg" href="javascript:void(0);">暂无更多数据</a>
    </el-col>
  </el-row>
</template>

<script>
  import {initDate} from '../utils/server.js'
  import {getBlogList,getSecondClass} from '../api/api.js'

  export default {
    name: 'blog',
    data() { //选项 / 数据
      return {
        classId: 0,
        className: '',
        sonClassList: '',//二级分类
        keywords: '',
        hasMore: true,
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
          classId: this.$route.query.classId === undefined ? null : this.$route.query.classId,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          title: this.$store.state.keywords
        };

        getBlogList(param).then((res) => {
          if (this.GLOBAL.isResponseSuccess(res)) {
            let dataList = res.data.list;
            if (dataList !== null) {
              this.hasMore = !(dataList.length > 0 && dataList.length < 10);
              this.list = this.list.concat(dataList);
            } else {
              this.hasMore = false;
              this.list = [];
            }
          }
        });
      },

      //根据分类id获取数据
      searchByClassId(classId) {
        this.pageNum = 1;
        this.list = [];
        this.$route.query.classId = classId;
        this.showBlogList();
      },

      //根据关键词搜索
      searchByKeywords() {
        this.pageNum = 1;
        this.list = [];
        this.showBlogList();
      },


      //查看更多
      showMore: function () {
        this.pageNum = this.pageNum + 1;
        this.showBlogList()
      },

      routeChange: function () {
        let classId = this.$route.query.classId;
        if (classId !== undefined) {
          this.classId = classId;
          getSecondClass({id: classId}).then((res) => {
            if (this.GLOBAL.isResponseSuccess(res)) {
              this.sonClassList = res.data.child;
              this.className = res.data.className
            }
          });
        }
        this.showBlogList();
      }
    },
    components: { //定义组件

    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'routeChange',
      '$store.state.keywords': 'searchByKeywords'
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
