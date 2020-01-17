<!-- 留言板 -->
<template>
  <div>
    <wbc-nav/>
    <div class="container">
      <el-row :gutter="30">
        <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
          <wbc-archive></wbc-archive>
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
  import temArchive from '../components/temArchive.vue'

  export default {
    name: 'Archive',
    data() { //选项 / 数据
      return {}
    },
    methods: { //事件处理器

    },
    components: { //定义组件
      'wbc-nav': header,
      'wbc-archive': temArchive,
      'wbc-rightList': temRightList,
      'wbc-footer': footer
    },
    created() { //生命周期函数

    }
  }
</script>

<style>

</style>
