
<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container editor-container">
    <!-- 工具栏容器 -->
    <div id="toolbar-container"></div>

    <!-- 编辑器容器 -->
    <div id="editor">
      <p>请输入编辑内容...</p>
    </div>
  </div>
</template>
<script src="//cdn.ckeditor.com/4.13.0/standard/ckeditor.js"></script>
<script>
import CKEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn'
export default {
  data() {
    return {
      editor: null,//编辑器实例
      fullscreen: true,
    }
  },
  mounted() {
    this.initCKEditor()
    var CHtml= CKEditor.instances.editor.getData()
    console.log(CHtml);
  },
  methods: {
    initCKEditor() {
      CKEditor.create(document.querySelector('#editor'), {
        ckfinder: {
          uploadUrl: '/admin/Upload/uploadUrl'
          //后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段
        },
        language: 'zh-cn'
      }).then(editor => {
        const toolbarContainer = document.querySelector('#toolbar-container');
        toolbarContainer.appendChild(editor.ui.view.toolbar.element);
        this.editor = editor //将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
      }).catch(error => {
        console.error(error);
      });
    },
    getContent() {
      console.log(CKEditor);
      var CHtml= CKEditor.instances.content.getData();
      
    },
  }
}
</script>

<style scoped>
.tinymce-container {
  position: relative;
}
.tinymce-container >>> .mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>
