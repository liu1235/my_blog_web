<!-- 留言模块 -->
<template>
  <div class="archive">
    <section>
      <h2 style="">总共有{{list.length}}条</h2>
      <el-timeline>
        <div>
          <el-timeline-item
            v-for="(item, index) in list"
            :key="index"
            :placement="item.id !== null ? 'top' : ''"
            :timestamp="item.id !== null ? showInitDate(item.createDate,'month') + '月' + showInitDate(item.createDate,'date') + '日' : ''">
            <header>
              <el-card v-if="item.id !== null">
                <h3>
                  <a :href="'/#/detail?bid=' + item.id" target="_blank">
                    {{item.title}}
                  </a>
                </h3>
                <p>
                  {{item.description}}
                </p>
                <div class="viewDetail">
                  <a class="colors-bg" :href="'/#/detail?bid=' + item.id" target="_blank">
                    阅读全文
                  </a>
                </div>
              </el-card>
              <h1 v-else>
                {{item.createDate}}
              </h1>
            </header>
          </el-timeline-item>
        </div>

      </el-timeline>
    </section>
  </div>
</template>

<script>

  import {initDate} from '../utils/server.js'
  import {getBlogArchiveList} from '../api/api.js'

  export default {
    data() { //选项 / 数据
      return {
        list: [] //归档数据
      }
    },
    methods: { //事件处理器
      showInitDate: function (oldDate, full) {
        return initDate(oldDate, full)
      },

      //获取归档数据
      getArchiveList() {
        getBlogArchiveList().then((res) => {
          if (this.GLOBAL.isResponseSuccess(res)) {
            this.list = res.data;
          }
        })
      }
    },

    watch: {},

    components: { //定义组件

    },
    created() { //生命周期函数
      this.getArchiveList();
    }
  }
</script>

<style>

  .archive {
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
    position: relative;
    background: #fff;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 40px;
    font-size: 15px;
  }


  .archive section {
    margin: 15px 0 0 10px;
  }

  .archive section h2 {
    font-weight: bold;
    line-height: 24px;
    margin: 0 0 20px 0;
  }

  .archive header h1 {

    font-size: 25px;
    font-weight: 700;
    line-height: 30px;
  }

  .archive header h3 {
    margin: 0 0 10px 0;
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
  }

   .viewDetail {
    margin: 10px 0;
    line-height: 24px;
    text-align: right;
  }

   .viewDetail a {
    color: #fff;
    font-size: 12px;
    padding: 5px 10px;
    border-radius: 5px;
  }

</style>
