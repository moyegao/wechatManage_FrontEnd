 <template>
  <div class="newsReleaseEdit">
    <div class="news-content">
      <div class="myNewsEdit" v-show="ruleForm.type == 1 || ruleForm.type == '群发消息'">
        <div class="editBox">

          <!-- <div class="edit-item edit-item-first">
            <div class="item-left">
              标题
            </div>
            <div class="btn-box">
              <div class="delete-box">
                <div class="el-icon-delete"></div>
              </div>
              <div class="up-box">
                <div class="el-icon-top"></div>
              </div>
              <div class="down-box">
                <div class="el-icon-bottom"></div>
              </div>
            </div>
          </div> -->
          <!-- <div class="edit-item">
            <div class="item-left">
              标题
            </div>
            <img src="../../../static/img/gray.png" height="50px">
            <div class="btn-box">
              <div class="delete-box">
                <div class="el-icon-delete"></div>
              </div>
              <div class="up-box">
                <div class="el-icon-top"></div>
              </div>
              <div class="down-box">
                <div class="el-icon-bottom"></div>
              </div>
            </div>
          </div> -->

          <div class="bottom-line"></div>
          <div class="item-add el-icon-plus" @click="addNews">新建消息</div>

        </div>
      </div>
      <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-form" :inline="true">

        <!-- <el-form-item label="消息类型：" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择消息类型" :disabled="newsReleaseEditNeedData.content == 'edit'" v-if="newsReleaseEditNeedData.editGet == false">
            <el-option label="群发消息" value="1"></el-option>
            <el-option label="模板消息" value="2"></el-option>
          </el-select>
          <el-input v-model="ruleForm.type" :class="{ready_only:newsReleaseEditNeedData.editGet}" :readonly='newsReleaseEditNeedData.editGet' v-else></el-input>
        </el-form-item> -->
        <!-- 图文标题 -->
        <el-form-item :label="titleData.title" prop="title">
          <el-input @blur="itemPreserve" @input.native="changeTitle" v-model="ruleForm.title" :class="{ready_only:newsReleaseEditNeedData.editGet}" :readonly='newsReleaseEditNeedData.editGet'></el-input>
        </el-form-item>

        <el-form-item label="图文图标：" v-show="ruleForm.type == 1 || ruleForm.type == '群发消息'">
          <el-upload class="avatar-uploader" action="apis/news/newsMedia.api" :http-request='submitPic' :on-success="handleAvatarSuccess" :show-file-list="false">
            <img v-if="mediaUrl" :src="mediaUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 图文链接 -->
        <el-form-item :label="titleData.urlName">
          <el-input @blur="itemPreserve" v-model="ruleForm.sourceUrl" :class="{ready_only:newsReleaseEditNeedData.editGet}" :readonly='newsReleaseEditNeedData.editGet'></el-input>
        </el-form-item>

        <el-form-item label="是否显示封面：" v-show="ruleForm.type == 1 || ruleForm.type == '群发消息'">
          <el-radio @click="itemPreserve" v-model="ruleForm.showCoverPic" label='1' :disabled='newsReleaseEditNeedData.editGet'>是</el-radio>
          <el-radio @click="itemPreserve" v-model="ruleForm.showCoverPic" label='0' :disabled='newsReleaseEditNeedData.editGet'>否</el-radio>
        </el-form-item>

        <el-form-item label="摘要：" v-show="ruleForm.type == 1 || ruleForm.type == '群发消息'">
          <el-input @blur="itemPreserve" v-model="ruleForm.digest" :class="{ready_only:newsReleaseEditNeedData.editGet}" :readonly='newsReleaseEditNeedData.editGet'></el-input>
        </el-form-item>
        <!-- 图文内容 -->
        <el-form-item :label="titleData.content">
          <!-- <el-input @blur="itemPreserve" type="textarea" v-model="ruleForm.content" @focus="openCkEditor" :class="{ready_only:newsReleaseEditNeedData.editGet}" :readonly='ruleForm.type=="2"?false:true'></el-input> -->
        </el-form-item>

      </el-form>
    </div>

    <div class="edit_box" v-if="ckEditorShow && ruleForm.type == 1 || ruleForm.type == '群发消息'">
      <!-- <InformationReleaseManagementEdit ref="InformationReleaseManagementEdit"></InformationReleaseManagementEdit> -->
      <fuwenben ref="fuwenben" :value="ckEditorContent"></fuwenben>
    </div>

  </div>
