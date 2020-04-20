<template>
  <div class="pushMessageDetailEdit">
    <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-form" :inline="true">

      <el-form-item label="消息标题：">
        <el-input v-model="ruleForm.noticeTitle" class="ready_only" readonly></el-input>
      </el-form-item>

      <el-form-item label="消息发布水司：">
        <el-input v-model="ruleForm.groupName" class="ready_only" readonly></el-input>
      </el-form-item>

      <el-form-item label="消息发布时间：">
        <el-date-picker v-model="ruleForm.pushDate" class="ready_only" readonly value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="消息类型：">
        <el-input v-model="ruleForm.noticeName" class="ready_only" readonly></el-input>
      </el-form-item>

      <el-form-item label="通知范围：">
        <el-input v-model="ruleForm.noticeRange" class="ready_only" readonly></el-input>
      </el-form-item>

      <el-form-item label="消息内容：">
        <el-input type="textarea" v-model="ruleForm.noticeContent" class="ready_only" readonly></el-input>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
export default {
  name: "pushMessageDetailEdit",
  props: ['pushMessageDetailEditNeedData'],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      databaseData: [],
      ruleForm: {
        title: '',
        factory: "",
        time: '',
        mesType: "",
        mesRange: "",
        content: "",
      },
      // rules: {
      //   kpiUnique: [
      //     { required: true, message: '请输入指标维键', trigger: 'blur' },
      //   ],
      //   kpiName: [
      //     { required: true, message: '请输入指标名称', trigger: 'blur' }
      //   ],
      //   kpiComments: [
      //     { required: true, message: '请输入指标描述', trigger: 'blur' }
      //   ],
      //   kpiLevel: [
      //     { required: true, message: '请输入指标级别', trigger: 'blur' }
      //   ],
      //   subThemeUnique: [
      //     {  message: '请输入所属子主题维键', trigger: 'blur', required: true },
      //   ],
      // },
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let _this = this
      let params = {
        "data": this.pushMessageDetailEditNeedData.id
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/report/noticeDetailQuery.api',//参数
      }).then(res => {
        _this.ruleForm = res;
        // _this.tableData.total = Number(_this.tableData.total)
        // _this.common.changeTable(this, '.pushMessageDetail .kl-table', [])
      })
    },
    handleRemove(file, fileList) {
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //保存按钮
    submitForm(formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {

        } else {
          return false
        }

        this.ruleForm = {
          exteriorCode: '',
          interiorCode: "",
          shortName: '',
          fullName: "",
          // "sourceCompany": "",
          dbServer: "",
          schema: "",
          password: "",
          status: 1,
          comments: "",
          ownNames: []
        },
          // _this.$parent.selectTSubSystem();
          _this.$emit('update:appDialog', false)
      })
    },
    //弹出框
    closeDialog(formName) { //关闭会话
      this.$refs[formName].resetFields(); //重置表单
      // this.dialogFormVisible = false; //关闭会话
    },
  },

}
</script>

<style lang="scss">
.pushMessageDetailEdit {
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


