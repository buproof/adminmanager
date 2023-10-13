<template>
  <div class="workList">
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
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 10, 20, 50, 100]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getTableData } from "@/utils/table.js";
export default {
  data() {
    return {
      tableData: [],
      page: 1,
      size: 10,
      total: 0,
      loading: true,
    };
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.size = val;
      this.page = 1;
      // 重新请求表格，才能生效
      getTableData(this, "/works", { page: this.page, size: this.size }, [
        "completed",
      ]);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      // 重新请求表格，才能生效
      getTableData(this, "/works", { page: this.page, size: this.size }, [
        "completed",
      ]);
    },
  },
  created() {
    // 后端分页
    // root, url, params, arr    arr为需要转化的属性组成的数组，比如性别(1/2) true/false类型的
    getTableData(this, "/works", { page: this.page, size: this.size }, [
      "completed",
    ]);
  },
};
</script>

<style lang="scss">
.workList {
  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>