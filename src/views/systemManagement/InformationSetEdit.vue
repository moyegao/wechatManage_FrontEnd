<template>
  <div class="InformationSetEdit">
    <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-form" :inline="true">

      <!-- <el-form-item label="组织架构名称：">
        <el-select clearable v-model="ruleForm.groupCode" placeholder="请选择水司" v-if="groupSelectShow">
          <el-option v-for="item in groupOption" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
        <el-input v-model="ruleForm.groupName" readonly class="ready_only" v-else></el-input>
      </el-form-item> -->

      <el-form-item label="水司名称：">
        <el-input v-model="ruleForm.groupName" :class="{ready_only:InformationSetEditNeedData.editGet}" :readonly='InformationSetEditNeedData.editGet'></el-input>
      </el-form-item>

      <el-form-item label="水司编号：">
        <el-input v-model="ruleForm.groupCode" :class="{ready_only:InformationSetEditNeedData.editGet}" :readonly='InformationSetEditNeedData.editGet'></el-input>
      </el-form-item>

      <el-form-item label="省份：">
        <el-input v-model="ruleForm.province" :class="{ready_only:InformationSetEditNeedData.editGet}" :readonly='InformationSetEditNeedData.editGet'></el-input>
      </el-form-item>

      <el-form-item label="城市：">
        <el-input v-model="ruleForm.city" :class="{ready_only:InformationSetEditNeedData.editGet}" :readonly='InformationSetEditNeedData.editGet'></el-input>
      </el-form-item>

      <el-form-item label="区域：">
        <el-input v-model="ruleForm.area" :class="{ready_only:InformationSetEditNeedData.editGet}" :readonly='InformationSetEditNeedData.editGet'></el-input>
      </el-form-item>

      <el-form-item label="应用id：">
        <el-input v-model="ruleForm.appId" :class="{ready_only:InformationSetEditNeedData.editGet}" :readonly='InformationSetEditNeedData.editGet'></el-input>
      </el-form-item>

      <el-form-item label="应用密钥：">
        <el-input v-model="ruleForm.appSecret" :class="{ready_only:InformationSetEditNeedData.editGet}" :readonly='InformationSetEditNeedData.editGet'></el-input>
      </el-form-item>

      <el-form-item label="配置令牌：">
        <el-input v-model="ruleForm.token" :class="{ready_only:InformationSetEditNeedData.editGet}" :readonly='InformationSetEditNeedData.editGet'></el-input>
      </el-form-item>

      <el-form-item label="消息加解密密钥：">
        <el-input v-model="ruleForm.aesKey" :class="{ready_only:InformationSetEditNeedData.editGet}" :readonly='InformationSetEditNeedData.editGet'></el-input>
      </el-form-item>

      <el-form-item label="商户号：">
        <el-input v-model="ruleForm.mchId" :class="{ready_only:InformationSetEditNeedData.editGet}" :readonly='InformationSetEditNeedData.editGet'></el-input>
      </el-form-item>

      <el-form-item label="商户apiKey：">
        <el-input v-model="ruleForm.mchKey" :class="{ready_only:InformationSetEditNeedData.editGet}" :readonly='InformationSetEditNeedData.editGet'></el-input>
      </el-form-item>

      <el-form-item label="商户证书路径：">
        <el-input v-model="ruleForm.certPath" :class="{ready_only:InformationSetEditNeedData.editGet}" :readonly='InformationSetEditNeedData.editGet'></el-input>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
export default {
  name: "InformationSetEdit",
  props: ['InformationSetEditNeedData'],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      databaseData: [],
      groupOption: [],
      groupSelectShow: false,
      ruleForm: {
        groupCode: '',
        appId: "",
        appSecret: '',
        token: "",
        aesKey: "",
        mchId: "",
        mchKey: "",
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
    // this.init();

    if (this.InformationSetEditNeedData.content == 'add') {
      this.groupSelectShow = true;
      this.getGroupOption();
    } else if (this.InformationSetEditNeedData.content == 'see' || this.InformationSetEditNeedData.content == 'edit') {
      this.groupSelectShow = false;
      this.getSeeData();
    }
  },
  methods: {
    init() {
      let _this = this
      let params = {
        "data": this.InformationSetEditNeedData.id
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/report/noticeDetailQuery.api',//参数
      }).then(res => {
        _this.ruleForm = res;
      })
    },
    // 查看-内容数据
    getSeeData() {
      let _this = this
      let params = {
        "data": this.InformationSetEditNeedData.id
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/system/wxConfigInfoQuery.api',//参数
      }).then(res => {
        _this.ruleForm = res;
      })
    },
    getGroupOption() {//获取水司下拉列表
      let _this = this;
      let params = {//接口入参
        "data": {},
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/common/companyDownList.api',//接口地址
      }).then(res => {
        _this.groupOption = res;
      })
    },
    // 添加-保存按钮
    addSubmit() {
      let _this = this;
      let params = {
        "data": {
          "groupCode": _this.ruleForm.groupCode,
          "groupName": _this.ruleForm.groupName,
          "province": _this.ruleForm.province,
          "city": _this.ruleForm.city,
          "area": _this.ruleForm.area,
          "appId": _this.ruleForm.appId,
          "appSecret": _this.ruleForm.appSecret,
          "token": _this.ruleForm.token,
          "aesKey": _this.ruleForm.aesKey,
          "mchId": _this.ruleForm.mchId,
          "mchKey": _this.ruleForm.mchKey,
          "certPath": _this.ruleForm.certPath
        },
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/system/wxConfigInfoAdd.api',//接口地址
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
          "id": _this.InformationSetEditNeedData.id,
          "groupCode": _this.ruleForm.groupCode,
          "groupName": _this.ruleForm.groupName,
          "province": _this.ruleForm.province,
          "city": _this.ruleForm.city,
          "area": _this.ruleForm.area,
          "appId": _this.ruleForm.appId,
          "appSecret": _this.ruleForm.appSecret,
          "token": _this.ruleForm.token,
          "aesKey": _this.ruleForm.aesKey,
          "mchId": _this.ruleForm.mchId,
          "mchKey": _this.ruleForm.mchKey,
          "certPath": _this.ruleForm.certPath
        },
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/system/wxConfigInfoUpdate.api',//接口地址
      }).then(res => {
        _this.$parent.closeDialog()
        _this.$parent.init()
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
.InformationSetEdit {
  height: 100%;
  height: 100%;
  overflow: auto;

  .demo-form {
    width: 80%;
    margin: 0 auto;
    .el-form-item {
      margin-bottom: 12px;
    }
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


