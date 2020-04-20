<template>
  <div class="login" @keyup.enter="submitForm('ruleForm')">
    <el-container>
      <el-header class="head">
        <img src="@/assets/images/logo.png" alt="" class="logo">
      </el-header>
      <el-main>
        <div class="mainBackground">
        </div>
        <div class="register">
          <div class="content">
            <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-width="50px" class="demo-ruleForm">
              <span style="font-size:16px"><b>账号登录</b></span>
              <el-form-item label="账号" prop="loginName" class="lbl">
                <el-input v-model="ruleForm.loginName" class="ipt"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" class="lbl">
                <el-input type="password" v-model="ruleForm.password" auto-complete="off" class="ipt"></el-input>
              </el-form-item>
              <el-form-item class="btu">
                <el-button type="info" @click="submitForm('ruleForm')">登录</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// import banner from "../assets/images/banner.jpg"
// import banner2 from "../assets/images/banner2.jpg"
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        loginName: '',
        password: '',
      },
      rules2: {
        loginName: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
      },
      description: '',
      errorClass: '',
      isEnter: true,
    };
  },
  methods: {
    changePhoto(a) {
      if (a == -1) {
        this.isEnter = true;
      } else {
        this.isEnter = false;
      }
    },
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          _this.ruleForm.loginName = _this.ruleForm.loginName
          _this.ruleForm.password = _this.ruleForm.password
          this.$api.fetch({
            params: _this.ruleForm,//参数
            apiUrl: '/system/login.api',//接口地址
          }).then(res => {
            console.log(res);
            localStorage.setItem('token', res.token)
            localStorage.setItem('roleId', res.roleId)
            localStorage.setItem('userName', res.userName)
            localStorage.setItem('groupCode', res.groupCode)
            _this.$router.push('/home')
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-header {
    background-color: #2196f300;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    height: 100%;
    padding: 0px;
  }
  body > .el-container {
    height: 100%;
    margin-bottom: 40px;
  }
  .logo {
    float: left;
  }
  .btu > .el-form-item__content {
    margin-left: 15px;
  }
  .mainBackground {
    background-color: #fff;
    background-size: 100% !important;
    width: 100%;
    height: 100%;
    background: url("../assets/images/banner3.jpg") 0px -111px no-repeat;
  }
  .register {
    position: absolute;
    top: 105px;
    right: 0px;
    width: 30%;
    height: 380px;
    overflow: hidden;
    margin: 50px 40px;
  }
  .text {
    font-size: 14px;
  }
  .content {
    background: rgba(255, 255, 255, 0.93);
    border-radius: 4px;
    width: 300px;
    height: 250px;
    margin-top: 10px;
    margin-left: 10px;
    border: 15px solid #00bcd400;
  }
  .item {
    padding: 18px 0;
  }
  .box-card {
    width: 480px;
  }
  ul {
    background: rgba(255, 255, 255, 0.48);
    height: 100%;
  }
  li {
    height: 10%;
    margin: 3px;
  }
  .btu {
    .el-form-item__content {
      background-color: red;
    }
  }
  .lbl {
    margin-top: 20px;
    // .el-form-item__label{
    // width: 50px;
    // }
  }
  // .ipt{
  //   margin-left: 50px;
  // }
}
</style>
  