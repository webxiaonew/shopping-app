<template>
    <div class="sidebar-wrapper" ref="side">
        <div v-for="(item, i) in sideList"
            :key="item" :class="{active : index===i}"
            @touchend="scrollTo(i, $event)"
            @touchstart="move = false"
            @touchmove="move = true">
            {{i==0 ? '全部' : item}}
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import tool from '@/util/tool';

export default {
  data() {
    return {
      index: 0,
      move: false,
    };
  },
  computed: {
    ...mapState({
      sideList: (state) => state.sideList,
    }),
  },
  methods: {
    ...mapMutations(['resetGoodsList']),
    ...mapActions(['getGoodsList']),
    scrollTo(i, e) {
      if (this.move) {
        console.log(11111111);
        return;
      }
      this.index = i;
      // 计算移动的距离
      const { side } = this.$refs;
      const sonTop = e.target.getBoundingClientRect().top;
      const sonHeight = e.target.offsetHeight;
      const pTop = side.getBoundingClientRect().top;
      const pHeight = side.offsetHeight;
      tool.moveTo(
        side.scrollTop,
        sonTop + sonHeight / 2 - pTop - pHeight / 2,
        side,
        'scrollTop',
      );
      // 获取列表数据
      this.resetGoodsList();
      this.getGoodsList({
        type: this.sideList[i],
        sortType: 'all',
        page: 1,
      });
    },
  },
  mounted() {
    this.resetGoodsList();
    this.getGoodsList({
      type: this.sideList[0],
      sortType: 'all',
      page: 1,
    });
  },
};
</script>

<style lang="less" scoped>
.sidebar-wrapper {
  position: fixed;
  left: 0;
  width: 79px;
  top: 146px;
  bottom: 50px;
  overflow: auto;
  background: #f8f8f8;
  div {
    width: 79px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: relative;
  }
  .active {
    font-weight: bold;
    color: #ff1a90;
  }
  .active::before {
    content: "";
    position: absolute;
    width: 6px;
    height: 18px;
    background-color: #ff1a90;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
}
.sidebar-wrapper::-webkit-scrollbar {
  width: 0;
  background: none;
}
</style>
