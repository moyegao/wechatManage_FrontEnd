<template>
  <div class="waterManagementEdit">
      <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-form" :inline="true">

        <el-form-item label="外部编号：">
          <el-input v-model="ruleForm.title" ></el-input>
        </el-form-item>

        <el-form-item label="内部编号：">
          <el-input v-model="ruleForm.factory" ></el-input>
        </el-form-item>

        <el-form-item label="水司简称：">          
            <el-input v-model="ruleForm.factory" ></el-input>
        </el-form-item>

        <el-form-item label="接口通讯地址：">
          <el-input v-model="ruleForm.mesType" ></el-input>
        </el-form-item>

        <el-form-item label="密码：">
          <el-input v-model="ruleForm.mesRange" ></el-input>
        </el-form-item>

        <el-form-item label="状态：">
          <el-input v-model="ruleForm.mesRange" ></el-input>
        </el-form-item>

        <el-form-item label="消息内容：">
            <el-input  type="textarea" v-model="ruleForm.content"></el-input>
        </el-form-item>

      </el-form>
          
  </div>
</template>

<script>
  export default {
    name: "waterManagementEdit",
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        databaseData:[],
        ruleForm:{
          title:'' ,
          factory: "",
          time: '',
          mesType: "",
          mesRange: "",
          content: "",
        },
      }
    },
    mounted(){
    },
    methods: {
      handleRemove(file, fileList) {
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //保存按钮
      submitForm(formName) {
        let _this =this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            
          }else {
            return false
          }
          
        this.ruleForm={
          exteriorCode:'' ,
          interiorCode: "",
          shortName: '',
          fullName: "",
          // "sourceCompany": "",
          dbServer: "",
          schema: "",
          password: "",
          status: 1,
          comments: "",
          ownNames:[]
        },
          // _this.$parent.selectTSubSystem();
          _this.$emit('update:appDialog', false)
        })
      },
      //弹出框
      closeDialog(formName){ //关闭会话
        this.$refs[formName].resetFields(); //重置表单
        // this.dialogFormVisible = false; //关闭会话
      },
    },

  }
</script>

<style lang="scss">
.waterManagementEdit{
    .demo-form{
        width: 80%;
        margin: 0 auto;
      .el-form-item__label{
        font-size: 12px
      }
      .select-member{
        font-size: 12px;
      }
      .el-form-item{
        width: 80%;
        margin-right: 0px;
        .el-form-item__content{
          width: calc(100% - 120px);
          .el-select{
            width: 100%;
          }
          .el-input__inner{
            height: 30px;
            line-height: 30px;
          }
        }
      }


  }
}
</style>


