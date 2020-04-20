
<template>
  <div class="meunSet">
    <div class="main-content">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-show="meunSetEditVisible || meunSetParentEditVisible">
          <el-button size="mini" type="primary" @click="submit" v-if="submitShow">保存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        </div>
        <div class="bread-contain-right" v-show="bankLinkShow">
          <el-button size="mini" type="primary" @click="appAdd('scope', 'addParent')">添加一级菜单</el-button>
          <el-button size="mini" type="primary" @click="menusCreate">生成微信菜单</el-button>
        </div>
      </div>
      <div v-if="meunSetEditVisible">
        <meunSetEdit ref="meunSetEdit" :meunSetEditNeedData='meunSetEditNeedData'></meunSetEdit>
      </div>
      <div v-if="meunSetParentEditVisible">
        <meunSetParentEdit ref="meunSetParentEdit" :meunSetParentEditNeedData='meunSetParentEditNeedData'></meunSetParentEdit>
      </div>
      <div class="kl-table" v-show="bankLinkShow">

        <!-- <div class="toolbar">
          <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
            <el-form-item class="form-left">
            </el-form-item>

            <el-form-item class="form-right">
              <el-button type="primary" @click="appAdd('scope', 'addParent')">添加一级菜单</el-button>
              <el-button type="primary" @click="appAdd">生成微信菜单</el-button>

            </el-form-item>
          </el-form>
        </div> -->

        <el-table stripe border :data="appServerData" v-if="tableShow" :max-height="maxHeight" @selection-change="handleSelectionChange">
          <!-- <el-table-column type="selection" width="55">
          </el-table-column> -->

          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="menusName" min-width="100" label="菜单名称">
          </el-table-column>
          <el-table-column prop="type" min-width="100" label="菜单类型">
          </el-table-column>
          <el-table-column prop="url" min-width="100" label="菜单地址">
          </el-table-column>
          <el-table-column prop="click" min-width="100" label="菜单点击">
          </el-table-column>
          <el-table-column prop="parent" min-width="100" label="父菜单名称">
          </el-table-column>
          <el-table-column prop="sort" min-width="100" label="排序">
          </el-table-column>

          <el-table-column label="操作" width="210px" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="appAdd(scope.row, 'see')">查看</el-button>
              <el-button type="text" @click="appAdd(scope.row, 'edit')">编辑</el-button>
              <el-button type="text" v-if="scope.row.parent == '' || scope.row.parent == null" @click="appAdd(scope.row, 'addChild')">添加子菜单</el-button>
              <el-button type="text" @click="deleteData(scope.row)">删除</el-button>

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
import meunSetEdit from "./meunSetEdit"
import meunSetParentEdit from "./meunSetParentEdit"
export default {
  name: "meunSet",
  components: {
    meunSetEdit,
    meunSetParentEdit
  },
  data() {
    return {
      meunSetEditNeedData: {},
      meunSetParentEditNeedData: {},
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
          { title: '公众号菜单配置', method: () => { window.histroy.back() } }
        ],

      },
      bankLinkShow: true,
      meunSetEditVisible: false,
      meunSetParentEditVisible: false,
      isMeunSetEditAdd: false,
      isMeunSetParentEditAdd: false,
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
        apiUrl: '/system/wxMenusList.api',//参数
      }).then(res => {
        _this.appServerData = res;
        _this.common.changeTable(_this, '.meunSet .kl-table', [])
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 保存按钮
    submit() {
      if (this.meunSetEditVisible) {
        if (this.isMeunSetEditAdd) {
          this.$refs.meunSetEdit.add();
        } else {
          this.$refs.meunSetEdit.submit();
        }
      } else if (this.meunSetParentEditVisible) {
        if (this.isMeunSetParentEditAdd) {
          this.$refs.meunSetParentEdit.add();
        } else {
          this.$refs.meunSetParentEdit.submit();
        }
      }

    },
    // 生成微信菜单
    menusCreate() {
      let _this = this
      let params = {
        "data": {},
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/system/wxMenusCreate.api',//参数
      }).then(res => {
        _this.$message({
          message: '菜单生成成功！',
          type: 'success'
        });
      })
    },
    // 操作栏按钮点击事件
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

      if (index === 'see') {
        this.bankLinkShow = false;
        this.meunSetEditVisible = true;
        this.meunSetParentEditVisible = false
        this.$set(this.crumbsData.titleList, "2", { title: '查看', method: () => { window.histroy.back() } });
        this.submitShow = false;
        this.meunSetEditNeedData = item
        this.meunSetEditNeedData.editGet = true
        this.meunSetEditNeedData.content = 'see'
      } else if (index === 'edit') {
        if (item.parent == '' || item.parent == null) {// 一级菜单
          this.bankLinkShow = false;
          this.meunSetParentEditVisible = true
          this.meunSetEditVisible = false;
          this.$set(this.crumbsData.titleList, "2", { title: '编辑', method: () => { window.histroy.back() } });
          this.submitShow = true;
          this.meunSetParentEditNeedData = item
          this.meunSetParentEditNeedData.editGet = false
          this.meunSetParentEditNeedData.content = 'edit'
          this.isMeunSetParentEditAdd = false
        } else {// 二级菜单
          this.bankLinkShow = false;
          this.meunSetParentEditVisible = false
          this.meunSetEditVisible = true;
          this.$set(this.crumbsData.titleList, "2", { title: '编辑', method: () => { window.histroy.back() } });
          this.submitShow = true;
          this.meunSetEditNeedData = item
          this.meunSetEditNeedData.editGet = false
          this.meunSetEditNeedData.content = 'edit'
          this.isMeunSetEditAdd = false
        }
      } else if (index === 'addChild') {
        this.bankLinkShow = false;
        this.meunSetParentEditVisible = false
        this.meunSetEditVisible = true;
        this.$set(this.crumbsData.titleList, "2", { title: '添加子菜单', method: () => { window.histroy.back() } });
        this.submitShow = true;
        this.meunSetEditNeedData = item
        this.meunSetEditNeedData.editGet = false
        this.meunSetEditNeedData.content = 'addChild'
        this.isMeunSetEditAdd = true
      } else if (index === 'addParent') {
        this.bankLinkShow = false;
        this.meunSetParentEditVisible = true
        this.meunSetEditVisible = false;
        this.$set(this.crumbsData.titleList, "2", { title: '添加一级菜单', method: () => { window.histroy.back() } });
        this.submitShow = true;
        this.meunSetParentEditNeedData.content = 'addParent'
        this.isMeunSetParentEditAdd = true
      }

    },
    deleteData(item) {
      let _this = this
      this.$confirm('确定删除该菜单？')
        .then(() => {
          let params = {
            "data": item.id,
          }
          this.$api.fetch({
            params: params,//参数
            apiUrl: '/system/wxMenusDelete.api',//参数
          }).then(res => {
            _this.init();
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
      this.meunSetEditVisible = false;
      this.meunSetParentEditVisible = false
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
.meunSet {
  width: 100%;
  height: 100%;
}
</style>

