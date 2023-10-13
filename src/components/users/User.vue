<template>
  <div class="user">
    <el-tree
      :data="menus"
      show-checkbox
      node-key="name"
      ref="tree"
      :props="defaultProps"
    >
    </el-tree>
    <el-button @click="getCheckedNodes">通过node获取</el-button>
  </div>
</template>

<script>
/* 
  权限管理和动态路由的思路：
      根据不同的用户登录上来，返回对应的路由权限菜单
      
      一般可以通过树形控件达到权限的精准控制，根据不同角色，勾选不同的菜单权限，
      将菜单数据提交给后端进行保存
      
      后端保存后，在用户进行登录的时候就会查询该用户或该角色所拥有的菜单数据，
      最终进行动态地渲染展示。

      动态添加路由使用router.addRoute进行动态路由渲染
*/

export default {
  data() {
    return {
      menus: [],
      defaultProps: {
        // 节点标签
        label: "name",
        children: "children",
      },
    };
  },
  created() {
    this.menus = [...this.$router.options.routes];
  },
  methods: {
    // 返回目前被选中的节点所组成的数组
    getCheckedNodes() {
      let arr = this.$refs.tree.getCheckedNodes();
      console.log(arr);
    },
  },
};
</script>

<style>
</style>