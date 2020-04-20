
<template>
  <div class="automaticRecovery">
    <div class="main-content">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-if="!automaticRecoveryEditVisible">
          <el-button size="mini" type="primary" @click="synchronize">同步</el-button>
          <el-button size="mini" type="primary" @click="appAdd('scope', 'add')">添加</el-button>
        </div>
        <div class="bread-contain-right" v-if="automaticRecoveryEditVisible">
          <el-button size="mini" type="primary" @click="submit" v-if="submitShow">保存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        </div>
      </div>
      <div v-if="automaticRecoveryEditVisible">
        <automaticRecoveryEdit ref="automaticRecoveryEdit" :automaticRecoveryEditNeedData="automaticRecoveryEditNeedData"></automaticRecoveryEdit>
      </div>
      <div class="kl-table" v-if="bankLinkShow">

        <div class="toolbar">
          <!-- <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
                <el-form-item class="form-left">
                </el-form-item>
                
              
              <el-form-item class="form-right">
              </el-form-item>
            </el-form> -->
        </div>

        <el-table stripe border :data="appServerData" v-if="tableShow" :max-height="maxHeight">
          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="keyword" label="关键字" min-width="100">
          </el-table-column>
          <el-table-column prop="content" label="回复内容" min-width="100">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="100">
          </el-table-column>
          <el-table-column prop="updateTime" label="修改时间" min-width="100">
          </el-table-column>
          <el-table-column prop="statusName" label="状态" min-width="100">
          </el-table-column>

          <el-table-column label="操作" width="150px" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="appAdd(scope.row, 'see')">查看</el-button>
              <el-button type="text" @click="appAdd(scope.row, 'edit')">编辑</el-button>
              <el-button type="text" @click="appDelete(scope.row)">删除</el-button>

            </template>
          </el-table-column>
        </el-table>
        <!-- <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="tableQuery.page"
            :page-sizes="[20, 100, 500, 1000]"
            :page-size="tableQuery.pageCount"
            layout="total, sizes, prev, pager, next, jumper"
            :total="appServerData.rowCount">
          </el-pagination>
        </div> -->
      </div>

    </div>
  </div>
</template>

<script>
import automaticRecoveryEdit from "./automaticRecoveryEdit"
export default {
  name: "automaticRecovery",
  components: {
    automaticRecoveryEdit
  },
  data() {
    return {
      automaticRecoveryEditNeedData: {},
      submitShow: false,
      formData: {
        factory: '1',
        sort: '1',
        radio: '1',
        beginMonth: [],
        endMonth: [],
        beginYear: [],
        endYear: [],
      },
      factoryOption: [
        {
          label: '南沙',
          value: '1'
        },
        {
          label: '梅州',
          value: '2'
        },
      ],
      sortOption: [
        {
          label: '用户数',
          value: '1'
        },
        {
          label: '水司',
          value: '2'
        },
      ],
      tableShow: true,
      tableQuery: {
        page: 1,
        pageCount: 20
      },
      maxHeight: 0,
      appServerData: [],
      showSelectIndex: -1,
      crumbsData: {  //面包屑
        titleList: [
          { title: '系统管理', path: '/waterManagement/index' },
          { title: '自动回复配置', method: () => { window.histroy.back() } }
        ],

      },
      bankLinkShow: true,
      automaticRecoveryEditVisible: false,
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化列表数据
    init() {
      let _this = this
      let params = {
        "data": {},
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/system/autoReplyList.api',//参数
      }).then(res => {
        _this.appServerData = res;
      })
    },
    // 添加按钮点击事件
    appAdd(item, index) {
      this.formData =
      {
        "title": 'xxx招标成功',
        "content": "",
        "shortName": null,
        "date": "2019-08-09",
        "type": 0
      },
      {
        "title": 'xxx招标成功',
        "content": "",
        "shortName": null,
        "date": "2019-08-09",
        "type": 1
      }
      this.bankLinkShow = false;
      this.automaticRecoveryEditVisible = true;
      if (index == 'see') {
        this.$set(this.crumbsData.titleList, "2", { title: '查看', method: () => { window.histroy.back() } });
        this.submitShow = false;
        this.automaticRecoveryEditNeedData = item;
        this.automaticRecoveryEditNeedData.editGet = true;
        this.automaticRecoveryEditNeedData.content = 'see';
      } else if (index == 'edit') {
        this.$set(this.crumbsData.titleList, "2", { title: '编辑', method: () => { window.histroy.back() } });
        this.submitShow = true;
        this.automaticRecoveryEditNeedData = item;
        this.automaticRecoveryEditNeedData.editGet = false;
        this.automaticRecoveryEditNeedData.content = 'edit';
      } else if (index == 'add') {
        this.$set(this.crumbsData.titleList, "2", { title: '添加', method: () => { window.histroy.back() } });
        this.submitShow = true;
        this.automaticRecoveryEditNeedData = { editGet: false }
        this.automaticRecoveryEditNeedData.content = 'add';
      }

    },
    // 同步按钮点击事件
    synchronize() {
      let _this = this
      this.$confirm('是否同步数据到应用平台?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          "data": {},
        }
        this.$api.fetch({
          params: params,//参数
          apiUrl: '/system/autoReplySyn.api',//参数
        }).then(res => {
          _this.$message({
          type: 'success',
          message: '同步成功!'
        });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消同步'
        });
      });
    },
    // 删除操作
    appDelete(item) {
      let _this = this
      this.$confirm('确定删除该条数据？')
        .then(() => {
          let params = {
            "data": item.id,
          }
          this.$api.fetch({
            params: params,//参数
            apiUrl: '/system/autoReplyDelete.api',//参数
          }).then(res => {
            _this.init();
          })
        })
        .catch(() => {
          return
        });
    },
    // 右上角保存按钮
    submit() {
      if (this.automaticRecoveryEditNeedData.content == 'add') {
        this.$refs.automaticRecoveryEdit.addSubmit();
      } else if (this.automaticRecoveryEditNeedData.content == 'edit') {
        this.$refs.automaticRecoveryEdit.editSubmit();
      }
    },
    // 展示单元格内部选项框
    showSelect(scope) {
      this.showSelectIndex = scope.$index
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
      this.selectTSubSystem()
    },
    handleCurrentChange(val) {  //显示多少页码
      this.tableQuery.page = val
      this.selectTSubSystem()
    },
    closeDialog() {
      this.bankLinkShow = true;
      this.automaticRecoveryEditVisible = false;
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
.automaticRecovery {
  width: 100%;
  height: 100%;
}
</style>

