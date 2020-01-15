<!-- 关于我 -->
<template>
  <div>
    <wbc-nav/>
    <div class="container">
      <el-row :gutter="30">
        <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
          <wbc-about/>
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
  import temAbout from '../components/temAbout.vue'
  import temMessage from '../components/temMessage.vue'

  export default {
    name: 'AboutMe',
    components: { //定义组件
      'wbc-nav': header,
      'wbc-message': temMessage,
      'wbc-about': temAbout,
      'wbc-rightList': temRightList,
      'wbc-footer': footer
    },
  }
</script>

<style>

</style>
