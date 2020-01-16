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
          <a :href="'/#/detail?bid='+item.id" target="_blank">
            {{item.title}}
          </a>
        </h1>
        <h2>
          <i class="fa fa-fw fa-user"></i>发表于
          <i class="fa fa-fw fa-clock-o"></i>
          <span>{{showInitDate(item.createDate,'all')}}</span> •
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
        <a class="colors-bg" :href="'/#/detail?bid='+item.id" target="_blank">
          阅读全文>>
        </a>
      </div>
    </el-col>

    <el-col :span="24" class="s-item page">
      <!--工具条-->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total" style="float: right">
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script>
  import {initDate} from '../utils/server.js'
  import {getBlogList, getSecondClass} from '../api/api.js'

  export default {
    name: 'blog',
    data() { //选项 / 数据
      return {
        classId: 0,
        className: '',
        sonClassList: '',//二级分类
        keywords: '',
        list: [], //博客列表
        total: 0,//总页数
        pageNum: 1, //当前页码
        pageSize: 10,//页数
      }
    },

    //事件处理器
    methods: {
      showInitDate: function (oldDate, full) {
        return initDate(oldDate, full)
      },

      //切换页数
      handleCurrentChange(val) {
        this.pageNum = val;
        this.toTopFun();
        this.showBlogList();
      },
      //处理分页条数
      handleSizeChange(val) {
        this.pageSize = val;
        this.toTopFun();
        this.showBlogList();

      },

      toTopFun: function () {
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
            this.list = res.data.list;
            this.total = res.data.total;
          }
        });
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


</style>
