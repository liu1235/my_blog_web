<!-- 留言评论模块 -->
<template>
  <div class="tMsgBox" ref="tMsgBox">
    <div class="msg-respond" ref="respondBox">
      <h3>发表评论
        <small v-show="isRespond" class="tcolorm" @click="removeRespond">取消回复</small>
      </h3>
      <form class="">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="说点什么呢``"
          v-model="content">
        </el-input>
        <div :class="pBody?'OwO':'OwO OwO-open'">
          <div class="OwO-logo" @click="pBody=!pBody">
            <span>OwO表情</span>
          </div>
          <div class="OwO-body">
            <ul class="OwO-items OwO-items-show">
              <li class="OwO-item" v-for="(item, index) in OwOList"
                  :key="'item' + index"
                  @click="choseEmoji(item.title)">
                <img :src="'/static/img/emot/image/' + item.url" alt="">
              </li>
            </ul>
            <div class="OwO-bar">
              <ul class="OwO-packages">
                <li class="OwO-package-active">Emoji</li>
              </ul>
            </div>
          </div>
        </div>
        <el-row class="msg-r-info">
          <el-col :span="24" class="info-submit">
            <p class="colors-bg" @click="sendMsg">{{sendTip}}</p>
          </el-col>
        </el-row>
      </form>
    </div>
    <div class="msg-comments" ref="listDom">
      <a href="#" class="msg-comments-tip">活捉 {{count}} 条</a>
      <div class="msg-commentShow">
        <ul class="msg-commentList">
          <li class="msg-c-item" v-for="(item,index) in commentList" :key="'comment'+index">
            <article class="">
              <header>
                <img :src="(item == null || item.headPhoto == null) ? $store.state.errorImg : item.headPhoto"
                     :onerror="$store.state.errorImg" alt="">
                <div class="i-name">
                  {{item.userName}}
                </div>
                <div class="i-class" v-for="(label,index) in item.labels" :key="'label'+index">
                  {{label}}
                </div>
                <div class="i-time">
                  <time>{{item.createTime}}</time>
                </div>
              </header>
              <section>
                <p v-html="analyzeEmoji(item.content)"></p>
                <div v-if="hasLogin" class="msg-replay" @click="respondMsg(item)">
                  回复
                </div>
              </section>
            </article>
            <reply-tree v-if="item != null && item.child !== null" :nodes="item.child"></reply-tree>
          </li>
        </ul>
        <h1 v-show='hasMore' class="colors-bg" @click="addMoreFun">查看更多</h1>
        <h1 v-show='!hasMore' class="colors-bg">没有更多</h1>
      </div>
    </div>
  </div>
</template>

