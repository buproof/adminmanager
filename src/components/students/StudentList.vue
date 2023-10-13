<template>
  <div class="studentList">
    <!-- 查询、重置 -->
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="small"
    >
      <el-form-item label="姓名">
        <el-input
          v-model="formInline.name"
          placeholder="请输入姓名查询"
          suffix-icon="el-icon-search"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="find">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
      <el-form-item>
        <download-excel
          class="export-excel-wrapper"
          :data="tableData"
          :fields="json_fields"
          :header="title"
          name="学生信息.xls"
        >
          <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
          <el-button type="primary" style="margin-right: 10px">导出</el-button>
        </download-excel>
      </el-form-item>
    </el-form>

    <!-- 前端分页：slice((当前页数-1)*每页条数, 当前页数*每页条数) -->
    <el-table
      :data="compData"
      ref="multipleTable"
      tooltip-effect="dark"
      border
      style="width: 100%"
      :header-cell-style="{ background: '#f2f5fc' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <!-- prop属性对应表格绑定的data里的键名 -->
      <el-table-column prop="name" label="姓名" align="center">
        <template slot-scope="scope">
          <span
            style="color: blue; cursor: pointer"
            @click="person(scope.row)"
            >{{ scope.row.name }}</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="sex_text" label="性别" align="center">
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center">
      </el-table-column>
      <el-table-column prop="number" label="学号" align="center">
      </el-table-column>
      <el-table-column prop="class" label="班级" align="center">
      </el-table-column>
      <el-table-column prop="state_text" label="状态" align="center">
      </el-table-column>
      <el-table-column prop="address" label="地址" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <!-- 删除行，用slot-scope来获取行scope.row -->
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="del(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 30, 69]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 抽屉组件显示单人信息 -->
    <PersonDecs ref="child"></PersonDecs>
  </div>
</template>

<script>
import PersonDecs from "./PersonDecs";
import { students, studentDel } from "@/api/api.js";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1, //当前页数
      pageSize: 10, //每页显示条数
      total: 0,
      formInline: {
        name: "",
      },
      multipleSelection: [],
      json_fields: {
        姓名: "name",
        学号: "number",
        班级: "class",
        联系方式: "phone",
      },
      title: "学生信息",
    };
  },
  components: { PersonDecs },
  created() {
    this.getData();
  },
  methods: {
    find() {
      students(this.formInline).then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          this.tableData = res.data.data;
          // 修改总条数
          this.total = res.data.data.length;
          this.tableData.forEach((item) => {
            // 尽量不修改原数据
            item.sex === 1 ? (item.sex_text = "男") : (item.sex_text = "女");
            item.state === "1"
              ? (item.state_text = "已入学")
              : item.state === "2"
              ? (item.state_text = "未入学")
              : (item.state_text = "休学中");
          });
        }
      });
    },
    reset() {
      this.formInline = {};
      this.getData(this.formInline);
    },
    getData(params) {
      // 列表数据获取接口请求
      students(params).then((res) => {
        if (res.data.status === 200) {
          this.tableData = res.data.data;
          this.total = res.data.total;
          this.tableData.forEach((item) => {
            // 尽量不修改原数据
            item.sex === 1 ? (item.sex_text = "男") : (item.sex_text = "女");
            item.state === "1"
              ? (item.state_text = "已入学")
              : item.state === "2"
              ? (item.state_text = "未入学")
              : (item.state_text = "休学中");
          });
        }
      });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    person(row) {
      this.$refs["child"].drawer = true;
      this.$store.commit("setData", { ...row });
    },
    del(row) {
      // 删除接口请求
      // 根据id删除
      studentDel(row.id).then((res) => {
        if (res.data.status === 200) {
          this.$message({ message: "删除数据成功", type: "success" });
          // 重新获取表格数据并渲染
          // 当删除的最后一页只有一条数据时，删除后，让页面转到它上一页或第一页
          if (this.total % this.pageSize === 1) {
            this.currentPage =
              this.currentPage - 1 > 0 ? this.currentPage - 1 : 1;
          }
          this.getData();
        }
      });
    },
  },
  computed: {
    compData() {
      // 前端分页：slice((当前页数-1)*每页条数, 当前页数*每页条数)
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
};
</script>

<style lang="scss">
.studentList {
  .demo-form-inline,
  .el-form {
    text-align: left;
  }
  .el-pagination {
    text-align: left;
    margin-top: 20px;
  }
}
</style>