<template>
  <div class="meunSetEdit">
    <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-form" :inline="true">

      <el-form-item label="父菜单名称：" v-if="meunSetEditNeedData.content == 'edit'">
        <el-input v-model="ruleForm.parent" class="ready_only" readonly></el-input>
      </el-form-item>

      <el-form-item label="菜单名称：">
        <el-input v-model="ruleForm.menusName" :class="{ready_only:meunSetEditNeedData.editGet}" :readonly='meunSetEditNeedData.editGet'></el-input>
      </el-form-item>

      <el-form-item label="排序：">
        <el-input v-model="ruleForm.sort" :class="{ready_only:meunSetEditNeedData.editGet}" :readonly='meunSetEditNeedData.editGet'></el-input>
      </el-form-item>

      <el-form-item label="菜单类型：">
        <el-select v-model="ruleForm.type" placeholder="请选择菜单类型" v-if="meunSetEditNeedData.editGet == false">
          <el-option v-for="item in wxMenusOption" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="ruleForm.type" :class="{ready_only:meunSetEditNeedData.editGet}" :readonly='meunSetEditNeedData.editGet' v-else></el-input>
      </el-form-item>

      <el-form-item label="菜单地址：" v-if="ruleForm.type == '1' || ruleForm.type == '跳转类型' || ruleForm.type == 'view'">
        <el-input v-model="ruleForm.url" :class="{ready_only:meunSetEditNeedData.editGet}" :readonly='meunSetEditNeedData.editGet'></el-input>
      </el-form-item>

      <el-form-item label="菜单点击：" v-if="ruleForm.type == '2' || ruleForm.type == '点击类型' || ruleForm.type == 'click'">
        <el-input v-model="ruleForm.click" :class="{ready_only:meunSetEditNeedData.editGet}" :readonly='meunSetEditNeedData.editGet'></el-input>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
export default {
  name: "meunSetEdit",
  props: ['meunSetEditNeedData'],
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
    this.getwxMenusOption()
    if (this.meunSetEditNeedData.content == 'edit' || this.meunSetEditNeedData.content == 'see') {
      this.init();
    }
  },
  methods: {
    init() {
      let _this = this
      let params = {
        "data": {
          "id": this.meunSetEditNeedData.id,
          "parent": this.meunSetEditNeedData.parent
        }
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/system/wxMenusQuery.api',//参数
      }).then(res => {
        _this.ruleForm = res;
        if (this.meunSetEditNeedData.content == 'see') {
          if (_this.ruleForm.type == '1') {
            _this.ruleForm.type = 'view'
          } else if (_this.ruleForm.type = '2') {
            _this.ruleForm.type = 'click'
          }
        }

        // _this.tableData.total = Number(_this.tableData.total)
        // _this.common.changeTable(this, '.pushMessageDetail .kl-table', [])
      })
    },
    // 二级菜单编辑-保存
    submit() {
      let _this = this
      if (_this.ruleForm.type == '1') {
        _this.ruleForm.click = ''
      } else {
        _this.ruleForm.url = ''
      }
      let params = {
        "data": {
          "id": _this.ruleForm.id,
          "menusName": _this.ruleForm.menusName,
          "type": _this.ruleForm.type,
          "url": _this.ruleForm.url,
          "click": _this.ruleForm.click,
          "sort": _this.ruleForm.sort
        }
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/system/wxMenusUpdate.api',//参数
      }).then(res => {
        _this.$parent.closeDialog();
        _this.$parent.init();
      })
    },
    add() {
      let _this = this
      if (_this.ruleForm.type == '1') {
        _this.ruleForm.click = ''
      } else {
        _this.ruleForm.url = ''
      }
      let params = {
        "data": {
          "parentId": _this.meunSetEditNeedData.id,
          "menusName": _this.ruleForm.menusName,
          "type": _this.ruleForm.type,
          "url": _this.ruleForm.url,
          "click": _this.ruleForm.click,
          "sort": _this.ruleForm.sort,
          "isLeaf": "1",
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
    handleRemove(file, fileList) {
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
.meunSetEdit {
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


