<template>
    <div class="search-wrapper">
        <!-- 搜索header -->
        <div class="search-header">
            <van-icon name="arrow-left" class="arr-left" @click="$router.goBack()"/>
            <van-search v-model="value"
                        show-action
                        :placeholder="plece"
                        @search="onSearch"
                        @input="input"
                        @focus="focus"
                        class="search-content"
            >
                <template #action v-if="showList">
                    <div @touchend="onSearch(value)">搜索</div>
                </template>
                <template #action v-else>
                    <van-icon name="cart-o"
                              id="shop-car"
                              class="shop-car"
                              :badge="badge"
                              @click="$router.push('/home/shopping')"
                    />
                </template>
            </van-search>
        </div>
        <!-- 关键字模糊搜索 -->
        <div class="like-search" v-if="likeList.length <=0 && showList">
            <van-list>
                <van-cell v-for="item in likeList" :key="item" @click="onSearch(item)">
                    <template>
                        <span class="custom-title" v-html="formatHTML(item)"></span>
                    </template>
                </van-cell>
            </van-list>
        </div>
        <!-- 商品列表 -->
        <div class="goods-list" v-if="!showList">
            <van-list v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    :immediate-check='false'
            >
                <goods-card v-for="(item,index) in goodsList"
                            :key="index"
                            v-bind="item"
                            :num="counterMap[item.id]"
                >
                </goods-card>
            </van-list>
        </div>
        <!-- 历史记录 -->
        <div class="my-history" v-if="likeList.length <=0 && showList">
            <my-history :searchList="searchList" @search="onSearch"></my-history>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import GoodsCard from '@/components/GoodsCard.vue';
import MyHistory from '@/components/MyHistory.vue';

export default {
  data() {
    return {
      plece: '酒',
      value: this.plece,
      likeList: [],
      timer: null,
      loading: false,
      finished: false,
      page: 1,
      size: 5,
      goodsList: [],
      showList: true,
      total: 0,
      searchList: [],
    };
  },
  components: {
    GoodsCard,
    MyHistory,
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    badge() {
      const count = Object.values(this.counterMap).reduce((prev, next) => prev + next, 0);
      if (count > 99) {
        return '99+';
      }
      return count;
    },
  },
  methods: {
    async onLoad() {
      console.log(this.value);
      const value = await this.$api.search(this.value, this.page, this.size);
      this.goodsList = [...this.goodsList, ...value.list];
      this.total = value.total;
      this.loading = false;
      console.log(this.goodsList);
      if (this.goodsList.length >= this.total) {
        this.finished = true;
      } else {
        this.page += 1;
        // this.loading = true;
      }
    },
    onSearch(value) {
      if (value) {
        this.value = value;
      } else {
        this.value = this.plece;
      }
      // 将搜索记录添加缓存并处理
      const result = this.searchList.find((item) => item.value === this.searchList.value);
      if (result) {
        result.time = new Date().getTime();
        this.searchList.sort((a, b) => b.time - a.time);
      } else {
        this.searchList.unshift({ value: this.value, time: new Date().getTime() });
        if (this.searchList.length >= 11) {
          this.searchList.pop();
        }
      }
      localStorage.setItem('searchList', JSON.stringify(this.searchList));

      // 初始化
      this.likeList = [];
      this.goodsList = [];
      this.page = 1;
      this.finished = false;
      this.loading = false;
      // 调用加载数据函数
      this.onLoad();
      this.showList = false;
    },
    async input() {
      // 防抖
      if (this.value === '') {
        this.likeList = [];
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      } else {
        this.timer = setTimeout(async () => {
          const value = await this.$api.likeSearch(this.value);
          this.likeList = value.result;
          clearTimeout(this.timer);
          this.timer = null;
        }, 300);
      }
    },
    focus() {
      this.showList = true;
    },
    formatHTML(item) {
      const reg = new RegExp(this.value, 'g');
      return item.replace(reg, this.value.fontcolor('red'));
    },
  },
  created() {
    this.searchList = JSON.parse(localStorage.getItem('searchList')) || [];
  },

};
</script>

<style lang="less" scoped>
.search-wrapper{
    width: 100%;
    height: 100vh;
    z-index: 10;
    background: #fff;
    .search-header{
        width: 345px;
        background: #fff;
        margin: 0 auto;
        display: flex;
        align-items: center;
        position: fixed;
        top:0;
        left: 15px;
        z-index: 22;
        .arr-left{
            font-size: 22px;
        }
        .search-content{
            flex: 1;
            .shop-car {
                font-size: 16px;
            }
        }
    }
    .like-search {
        position: relative;
        top: 50px;
        width: 100%;
        box-sizing: border-box;
        padding-left: 30px;
    }
    .goods-list {
        position: relative;
        width: 345px;
        margin: 48px auto 0;
        z-index: 10;
        background-color: #fff;
    }
    .my-history {
        width: 350px;
        position: absolute;
        top: 50px;
        left: 10px;
        z-index: 1;
    }
}

</style>
