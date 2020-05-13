<!-- 关于我 -->
<template>
  <div class="commonBox">
    <header>
      <h1>
        <a href="/detail" target="_blank">
          关于我
        </a>
      </h1>
    </header>
    <section>
      <p class="">
        <img src="static/img/maoto.png" alt=""
             onerror="'static/img/maoto.png'" class="aboutImg">
      </p>
      <p>&nbsp; &nbsp; &nbsp; &nbsp;
        欢迎来到我的博客！我是
        <i><b>liuzw</b></i>，是一个JAVA程序猿，喜欢各种有趣的事物</p>
      <p></p>
      <p>&nbsp; &nbsp; &nbsp; &nbsp;爱美食，爱看电影，爱听歌和打游戏，当然不能少了代码。</p>

      <p>&nbsp; &nbsp; &nbsp;&nbsp; ==========================</p>
      <p>&nbsp; &nbsp; &nbsp; &nbsp;
        <i>
          <a target="_blank" href="https://github.com/liu1235">Github</a>&nbsp; &nbsp; &nbsp;&nbsp;
          <a target="_blank" href="">Resume</a>&nbsp; &nbsp;
          <a target="_blank" href="">CSDN</a>
        </i>
      </p>
      <p>
        <i>&nbsp; &nbsp; &nbsp; &nbsp;
          <a target="_blank" href="/static/img/wechat.jpg">微信</a>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <a target="_blank" href="">公众号</a>&nbsp; &nbsp; &nbsp;&nbsp;
        </i>
        <i>&nbsp;
          <a target="_blank" href="/static/img/QQ.jpg">QQ</a>
        </i>
      </p>
      <p>&nbsp; &nbsp; &nbsp;&nbsp;</p>
    </section>
  </div>
</template>

<script>
  export default {
    data() { //选项 / 数据
      return {}
    },
    methods: { //事件处理器

    },
    components: { //定义组件

    },
    created() { //生命周期函数

    }
  }
</script>

<style>
  .aboutImg {
    max-width: 100%;
    /*height:300px;*/
  }

  .commonBox p a {
    color: #01AAED !important;
  }

  .commonBox p a:hover {
    color: #48456d !important;
  }

  .commonBox p i {
    font-style: italic;
  }

  .commonBox p b {
    font-weight: bold;
  }
</style>
