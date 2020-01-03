<!-- 赞赏页面 -->
<template>
  <div>
    <wbc-nav/>
    <div class="container">
      <el-row :gutter="30">
        <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
          <wbc-reward></wbc-reward>
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
  import temReward from '../components/temReward.vue'
  import temMessage from '../components/temMessage.vue'

  export default {
    name: 'Reward',
    data() { //选项 / 数据
      return {}
    },
    methods: { //事件处理器

    },
    components: { //定义组件
      'wbc-nav': header,
      'wbc-message': temMessage,
      'wbc-reward': temReward,
      'wbc-rightList': temRightList,
      'wbc-footer': footer
    },
    created() { //生命周期函数

    }
  }
</script>

<style>

</style>
