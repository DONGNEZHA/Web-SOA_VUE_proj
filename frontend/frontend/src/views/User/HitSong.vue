<!--
 * @Author: your name
 * @Date: 2020-11-30 19:45:11
 * @LastEditTime: 2020-12-16 08:53:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \frontend\src\views\User\HitSong.vue
-->
<template>
  <!-- <p>这里是歌单电台页面，需要填充基于网易云的歌单电台功能</p> -->
  <div class="HitSong">
    <div v-if="!isLoading">
      <!-- 标签栏 -->
      <tag-bar
        :mainTag="mainTag"
        :songSheetParams="songSheetParams"
        :hotTags="hotTags"
        :categoryType="categoryType"
        :videoPage="true"
        @switchHotTags="switchHotTags"
        @chooseType="chooseType"
        @transitionClick="transitionClick"
      >
      </tag-bar>
      <song-sheet-list :songSheetList="songSheetList"></song-sheet-list>
      <!-- 分页区域 -->
      <el-pagination
        :page-size="songSheetParams.limit"
        layout="total,prev,pager,next"
        :total="total"
      >
      </el-pagination>
    </div>
    <!--  -->
    <loading v-if="isLoading"></loading>
  </div>
</template>
<script>
// 导入 axios
import axios from "axios";
// 导入标签栏
import TagBar from "../../components/common/TagBar";
//歌单列表
import SongSheetList from "../../components/common/songSheetList";
//加载中。。。
import Loading from "../../components/common/Loading";
export default {
  name: "HitSong",
  components: {
    TagBar,
    SongSheetList,
    //Loading
  },

  data() {
    return {
      // 加载判断

      isLoading: false, //未完成
      //标签栏
      mainTag: "全部",
      hotTags: [],
      songSheetParams: {
        order: "hot",
        cat: "全部",
        limit: 40,
        offset: 0,
      },
      categoryType: [
        {
          key: 0,
          icon: "iconfont iconyuzhong",
          value: "语种",
          tags: null,
        },
        {
          key: 1,
          icon: "iconfont iconfengge",
          value: "风格",
          tags: null,
        },
        {
          key: 2,
          icon: "iconfont iconchangjing",
          value: "场景",
          tags: null,
        },
        {
          key: 3,
          icon: "iconfont iconqinggan",
          value: "情感",
          tags: null,
        },
        {
          key: 4,
          icon: "iconfont iconzhuti",
          value: "主题",
          tags: null,
        },
      ],

      // 歌单表
      songSheetList: [],
      // 分页部分
      total: 0,
      page: 1,
    };
  },

  methods: {
    // 弹窗点击事件
    transitionClick(tagName) {
      this.mainTag = tagName;
      this.songSheetParams.cat = tagName;
      // 请求数据
      this._getSongSheet();
    },
    currentChange(currentPage) {
      this.songSheetParams.offset = currentPage - 1;
      // 请求数据
      this._getSongSheet();
    },
    // 选择显示类型
    chooseType(type) {
      if (type === this.songSheetParams.order) {
        return;
      }
      this.songSheetParams.order = type;
      // 请求数据
      this._getSongSheet();
    },
    switchHotTags(tag) {
      this.songSheetParams.cat = tag.name;
      // 请求数据
      this._getSongSheet();
    },

    // 获取热门歌单分类
    _getHotSongSheet() {
      axios({
        url: "https://autumnfish.cn/playlist/hot",
        methods: "get",
      }).then((res) => {
        if (res.status === 200 && res.statusText === "OK") {
          //console.log(res);
          this.hotTags = res.data.tags;
        }
      });
    },
    // 获取歌单表 未完成只是全部歌单
    _getSongSheet() {
      axios({
        url: "https://autumnfish.cn/top/playlist/",
        methods: "get",
        params: this.songSheetParams,
      }).then((res) => {
        if (res.status === 200 && res.statusText === "OK") {
          // console.log(res)
          // 保存总条数
          this.total = res.data.total;
          // 保存数据
          this.songSheetList = res.data.playlists;
        }
      });
    },
    // 获取歌单分类，例如：华语、流行。。。
    _getSongSheetCategory() {
      axios({
        url: "https://autumnfish.cn//playlist/catlist",
        methods: "get",
      }).then((res) => {
        if (res.status === 200 && res.statusText === "OK") {
          //console.log(res);
          this.category(res.data.sub, 5);
        }
      });
    },
    // 将获取到的全部歌单进行分类
    category(sub, count) {
      for (let i = 0; i < count; i++) {
        let itemArr = [];
        for (let j = 0; j < sub.length; j++) {
          if (sub[j].category === i) {
            itemArr.push(sub[j]);
          }
        }
        this.categoryType[i].tags = itemArr;
      }
    },
  },

  created() {
    // 获取歌单，默认全部
    this._getSongSheet();
    // 获取全部歌单分类
    this._getSongSheetCategory();
    // 获取热门歌单分类
    this._getHotSongSheet();
  },
};
</script>
<style>
</style>