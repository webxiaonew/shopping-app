<template>
    <div class="classify-wrapper">
        <!-- 搜索 -->
        <div class="search-btn">
            <van-icon name="search" />
            桔子特价1元1斤
        </div>
        <!-- 一级导航 -->
        <one-tab></one-tab>
        <!-- 二级导航 -->
        <template v-if="showContent">
            <side-bar></side-bar>
            <goods-list></goods-list>
        </template>
        <van-loading size="2rem" vertical v-else />
    </div>
</template>
<script>
import OneTab from '@/components/OneTab.vue';
import SideBar from '@/components/SideBar.vue';
import GoodsList from '@/components/GoodsList.vue';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      showContent: (state) => state.showContent,
    }),
  },
  components: {
    OneTab,
    SideBar,
    GoodsList,
  },
};
</script>

<style lang="less" scoped>
.classify-wrapper {
    width: 375px;
    .search-btn {
        width: 355px;
        height: 33px;
        line-height: 33px;
        text-align: center;
        background-color: #eee;
        margin: 11px auto 0;
        border-radius: 10px;
        color: #a1a1a1;
        font-size: 14px;
    }
}
</style>