<script>
  import {addComment, addReply, getCommentList} from '../api/api.js';
  import ReplyTree from '@/components/replyTree.vue';

  export default {
    data() { //选项 / 数据
      return {
        isRespond: false,
        content: '',//文本框输入内容
        pBody: true,//表情打开控制
        commentList: [],//评论列表数据
        count: 0, //评论回复数
        pageNum: 1, //当前页码
        pageSize: 10,//页数
        hasMore: true,
        hasLogin: false,
        commentType: 0,//回复评论的当前的commentId
        replyId: null,//回复评论的一级commentId
        replyObj: null,//选中回复的评论对象
        sendTip: '发送~',
        OwOList: [//表情包和表情路径
          {'title': '微笑', 'url': 'weixiao.gif'},
          {'title': '嘻嘻', 'url': 'xixi.gif'},
          {'title': '哈哈', 'url': 'haha.gif'},
          {'title': '可爱', 'url': 'keai.gif'},
          {'title': '可怜', 'url': 'kelian.gif'},
          {'title': '挖鼻', 'url': 'wabi.gif'},
          {'title': '吃惊', 'url': 'chijing.gif'},
          {'title': '害羞', 'url': 'haixiu.gif'},
          {'title': '挤眼', 'url': 'jiyan.gif'},
          {'title': '闭嘴', 'url': 'bizui.gif'},
          {'title': '鄙视', 'url': 'bishi.gif'},
          {'title': '爱你', 'url': 'aini.gif'},
          {'title': '泪', 'url': 'lei.gif'},
          {'title': '偷笑', 'url': 'touxiao.gif'},
          {'title': '亲亲', 'url': 'qinqin.gif'},
          {'title': '生病', 'url': 'shengbing.gif'},
          {'title': '太开心', 'url': 'taikaixin.gif'},
          {'title': '白眼', 'url': 'baiyan.gif'},
          {'title': '右哼哼', 'url': 'youhengheng.gif'},
          {'title': '左哼哼', 'url': 'zuohengheng.gif'},
          {'title': '嘘', 'url': 'xu.gif'},
          {'title': '衰', 'url': 'shuai.gif'},
          {'title': '吐', 'url': 'tu.gif'},
          {'title': '哈欠', 'url': 'haqian.gif'},
          {'title': '抱抱', 'url': 'baobao.gif'},
          {'title': '怒', 'url': 'nu.gif'},
          {'title': '疑问', 'url': 'yiwen.gif'},
          {'title': '馋嘴', 'url': 'chanzui.gif'},
          {'title': '拜拜', 'url': 'baibai.gif'},
          {'title': '思考', 'url': 'sikao.gif'},
          {'title': '汗', 'url': 'han.gif'},
          {'title': '困', 'url': 'kun.gif'},
          {'title': '睡', 'url': 'shui.gif'},
          {'title': '钱', 'url': 'qian.gif'},
          {'title': '失望', 'url': 'shiwang.gif'},
          {'title': '酷', 'url': 'ku.gif'},
          {'title': '色', 'url': 'se.gif'},
          {'title': '哼', 'url': 'heng.gif'},
          {'title': '鼓掌', 'url': 'guzhang.gif'},
          {'title': '晕', 'url': 'yun.gif'},
          {'title': '悲伤', 'url': 'beishang.gif'},
          {'title': '抓狂', 'url': 'zhuakuang.gif'},
          {'title': '黑线', 'url': 'heixian.gif'},
          {'title': '阴险', 'url': 'yinxian.gif'},
          {'title': '怒骂', 'url': 'numa.gif'},
          {'title': '互粉', 'url': 'hufen.gif'},
          {'title': '书呆子', 'url': 'shudaizi.gif'},
          {'title': '愤怒', 'url': 'fennu.gif'},
          {'title': '感冒', 'url': 'ganmao.gif'},
          {'title': '心', 'url': 'xin.gif'},
          {'title': '伤心', 'url': 'shangxin.gif'},
          {'title': '猪', 'url': 'zhu.gif'},
          {'title': '熊猫', 'url': 'xiongmao.gif'},
          {'title': '兔子', 'url': 'tuzi.gif'},
          {'title': '喔克', 'url': 'ok.gif'},
          {'title': '耶', 'url': 'ye.gif'},
          {'title': '棒棒', 'url': 'good.gif'},
          {'title': '不', 'url': 'no.gif'},
          {'title': '赞', 'url': 'zan.gif'},
          {'title': '来', 'url': 'lai.gif'},
          {'title': '弱', 'url': 'ruo.gif'},
          {'title': '草泥马', 'url': 'caonima.gif'},
          {'title': '神马', 'url': 'shenma.gif'},
          {'title': '囧', 'url': 'jiong.gif'},
          {'title': '浮云', 'url': 'fuyun.gif'},
          {'title': '给力', 'url': 'geili.gif'},
          {'title': '围观', 'url': 'weiguan.gif'},
          {'title': '威武', 'url': 'weiwu.gif'},
          {'title': '话筒', 'url': 'huatong.gif'},
          {'title': '蜡烛', 'url': 'lazhu.gif'},
          {'title': '蛋糕', 'url': 'dangao.gif'},
          {'title': '发红包', 'url': 'fahongbao.gif'}
        ]
      }
    },
    methods: { //事件处理器

      //选择表情包
      choseEmoji: function (inner) {
        this.content += '[' + inner + ']';
      },

      //编译表情替换成图片展示出来
      analyzeEmoji: function (cont) {
        let pattern1 = /\[[\u4e00-\u9fa5]+\]/g;
        let pattern2 = /\[[\u4e00-\u9fa5]+\]/;
        let content = cont.match(pattern1);
        let str = cont;
        let src;
        if (content) {
          for (let i = 0; i < content.length; i++) {
            for (let j = 0; j < this.OwOList.length; j++) {
              if ("[" + this.OwOList[j].title + "]" === content[i]) {
                src = this.OwOList[j].url;
                break;
              }
            }
            str = str.replace(pattern2, '<img src="static/img/emot/image/' + src + '" alt="" />');
          }
        }
        return str;
      },

      //发送留言/评论
      sendMsg: function () {
        if (this.content) {
          //是否是回复（回复是存在父id）
          let replyId = this.replyId;
          if (replyId != null) {
            //判断当前用户是否登录
            this.hasLogin = !!localStorage.getItem('userInfo');
            if (this.hasLogin) {
              //replyId为-1时即对评论进行回复
              if (replyId === -1) {
                let params = {
                  commentId: this.replyObj.id,
                  replyType: 1,
                  replyId: this.replyObj.id,
                  content: this.content,
                  toUserId: this.replyObj.userId,
                };
                console.log("reply.....对评论进行回复.....");
                this.reply(params);
              } else {
                let params = {
                  commentId: this.replyObj.commentId,
                  replyType: 2,
                  replyId: this.replyObj.id,
                  content: this.content,
                  toUserId: this.replyObj.fromUserId,
                };
                console.log("reply.....对回复进行回复.....");
                this.reply(params);
              }
              this.removeRespond();
            } else {
              this.$confirm('登录后即可发表评论，是否前往登录页面?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {//确定，跳转至登录页面
                //储存当前页面路径，登录成功后跳回来
                localStorage.setItem('returnUrl', this.$route.fullPath);
                this.$router.push({path: '/login?loginStatus=1'});
              });
            }
          } else {
            this.add();
            console.log("add.....添加评论.....")
          }

          this.replyId = null;
        } else {
          let that = this;
          that.sendTip = '内容不能为空~';
          let timer = setTimeout(function () {
            that.sendTip = '发送~';
            clearTimeout(timer);
          }, 3000)
        }
      },

      //新增评论
      add() {
        let params = {
          blogId: this.$route.query.bid === undefined ? null : parseInt(this.$route.query.bid),
          commentType: this.commentType,
          content: this.content
        };
        addComment(params).then((res) => {
          if (this.GLOBAL.isResponseSuccess(res)) {
            this.sendTip = '咻~~';
            this.content = '';
            this.commentList = [];
            this.showCommentList();
          }
        });
      },

      //新增回复
      reply(params) {
        addReply(params).then((res) => {
          if (this.GLOBAL.isResponseSuccess(res)) {
            this.content = '';
            this.sendTip = '发送~~';
            this.commentList = [];
            this.showCommentList();
          }
        });
      },


      //打开回复留言
      respondMsg: function (replyObj) {
        //判断当前用户是否登录
        this.hasLogin = !!localStorage.getItem('userInfo');
        if (this.hasLogin) {
          let dom = event.currentTarget;
          dom = dom.parentNode;
          this.isRespond = true;
          this.replyId = replyObj.replyId;
          this.replyObj = replyObj;
          this.replyObj.child = null;
          this.content = '';
          this.sendTip = '回复~';
          dom.appendChild(this.$refs.respondBox);
        } else {
          this.$confirm('登录后即可点赞和收藏，是否前往登录页面?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {//确定，跳转至登录页面
            //储存当前页面路径，登录成功后跳回来
            localStorage.setItem('returnUrl', this.$route.fullPath);
            this.$router.push({path: '/login?loginStatus=1'});
          }).catch(() => {

          });
        }
      },

      //取消回复留言
      removeRespond: function () {
        this.isRespond = false;
        this.replyId = null;
        this.content = '';
        this.$refs.tMsgBox.insertBefore(this.$refs.respondBox, this.$refs.listDom);
      },

      //查看更多
      addMoreFun: function () {
        this.pageNum += 1;
        this.showCommentList();
      },

      //评论列表
      showCommentList: function () {
        let params = {
          blogId: this.$route.query.bid === undefined ? null : parseInt(this.$route.query.bid),
          type: this.commentType,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        getCommentList(params).then((res) => {
          if (this.GLOBAL.isResponseSuccess(res)) {
            let msg = res.data;
            if (msg != null && msg.detail != null) {
              this.count = msg.count;
              this.hasMore = ((msg.pageNum * msg.pageSize) < msg.total);
              this.commentList = this.commentList.concat(msg.detail.list);
            } else {
              this.hasMore = false;
              this.commentList = [];
            }
          }
        });

      },

    },

    components: { //定义组件
      ReplyTree
    },

    //生命周期函数
    created() {
      //（1：博客评论 2：友情链接 3：留言板 4：关于我）
      if (this.$route.name === 'Detail') {//文章列表的评论
        this.commentType = 1;
      } else if (this.$route.name === 'FriendsLink') {
        this.commentType = 2
      } else if (this.$route.name === 'Message') {
        this.commentType = 3
      } else if (this.$route.name === 'About') {
        this.commentType = 4
      } else if (this.$route.name === 'Reward') {
        this.commentType = 5
      }
      this.hasLogin = !!localStorage.getItem('userInfo');
      this.showCommentList();
    },
    mounted() {//页面加载完成后

    }
  }
