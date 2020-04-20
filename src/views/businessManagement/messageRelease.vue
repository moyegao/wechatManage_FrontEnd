
<template>
  <div class="messageRelease">
    <div class="main-content">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-show="bankLinkShow">
          <el-button class="el-icon-plus" type="primary" @click="appAdd('scope', 'add')" size="mini" v-if="roleId != 4">新建</el-button>
        </div>
        <div class="bread-contain-right" v-show="messageReleaseEditVisible">
          <el-button size="mini" type="primary" @click="submit(0)" v-if="preserveShow">保存</el-button>
          <el-button size="mini" type="primary" @click="submit(1)" v-if="submitShow">提交</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        </div>
      </div>
      <div class="kl-table" v-show="bankLinkShow">

        <el-table stripe border :data="appServerData.list" v-if="tableShow" :max-height="maxHeight">
          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="type" label="信息类型" min-width="100">
          </el-table-column>

          <el-table-column prop="title" label="信息标题" min-width="100">
          </el-table-column>

          <el-table-column prop="publisher" label="发布人" min-width="100">
          </el-table-column>

          <el-table-column prop="publishTime" min-width="100" label="发布时间">
          </el-table-column>

          <el-table-column prop="statusName" min-width="100" label="状态">
          </el-table-column>

          <el-table-column label="操作" width="200px" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="appAdd(scope.row, 'see')">查看</el-button>
              <el-button type="text" @click="appAdd(scope.row, 'edit')" v-if="(scope.row.status == 0 || scope.row.status == 1) && roleId != 4">编辑</el-button>
              <!-- <span style="color:#e6e6e6;" v-if="scope.row.status!==0 && roleId == 4">|</span> -->
              <el-button type="text" @click="release(scope.row)" v-if="scope.row.status==1 && roleId == 4">审核并发布</el-button>
              <!-- <el-button type="text" disabled v-else-if="scope.row.status==2 && roleId == 4">已发布</el-button>
              <span style="color:#e6e6e6;" v-if="scope.row.status!==0 && roleId == 4">|</span> -->
              <el-button type="text" @click="deleteData(scope.row)" v-if="roleId != 4">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableQuery.page" :page-sizes="[50, 100, 500, 1000]" :page-size="tableQuery.pageCount" layout="total, sizes, prev, pager, next, jumper" :total="appServerData.total">
          </el-pagination>
        </div>
      </div>
      <div class="eidt_box" v-if="messageReleaseEditVisible">
        <messageReleaseEdit ref="messageReleaseEdit" :messageReleaseEditNeedData="messageReleaseEditNeedData"></messageReleaseEdit>
      </div>
    </div>
  </div>
</template>

