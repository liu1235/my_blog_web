<template>
  <div>
    <ul class="msg-commentList" style="padding-left:60px;">
      <li class="msg-c-item" v-for="item in nodes" :key="'node' + item.id">
        <article class="">
          <header>
            <img :src="item.fromHeadPhoto" :onerror="$store.state.errorImg" alt=""/>
            <div class="i-name">
              {{item.fromUserName}} <span>回复</span> {{item.toUserName}}
            </div>
            <div class="i-class" v-for="(label,index) in item.labels" :key="'label'+ index">
              {{label}}
            </div>
            <div class="i-time">
              <time>{{item.createTime}}</time>
            </div>
          </header>
          <section>
            <p v-html="analyzeEmoji(item.content)"></p>
            <div v-show="hasLogin" class="msg-replay" @click="respondMsg(item)">
              回复
            </div>
          </section>
        </article>
        <reply-tree v-if="item != null && item.child !== null"
                    :nodes="item.child"></reply-tree>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'ReplyTree',
    props: {
      nodes: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        hasLogin: this.$parent.hasLogin
      }
    },

    methods: {
      //处理表情 调用父组件方法
      //编译表情替换成图片展示出来
      analyzeEmoji: function (cont) {
        return this.$parent.analyzeEmoji(cont);
      },

      //回复 调用父组件方法
      respondMsg(replyObj) {
        this.$parent.respondMsg(replyObj);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
