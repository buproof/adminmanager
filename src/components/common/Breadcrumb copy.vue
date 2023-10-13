<template>
  <div>
    <el-card>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <!-- $router.matched得到匹配路由的所有路由记录[{一级路由},{二级路由},..{当前路由}] -->
        <el-breadcrumb-item
          v-for="(item, index) in $route.matched"
          :key="index"
          >{{ item.name }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
};
</script>

<style>
</style>