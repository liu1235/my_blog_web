<!-- 文章详情 -->
<template>
  <div>
    <wbc-nav/>
    <div class="container" id="detail">
      <el-row :gutter="30">
        <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
          <wbc-detail/>
          <wbc-message/>
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
    name: 'DetailShare',
    data() { //选项 / 数据
      return {}
    },
    methods: { //事件处理器

    },
    components: { //定义组件
      'wbc-nav': header,
      'wbc-detail': temDetail,
      'wbc-message': temMessage,
      'wbc-rightList': temRightList,
      'wbc-footer': footer
    },
    created() { //生命周期函数

    },
    mounted() {
      let anchor = document.querySelector("#detail");
      let top = anchor.offsetTop - 60;
      document.body.scrollTop = top;
      document.documentElement.scrollTop = top;
      window.pageYOffset = top;
    }
  }
</script>

<style>

</style>
