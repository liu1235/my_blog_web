<!-- 文章列表 -->
<template>
  <div>
    <wbc-nav></wbc-nav>
    <div class="container">
      <el-row :gutter="30">
        <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
          <wbc-shareList></wbc-shareList>
        </el-col>
        <el-col :sm="24" :md="8">
          <wbc-rightList></wbc-rightList>
        </el-col>
      </el-row>
    </div>
    <wbc-footer></wbc-footer>
  </div>
</template>

<script>
  import header from '../components/header.vue'
  import footer from '../components/footer.vue'
  import temShareList from '../components/temShareList.vue'
  import temRightList from '../components/temRightList.vue'

  export default {
    name: "Share",
    data() { //选项 / 数据
      return {}
    },
    methods: { //事件处理器

    },
    components: { //定义组件
      'wbc-nav': header,
      'wbc-shareList': temShareList,
      'wbc-rightList': temRightList,
      'wbc-footer': footer
    },

    created() { //生命周期函数

    }
  }
</script>

<style>

</style>
