<!-- 留言模块 -->
<template>
  <div class="archive commonBox">
    <section>
      <h2 style="margin: 0 0 20px 0">总共有</h2>
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in list"
          :key="index"
          size="large">
          <header>
            <div class="post-meta">
              <time class="post-time">
                {{showInitDate(item.createDate,'month') + '-' + showInitDate(item.createDate,'date')}}
              </time>
            </div>
            <h2>
              <a  :href="'/detail?bid=' + item.id">
                <span> {{item.content}}</span>
              </a>
            </h2>
          </header>
        </el-timeline-item>
      </el-timeline>
    </section>
  </div>
</template>

<script>

  import {initDate} from '../utils/server.js'

  export default {
    data() { //选项 / 数据
      return {
        list: [{
          content: '支持使用图标',
          createDate: '2018-04-12 20:46',
        }, {
          content: '支持自定义颜色',
          createDate: '2018-04-03 20:46',
        }, {
          content: '支持自定义尺寸',
          createDate: '2018-04-03 20:46',
        }, {
          content: '默认样式的节点',
          createDate: '2018-04-03 20:46'
        }]
      }
    },
    methods: { //事件处理器
      showInitDate: function (oldDate, full) {
        return initDate(oldDate, full)
      },
    },

    watch: {},

    components: { //定义组件

    },
    created() { //生命周期函数

    }
  }
</script>

<style>

  .archive {

  }

  .archive section {
    margin: 15px 0 0 100px;
  }

  .archive section h2 {
    font-weight: bold;
    line-height: 24px;
  }

  .post-meta {
    position: absolute;
    font-size: 12px;
    top: 5px;
  }

  .post-meta {
    position: absolute;
    font-size: 12px;
    top: 5px;
  }

  .post-meta .post-time {
    color: #00a7e0;
  }
</style>
