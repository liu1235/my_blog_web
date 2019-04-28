<!-- 关于我 -->
<template>
  <div class="commonBox">
    <header>
      <h1>
        <a href="/detailShare" target="_blank">
          关于我
        </a>
      </h1>
    </header>
    <section>
      <p class="">
        <img :src="this.$store.state.aboutMeObj.image?this.$store.state.aboutMeObj.image:'static/img/maoto.png'" alt=""
             onerror="this.onerror=null;this.src= 'static/img/maoto.png'" class="aboutImg">
      </p>
      <p v-html="this.$store.state.aboutMeObj.brief">{{this.$store.state.aboutMeObj.brief}}</p>
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
