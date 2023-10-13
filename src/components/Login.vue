<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>通用后台管理系统</span>
      </div>
      <el-form label-width="80px" :model="form" ref="form" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 校验封装
import { nameRule, passRule } from "../utils/validate";
// token封装
import { setToken } from "@/utils/setToken.js";
// 接口请求封装
import { login } from "../api/api.js";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: nameRule, trigger: "blur" }],
        password: [{ validator: passRule, trigger: "blur" }],
      },
    };
  },
  methods: {
    login(form) {
      // 点击提交表单时，要判断输入是否都符合规则，符合后才能提交给服务端
      this.$refs[form].validate((valid) => {
        // 校验成功
        if (valid) {
          // 登录接口封装
          login(this.form).then((res) => {
            if (res.data.status === 200) {
              setToken("username", res.data.username);
              // 存入服务端返回的token
              setToken("token", res.data.token);
              this.$message({ message: res.data.message, type: "success" });
              this.$router.push("/home");
            } else {
              console.error(this.form);
            }
          });
        }
      });

      /* this.service.post("/login", this.form).then((res) => {
            if (res.data.status === 200) {
              setToken("username", res.data.username);
              setToken("token", res.data.token);
              this.$message({ message: res.data.message, type: "success" });
              this.$router.push("/home");
            } 
            console.log(res);
          }); */
    },
  },
};
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #3a95f0;
  .el-card {
    background: #65768557;
  }
  .box-card {
    // 块级元素水平居中
    width: 450px;
    margin: 200px auto;
    color: #fff;
    .el-form .el-form-item__label {
      color: #fff;
    }
    .el-button {
      width: 100%;
    }
    .el-card__header {
      font-size: 34px;
    }
  }
}
</style>