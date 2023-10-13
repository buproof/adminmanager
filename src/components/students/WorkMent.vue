<template>
  <div class="workMent">
    <!-- v-loading 加载数据时显示动效   绑定布尔值 -->
    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
      <!-- prop属性对应表格绑定的data里的键名 -->
      <el-table-column prop="id" label="用户ID" align="center">
      </el-table-column>
      <el-table-column prop="userId" label="所属班级" align="center">
      </el-table-column>
      <el-table-column prop="title" label="作业名称" align="center">
      </el-table-column>
      <el-table-column prop="completed_text" label="完成情况" align="center">
      </el-table-column>
    </el-table>
    <Pageing :total="total" :url="url" />
  </div>
</template>

<script>
import Pageing from "../common/Pageing.vue";
export default {
  components: { Pageing },
  data() {
    return {
      tableData: [],
      total: 0,
      loading: true,
      url: "/works",
    };
  },
};
</script>

<style lang="scss">
.workMent {
  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>