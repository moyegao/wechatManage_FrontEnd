<template>
  <div class="automaticRecoveryEdit">
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="120px" class="demo-form" :inline="true">

      <el-form-item label="关键字：" prop='keyword'>
        <el-input v-model="ruleForm.keyword" :class="{ready_only:automaticRecoveryEditNeedData.editGet}" :readonly='automaticRecoveryEditNeedData.editGet'></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop='keyword'>
        <el-radio v-model="ruleForm.status" label='1' :disabled='automaticRecoveryEditNeedData.editGet'>启用</el-radio>
        <el-radio v-model="ruleForm.status" label='0' :disabled='automaticRecoveryEditNeedData.editGet'>停用</el-radio>
      </el-form-item>

      <el-form-item label="回复内容：" prop='content'>
        <el-input type='textarea' v-model="ruleForm.content" :class="{ready_only:automaticRecoveryEditNeedData.editGet}" :readonly='automaticRecoveryEditNeedData.editGet'></el-input>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
export default {
  name: "automaticRecoveryEdit",
  props: ['automaticRecoveryEditNeedData'],
  data() {
    return {
      ruleForm: {
        keyword: "",
        content: '',
        status: '1',
      },
      rules: {
        keyword: [
          { required: true, message: '请输入关键字', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请输入回复内容', trigger: 'blur' }
        ],
      },
    }
  },
  mounted() {
    // this.init();

    if (this.automaticRecoveryEditNeedData.content == 'add') {
      // this.groupSelectShow = true;
      // this.getGroupOption();
    } else if (this.automaticRecoveryEditNeedData.content == 'see' || this.automaticRecoveryEditNeedData.content == 'edit') {
      // this.groupSelectShow = false;
      this.getSeeData();
    }
  },
  methods: {
    // init() {
    //   let _this = this
    //   let params = {
    //     "data": this.automaticRecoveryEditNeedData.id
    //   }
    //   this.$api.fetch({
    //     params: params,//参数
    //     apiUrl: '/report/noticeDetailQuery.api',//参数
    //   }).then(res => {
    //     _this.ruleForm = res;
    //   })
    // },
    // 查看-内容数据
    getSeeData() {
      let _this = this
      let params = {
        "data": this.automaticRecoveryEditNeedData.id
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/system/autoReplyQuery.api',//参数
      }).then(res => {
        _this.ruleForm = res;
        _this.ruleForm.status = res.status + ''
      })
    },
    // getGroupOption() {//获取水司下拉列表
    //   let _this = this;
    //   let params = {//接口入参
    //     "data": {},
    //   }
    //   this.$api.fetch({
    //     params: params,//参数
    //     apiUrl: '/common/companyDownList.api',//接口地址
    //   }).then(res => {
    //     _this.groupOption = res;
    //   })
    // },
    // 添加-保存按钮
    addSubmit() {
      let _this = this;
      let params = {
        "data": {
          // "groupCode": _this.ruleForm.groupCode,
          "keyword": _this.ruleForm.keyword,
          "content": _this.ruleForm.content,
          "status": _this.ruleForm.status,
          // "token": _this.ruleForm.token,
          // "aesKey": _this.ruleForm.aesKey,
          // "busiNo": _this.ruleForm.busiNo,
          // "apiKey": _this.ruleForm.apiKey
        },
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/system/autoReplyAdd.api',//接口地址
      }).then(res => {
        _this.$parent.closeDialog()
        _this.$parent.init()
      })
    },
    // 编辑-保存按钮
    editSubmit() {
      let _this = this;
      let params = {
        "data": {
          "id": _this.automaticRecoveryEditNeedData.id,
          "keyword": _this.ruleForm.keyword,
          "content": _this.ruleForm.content,
          "status": _this.ruleForm.status,
          // "token": _this.ruleForm.token,
          // "aesKey": _this.ruleForm.aesKey,
          // "busiNo": _this.ruleForm.busiNo,
          // "apiKey": _this.ruleForm.apiKey
        },
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/system/autoReplyUpdate.api',//接口地址
      }).then(res => {
        _this.$parent.closeDialog()
        _this.$parent.init()
      })
    },
    // handleRemove(file, fileList) {
    // },
    // handlePictureCardPreview(file) {
      // this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
    // },
    //保存按钮
    // submitForm(formName) {
    //   let _this = this
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {

    //     } else {
    //       return false
    //     }

    //     this.ruleForm = {
    //       exteriorCode: '',
    //       interiorCode: "",
    //       shortName: '',
    //       fullName: "",
    //       // "sourceCompany": "",
    //       dbServer: "",
    //       schema: "",
    //       password: "",
    //       status: 1,
    //       comments: "",
    //       ownNames: []
    //     },
    //       // _this.$parent.selectTSubSystem();
    //       _this.$emit('update:appDialog', false)
    //   })
    // },
    //弹出框
    // closeDialog(formName) { //关闭会话
    //   this.$refs[formName].resetFields(); //重置表单
    //   // this.dialogFormVisible = false; //关闭会话
    // },
  },

}
</script>

<style lang="scss">
.automaticRecoveryEdit {
  .el-textarea__inner {
    height: 300px;
  }
  .demo-form {
    width: 80%;
    margin: 0 auto;
    .el-form-item__label {
      font-size: 12px;
    }
    .select-member {
      font-size: 12px;
    }
    .el-form-item {
      width: 80%;
      margin-right: 0px;
      .el-form-item__content {
        width: calc(100% - 120px);
        .el-select {
          width: 100%;
        }
        .el-input__inner {
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>


