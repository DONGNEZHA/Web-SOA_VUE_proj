<!--
 * @Author: your name
 * @Date: 2020-12-16 14:27:50
 * @LastEditTime: 2020-12-16 20:15:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \frontend\src\components\common\PlayMusic.vue
-->

<template>
  <div>
    <aplayer autoplay :music="currentMusic"> </aplayer>
  </div>
</template>
 
<script>
import axios from "axios";
import Aplayer from 'vue-aplayer'

export default {
  components: {
    //引入组件
    Aplayer,
  },

  data() {
    return {
      flag: false,
       id: this.$route.query.id,
      currentMusic: {
        title: this.$route.query.music_name,
        author: this.$route.query.ar_name,
        url: `https://music.163.com/song/media/outer/url?id=${this.$route.query.id}.mp3`,
        pic: null,
        lrc: "",
      },
     
    };
  },
  mounted() {
    this.getUrl();
    this.getLrc();
  },
  methods: {
    getLrc() {
      console.log(this.id);

      //这边是引入了axios然后使用的get请求的一个音乐列表接口
      axios({
        url: "https://autumnfish.cn/lyric",
        method: "get",
        params: {
          id: this.id,
        },
      }).then((res) => {
        // console.log(res)
        if (res === 200) {
          this.currentMusic.lrc = res.data.lrc.lyric;
          console.log(this.currentMusic.lrc);
        }
      });
    },
    getUrl() {
      axios({
        url: "https://autumnfish.cn/song/url?id=" + this.id,
        method: "get",
      }).then((res) => {
        // console.log(res)
        if (res === 200) {
          this.currentMusic.url = res.data.data[0].url;
          console.log(this.currentMusic.url);
        }
      });
    },
  },
};
</script>
 
<style scoped>
</style>
