<template>
  <div class="meunSetParentEdit">
    <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-form" :inline="true">

      <el-form-item label="菜单名称：">
        <el-input v-model="ruleForm.menusName"></el-input>
      </el-form-item>

      <el-form-item label="排序：">
        <el-input v-model="ruleForm.sort"></el-input>
      </el-form-item>

      <el-form-item label="菜单类型：">
        <el-select v-model="ruleForm.type" placeholder="请选择菜单类型" clearable>
          <el-option v-for="item in wxMenusOption" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="菜单地址：" v-if="ruleForm.type == '1' || ruleForm.type == '跳转类型'">
        <el-input v-model="ruleForm.url"></el-input>
      </el-form-item>

      <el-form-item label="菜单点击：" v-if="ruleForm.type == '2' || ruleForm.type == '点击类型'">
        <el-input v-model="ruleForm.click"></el-input>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
export default {
  name: "meunSetParentEdit",
  props: ['meunSetParentEditNeedData'],
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
      wxMenusOption: [],
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
    this.getwxMenusOption();
    if (this.meunSetParentEditNeedData.content == 'edit') {
      this.init();
    }

  },
  methods: {
    init() {
      let _this = this
      let params = {
        "data": {
          "id": this.meunSetParentEditNeedData.id,
          "parent": this.meunSetParentEditNeedData.parent
        }
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/system/wxMenusQuery.api',//参数
      }).then(res => {
        _this.ruleForm = res;
        // if (_this.ruleForm.type == '跳转类型') {
        //   _this.ruleForm.type = '1'
        // } else {
        //   _this.ruleForm.type = '2'
        // }
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
    // 一级菜单编辑-保存
    submit() {
      let _this = this
      
      let params = {
        "data": {
          "id": _this.ruleForm.id,
          "menusName": _this.ruleForm.menusName,
          "type": _this.ruleForm.type,
          "sort": _this.ruleForm.sort
        }
      }
      if (_this.ruleForm.type == '1') {
        params.data.url = _this.ruleForm.url;
      } else {
        params.data.click = _this.ruleForm.click;
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/system/wxMenusUpdate.api',//参数
      }).then(res => {
        _this.$parent.closeDialog();
        _this.$parent.init();
      })
    },
    // 一级菜单添加
    add() {
      let _this = this
      let params = {
        "data": {
          "menusName": _this.ruleForm.menusName,
          "sort": _this.ruleForm.sort,
          "type": _this.ruleForm.type,
          "url": _this.ruleForm.url,
          "click": _this.ruleForm.click,
          "isLeaf": "0",
        }
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/system/wxMenusAdd.api',//参数
      }).then(res => {
        _this.$parent.closeDialog();
        _this.$parent.init();
      })
    },
    getwxMenusOption() {//获取模块下拉列表 
      let _this = this;
      let params = {//接口入参
        data: ["wxMenus"]
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/common/dictDownList.api',//接口地址
      }).then(res => {
        _this.wxMenusOption = res.wxMenus;
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
.meunSetParentEdit {
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


