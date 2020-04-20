<template>
  <div class="userSetEdit">
    <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-form" :inline="true">

      <el-form-item label="角色名称：">
        <el-input v-model="ruleForm.name" :class="{ready_only:userSetEditNeedData.editGet}" :readonly='userSetEditNeedData.editGet'></el-input>
      </el-form-item>

      <el-form-item label="描述：">
        <el-input v-model="ruleForm.remark" class="ready_only" readonly></el-input>
      </el-form-item>

      <el-form-item label="最后修改人：">
        <el-input v-model="ruleForm.modifyBy" class="ready_only" readonly></el-input>
      </el-form-item>

      <el-form-item label="最后修改时间：">
        <el-input v-model="ruleForm.modifyTime" class="ready_only" readonly></el-input>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
export default {
  name: "userSetEdit",
  props: ['userSetEditNeedData'],
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
        "data": this.userSetEditNeedData.id
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/system/sysUserRoleQuery.api',//参数
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
    //保存
    submit() {
      let _this = this
      let params = {
        "data": {
          "id": this.userSetEditNeedData.id,
          "name": _this.ruleForm.name
        }
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/system/sysUserRoleUpdate.api',//参数
      }).then(res => {
        _this.$parent.closeDialog();
        _this.$parent.init();
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
.userSetEdit {
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


