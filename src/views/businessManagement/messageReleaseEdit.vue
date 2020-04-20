


<template>
  <div class="messageReleaseEdit">
    <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-form" :inline="true">

      <el-form-item label="信息类型：" prop="type">
        <el-select v-model="ruleForm.category" placeholder="请选择信息类型" v-if="messageReleaseEditNeedData.editGet == false">
          <el-option v-for="item in typeData" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="ruleForm.category" :class="{ready_only:messageReleaseEditNeedData.editGet}" :readonly='messageReleaseEditNeedData.editGet' v-else></el-input>
      </el-form-item>
      <!-- 图文标题 -->
      <el-form-item :label="titleData.title" prop="title">
        <el-input v-model="ruleForm.title" :class="{ready_only:messageReleaseEditNeedData.editGet}" :readonly='messageReleaseEditNeedData.editGet'></el-input>
      </el-form-item>

      <el-form-item label="图标：">
        <!-- action="http://10.13.1.248:10041/fileService/fileUpload" 公司 9992赤壁水司 -->
        <!-- action="http://192.168.0.91:9992/fileService/fileUpload" 赤壁水司 -->
        <el-upload class="avatar-uploader" :action="imgUrl" :http-request='submitPic' :on-success="handleAvatarSuccess" :show-file-list="false">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="停水时间：" v-if="ruleForm.category == 4 || ruleForm.category == '停水通知'">
                      <!-- value-format="yyyy年MM月dd日HH点" 
                      format="yyyy年MM月dd日HH点"  -->
        <el-date-picker 
                      v-model="ruleForm.time" 
                      type="datetimerange" 
                      value-format="yyyy-MM-dd HH:mm:ss" 
                      format="yyyy-MM-dd HH:mm:ss" 
                      range-separator="至" 
                      start-placeholder="开始时间" 
                      end-placeholder="结束时间" 
                      :readonly='messageReleaseEditNeedData.editGet'>
        </el-date-picker>
      </el-form-item>

      <el-form-item label="停水地区：" v-if="ruleForm.category == 4 || ruleForm.category == '停水通知'">
        <el-input v-model="ruleForm.area" :class="{ready_only:messageReleaseEditNeedData.editGet}" :readonly='messageReleaseEditNeedData.editGet'></el-input>
      </el-form-item>

      <el-form-item label="停水原因：" v-if="ruleForm.category == 4 || ruleForm.category == '停水通知'">
        <el-input v-model="ruleForm.reason" :class="{ready_only:messageReleaseEditNeedData.editGet}" :readonly='messageReleaseEditNeedData.editGet'></el-input>
      </el-form-item>

      <el-form-item label="备注：">
        <el-input v-model="ruleForm.description" :class="{ready_only:messageReleaseEditNeedData.editGet}" :readonly='messageReleaseEditNeedData.editGet'></el-input>
      </el-form-item>

      <el-form-item label="类型：">
        <el-radio v-model="ruleForm.typeId" label='1' :disabled='messageReleaseEditNeedData.editGet'>内容</el-radio>
        <el-radio v-model="ruleForm.typeId" label='2' :disabled='messageReleaseEditNeedData.editGet'>链接</el-radio>
      </el-form-item>

      <!-- 图文链接 -->
      <el-form-item label="链接" v-if="ruleForm.typeId == 2">
        <el-input v-model="ruleForm.urlAddr" :class="{ready_only:messageReleaseEditNeedData.editGet}" :readonly='messageReleaseEditNeedData.editGet'></el-input>
      </el-form-item>

      <!-- <el-form-item label="留言：" v-if="ruleForm.typeId == 1">
        <el-radio v-model="ruleForm.commentType" label='1' :disabled='messageReleaseEditNeedData.editGet'>自由留言</el-radio>
        <el-radio v-model="ruleForm.commentType" label='2' :disabled='messageReleaseEditNeedData.editGet'>需审核</el-radio>
        <el-radio v-model="ruleForm.commentType" label='3' :disabled='messageReleaseEditNeedData.editGet'>关闭留言</el-radio>
      </el-form-item> -->

      <!-- <el-form-item label="摘要：" v-if="ruleForm.type == 1 || ruleForm.type == '群发消息'">
        <el-input v-model="ruleForm.digest" :class="{ready_only:messageReleaseEditNeedData.editGet}" :readonly='messageReleaseEditNeedData.editGet'></el-input>
      </el-form-item> -->
      <!-- 内容 -->
      <!-- <el-form-item :label="titleData.content" v-if="ruleForm.typeId == 1">
        <el-input type="textarea" v-model="ruleForm.content" @focus="openCkEditor" :class="{ready_only:messageReleaseEditNeedData.editGet}" readonly></el-input>
      </el-form-item> -->

    </el-form>
    <div style="edit_box" v-show="ckEditorShow && ruleForm.typeId == 1">
      <!-- <InformationReleaseManagementEdit ref="InformationReleaseManagementEdit"></InformationReleaseManagementEdit> -->
      <fuwenben ref="fuwenben" :value="ckEditorContent"></fuwenben>
    </div>

  </div>
</template>