</template>
 
 <script>
import InformationReleaseManagementEdit from './InformationReleaseManagementEdit'
import fuwenben from './fuwenben'
import CKEDITOR from 'CKEDITOR';
import axios from 'axios'
export default {
  name: "newsReleaseEdit",
  components: {
    InformationReleaseManagementEdit,
    fuwenben
  },
  props: ['newsReleaseEditNeedData'],
  data() {
    return {
      fileList: {},
      ckEditorShow: false,
      ckEditorContent: '',
      mediaUrl: false,
      clickReturn: true,
      dialogVisible: false,
      databaseData: [],
      // 群发消息列表
      gNewsList: [],
      // 左侧当前点击item的下标
      itemIndex: 0,
      titleData: {
        title: '图文标题：',
        urlName: '图文链接：',
        content: '图文内容：'
      },
      ruleForm: {
        // 消息类型
        type: '1',
        // 图文标题
        title: '',
        // 图文图标(调接口后拿到的id)
        mediaId: '',
        // 图文内容
        content: '',
        // 是否显示封面
        showCoverPic: '1',
        // 图文链接
        sourceUrl: '',
        // 摘要
        digest: '',
      },
      // rules: {
      //   type: [
      //     { required: true, message: '请选择消息类型', trigger: 'change' },
      //   ],
      //   title: [
      //     { required: true, message: '请输入标题', trigger: 'blur' }
      //   ],
      // },
      id: '',
    }
  },
  mounted() {
    this.imgUrl = imgUrl + '/fileService/fileUpload'
    console.log(this.newsReleaseEditNeedData);
    if (this.newsReleaseEditNeedData.content == 'edit' || this.newsReleaseEditNeedData.content == 'see') {
      this.gtetFormData()
      this.ckEditorShow = true
    }
    if (this.newsReleaseEditNeedData.content == 'add') {
      this.ckEditorShow = true
      this.addNews()
      this.openCkEditor()
    }
  },
  watch: {
    ruleForm: {
      handler(newName, oldName) {
        if (newName.type == '1' || newName.type == '群发消息') {
          this.titleData.title = '图文标题：'
          this.titleData.urlName = '图文链接：'
          this.titleData.content = '图文内容:'
        } else {
          this.titleData.title = '标题：'
          this.titleData.urlName = '链接：'
          this.titleData.content = '内容:'
        }
      },
      deep: true,
    }
  },
  methods: {
    openCkEditor() {
      // this.ckEditorShow = true;
      let _this = this
      // 给富文本插入自定义的按钮
      if ($('.imp_img').length <= 0) {
        setTimeout(() => {
          let div = '<el-button size="mini" style="margin-left:1%" type="primary"">插入图片：</el-button><input class="imp_img" type="file">';
          $('.cke_toolbox').prepend(div)
          $('.imp_img').change(function (e) {
            let formData = new FormData()
            formData.append("multipartFile", e.target.files[0])
            formData.append("token", localStorage.getItem('token'))
            _this.$api.fetch({
              params: formData,//参数
              apiUrl: '/news/contentMediaUrl.api',//接口地址
            }).then(res => {
              var content = _this.$refs.fuwenben.getContent();
              var text = content + '<img src="' + res + '"/>'
              _this.$refs.fuwenben.setContent(text)
            })
          })
        }, 500);
      }

    },
    // 单个查询
    gtetFormData() {
      var _this = this;
      let params = {
        'data': this.newsReleaseEditNeedData.id
      }
      _this.$api.fetch({
        params: params,//参数
        apiUrl: '/news/wxNewsQuery.api',//接口地址
      }).then(res => {
        _this.id = res.id
        _this.ruleForm.type = res.type + ''
        _this.ruleForm.title = res.title

        if (res.type == '1') {

          // 生成微信内容模板
          for (let i = 0; i < res.gNewsList.length; i++) {
            _this.addNews()
          }
          // 微信内容数组赋值
          _this.gNewsList = res.gNewsList
          for (let i = 0; i < _this.gNewsList.length; i++) {
            // 是否显示封面(转换)
            if (_this.gNewsList[i].showCoverPic) {
              _this.gNewsList[i].showCoverPic = '1'
            } else {
              _this.gNewsList[i].showCoverPic = '0'
            }
            // 加type
            _this.gNewsList[i].type = '1'
          }
          console.log(_this.gNewsList);


          // 添加以下代码将微信内容div变成大的微信预览内容
          $('.edit-item').eq(0).addClass("edit-item-first")
          $('.edit-item').eq(0).find('img').css('display', 'none')
          // 微信内容标题与图标数据渲染
          $('.edit-item').eq(0).find('.item-left').text(res.gNewsList[0].title)
          $('.edit-item').eq(0).css({
            'background-image': 'url(' + res.gNewsList[0].mediaUrl + ')',
            'background-repeat': 'no-repeat',
            'background-size': '100% 100%'
          })
          for (let i = 1; i < $('.edit-item').length; i++) {
            $('.edit-item').eq(i).find('.item-left').text(res.gNewsList[i].title)
            $('.edit-item').eq(i).find('img').attr('src', res.gNewsList[i].mediaUrl)
          }

          _this.ruleForm.mediaId = res.gNewsList[0].mediaId
          _this.ruleForm.mediaUrl = res.gNewsList[0].mediaUrl
          _this.ruleForm.sourceUrl = res.gNewsList[0].sourceUrl
          _this.ruleForm.digest = res.gNewsList[0].digest
          if (res.gNewsList[0].showCoverPic) {
            _this.ruleForm.showCoverPic = '1'
          } else {
            _this.ruleForm.showCoverPic = '0'
          }

          // 查看
          if (_this.newsReleaseEditNeedData.content == 'see') {
            for (let i = 0; i < $('.edit-item').length; i++) {
              // 隐藏右侧删除、上移、下移按钮
              $('.edit-item').eq(i).find('.delete-box').css('display', 'none')
              $('.edit-item').eq(i).find('.up-box').css('display', 'none')
              $('.edit-item').eq(i).find('.down-box').css('display', 'none')
              // 隐藏右侧新建消息按钮
              $('.item-add').css('display', 'none')
            }
          }
        } else {
          _this.ruleForm.content = res.content
          _this.ruleForm.sourceUrl = res.url
        }

        // _this.ckEditorShow = true
        if ($('.imp_img').length <= 0) {
          setTimeout(() => {
            let div = '<el-button size="mini" style="margin-left:1%" type="primary"">插入图片：</el-button><input class="imp_img" type="file">';
            $('.cke_toolbox').prepend(div)
            _this.$refs.fuwenben.setContent(res.gNewsList[0].content)
            $('.imp_img').change(function (e) {
              let formData = new FormData()
              formData.append("multipartFile", e.target.files[0])
              formData.append("token", localStorage.getItem('token'))
              _this.$api.fetch({
                params: formData,//参数
                apiUrl: '/news/contentMediaUrl.api',//接口地址
              }).then(res => {
                var content = _this.$refs.fuwenben.getContent();
                var text = content + '<img src="' + res + '"/>'
                _this.$refs.fuwenben.setContent(text)
              })
            })
          }, 1000);
        }
      })
    },
    // 改变消息类型
    changeType(type) {
      this.ruleForm.type = type
    },

    // 输入框内容改变时实时保存消息数据
    itemPreserve() {
      if ($('.imp_img').length <= 0) {
        this.ruleForm.content = ''
      } else {
        this.ruleForm.content = this.$refs.fuwenben.getContent()
      }
      this.gNewsList[this.itemIndex] = this.ruleForm
      $('.edit-item').eq(this.itemIndex).find('.item-left').text(this.gNewsList[this.itemIndex].title)
    },
    // 微信内容标题和标题输入框内容实时一致
    changeTitle() {
      $('.edit-item').eq(this.itemIndex).find('.item-left').text(this.gNewsList[this.itemIndex].title)
    },

    // 微信内容加点击事件
    editItemClick(index) {
      var _this = this

      $('.edit-item').eq(index).click(function (e) {
        // 获取当前点击的微信内容div的下标
        _this.itemIndex = index

        if ($('.edit-item').length == 1) {
          $('.edit-item').eq(0).find('.delete-box').css('display', 'none')
          $('.edit-item').eq(0).find('.up-box').css('display', 'none')
          $('.edit-item').eq(0).find('.down-box').css('display', 'none')
        } else {
          $('.edit-item').eq(0).find('.delete-box').css('display', 'inline-block')
          $('.edit-item').eq(0).find('.down-box').css('display', 'inline-block')
        }
        // 加绿色边框和显示删除按钮
        for (let i = 0; i < $('.edit-item').length; i++) {
          $('.edit-item').eq(i).css('border', 'none')
          $('.edit-item').eq(i).find('.delete-box').css('display', 'none')
          $('.edit-item').eq(i).find('.up-box').css('display', 'none')
          $('.edit-item').eq(i).find('.down-box').css('display', 'none')
        }
        $('.edit-item').eq(index).css('border', '2px solid #44b549')

        // 当只有一个微信内容时，隐藏所有右侧按钮
        if ($('.edit-item').length !== 1) {
          $('.edit-item').eq(index).find('.delete-box').css('display', 'inline-block')
          // 向上箭头和向下箭头的显示与隐藏
          if (_this.itemIndex == 0) {
            $('.edit-item').eq(_this.itemIndex).find('.up-box').css('display', 'none')
            $('.edit-item').eq(_this.itemIndex).find('.down-box').css('display', 'inline-block')
          } else if (_this.itemIndex == ($('.edit-item').length - 1)) {
            $('.edit-item').eq(_this.itemIndex).find('.up-box').css('display', 'inline-block')
            $('.edit-item').eq(_this.itemIndex).find('.down-box').css('display', 'none')
          } else {
            $('.edit-item').eq(_this.itemIndex).find('.up-box').css('display', 'inline-block')
            $('.edit-item').eq(_this.itemIndex).find('.down-box').css('display', 'inline-block')
          }
        }

        for (let i = 0; i < $('.edit-item').length; i++) {
          if (_this.newsReleaseEditNeedData.content == 'see') {
            // 隐藏右侧删除、上移、下移按钮
            $('.edit-item').eq(i).find('.delete-box').css('display', 'none')
            $('.edit-item').eq(i).find('.up-box').css('display', 'none')
            $('.edit-item').eq(i).find('.down-box').css('display', 'none')
          }
        }

        if ($('.imp_img').length <= 0) {
          _this.ruleForm.content = ''
        } else {
          _this.ruleForm.content = _this.$refs.fuwenben.getContent()
        }
        _this.ruleForm = _this.gNewsList[index]
        // 展示图标
        if (_this.gNewsList[index].mediaUrl == '') {
          _this.mediaUrl = false
        } else {
          _this.mediaUrl = _this.gNewsList[index].mediaUrl
        }
        // 填充富文本
        if (_this.ckEditorShow) {
          _this.$refs.fuwenben.setContent(_this.ruleForm.content)
        }
        // _this.$refs.fuwenben.setContent(_this.ruleForm.content)


        // 删除所有删除按钮的点击事件（先删后加，使点击事件和div不错乱）
        for (let i = 0; i < 8; i++) {
          $('.edit-item').eq(i).find('.delete-box').unbind()
        }
        _this.$nextTick(function () {
          // 删除按钮点击事件
          for (let j = 0; j < $('.edit-item').length; j++) {
            _this.deletItemClick(j)
          }
        })
      })
    },
    // 删除按钮点击事件
    deletItemClick(index) {
      var _this = this
      $('.edit-item').eq(index).find('.delete-box').click(function (e) {
        // 阻止事件冒泡
        e.stopPropagation();
        $(this).parent().parent().remove()
        // 此处会多次执行，所以加该判断避免多次删除
        if (_this.gNewsList.length != $('.edit-item').length) {
          _this.gNewsList.splice(index, 1)
        }

        // 删除所有微信内容的点击事件（先删后加，使点击事件和div不错乱）
        for (let i = 0; i < 8; i++) {
          $('.edit-item').eq(i).unbind()
        }
        _this.$nextTick(function () {
          // 微信内容加点击事件
          for (let j = 0; j < $('.edit-item').length; j++) {
            _this.editItemClick(j)
          }
          // 删除一个微信内容后自动点击上一个微信内容
          if (index > 0) {
            $('.edit-item').eq(index - 1).click()
            if (index - 1 == 0) {
              // 添加以下代码将微信内容div变成大的微信预览内容
              $('.edit-item').eq(0).addClass("edit-item-first")
              $('.edit-item').eq(0).find('img').css('display', 'none')
            }
          } else {
            $('.edit-item').eq(0).click()

            // 添加以下代码将微信内容div变成大的微信预览内容
            $('.edit-item').eq(0).addClass("edit-item-first")
            $('.edit-item').eq(0).find('img').css('display', 'none')
          }
        })
        // 新建消息的显示与隐藏
        if ($('.edit-item').length < 5) {
          $('.item-add').css('display', 'block')
        }
      })
    },
    // 向上按钮点击事件
    upItemClick(index) {
      var _this = this
      $('.edit-item').eq(index).find('.up-box').click(function (e) {
        // 阻止事件冒泡（点击向上按钮时，触发了微信内容点击事件）
        e.stopPropagation();
        // gNewsList数组对象位置调换
        let newsItem1 = _this.gNewsList[index - 1]
        let newsItem2 = _this.gNewsList[index]
        _this.gNewsList[index - 1] = newsItem2
        _this.gNewsList[index] = newsItem1
        console.log(index);
        console.log(_this.gNewsList);

        // 微信内容标题上移
        $('.edit-item').eq(index - 1).find('.item-left').text(_this.gNewsList[index - 1].title)
        $('.edit-item').eq(index).find('.item-left').text(_this.gNewsList[index].title)

        // 微信内容图标上移
        if (index - 1 == 0) {
          $('.edit-item').eq(0).css({
            'background-image': 'url(' + _this.gNewsList[0].mediaUrl + ')',
            'background-repeat': 'no-repeat',
            'background-size': '100% 100%'
          })
          $('.edit-item').eq(index).find('img').attr('src', _this.gNewsList[index].mediaUrl)
        } else {
          $('.edit-item').eq(index - 1).find('img').attr('src', _this.gNewsList[index - 1].mediaUrl)
          $('.edit-item').eq(index).find('img').attr('src', _this.gNewsList[index].mediaUrl)
        }

        // 触发微信内容点击事件
        $('.edit-item').eq(index - 1).click()
      })
    },

    // 向下按钮点击事件
    downItemClick(index) {
      var _this = this
      $('.edit-item').eq(index).find('.down-box').click(function (e) {
        // 阻止事件冒泡（点击向下按钮时，触发了微信内容点击事件）
        e.stopPropagation();
        // gNewsList数组对象位置调换
        let newsItem1 = _this.gNewsList[index]
        let newsItem2 = _this.gNewsList[index + 1]
        _this.gNewsList[index] = newsItem2
        _this.gNewsList[index + 1] = newsItem1
        console.log(index);
        console.log(_this.gNewsList);

        // 微信内容标题下移
        $('.edit-item').eq(index).find('.item-left').text(_this.gNewsList[index].title)
        $('.edit-item').eq(index + 1).find('.item-left').text(_this.gNewsList[index + 1].title)

        // 微信内容图标下移
        if (index == 0) {
          $('.edit-item').eq(0).css({
            'background-image': 'url(' + _this.gNewsList[0].mediaUrl + ')',
            'background-repeat': 'no-repeat',
            'background-size': '100% 100%'
          })
          $('.edit-item').eq(index + 1).find('img').attr('src', _this.gNewsList[index + 1].mediaUrl)
        } else {
          $('.edit-item').eq(index).find('img').attr('src', _this.gNewsList[index].mediaUrl)
          $('.edit-item').eq(index + 1).find('img').attr('src', _this.gNewsList[index + 1].mediaUrl)
        }

        // 触发微信内容点击事件
        $('.edit-item').eq(index + 1).click()
      })
    },
    // 新建消息
    addNews() {
      var _this = this
      var div = '<div class="edit-item"><div class="item-left">标题</div><img src="../../../static/img/gray.png" height="50px"><div class="btn-box"><div class="delete-box"><div class="el-icon-delete"></div></div><div class="up-box"><div class="el-icon-top"></div></div><div class="down-box"><div class="el-icon-bottom"></div></div></div></div>'
      $('.bottom-line').before(div)
      this.gNewsList.push({
        "title": '',
        "mediaId": '1',
        "content": '',
        "sourceUrl": '',
        "digest": '',
        "showCoverPic": '1',

        "type": '1',
        // 图片地址
        "mediaUrl": '',
      })

      // 删除所有点击事件（先删后加，使点击事件和div不错乱）
      for (let i = 0; i < 8; i++) {
        $('.edit-item').eq(i).unbind()
        $('.edit-item').eq(i).find('.delete-box').unbind()
        $('.edit-item').eq(i).find('.up-box').unbind()
        $('.edit-item').eq(i).find('.down-box').unbind()
      }

      // 给微信内容、删除按钮、向上按钮、向下按钮 添加点击事件
      for (let i = 0; i < $('.edit-item').length; i++) {

        // 微信内容加点击事件
        _this.editItemClick(i)

        // 删除按钮点击事件
        _this.deletItemClick(i)

        // 向上按钮点击事件
        _this.upItemClick(i)

        // 向下按钮点击事件
        _this.downItemClick(i)
      }

      // 生成第一个消息时自动选中该消息
      _this.$nextTick(function () {
        if ($('.edit-item').length == 1) {
          $('.edit-item').eq(0).click()

          // 添加以下代码将微信内容div变成大的微信预览内容
          $('.edit-item').eq(0).addClass("edit-item-first")
          $('.edit-item').eq(0).find('img').css('display', 'none')
        }
      })
      // 新建消息的显示与隐藏
      if ($('.edit-item').length >= 5) {
        $('.item-add').css('display', 'none')
      }
    },

    getFile(e) {

    },
    handleRemove(file, fileList) {
    },
    handlePictureCardPreview(file) {
      this.mediaUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file) {
      // this.mediaUrl = URL.createObjectURL(file.raw);
    },
    submitPic(item) {
      let _this = this
      let formData = new FormData()
      formData.append("file", item.file)
      formData.append("token", localStorage.getItem('token'))

      _this.$api.fetch({
        params: formData,//参数
        apiUrl: '/news/newsMedia.api',//接口地址
      }).then(res => {
        _this.ruleForm.mediaId = res.mediaId
        _this.getFtoken(item)



        // _this.mediaUrl = res.url
        // _this.gNewsList[_this.itemIndex].mediaUrl = res.url
        // if (_this.itemIndex == 0) {
        //   $('.edit-item').eq(0).css({
        //     'background-image': 'url(' + _this.gNewsList[_this.itemIndex].mediaUrl + ')',
        //     'background-repeat': 'no-repeat',
        //     'background-size': '100% 100%'
        //   })
        // } else {
        //   $('.edit-item').eq(_this.itemIndex).find('img').attr('src', _this.gNewsList[_this.itemIndex].mediaUrl)
        // }
      })
    },
    // 获取ftoken
    getFtoken(item) {
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
          // url: 'http://10.13.1.248:10041/fileService/fileUpload',
          method: 'post',
          timeout: 60000,
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
          data: formData
        };
        axios(RequestObj).then(res => {
          if (res.status === 200) {
            if (res.data.code === 0) {
              _this.mediaUrl = window.imgUrl + '/fileService/fileDownload?path=' + res.data.data.path
              _this.gNewsList[_this.itemIndex].mediaUrl = window.imgUrl + '/fileService/fileDownload?path=' + res.data.data.path
              if (_this.itemIndex == 0) {
                $('.edit-item').eq(0).css({
                  'background-image': 'url(' + _this.gNewsList[_this.itemIndex].mediaUrl + ')',
                  'background-repeat': 'no-repeat',
                  'background-size': '100% 100%'
                })
              } else {
                $('.edit-item').eq(_this.itemIndex).find('img').attr('src', _this.gNewsList[_this.itemIndex].mediaUrl)
              }
            }
          }
        }, err => {

        }).catch(error => {

        })
      })
    },
    // 富文本保存按钮
    contentSubmit() {
      // this.$refs.InformationReleaseManagementEdit.getContent()
      this.$refs.fuwenben.getContent()
    },
    //保存按钮
    submitForm(formName) {
      // 解决用户编辑完最后一个富文本之后直接提交，富文本内容没保存的问题
      this.itemPreserve()
      // return
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.type == '1') {
            // if ($('.imp_img').length <= 0) {
            //   this.ruleForm.content = ''
            // } else {
            //   this.ruleForm.content = this.$refs.fuwenben.getContent()
            // }
            // 群发消息参数
            var params = {
              "data": {
                "type": this.ruleForm.type,
                "title": this.gNewsList[0].title,
                "gNewsList": this.gNewsList,
                // "gNewsList": [
                //   {
                //     "title": this.ruleForm.title,
                //     "mediaId": this.ruleForm.mediaId,
                //     "content": this.ruleForm.content,
                //     "sourceUrl": this.ruleForm.sourceUrl,
                //     "digest": this.ruleForm.digest,
                //   }
                // ],
              },
            }
            for (let i = 0; i < _this.gNewsList.length; i++) {
              // 是否显示封面
              if (_this.gNewsList[i].showCoverPic == '1') {
                params.data.gNewsList[i].showCoverPic = true
              } else {
                params.data.gNewsList[i].showCoverPic = false
              }

              // base64加密（content）
              // params.data.gNewsList[i].content = window.btoa(window.encodeURIComponent(params.data.gNewsList[i].content))
              // params.data.gNewsList[i].content = window.encodeURI(params.data.gNewsList[i].content)

              params.data.gNewsList[i].content = params.data.gNewsList[i].content.replace(/</g, "&lt")
              params.data.gNewsList[i].content = params.data.gNewsList[i].content.replace(/>/g, "&gt")
              params.data.gNewsList[i].content = params.data.gNewsList[i].content.replace(/=/g, "%3D")
            }
            // alert(params.data.gNewsList[0].content)
            // alert(decodeURIComponent(params.data.gNewsList[0].content))
            // 删除gNewsList对象中的type、imageUrl属性（后端用不到，会报错）
            for (let i = 0; i < _this.gNewsList.length; i++) {
              // 是否显示封面
              delete _this.gNewsList[i].type
            }
          } else {
            // 模板消息参数
            var params = {
              "data": {
                "type": this.ruleForm.type,
                "title": this.ruleForm.title,
                "url": this.ruleForm.sourceUrl,
                "content": _this.ruleForm.content,
              },
            }
          }

          // alert(window.btoa(window.encodeURIComponent(_this.ruleForm.content)))
          console.log(params);
          var url = ''
          if (this.newsReleaseEditNeedData.content == 'add') {// 添加-保存
            url = '/news/wxNewsAdd.api'
          } else if (this.newsReleaseEditNeedData.content == 'edit') {// 编辑-保存
            params.data.id = this.id
            url = '/news/wxNewsUpdate.api'
          }
          this.$api.fetch({
            params: params,//参数
            apiUrl: url,//接口地址
          }).then(res => {
            _this.$parent.closeDialog()
            _this.$parent.init()
            _this.$parent.newsReleaseEditNeedData.type = '1'
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
.newsReleaseEdit {
  .edit_box {
    width: 66%;
    float: right;
  }
  // height: 100%;
  .news-content {
    width: 100%;
    display: flex;
  }
  .myNewsEdit {
    flex: 0.5;
    background-color: #f6f8f9;
    width: 30%;
    display: inline-block;
    .editBox {
      background: white;
      margin-left: 15px;
      margin-top: 10px;
      width: 320px;
      // height: 500px;
      box-shadow: 0 0 8px 0 rgba(229, 229, 229, 0.5);
      .edit-item {
        position: relative;
        padding: 10px;
        height: 60px;
        .item-left {
          height: 60px;
          line-height: 60px;
          display: inline-block;
          font-size: 16px;
        }
        img {
          float: right;
        }
        .btn-box {
          position: absolute;
          left: 105%;
          top: 31%;
          display: flex;
        }
        .delete-box {
          flex: 1;
          height: 40px;
          width: 40px;
          border-radius: 20px;
          background: white;
          text-align: center;
          line-height: 40px;
          font-size: 18px;
          display: none;
          margin-right: 10px;
          cursor: pointer;
        }
        .up-box {
          flex: 1;
          height: 40px;
          width: 40px;
          border-radius: 20px;
          background: white;
          text-align: center;
          line-height: 40px;
          font-size: 18px;
          display: inline-block;
          display: none;
          margin-right: 10px;
          cursor: pointer;
        }
        .down-box {
          flex: 1;
          height: 40px;
          width: 40px;
          border-radius: 20px;
          background: white;
          text-align: center;
          line-height: 40px;
          font-size: 18px;
          display: inline-block;
          display: none;
          cursor: pointer;
        }
      }
      .edit-item-first {
        height: 125px;
        background-image: url();
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-color: #e1e1e1;
        .item-left {
          height: 125px;
          line-height: 210px;
        }
      }
      .bottom-line {
        width: 90%;
        height: 1px;
        background: #e4e8eb;
        margin: 0 auto;
        margin-top: 20px;
      }
      .item-add {
        width: 100%;
        font-size: 16px;
        color: #9a9a9a;
        margin: 0 auto;
        padding: 10px 0 10px 0;
        text-align: center;
        cursor: pointer;
      }
    }
  }
  .demo-form {
    flex: 1;
    width: 40%;
    display: inline-block;
    // margin: 0 auto;
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
}
</style>