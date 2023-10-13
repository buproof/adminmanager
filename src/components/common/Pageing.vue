<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 10, 20, 50, 100]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :url="url"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getTableData } from "@/utils/table.js";

export default {
  data() {
    return {
      page: 1,
      size: 10,
    };
  },
  props: {
    url: String,
    total: Number,
  },
  created() {
    getTableData(this.$parent, "/works", { page: this.page, size: this.size }, [
      "completed",
    ]);
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.size = val;
      this.page = 1;
      // 重新请求表格，才能生效
      getTableData(
        this.$parent,
        "/works",
        { page: this.page, size: this.size },
        ["completed"]
      );
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      // 重新请求表格，才能生效
      getTableData(
        this.$parent,
        "/works",
        { page: this.page, size: this.size },
        ["completed"]
      );
    },
  },
};
</script>

<style>
</style>