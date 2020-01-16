<!-- 用户喜欢收藏列表模块 -->
<template>
  <div>
    <div class="container">
      <el-row>
        <div class="likeBoxTitle">
          <h1 v-show="like ===  1"><i class="fa fa-wa fa-heart"></i>喜欢的文章</h1>
          <h1 v-show="like !== 1"><i class="fa fa-wa fa-star"></i>收藏的文章</h1>
        </div>
        <el-col :span="24" class="s-item commonBox" v-for="(item,index) in articleList" :key="'like'+index">
                    <span class="s-round-date">
                <span class="month" v-html="showInitDate(item.createDate,'month')+'月'"></span>
                <span class="day" v-html="showInitDate(item.createDate,'date')"></span>
            </span>
          <header>
            <h1>
              <a :href="'/#/detail?bid=' + item.id" target="_blank">
                {{item.title}}
              </a>
            </h1>
            <h2>
              <i class="fa fa-fw fa-user"></i>发表于
              <i class="fa fa-fw fa-clock-o"></i>
              <span>{{showInitDate(item.createDate,'all')}}</span>•
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
            <a class="cancelBtn colors-bg" href="#" @click="cancelLikeCollect(item.id)">
              取消{{like === 1 ? '喜欢' : '收藏'}}</a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a class="colors-bg" :href="'/#/detail?bid=' + item.id" target="_blank">
              阅读全文>>
            </a>
          </div>
        </el-col>
        <el-col class="page">
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
    </div>
  </div>
</template>

<script>
  import {initDate} from '../utils/server.js'

  export default {
    data() { //选项 / 数据
      return {
        articleList: '',//文章列表
        like: 1,//
        articleName: '',
        total: 0,//总页数
        pageNum: 1, //当前页码
        pageSize: 10,//页数
      }
    },
    methods: {
      //事件处理器
      showInitDate: function (oldDate, full) {
        return initDate(oldDate, full)
      },

      cancelLikeCollect: function (id) {

        // console.log(id);
        getArtLikeCollect(this.userId, id, this.like, function (msg) {
          // console.log('取消成功',msg);
          this.routeChange();
        })
      },

      //展示数据
      showLikeCollectList: function (initPage) {

        if (localStorage.getItem('userInfo')) {
          this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
          this.userId = this.userInfo.userId;
          // console.log(this.userInfo);
        }
        this.like = this.$route.query.like === undefined ? 1 : parseInt(this.$route.query.like);
        this.articleName = this.$store.state.keywords;
        // console.log(this.classId);
        if (initPage) {//初始化 文章id为0开始
          this.artId = 0;
          this.articleList = [];
        }
        getLikeCollectList(this.userId, this.artId, this.articleName, this.like, (result) => {
          if (result.code === 1001) {
            let msg = result.data;
            // console.log(result.data);
            this.hasMore = !(msg.length > 0 && msg.length < 8);
            this.articleList = this.articleList.concat(msg);
            this.artId = msg[msg.length - 1].id;
            // console.log(this.artId);
          } else if (result.code === 1003) {
            this.hasMore = false;
          }
        })
      },

      //查看更多
      addMoreFun: function () {
        this.showLikeCollectList(false);
      },


      routeChange: function () {
        this.showLikeCollectList(true);
      }
    },
    components: { //定义组件

    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'routeChange',//路由变换
      '$store.state.keywords': 'routeChange'//搜索关键词变换
    },

    //生命周期函数
    created() {
      // console.log(this.$route);

      this.routeChange();
    }
  }
</script>

<style>
  .likeBoxTitle {
    text-align: center;
    padding: 40px 0;
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 40px;
    background: #fff;
    border-radius: 5px;
  }

  .likeBoxTitle h1 {
    font-weight: 700;
  }

  .likeBoxTitle h1 i {
    color: #DF2050;
    margin-right: 10px;
    font-size: 30px;
  }

  .cancelBtn {
    background: #ddd;
  }

</style>
