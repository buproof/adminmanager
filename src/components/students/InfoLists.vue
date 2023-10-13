<template>
  <div class="infoMent">
    <el-form :inline="true" class="demo-form-inline" size="small">
      <el-form-item>
        <el-button type="primary" @click="addStudent">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <!-- prop属性对应表格绑定的data里的键名 -->
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center">
      </el-table-column>
      <el-table-column prop="sex_text" label="性别" align="center">
      </el-table-column>
      <el-table-column prop="father" label="父亲" align="center">
      </el-table-column>
      <el-table-column prop="mather" label="母亲" align="center">
      </el-table-column>
      <el-table-column prop="time" label="入校时间" align="center">
      </el-table-column>
      <el-table-column prop="address" label="家庭住址" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <!-- 用slot-scope来获取行 scope.row -->
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-edit"
            @click="edit(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="del(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="state ? '添加学生信息' : '修改学生信息'"
      :visible.sync="dialogFormVisible"
      @close="handleClose"
      width="500px"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <!-- label表示选中的值，v-model表示绑定的JS变量 -->
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="父亲姓名"
          :label-width="formLabelWidth"
          prop="father"
        >
          <el-input v-model="form.father" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="母亲姓名"
          :label-width="formLabelWidth"
          prop="mather"
        >
          <el-input v-model="form.mather" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="家庭住址"
          :label-width="formLabelWidth"
          prop="address"
        >
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="入校时间"
          :label-width="formLabelWidth"
          prop="time"
        >
          <!-- 日期格式化 -->
          <!-- 使用`format`指定输入框的格式；使用`value-format`指定绑定值的格式 -->
          <el-date-picker
            v-model="form.time"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="联系方式"
          :label-width="formLabelWidth"
          prop="phone"
        >
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose('form')">取 消</el-button>
        <el-button type="primary" @click="sure('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { info, getInfo, updateInfo, delInfo } from "@/api/api.js";
import { getInfo, delInfo } from "@/api/api.js";
import { getData, changeInfo } from "@/utils/table.js";
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: "",
        sex: "1",
        age: "",
        father: "",
        mather: "",
        address: "",
        time: "",
        phone: "",
      },
      formLabelWidth: "80px",
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        sex: [{ required: true }],
        age: [{ required: true, message: "请输入年龄" }],
        address: [{ required: true, message: "请输入家庭住址" }],
        time: [{ required: true, message: "请选择入学时间" }],
        phone: [{ required: true, message: "请输入联系方式" }],
      },
      total: 0,
      state: true,
    };
  },
  methods: {
    getData() {
      getInfo().then((res) => {
        if (res.data.status === 200) {
          this.tableData = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    addStudent() {
      // 先重置表单属性为空
      this.form = {
        name: "",
        sex: "1",
        age: "",
        father: "",
        mather: "",
        address: "",
        time: "",
        phone: "",
      };
      this.dialogFormVisible = true;
      this.state = true;
    },
    edit(row) {
      console.log(row);
      // 不直接修改表单里的值，扩展后重新得到一个对象
      this.form = { ...row };
      this.dialogFormVisible = true;
      this.state = false;
    },
    del(row) {
      console.log(row.id);
      this.$confirm("你确定要删除此行数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delInfo(row.id).then((res) => {
            if (res.data.status === 200) {
              this.getData();
              this.$message({ message: res.data.message, type: "success" });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    sure(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.state) {
            // root, method, url, form, callback
            changeInfo(this, "post", "/info", this.form, getData);
          } else {
            // 修改数据
            changeInfo(this, "put", "/info", this.form, getData);
          }
        }
      });
    },
    // Dialog 关闭的回调，还没关闭
    handleClose(form) {
      this.$refs[form].resetFields();
      this.dialogFormVisible = false;
    },
  },
  created() {
    getData(this, "/info");
  },
};
</script>

<style lang="scss">
.infoMent {
  .demo-form-inline,
  .el-form {
    text-align: left;
  }
}
</style>