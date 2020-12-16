<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <!-- 封面 -->
        <img :src="playlist.coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <!-- 名字 -->
        <p class="title">{{ playlist.name }}</p>
        <div class="author-wrap">
          <!-- 头像 -->
          <img class="avatar" :src="playlist.creator.avatarUrl" alt="" />
          <span class="name">{{ playlist.creator.nickname }}/</span>
          <span class="time">{{ playlist.createTime }} 创建</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <!-- 分类标签 -->
          <ul>
            <li v-for="(item, index) in playlist.tags" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <!-- 简介 -->
          <span class="desc">
            {{ playlist.description }}
          </span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
        <table class="el-table playlit-table">
          <thead>
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              class="el-table__row"
              v-for="(item, index) in playlist.tracks"
              :key="index"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="img-wrap" @click="PlayMusicComponent(item.id,item.ar[0].name,item.name)">
                  <img :src="item.al.picUrl + '?param=130y130'" alt="" />
                  <span class="iconfont icon-play"></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <!-- 名称 -->
                    <span>{{ item.name }}</span>
                    <!-- mv图标 -->
                    <span
                      v-if="item.mv !== 0"
                      class="iconfont icon-mv"
                      @click="toMv(item.mv)"
                    ></span>
                  </div>
                </div>
              </td>
              <td>{{ item.ar[0].name }}</td>
              <td>{{ item.al.name }}</td>
              <td>{{ item.dt | playTimeFormat }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="评论(66)" name="2">
        <!-- 精彩评论 -->
        <div class="comment-wrap">
          <p class="title">
            精彩评论
            <span class="number">({{ hotCount }})</span>
          </p>
          <div class="comments-wrap">
            <!-- 评论 -->
            <div v-for="(item, index) in hotComment" :key="index" class="item">
              <div class="icon-wrap">
                <!-- 头像 -->
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <!-- 昵称 -->
                  <span class="name">{{ item.user.nickname }}:</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <!-- 评论的回复 -->
                <div class="re-content" v-if="item.beReplied.length != 0">
                  <span class="name"
                    >{{ item.beReplied[0].user.nickname }}：</span
                  >
                  <span class="comment">{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">2020-02-12 17:26:11</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">
            最新评论
            <span class="number">( {{ total }} )</span>
          </p>
          <div class="comments-wrap">
            <div class="item" v-for="(item, index) in comments" :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ item.user.nickname }}：</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <div class="re-content" v-if="item.beReplied.length != 0">
                  <span class="name"
                    >{{ item.beReplied[0].user.nickname }}：</span
                  >
                  <span class="comment">{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">2020-02-12 17:26:11</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
    <!-- PlayBar -->
    <!-- <play-bar :visible="visible" :id="currentSongId"></play-bar> -->
  </div>
</template>

<script>
// 导入 axios
import axios from "axios";
// import PlayBar from "../../components/common/PlayBar";
import PlayMusic from "../../components/common/PlayMusic";
export default {
  name: "playlist",
  components: {
    // PlayBar,
    PlayMusic,
  },
  data() {
    return {
      activeIndex: "1",
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // 歌单详情数据
      // tracks 歌曲列表
      playlist: {},
      // 热门评论
      hotComment: [],
      // 热门评论的个数
      hotCount: 0,
      // 普通评论
      comments: [],
      // 歌单列表
      playListTable: [],
      //
      ID: "0000",
      // 播放组件显示
      visible: false,
      // 当前播放歌曲的ID
      currentSongId: "0000",
    };
  },
  created() {
    // 获取歌单详情
    axios({
      url: "https://autumnfish.cn/playlist/detail",
      method: "get",
      params: {
        id: this.$route.query.key,
      },
    }).then((res) => {
      // console.log(res)
      this.playlist = res.data.playlist;
    });
    // 获取 评论
    axios({
      url: "https://autumnfish.cn/comment/hot",
      method: "get",
      params: {
        id: this.$route.query.key,
        // 传递类型
        type: 2,
      },
    }).then((res) => {
      // console.log(res)
      this.hotComment = res.data.hotComments;
      // 保存个数
      this.hotCount = res.data.total;
    });

    // 获取 最新评论
    axios({
      url: "https://autumnfish.cn/comment/playlist",
      method: "get",
      params: {
        id: this.$route.query.key,
        limit: 10,
        offset: 0,
      },
    }).then((res) => {
      // console.log(res)
      // 总个数
      this.total = res.data.total;
      // 评论数据
      this.comments = res.data.comments;
    });
  },
  methods: {
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // 保存页码
      this.page = val;
      // 重新获取数据
      axios({
        url: "https://autumnfish.cn/comment/playlist",
        method: "get",
        params: {
          id: this.$route.query.key,
          limit: 10,
          // 根据页码计算
          offset: (this.page - 1) * 10,
        },
      }).then((res) => {
        // console.log(res)
        // 总个数
        this.total = res.data.total;
        // 评论数据
        this.comments = res.data.comments;
      });
    },
    // 播放组件
    PlayMusicComponent(id,ar_name,music_name) {
      this.$router.push({path:'/playmusic',query:{id:id,ar_name:ar_name,music_name:music_name}});
      // this.$router.push(`/play-list-detail/${id}`)
    },
    // 开始播放
    // playMusic(id) {
    //   console.log(id);
    //   axios({
    //     url: "https://autumnfish.cn/song/url?id=" + id,
    //     methods: "get",
    //   }).then((res) => {
    //     if (res.status === 200 && res.statusText === "OK") {
    //       console.log(res.data.data[0].id);
    //       // this.hotTags = res.data.tags;
    //       let audio = new Audio();
    //       audio.src = res.data.data[0].url;
    //       audio.play();
    //     }
    //   });
    // },
  },
};
</script>

<style></style>
