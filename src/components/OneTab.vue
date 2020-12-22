<template>
    <div class="one-tab-wrapper" ref="oneTab">
        <div class="tab-item"
             v-for="(item, i) in menuList"
             :key="item.id"
             :class="{active: index === i}"
             @touchend="scrollTo(i, $event)"
             @touchstart="move = false"
             @touchmove="move = true"
        >
            <div class="img-wrapper">
                <img :src="item.imgUrl">
            </div>
            <div class="tab-title">{{item.title}}</div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      move: false,
      index: 0,
      menuList: [
        {
          id: 1,
          title: '阿萨德是',
          imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2507842556,4039720334&fm=26&gp=0.jpg',
        },
        {
          id: 2,
          title: '阿萨德是',
          imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2507842556,4039720334&fm=26&gp=0.jpg',
        },
        {
          id: 3,
          title: '阿萨德是',
          imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2507842556,4039720334&fm=26&gp=0.jpg',
        },
        {
          id: 4,
          title: '阿萨德是',
          imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2507842556,4039720334&fm=26&gp=0.jpg',
        },
        {
          id: 5,
          title: '阿萨德是',
          imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2507842556,4039720334&fm=26&gp=0.jpg',
        },
        {
          id: 6,
          title: '阿萨德是',
          imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2507842556,4039720334&fm=26&gp=0.jpg',
        },
        {
          id: 7,
          title: '阿萨德是',
          imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2507842556,4039720334&fm=26&gp=0.jpg',
        },
        {
          id: 8,
          title: '阿萨德',
          imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2507842556,4039720334&fm=26&gp=0.jpg',
        },
        {
          id: 9,
          title: '阿萨德',
          imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2507842556,4039720334&fm=26&gp=0.jpg',
        },
        {
          id: 10,
          title: '阿萨德',
          imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2507842556,4039720334&fm=26&gp=0.jpg',
        },
      ],
    };
  },
  methods: {
    scrollTo(i, e) {
      if (this.move) {
        return;
      }
      this.index = i;
      // 计算移动的距离
      const { oneTab } = this.$refs;
      const itemWidth = e.target.offsetWidth;
      const itemLeft = e.target.getBoundingClientRect().left;
      const wrapperWidth = oneTab.offsetWidth;
      this.moveTo(oneTab.scrollLeft, itemWidth / 2 + itemLeft - wrapperWidth / 2);
      // 获取侧边栏数据
    },
    moveTo(start, end) {
      let dis = 0;
      let speed = 5;
      if (end < 0) {
        speed *= -1;
      }
      const t = setInterval(() => {
        dis += speed;
        this.$refs.oneTab.scrollLeft = start + dis;
        if (Math.abs(dis) > Math.abs(end)) {
          this.$refs.oneTab.scrollLeft = start + end;
          clearInterval(t);
        }
      }, 2);
    },
  },
};
</script>

<style lang="less" scoped>
.one-tab-wrapper {
    display: flex;
    overflow: auto;
    width: 375px;
    height: 104px;
    // border: 1px solid red;
    .tab-item{
        width: 50px;
        height: 70px;
        // border: 1px solid #f00;
        padding: 10px 5px;
        .img-wrapper {
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2px solid;
            border-color: #fff;
            border-radius: 23px;
            img {
                width: 45px;
                height: 45px;
                border-radius: 50%;
            }
        }
        .tab-title {
            text-align: center;
            font-size: 12px;
            margin-top: 5px;
        }
    }
    .active {
        .img-wrapper {
            border-color: #d13193;
        }
        .tab-title {
            color: #fff;
            background-color: #d13193;
            font-weight: bold;
            border-radius: 30px;
        }
    }
}
.one-tab-wrapper::-webkit-scrollbar {
    width: 0px;
    background: none;
}
</style>
