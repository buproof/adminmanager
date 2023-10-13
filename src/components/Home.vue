<template>
  <div class="home">
    <el-container class="content">
      <!-- 传递菜单是否折叠的参数数据 -->
      <Menu :isCollapse="isCollapse" :aside_width="aside_width" />
      <el-container>
        <Header @doCollapse="doCollapse" :iconType="iconType" />
        <el-main>
          <Bread />
          <div class="cont">
            <router-view></router-view>
          </div>
        </el-main>
        <el-footer><Footer /></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "./common/Header.vue";
import Footer from "./common/Footer.vue";
import Menu from "./common/Menu.vue";
import Bread from "./common/Breadcrumb.vue";

export default {
  components: {
    Header,
    Footer,
    Menu,
    Bread,
  },
  name: "Home",
  data() {
    return {
      isCollapse: false,
      iconType: "el-icon-s-fold",
      aside_width: "200px",
    };
  },
  methods: {
    doCollapse() {
      this.isCollapse = !this.isCollapse;
      if (!this.isCollapse) {
        //展开
        this.aside_width = "200px";
        this.iconType = "el-icon-s-fold";
      } else {
        this.aside_width = "64px";
        this.iconType = "el-icon-s-unfold";
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.home {
  width: 100%;
  height: 100%;
  .content {
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    .cont {
      margin: 20px 0;
    }
  }
}
</style>
