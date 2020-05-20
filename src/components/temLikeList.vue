<!-- 用户喜欢收藏列表模块 -->
<template>
  <div>
    <div class="container">
      <el-row>
        <div class="likeBoxTitle">
          <h1 v-show="like ===  1"><i class="fa fa-wa fa-heart"></i>喜欢的文章</h1>
          <h1 v-show="like !== 1"><i class="fa fa-wa fa-star"></i>收藏的文章</h1>
        </div>
        <el-col :span="24" class="s-item commonBox" v-for="(item,index) in list" :key="'like'+index">
                    <span class="s-round-date">
                <span class="month" v-html="showInitDate(item.releaseTime,'month')+'月'"></span>
                <span class="day" v-html="showInitDate(item.releaseTime,'date')"></span>
            </span>
          <header>
            <h1 @click="updateReadCount(item.id)">
              <a :href="'/#/detail?bid=' + item.id" target="_blank">
                {{item.title}}
              </a>
            </h1>
            <h2>
              <i class="fa fa-fw fa-user"></i>发表于
              <i class="fa fa-fw fa-clock-o"></i>
              <span>{{showInitDate(item.releaseTime, 'all')}}</span>•
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
                <span @click="updateReadCount(item.id)">阅读全文>></span>
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

  import {getCollectBlogList, getLikeBlogList, like, collect, updateReadCount} from "../api/api";

  export default {
    data() { //选项 / 数据
      return {
        list: '',//文章列表
        like: 1,
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

      //切换页数
      handleCurrentChange(val) {
        this.pageNum = val;
        this.toTopFun();
        this.showLikeCollectList();
      },
      //处理分页条数
      handleSizeChange(val) {
        this.pageSize = val;
        this.toTopFun();
        this.showLikeCollectList();
      },

      updateReadCount: function(id) {
        updateReadCount({id: id}).then(res =>{ });
      },

      //根据分类id获取数据
      searchByClassId(classId) {
        this.$router.push({path: '/blog?classId=' + classId});
      },


      //取消收藏或者点赞
      cancelLikeCollect: function (blogId) {
        let param = {
          blogId: blogId,
          status: 0
        };
        //1喜欢列表 2收藏列表
        if (this.like === 1) {
          like(param).then((res) => {
            if (this.GLOBAL.isResponseSuccess(res)) {
              this.pageNum = 1;
              this.$message({
                message: "取消点赞成功",
                type: 'success'
              });
              this.showLikeCollectList();
            }
          });
        } else if (this.like === 2) {
          collect(param).then((res) => {
            if (this.GLOBAL.isResponseSuccess(res)) {
              this.pageNum = 1;
              this.$message({
                message: "取消收藏成功",
                type: 'success'
              });
              this.showLikeCollectList();
            }
          });
        }

      },

      //展示数据
      showLikeCollectList: function () {
        //1喜欢列表 2收藏列表
        this.like = this.$route.query.like === undefined ? 1 : parseInt(this.$route.query.like);
        let param = {
          classId: this.$route.query.classId === undefined ? null : this.$route.query.classId,
          title: this.$store.state.keywords,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        };

        if (this.like === 1) {
          getLikeBlogList(param).then((res) => {
            if (this.GLOBAL.isResponseSuccess(res)) {
              this.list = res.data.list;
              this.total = res.data.total;
            }
          });
        } else if (this.like === 2) {
          getCollectBlogList(param).then((res) => {
            if (this.GLOBAL.isResponseSuccess(res)) {
              this.list = res.data.list;
              this.total = res.data.total;
            }
          });
        }

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

      routeChange: function () {
        this.showLikeCollectList();
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
