<template>
  <div class="ckEditor_box">
    <textarea :id="id"></textarea>
  </div>
</template>

<script>
export default {
  name: 'ckeditor4',
  props: ['value'],
  data: function () {
    return {
      id: 'fuwenben',
      ckeditor: null
    }
  },
  mounted() {
    const self = this
    // 渲染编辑器
    self.ckeditor = window.CKEDITOR.replace(self.id)
    // 设置初始内容
    self.ckeditor.setData(self.value)
    // 监听内容变更事件
    self.ckeditor.on('change', function () {
      self.$emit('input', self.ckeditor.getData())
    })
    console.log(this.ckeditor.getData());
    var CHtml = CKEDITOR.instances.fuwenben.getData();
    console.log(CHtml);
  },
  methods: {
    getContent() {
      // var CHtml= CKEDITOR.instances.fuwenben.getData();
      console.log(CKEDITOR.instances.fuwenben.getData());
      return CKEDITOR.instances.fuwenben.getData()
    },
    setContent(content){
      CKEDITOR.instances.fuwenben.setData(content)
    },
  },
  watch: {
    // 监听prop的变化，更新ckeditor中的值
    value: function () {
      if (this.value !== this.ckeditor.getData()) {
        console.log(this.ckeditor.getData());
        this.ckeditor.setData(this.value)
      }
    }
  },
  // 销毁组件前，销毁编辑器
  beforeDestroy: function () {
    // self.ckeditor.destroy()
  }
}
</script>
<style lang="scss">
.ckEditor_box {
  // overflow-y: scroll;
  // height: 100%;
  .cke_contents {
    height: 500px !important;
  }
}
</style>