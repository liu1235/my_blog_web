<!-- 文章详情 -->
<template>
  <div>
    <wbc-nav/>
    <div class="container" id="detail">
      <el-row :gutter="30">
        <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
          <wbc-detail/>
          <wbc-message :key="timer"/>
        </el-col>
        <el-col :sm="24" :md="8">
          <wbc-rightList/>
        </el-col>
      </el-row>
    </div>
    <wbc-footer/>
  </div>
</template>

<script>
  import header from '../components/header.vue'
  import footer from '../components/footer.vue'
  import temRightList from '../components/temRightList.vue'
  import temDetail from '../components/temDetail.vue'
  import temMessage from '../components/temMessage.vue'

  export default {
    name: 'Detail',
    data() { //选项 / 数据
      return {
        isMobile: false,
        timer:'',
      }
    },
    methods: { //事件处理器
      load() {
        if (this.isMobile) {
          //重新调用子组件方法 移动端点击详情时 评论不会重新加载

          this.timer = new Date().getTime()
        }
      }
    },
    components: { //定义组件
      'wbc-nav': header,
      'wbc-detail': temDetail,
      'wbc-message': temMessage,
      'wbc-rightList': temRightList,
      'wbc-footer': footer
    },

    watch: {
      '$route': 'load'
    },

    created() { //生命周期函数
      //判断是否是移动端
      this.isMobile = (/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i).test(navigator.userAgent);
    },

    mounted() {

    }
  }
</script>

<style>

</style>