<script>
import messageReleaseEdit from "./messageReleaseEdit"
export default {
  name: "messageRelease",
  components: {
    messageReleaseEdit
  },
  data() {
    return {
      submitShow: false,
      preserveShow: false,
      roleId: localStorage.getItem('roleId'),
      tableShow: true,
      tableQuery: {
        page: 1,
        pageCount: 50
      },
      maxHeight: 0,
      appServerData: [],
      showSelectIndex: -1,
      formData: '',
      crumbsData: {  //面包屑
        titleList: [
          { title: '信息发布', path: '/businessManagement/messageRelease' },
          // {title:'银行直联',method:()=>{window.histroy.back()}}
        ],

      },
      bankLinkShow: true,
      messageReleaseEditVisible: false,
      messageReleaseEditNeedData: {},
    }
  },
  mounted() {
    this.init()
    this.$nextTick(() => {
      $("#app #firstNav #nav .navList").children('li').eq(1).addClass("active").siblings().removeClass("active")
    })
  },
  beforeDestroy() {
    $("#app #firstNav #nav .navList").children('li').eq(1).removeClass("active")
  },
  methods: {
    // 初始化列表数据
    init() {
      let _this = this
      let params = {
        "data": {
          "page": this.tableQuery.page,
          "pageCount": this.tableQuery.pageCount,
        },
      }
      this.$api.fetch({
        params: params,
        apiUrl: '/info/infoPubList.api',
      }).then(res => {
        _this.appServerData = res;
        _this.common.changeTable(_this, '.messageRelease .kl-table', ['.messageRelease .bread-contain', '.messageRelease .block'])
      })
    },
    // 格式化状态
    formatStatus(row) {
      return row.status === 1 ? "启用" : "禁用"
    },
    submit(status) {
      this.messageReleaseEditNeedData.status = status
      this.$refs.messageReleaseEdit.submitForm('ruleForm')
    },
    // 操作列按钮点击事件
    appAdd(item, index) {
      console.log(item);
      this.bankLinkShow = false;
      this.messageReleaseEditVisible = true;
      if (index == 'see') {
        this.$set(this.crumbsData.titleList, "1", { title: '查看', method: () => { window.histroy.back() } });
        this.submitShow = false
        this.preserveShow = false
        this.messageReleaseEditNeedData = item
        this.messageReleaseEditNeedData.editGet = true
        this.messageReleaseEditNeedData.content = 'see'
      } else if (index == 'add') {
        this.submitShow = true
        this.preserveShow = true
        this.$set(this.crumbsData.titleList, "1", { title: '新建', method: () => { window.histroy.back() } });
        this.messageReleaseEditNeedData.editGet = false
        this.messageReleaseEditNeedData.content = 'add'
      } else if (index == 'edit') {
        this.submitShow = true
        if (item.status == 1) {
          this.preserveShow = false
        }else{
          this.preserveShow = true
        }
        this.$set(this.crumbsData.titleList, "1", { title: '编辑', method: () => { window.histroy.back() } });
        this.messageReleaseEditNeedData = item
        this.messageReleaseEditNeedData.editGet = false
        this.messageReleaseEditNeedData.content = 'edit'
      }

    },
    // 发布按钮
    release(item) {
      let _this = this
      this.$confirm('确定审核该条信息？')
        .then(() => {
          let params = {
            "data": {
              id: item.id
            }
          }
          this.$api.fetch({
            params: params,//参数
            apiUrl: '/info/infoPubApprove.api',//接口地址
          }).then(res => {
            this.init()
          })
        })
        .catch(() => {
          return
        });

    },
    // 展示单元格内部选项框
    showSelect(scope) {
      this.showSelectIndex = scope.$index
    },
    deleteData(item) {
      let _this = this
      this.$confirm('确定删除该条信息？')
        .then(() => {
          let params = {
            "data": item.id
          }
          this.$api.fetch({
            params: params,//参数
            apiUrl: '/info/infoPubDelete.api',//接口地址
          }).then(res => {
            this.init()
          })
        })
        .catch(() => {
          return
        });
    },
    // 单元格内下拉框点击事件
    editor(scope) {
      this.formData = scope.row
      // this.$store.commit('saveFormData',this.formData)
      // sessionStorage.setItem('formData',JSON.stringify(this.formData));
      this.parentAppDialogVisible = true
    },
    indexMethod(index) {
      return index + 1
    },
    handleSizeChange(val) { //显示多少数据一页
      this.tableQuery.pageCount = val
      this.tableQuery.page = 1
      this.init()
    },
    handleCurrentChange(val) {  //显示多少页码
      this.tableQuery.page = val
      this.init()
    },
    closeDialog() {
      this.bankLinkShow = true;
      this.messageReleaseEditVisible = false;
      this.crumbsData.titleList.pop();
    }
  },
  watch: {
    maxHeight() {
      this.tableShow = false
      this.$nextTick(() => {
        this.tableShow = true
      })
    }
  }
}
</script>

<style lang="scss">
.messageRelease {
  width: 100%;
  height: 100%;
}
.eidt_box {
  overflow-y: scroll;
  height: 100%;
}
</style>