<script>
import InformationReleaseManagementEdit from './InformationReleaseManagementEdit'
import fuwenben from './fuwenben'
import CKEDITOR from 'CKEDITOR'
import axios from 'axios'
export default {
  name: "messageReleaseEdit",
  components: {
    InformationReleaseManagementEdit,
    fuwenben
  },
  props: ['messageReleaseEditNeedData'],
  data() {
    return {
      imgUrl: '',
      fileList: {},
      ckEditorShow: false,
      ckEditorContent: '',
      imageUrl: false,
      dialogVisible: false,
      databaseData: [],
      titleData: {
        title: '标题：',
        urlName: '描述：',
        content: '内容：'
      },
      ruleForm: {
        // 消息类型
        category: '1',
        // 图文标题
        title: '',
        // 图文图标(调接口后拿到的id)
        mediaId: '',
        // 图文内容
        content: '',
        // 图文链接
        typeId: '1',
        // 描述
        description: '',
        // 摘要
        digest: '',
        // 留言
        commentType: '',
        // 停水时间
        time: [],
        // 停水地区
        area: '',
        // 停水原因
        reason: '',
      },
      typeData: [],
      // rules: {
      //   type: [
      //     { required: true, message: '请选择消息类型', trigger: 'change' },
      //   ],
      //   title: [
      //     { required: true, message: '请输入标题', trigger: 'blur' }
      //   ],
      // },
    }
  },
  mounted() {
    this.imgUrl = imgUrl + '/fileService/fileUpload'
    console.log(this.imgUrl);
    console.log(this.messageReleaseEditNeedData);
    if (this.messageReleaseEditNeedData.content == 'edit' || this.messageReleaseEditNeedData.content == 'see') {
      this.getFormData()
      this.ckEditorShow = true
    } else if (this.messageReleaseEditNeedData.content == 'add') {
      this.ckEditorShow = true
      this.openCkEditor()
    }
    this.getTypeData()
  },
  watch: {
    // ruleForm: {
    //   handler(newName, oldName) {
    //     if (newName.type == '1' || newName.type == '群发消息') {
    //       this.titleData.title = '图文标题：'
    //       this.titleData.urlName = '图文链接：'
    //       this.titleData.content = '图文内容:'
    //     } else {
    //       this.titleData.title = '标题：'
    //       this.titleData.urlName = '链接：'
    //       this.titleData.content = '内容:'
    //     }
    //   },
    //   deep: true,
    // }
  },
  methods: {
    openCkEditor() {
      this.ckEditorShow = true;
      let _this = this
      // 给富文本插入自定义的按钮
      // console.log($('.imp_img').length);
      if ($('.imp_img').length <= 0) {
        setTimeout(() => {
          let div = '<el-button size="mini" style="margin-left:1%" type="primary"">插入图片：</el-button><input class="imp_img" type="file">';
          $('.cke_toolbox').prepend(div)
          $('.imp_img').change(function (e) {
            console.log(e.target.files[0]);
            _this.getFtoken(e.target.files[0], 'content')
          })
        }, 500);
      }

    },
    // 获取ftoken
    getFtoken(file, type) {
      console.log(file);
      var _this = this;
      let params = {//接口入参
        "data": {},
      }
      this.$api.fetch({
        params: params,
        apiUrl: '/file/getFtoken',
      }).then(res => {

        let formData = new FormData()
        formData.append("file", file)
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
              if (type == 'content') {
                var content = _this.$refs.fuwenben.getContent();
                // <img src="http://10.13.1.248:10041/fileService/fileDownload?path=  //公司
                // '<img src="http://192.168.0.91:9992/fileService/fileDownload?path='//赤壁水司
                var text = content + '<img src="'+ imgUrl+'/fileService/fileDownload?path=' + res.data.data.path + '"/>'
                _this.$refs.fuwenben.setContent(text)
              } else if (type == 'icon') {
                this.imageUrl = imgUrl + '/fileService/fileDownload?path=' + res.data.data.path//公司
                // this.imageUrl = 'http://192.168.0.91:9992/fileService/fileDownload?path=' + res.data.data.path//赤壁水司
              }

            }
          }
        }, err => {

        }).catch(error => {

        })
        // _this.$api.fetch({
        //   params: formData,//参数
        //   apiUrl: '/news/contentMediaUrl.api',//接口地址
        // }).then(res => {
        //   var content = _this.$refs.fuwenben.getContent();
        //   var text = content + '<img src="' + res + '"/>'
        //   _this.$refs.fuwenben.setContent(text)
        // })
      })
    },
    // 单个查询
    getFormData() {
      var _this = this;
      let params = {
        'data': this.messageReleaseEditNeedData.id
      }
      _this.$api.fetch({
        params: params,//参数
        apiUrl: '/info/infoPubQuery.api',//接口地址
      }).then(res => {
        _this.ruleForm.id = res.id
        _this.ruleForm.title = res.title
        _this.ruleForm.category = res.category
        _this.ruleForm.typeId = res.typeId
        _this.ruleForm.commentType = res.commentType + ''
        _this.ruleForm.description = res.description
        _this.ruleForm.urlAddr = res.urlAddr
        _this.imageUrl = res.icon
        if (_this.ruleForm.category == '停水通知') {
          _this.ruleForm.time = res.wxContent.time.split('至')
          _this.ruleForm.area = res.wxContent.area
          _this.ruleForm.reason = res.wxContent.reason
        }
        console.log(_this.ruleForm.time);
        // 获取信息类型
        _this.getTypeData()

        _this.ckEditorShow = true
        if ($('.imp_img').length <= 0) {
          setTimeout(() => {
            let div = '<el-button size="mini" style="margin-left:1%" type="primary"">插入图片：</el-button><input class="imp_img" type="file">';
            $('.cke_toolbox').prepend(div)
            _this.$refs.fuwenben.setContent(res.content)
            $('.imp_img').change(function (e) {
              _this.getFtoken(e.target.files[0], 'content')
            })
          }, 1000);
        }
      })
    },
    // 获取信息类型下拉框数据
    getTypeData() {
      let _this = this
      let params = {
        "data": ['info'],
      }

      _this.$api.fetch({
        params: params,//参数
        apiUrl: '/common/dictDownList.api',//接口地址
      }).then(res => {
        _this.typeData = res.info
        if (this.messageReleaseEditNeedData.content == 'edit') {
          for (let i = 0; i < _this.typeData.length; i++) {
            if (_this.ruleForm.category == _this.typeData[i].name) {
              _this.ruleForm.category = _this.typeData[i].value
            }
          }
        }
      })
    },

    getFile(e) {

    },
    handleRemove(file, fileList) {
    },
    handlePictureCardPreview(file) {
      console.log(file);
      this.imageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      // console.log(this.imageUrl);
    },
    submitPic(item) {
      console.log(item);
      this.getFtoken(item.file, 'icon')
      // console.log(item)
      // return
      // let _this = this
      // let formData = new FormData()
      // formData.append("file", item.file)
      // formData.append("token", localStorage.getItem('token'))

      // _this.$api.fetch({
      //   params: formData,//参数
      //   /apiUrl: 'news/newsMedia.api',//接口地址
      // }).then(res => {
      //   this.imageUrl = URL.createObjectURL(item.file);
      //   this.ruleForm.mediaId = res.mediaId
      // })
    },
    // 富文本保存按钮
    contentSubmit() {
      // this.$refs.InformationReleaseManagementEdit.getContent()
      this.$refs.fuwenben.getContent()
    },
    //保存按钮
    submitForm(formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {

          if (this.ruleForm.typeId == '1') {
            // 富文本内容
            if ($('.imp_img').length <= 0) {
              this.ruleForm.content = ''
            } else {
              this.ruleForm.content = this.$refs.fuwenben.getContent()
              console.log(this.ruleForm.content);
            }
            // html代码转码
            this.ruleForm.content = this.ruleForm.content.replace(/</g, "&lt")
            this.ruleForm.content = this.ruleForm.content.replace(/>/g, "&gt")
            this.ruleForm.content = this.ruleForm.content.replace(/=/g, "%3D")
            // 内容参数
            var params = {
              "data": {
                "title": this.ruleForm.title,
                "content": this.ruleForm.content,
                "description": this.ruleForm.description,
                "category": this.ruleForm.category,
                "icon": this.imageUrl,
                "typeId": Number(this.ruleForm.typeId),
                "commentType": this.ruleForm.commentType,
              },
            }
          } else {
            // 链接参数
            var params = {
              "data": {
                "title": this.ruleForm.title,
                "description": this.ruleForm.description,
                "category": this.ruleForm.category,
                "icon": this.imageUrl,
                "typeId": Number(this.ruleForm.typeId),
                "urlAddr": this.ruleForm.urlAddr,
              },
            }
          }
          // 类型：停水通知
          if (this.ruleForm.category == '4') {
            params.data.wxContent = {}
            // 停水时间
            params.data.wxContent.time = this.ruleForm.time.join('至')
            // 停水地区
            params.data.wxContent.area = this.ruleForm.area
            // 停水原因
            params.data.wxContent.reason = this.ruleForm.reason
          }

          // 提交或保存
          params.data.status = this.messageReleaseEditNeedData.status
          console.log(params);
          var url = ''
          if (this.messageReleaseEditNeedData.content == 'add') {// 添加-保存(提交)
            url = '/info/infoPubAdd.api'
          } else if (this.messageReleaseEditNeedData.content == 'edit') {// 编辑-保存
            params.data.id = this.ruleForm.id
            url = '/info/infoPubUpdate.api'
          }
          this.$api.fetch({
            params: params,//参数
            apiUrl: url,//接口地址
          }).then(res => {
            _this.$parent.closeDialog()
            _this.$parent.init()
          })
        } else {
          return false
        }
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
.messageReleaseEdit {
  // .imp_img {
  //   display: inline-block;
  //   width: 3%;
  //   height: 30px;
  //   margin-top: 5px;
  //   margin-left: 1%;
  //   cursor: pointer;
  // }
  .el-form-item {
    margin-bottom: 15px;
  }
  .ckEditor_box {
    width: 71%;
    margin: 0 auto;
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


