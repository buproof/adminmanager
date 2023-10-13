<template>
  <div class="menu">
    <el-aside :width="aside_width">
      <!--router 是否使用 vue-router 的模式,
        启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
      <el-menu
        router
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#2578b5"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <el-menu-item index="/home">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <!-- template是为了在v-for内部写v-if，无法写在同一标签上 -->
        <template v-for="(item, index) in menus">
          <el-submenu :index="item.path" :key="index" v-if="!item.hidden">
            <template slot="title">
              <i :class="item.iconClass"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group
              v-for="(child, index) in item.children"
              :key="index"
            >
              <el-menu-item :index="child.path">
                <i :class="child.iconClass"></i>
                {{ child.name }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [],
    };
  },
  // 接受父组件传来的数据
  props: {
    isCollapse: Boolean,
    aside_width: String,
  },
  created() {
    // this.$router.options.routes返回的是路由组件数组[{},{},{},..]
    this.menus = [...this.$router.options.routes];
    console.log(this.menus);
  },
};
</script>

<style lang="scss">
.menu {
  .el-aside {
    height: 100%;
    display: flex;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
    .el-menu {
      height: 100%;
      border: 0;
      .fa {
        margin-right: 10px;
      }
    }
    .el-submenu .el-menu-item {
      // 宽度小于min-width时，出现滚动条
      min-width: 0;
    }
  }
}
</style>