</script>

<style>
  .tMsgBox {
    position: relative;
    background: #fff;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 5px;
  }

  .msg-respond h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .msg-respond h3 small {
    font-size: smaller;
    cursor: pointer;
  }

  .msg-respond textarea {
    background: #f4f6f7;
    height: 100px;
    margin-bottom: 10px;
  }

  .OwO {
    position: relative;
    z-index: 1;
  }

  .OwO .OwO-logo {
    position: relative;
    border-radius: 4px;
    color: #444;
    display: inline-block;
    background: #fff;
    border: 1px solid #ddd;
    font-size: 13px;
    padding: 0 6px;
    cursor: pointer;
    height: 30px;
    box-sizing: border-box;
    z-index: 2;
    line-height: 30px;
  }

  .OwO .OwO-logo:hover {
    animation: a 5s infinite ease-in-out;
    -webkit-animation: a 5s infinite ease-in-out;
  }

  .OwO .OwO-body {
    position: absolute;
    background: #fff;
    border: 1px solid #ddd;
    z-index: 1;
    top: 29px;
    border-radius: 0 4px 4px 4px;
    display: none;
  }

  .OwO-open .OwO-body {
    display: block;
  }

  .OwO-open .OwO-logo {
    border-radius: 4px 4px 0 0;
    border-bottom: none;
  }

  .OwO-open .OwO-logo:hover {
    animation: none;
    -webkit-animation: none;
  }

  .OwO .OwO-items {
    max-height: 197px;
    overflow: scroll;
    font-size: 0;
    padding: 10px;
    z-index: 1
  }

  .OwO .OwO-items .OwO-item {
    background: #f7f7f7;
    padding: 5px 10px;
    border-radius: 5px;
    display: inline-block;
    margin: 0 10px 12px 0;
    transition: 0.3s;
    line-height: 19px;
    font-size: 20px;
    cursor: pointer;
  }

  .OwO .OwO-items .OwO-item:hover {
    background: #eee;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14),
    0 3px 1px -2px rgba(0, 0, 0, .2),
    0 1px 5px 0 rgba(0, 0, 0, .12);
    animation: a 5s infinite ease-in-out;
    -webkit-animation: a 5s infinite ease-in-out;
  }

  .OwO .OwO-body .OwO-bar {
    width: 100%;
    height: 30px;
    border-top: 1px solid #ddd;
    background: #fff;
    border-radius: 0 0 4px 4px;
    color: #444;
  }

  .OwO .OwO-body .OwO-bar .OwO-packages li {
    display: inline-block;
    line-height: 30px;
    font-size: 14px;
    padding: 0 10px;
    cursor: pointer;
    margin-right: 3px;
    text-align: center;
  }

  .OwO .OwO-body .OwO-bar .OwO-packages li:first-of-type {
    border-radius: 0 0 0 3px;
  }

  @-webkit-keyframes a {
    2% {
      -webkit-transform: translateY(1.5px) rotate(1.5deg);
      transform: translateY(1.5px) rotate(1.5deg)
    }
    4% {
      -webkit-transform: translateY(-1.5px) rotate(-.5deg);
      transform: translateY(-1.5px) rotate(-.5deg)
    }
    6% {
      -webkit-transform: translateY(1.5px) rotate(-1.5deg);
      transform: translateY(1.5px) rotate(-1.5deg)
    }
    8% {
      -webkit-transform: translateY(-1.5px) rotate(-1.5deg);
      transform: translateY(-1.5px) rotate(-1.5deg)
    }
    10% {
      -webkit-transform: translateY(2.5px) rotate(1.5deg);
      transform: translateY(2.5px) rotate(1.5deg)
    }
    12% {
      -webkit-transform: translateY(-.5px) rotate(1.5deg);
      transform: translateY(-.5px) rotate(1.5deg)
    }
    14% {
      -webkit-transform: translateY(-1.5px) rotate(1.5deg);
      transform: translateY(-1.5px) rotate(1.5deg)
    }
    16% {
      -webkit-transform: translateY(-.5px) rotate(-1.5deg);
      transform: translateY(-.5px) rotate(-1.5deg)
    }
    18% {
      -webkit-transform: translateY(.5px) rotate(-1.5deg);
      transform: translateY(.5px) rotate(-1.5deg)
    }
    20% {
      -webkit-transform: translateY(-1.5px) rotate(2.5deg);
      transform: translateY(-1.5px) rotate(2.5deg)
    }
    22% {
      -webkit-transform: translateY(.5px) rotate(-1.5deg);
      transform: translateY(.5px) rotate(-1.5deg)
    }
    24% {
      -webkit-transform: translateY(1.5px) rotate(1.5deg);
      transform: translateY(1.5px) rotate(1.5deg)
    }
    26% {
      -webkit-transform: translateY(.5px) rotate(.5deg);
      transform: translateY(.5px) rotate(.5deg)
    }
    28% {
      -webkit-transform: translateY(.5px) rotate(1.5deg);
      transform: translateY(.5px) rotate(1.5deg)
    }
    30% {
      -webkit-transform: translateY(-.5px) rotate(2.5deg);
      transform: translateY(-.5px) rotate(2.5deg)
    }
    32%, 34% {
      -webkit-transform: translateY(1.5px) rotate(-.5deg);
      transform: translateY(1.5px) rotate(-.5deg)
    }
    36% {
      -webkit-transform: translateY(-1.5px) rotate(2.5deg);
      transform: translateY(-1.5px) rotate(2.5deg)
    }
    38% {
      -webkit-transform: translateY(1.5px) rotate(-1.5deg);
      transform: translateY(1.5px) rotate(-1.5deg)
    }
    40% {
      -webkit-transform: translateY(-.5px) rotate(2.5deg);
      transform: translateY(-.5px) rotate(2.5deg)
    }
    42% {
      -webkit-transform: translateY(2.5px) rotate(-1.5deg);
      transform: translateY(2.5px) rotate(-1.5deg)
    }
    44% {
      -webkit-transform: translateY(1.5px) rotate(.5deg);
      transform: translateY(1.5px) rotate(.5deg)
    }
    46% {
      -webkit-transform: translateY(-1.5px) rotate(2.5deg);
      transform: translateY(-1.5px) rotate(2.5deg)
    }
    48% {
      -webkit-transform: translateY(-.5px) rotate(.5deg);
      transform: translateY(-.5px) rotate(.5deg)
    }
    50% {
      -webkit-transform: translateY(.5px) rotate(.5deg);
      transform: translateY(.5px) rotate(.5deg)
    }
    52% {
      -webkit-transform: translateY(2.5px) rotate(2.5deg);
      transform: translateY(2.5px) rotate(2.5deg)
    }
    54% {
      -webkit-transform: translateY(-1.5px) rotate(1.5deg);
      transform: translateY(-1.5px) rotate(1.5deg)
    }
    56% {
      -webkit-transform: translateY(2.5px) rotate(2.5deg);
      transform: translateY(2.5px) rotate(2.5deg)
    }
    58% {
      -webkit-transform: translateY(.5px) rotate(2.5deg);
      transform: translateY(.5px) rotate(2.5deg)
    }
    60% {
      -webkit-transform: translateY(2.5px) rotate(2.5deg);
      transform: translateY(2.5px) rotate(2.5deg)
    }
    62% {
      -webkit-transform: translateY(-.5px) rotate(2.5deg);
      transform: translateY(-.5px) rotate(2.5deg)
    }
    64% {
      -webkit-transform: translateY(-.5px) rotate(1.5deg);
      transform: translateY(-.5px) rotate(1.5deg)
    }
    66% {
      -webkit-transform: translateY(1.5px) rotate(-.5deg);
      transform: translateY(1.5px) rotate(-.5deg)
    }
    68% {
      -webkit-transform: translateY(-1.5px) rotate(-.5deg);
      transform: translateY(-1.5px) rotate(-.5deg)
    }
    70% {
      -webkit-transform: translateY(1.5px) rotate(.5deg);
      transform: translateY(1.5px) rotate(.5deg)
    }
    72% {
      -webkit-transform: translateY(2.5px) rotate(1.5deg);
      transform: translateY(2.5px) rotate(1.5deg)
    }
    74% {
      -webkit-transform: translateY(-.5px) rotate(.5deg);
      transform: translateY(-.5px) rotate(.5deg)
    }
    76% {
      -webkit-transform: translateY(-.5px) rotate(2.5deg);
      transform: translateY(-.5px) rotate(2.5deg)
    }
    78% {
      -webkit-transform: translateY(-.5px) rotate(1.5deg);
      transform: translateY(-.5px) rotate(1.5deg)
    }
    80% {
      -webkit-transform: translateY(1.5px) rotate(1.5deg);
      transform: translateY(1.5px) rotate(1.5deg)
    }
    82% {
      -webkit-transform: translateY(-.5px) rotate(.5deg);
      transform: translateY(-.5px) rotate(.5deg)
    }
    84% {
      -webkit-transform: translateY(1.5px) rotate(2.5deg);
      transform: translateY(1.5px) rotate(2.5deg)
    }
    86% {
      -webkit-transform: translateY(-1.5px) rotate(-1.5deg);
      transform: translateY(-1.5px) rotate(-1.5deg)
    }
    88% {
      -webkit-transform: translateY(-.5px) rotate(2.5deg);
      transform: translateY(-.5px) rotate(2.5deg)
    }
    90% {
      -webkit-transform: translateY(2.5px) rotate(-.5deg);
      transform: translateY(2.5px) rotate(-.5deg)
    }
    92% {
      -webkit-transform: translateY(.5px) rotate(-.5deg);
      transform: translateY(.5px) rotate(-.5deg)
    }
    94% {
      -webkit-transform: translateY(2.5px) rotate(.5deg);
      transform: translateY(2.5px) rotate(.5deg)
    }
    96% {
      -webkit-transform: translateY(-.5px) rotate(1.5deg);
      transform: translateY(-.5px) rotate(1.5deg)
    }
    98% {
      -webkit-transform: translateY(-1.5px) rotate(-.5deg);
      transform: translateY(-1.5px) rotate(-.5deg)
    }
    0%, to {
      -webkit-transform: translate(0) rotate(0deg);
      transform: translate(0) rotate(0deg)
    }
  }

  @keyframes a {
    2% {
      -webkit-transform: translateY(1.5px) rotate(1.5deg);
      transform: translateY(1.5px) rotate(1.5deg)
    }
    4% {
      -webkit-transform: translateY(-1.5px) rotate(-.5deg);
      transform: translateY(-1.5px) rotate(-.5deg)
    }
    6% {
      -webkit-transform: translateY(1.5px) rotate(-1.5deg);
      transform: translateY(1.5px) rotate(-1.5deg)
    }
    8% {
      -webkit-transform: translateY(-1.5px) rotate(-1.5deg);
      transform: translateY(-1.5px) rotate(-1.5deg)
    }
    10% {
      -webkit-transform: translateY(2.5px) rotate(1.5deg);
      transform: translateY(2.5px) rotate(1.5deg)
    }
    12% {
      -webkit-transform: translateY(-.5px) rotate(1.5deg);
      transform: translateY(-.5px) rotate(1.5deg)
    }
    14% {
      -webkit-transform: translateY(-1.5px) rotate(1.5deg);
      transform: translateY(-1.5px) rotate(1.5deg)
    }
    16% {
      -webkit-transform: translateY(-.5px) rotate(-1.5deg);
      transform: translateY(-.5px) rotate(-1.5deg)
    }
    18% {
      -webkit-transform: translateY(.5px) rotate(-1.5deg);
      transform: translateY(.5px) rotate(-1.5deg)
    }
    20% {
      -webkit-transform: translateY(-1.5px) rotate(2.5deg);
      transform: translateY(-1.5px) rotate(2.5deg)
    }
    22% {
      -webkit-transform: translateY(.5px) rotate(-1.5deg);
      transform: translateY(.5px) rotate(-1.5deg)
    }
    24% {
      -webkit-transform: translateY(1.5px) rotate(1.5deg);
      transform: translateY(1.5px) rotate(1.5deg)
    }
    26% {
      -webkit-transform: translateY(.5px) rotate(.5deg);
      transform: translateY(.5px) rotate(.5deg)
    }
    28% {
      -webkit-transform: translateY(.5px) rotate(1.5deg);
      transform: translateY(.5px) rotate(1.5deg)
    }
    30% {
      -webkit-transform: translateY(-.5px) rotate(2.5deg);
      transform: translateY(-.5px) rotate(2.5deg)
    }
    32%, 34% {
      -webkit-transform: translateY(1.5px) rotate(-.5deg);
      transform: translateY(1.5px) rotate(-.5deg)
    }
    36% {
      -webkit-transform: translateY(-1.5px) rotate(2.5deg);
      transform: translateY(-1.5px) rotate(2.5deg)
    }
    38% {
      -webkit-transform: translateY(1.5px) rotate(-1.5deg);
      transform: translateY(1.5px) rotate(-1.5deg)
    }
    40% {
      -webkit-transform: translateY(-.5px) rotate(2.5deg);
      transform: translateY(-.5px) rotate(2.5deg)
    }
    42% {
      -webkit-transform: translateY(2.5px) rotate(-1.5deg);
      transform: translateY(2.5px) rotate(-1.5deg)
    }
    44% {
      -webkit-transform: translateY(1.5px) rotate(.5deg);
      transform: translateY(1.5px) rotate(.5deg)
    }
    46% {
      -webkit-transform: translateY(-1.5px) rotate(2.5deg);
      transform: translateY(-1.5px) rotate(2.5deg)
    }
    48% {
      -webkit-transform: translateY(-.5px) rotate(.5deg);
      transform: translateY(-.5px) rotate(.5deg)
    }
    50% {
      -webkit-transform: translateY(.5px) rotate(.5deg);
      transform: translateY(.5px) rotate(.5deg)
    }
    52% {
      -webkit-transform: translateY(2.5px) rotate(2.5deg);
      transform: translateY(2.5px) rotate(2.5deg)
    }
    54% {
      -webkit-transform: translateY(-1.5px) rotate(1.5deg);
      transform: translateY(-1.5px) rotate(1.5deg)
    }
    56% {
      -webkit-transform: translateY(2.5px) rotate(2.5deg);
      transform: translateY(2.5px) rotate(2.5deg)
    }
    58% {
      -webkit-transform: translateY(.5px) rotate(2.5deg);
      transform: translateY(.5px) rotate(2.5deg)
    }
    60% {
      -webkit-transform: translateY(2.5px) rotate(2.5deg);
      transform: translateY(2.5px) rotate(2.5deg)
    }
    62% {
      -webkit-transform: translateY(-.5px) rotate(2.5deg);
      transform: translateY(-.5px) rotate(2.5deg)
    }
    64% {
      -webkit-transform: translateY(-.5px) rotate(1.5deg);
      transform: translateY(-.5px) rotate(1.5deg)
    }
    66% {
      -webkit-transform: translateY(1.5px) rotate(-.5deg);
      transform: translateY(1.5px) rotate(-.5deg)
    }
    68% {
      -webkit-transform: translateY(-1.5px) rotate(-.5deg);
      transform: translateY(-1.5px) rotate(-.5deg)
    }
    70% {
      -webkit-transform: translateY(1.5px) rotate(.5deg);
      transform: translateY(1.5px) rotate(.5deg)
    }
    72% {
      -webkit-transform: translateY(2.5px) rotate(1.5deg);
      transform: translateY(2.5px) rotate(1.5deg)
    }
    74% {
      -webkit-transform: translateY(-.5px) rotate(.5deg);
      transform: translateY(-.5px) rotate(.5deg)
    }
    76% {
      -webkit-transform: translateY(-.5px) rotate(2.5deg);
      transform: translateY(-.5px) rotate(2.5deg)
    }
    78% {
      -webkit-transform: translateY(-.5px) rotate(1.5deg);
      transform: translateY(-.5px) rotate(1.5deg)
    }
    80% {
      -webkit-transform: translateY(1.5px) rotate(1.5deg);
      transform: translateY(1.5px) rotate(1.5deg)
    }
    82% {
      -webkit-transform: translateY(-.5px) rotate(.5deg);
      transform: translateY(-.5px) rotate(.5deg)
    }
    84% {
      -webkit-transform: translateY(1.5px) rotate(2.5deg);
      transform: translateY(1.5px) rotate(2.5deg)
    }
    86% {
      -webkit-transform: translateY(-1.5px) rotate(-1.5deg);
      transform: translateY(-1.5px) rotate(-1.5deg)
    }
    88% {
      -webkit-transform: translateY(-.5px) rotate(2.5deg);
      transform: translateY(-.5px) rotate(2.5deg)
    }
    90% {
      -webkit-transform: translateY(2.5px) rotate(-.5deg);
      transform: translateY(2.5px) rotate(-.5deg)
    }
    92% {
      -webkit-transform: translateY(.5px) rotate(-.5deg);
      transform: translateY(.5px) rotate(-.5deg)
    }
    94% {
      -webkit-transform: translateY(2.5px) rotate(.5deg);
      transform: translateY(2.5px) rotate(.5deg)
    }
    96% {
      -webkit-transform: translateY(-.5px) rotate(1.5deg);
      transform: translateY(-.5px) rotate(1.5deg)
    }
    98% {
      -webkit-transform: translateY(-1.5px) rotate(-.5deg);
      transform: translateY(-1.5px) rotate(-.5deg)
    }
    0%, to {
      -webkit-transform: translate(0) rotate(0deg);
      transform: translate(0) rotate(0deg)
    }
  }

  /*用户输入表单*/
  .msg-r-info {
    margin: 10px 0;
  }

  .msg-r-info input {
    height: 30px;
    border-radius: 4px;
    background: #f4f6f7;
  }

  .msg-r-info .info-submit {
    margin: 10px 0;
    text-align: center;
  }

  .msg-r-info .info-submit p, .msg-commentShow h1 {
    /*background: #97dffd;*/
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    /*transition: all .3s ease-in-out;*/
    height: 30px;
    line-height: 30px;
    text-align: center;
  }

  /*.msg-r-info .info-submit p:hover{
      background: #47456d;
  }*/
  /*评论列表*/
  .msg-comments .msg-comments-tip {
    display: block;
    border-left: 2px solid #363d4c;
    padding: 0 10px;
    margin: 40px 0;
    font-size: 20px;
  }

  .msg-commentList {
    margin-bottom: 20px;

  }

  .msg-commentShow > .msg-commentList {
    border-bottom: 1px solid #e5eaed;
  }

  .msg-c-item {
    border-top: 1px solid #e5eaed;
  }

  .msg-c-item article {
    margin: 20px 0;
  }

  .msg-c-item article header {
    margin-bottom: 10px;
  }

  .msg-c-item article header img {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    float: left;
    transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    margin-right: 15px;
    object-fit: cover;
  }

  .msg-c-item article header img:hover {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }

  .msg-c-item article header .i-name {
    font-size: 14px;
    margin: 5px 8px 7px 0;
    color: #444;
    font-weight: bold;
    display: inline-block;
  }

  .msg-c-item article header .i-class {
    display: inline-block;
    margin-left: 10px;
    background: #dff0d8;
    color: #3c763d;
    border-radius: 5px;
    padding: 3px 6px;
    font-size: 12px;
    font-weight: 400;
  }

  .msg-c-item article header .i-time {
    color: #aaa;
    font-size: 12px;
  }

  .msg-c-item article section {
    margin-left: 80px;
  }

  .msg-c-item article section p img {
    vertical-align: middle;
  }

  .msg-c-item article section .msg-replay {
    margin: 10px 0;
    font-size: 12px;
    color: #64609E;
    cursor: pointer;
  }

</style>
