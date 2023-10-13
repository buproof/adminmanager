<template>
  <div class="header">
    <el-header style="text-align: right; font-size: 12px">
      <div style="cursor: pointer">
        <i
          :class="iconType"
          style="font-size: 20px; margin-top: 20px"
          @click="changeCollapse"
        ></i>
      </div>
      <div>
        <span style="font-size: 28px; text-align: center"
          >通用后台管理系统</span
        >
      </div>
      <el-dropdown>
        <span>{{ name }}</span
        ><i class="el-icon-arrow-down" style="margin: auto 15px auto 5px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="toUser">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="outLogin">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
  </div>
</template>

<script>
import { getToken } from "@/utils/setToken.js";
export default {
  data() {
    return {
      name: "",
    };
  },
  props: ["iconType"],
  created() {
    this.name = getToken("username");
  },
  methods: {
    toUser() {
      // 编程式路由导航，实现路由跳转
      this.$router.push("/users/user");
    },
    outLogin() {
      this.$router.push("/login");
      // removeToken("username");
    },
    changeCollapse() {
      // 触发自定义事件
      this.$emit("doCollapse");
    },
  },
};
</script>

<style lang="scss">
.header {
  .el-header {
    background: #2578b5;
    color: #fff;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    .el-dropdown {
      color: #fff;
      font-size: 16px;
    }
  }
}
</style>