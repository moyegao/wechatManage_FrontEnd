<template>
  <div class="activityConfigurationEdit">
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="120px" class="demo-form" :inline="true">

      <el-form-item label="水司：" prop='groupCode'>
        <el-select v-model="ruleForm.groupCode" placeholder="请选择水司" clearable>
          <el-option v-for="item in groupOption" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="活动名称：" prop='name'>
        <el-input v-model="ruleForm.name" :class="{ready_only:activityConfigurationEditNeedData.editGet}" :readonly='activityConfigurationEditNeedData.editGet'></el-input>
      </el-form-item>

      <el-form-item label="图标：">
        <!-- action="http://10.13.1.248:10041/fileService/fileUpload" 公司  -->
        <!-- action="http://192.168.0.91:9992/fileService/fileUpload"赤壁水司-->
        <el-upload class="avatar-uploader" :action="imgUrl" :http-request='submitPic' :on-success="handleAvatarSuccess" :show-file-list="false">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="活动链接：" prop='url'>
        <el-input v-model="ruleForm.url" :class="{ready_only:activityConfigurationEditNeedData.editGet}" :readonly='activityConfigurationEditNeedData.editGet'></el-input>
      </el-form-item>

      <el-form-item label="活动时间：" prop='time'>
        <el-date-picker v-model="ruleForm.time" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>

      <!-- <el-form-item label="开始时间：" prop='beginTime'>
        <el-date-picker v-model="ruleForm.beginTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :readonly='activityConfigurationEditNeedData.editGet'>
        </el-date-picker>
      </el-form-item>

      <el-form-item label="结束时间：" prop='endTime'>
        <el-date-picker v-model="ruleForm.endTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :readonly='activityConfigurationEditNeedData.editGet'>
        </el-date-picker>
      </el-form-item> -->

      <el-form-item label="活动内容：" prop='content'>
        <el-input type='textarea' v-model="ruleForm.content" :class="{ready_only:activityConfigurationEditNeedData.editGet}" :readonly='activityConfigurationEditNeedData.editGet'></el-input>
      </el-form-item>

      <el-form-item label="状态：" prop='status'>
        <el-radio v-model="ruleForm.status" label='1' :disabled='activityConfigurationEditNeedData.editGet'>启用</el-radio>
        <el-radio v-model="ruleForm.status" label='0' :disabled='activityConfigurationEditNeedData.editGet'>停用</el-radio>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "activityConfigurationEdit",
  props: ['activityConfigurationEditNeedData'],
  data() {
    return {
      imgUrl,
      ruleForm: {
        groupCode: "",
        groupName: "",
        name: "",
        url: "",
        time: [],
        content: '',
        status: '1',
      },
      rules: {
        groupCode: [
          { required: true, message: '请选择水司', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入活动链接', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '请选择活动时间', trigger: 'change' }
        ],
      },
      groupOption: [],
      imageUrl: false,
    }
  },
  mounted() {
    this.imgUrl = imgUrl + '/fileService/fileUpload'
    console.log(this.activityConfigurationEditNeedData);
    // this.init();
    this.getGroupOption();
    if (this.activityConfigurationEditNeedData.content == 'add') {

    } else if (this.activityConfigurationEditNeedData.content == 'see' || this.activityConfigurationEditNeedData.content == 'edit') {
      this.init();
    }
  },
  methods: {
    // 单个查询
    init() {
      let _this = this
      let params = {
        "data": this.activityConfigurationEditNeedData.id
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/system/compActivityQuery.api',//参数
      }).then(res => {
        _this.ruleForm = res;
        console.log(_this.ruleForm);
        _this.ruleForm.status = res.status + ''
        _this.ruleForm.time = []
        _this.ruleForm.time.push(res.beginTime)
        _this.ruleForm.time.push(res.endTime)
        _this.imageUrl = res.icon
      })
    },

    // 获取水司下拉列表
    getGroupOption() {
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

    // 获取图标url
    submitPic(item) {
      console.log(item);
      var _this = this;
      let params = {//接口入参
        "data": {},
      }
      this.$api.fetch({
        params: params,
        apiUrl: '/file/getFtoken',
      }).then(res => {
        let formData = new FormData()
        formData.append("file", item.file)
        formData.append("ftoken", res.ftoken)
        let RequestObj = {
          url: _this.imgUrl,
          // url: 'http://192.168.0.91:9992/fileService/fileUpload',//赤壁水司
          method: 'post',
          timeout: 60000,
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
          data: formData
        };
        axios(RequestObj).then(res => {
          if (res.status === 200) {
            if (res.data.code === 0) {
              this.imageUrl = imgUrl + '/fileService/fileDownload?path=' + res.data.data.path//公司
              // this.imageUrl = 'http://192.168.0.91:9992/fileService/fileDownload?path=' + res.data.data.path//赤壁水司
            }
          }
        }, err => {
        }).catch(error => {
        })
      })
    },

    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      // console.log(this.imageUrl);
    },

    // 添加-保存按钮
    addSubmit() {
      console.log(this.ruleForm.time);
      let _this = this;
      let params = {
        "data": {
          "groupCode": _this.ruleForm.groupCode,
          "name": _this.ruleForm.name,
          "icon": _this.imageUrl,
          "url": _this.ruleForm.url,
          "beginTime": _this.ruleForm.time[0],
          "endTime": _this.ruleForm.time[1],
          "content": _this.ruleForm.content,
          "status": _this.ruleForm.status,
        },
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/system/compActivityAdd.api',//接口地址
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
          "id": _this.activityConfigurationEditNeedData.id,
          "groupCode": _this.ruleForm.groupCode,
          "name": _this.ruleForm.name,
          "icon": _this.imageUrl,
          "url": _this.ruleForm.url,
          "beginTime": _this.ruleForm.time[0],
          "endTime": _this.ruleForm.time[1],
          "content": _this.ruleForm.content,
          "status": _this.ruleForm.status,
        },
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/system/compActivityUpdate.api',//接口地址
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
.activityConfigurationEdit {
  .el-textarea__inner {
    height: 100px;
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
      margin-bottom: 17px;
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

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .el-date-editor .el-range__icon {
    line-height: 24px;
  }
  .el-date-editor .el-range-separator {
    line-height: 24px;
  }
}
</style>


