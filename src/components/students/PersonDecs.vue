<template>
  <div class="person">
    <el-drawer title="个人详情" :visible.sync="drawer" :direction="direction">
      <!-- <el-table :data="rdata" border style="width: 100%">
        prop属性对应表格绑定的data里的键名
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="sex_text" label="性别" align="center">
        </el-table-column>
        <el-table-column prop="age" label="年龄" align="center">
        </el-table-column>
        <el-table-column prop="number" label="学号" align="center">
        </el-table-column>
        <el-table-column prop="class" label="班级" align="center">
        </el-table-column>
        <el-table-column prop="address" label="地址" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="联系方式" align="center">
        </el-table-column>
      </el-table> -->
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="rdata"
      >
        <el-form-item label="姓名">
          <el-input v-model="rdata.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="rdata.sex_text"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="rdata.age"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="rdata.number"></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="rdata.class"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="rdata.address"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="rdata.phone"></el-input>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { students } from "@/api/api";
import { mapGetters } from "vuex";
export default {
  name: "PersonDecs",
  data() {
    return {
      drawer: false,
      direction: "rtl",
      labelPosition: "right",
    };
  },
  computed: {
    // vuex读取数据
    ...mapGetters({ rdata: "getData" }),
  },
  // methods: {
  //   handleClose(done) {
  //     this.$confirm("确认关闭？")
  //       .then(() => {
  //         done();
  //       })
  //       .catch(() => {});
  //   },
  // },
  created() {
    students().then((res) => {
      if (res.data.status === 200) {
        this.tableData;
      }
    });
  },
};
</script>

<style style="scss">
</style>