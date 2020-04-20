
<template>
  <div class="userSet">
    <div class="main-content">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-show="userSetEditVisible">
          <el-button size="mini" type="primary" @click="submit" v-if="submitShow">保存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        </div>
      </div>
      <div v-if="userSetEditVisible">
        <userSetEdit ref="userSetEdit" :userSetEditNeedData='userSetEditNeedData'></userSetEdit>
      </div>
      <div class="kl-table" v-show="bankLinkShow">

        <el-table stripe border :data="appServerData" v-if="tableShow" :max-height="maxHeight">
          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="name" label="角色名称" min-width="100">
          </el-table-column>
          <el-table-column prop="remark" label="描述" min-width="100">
          </el-table-column>
          <el-table-column prop="modifyBy" min-width="100" label="最后修改人">
          </el-table-column>
          <el-table-column prop="modifyTime" label="最后修改时间" min-width="100">
          </el-table-column>

          <el-table-column label="操作" width="80" fixed="right">
            <template slot-scope="scope">
              <!-- <el-button type="text" @click="appAdd(scope.row, 'see')">查看</el-button> -->
              <el-button type="text" @click="appAdd(scope.row, 'edit')">编辑</el-button>
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
import userSetEdit from "./userSetEdit"
export default {
  name: "userSet",
  components: {
    userSetEdit
  },
  data() {
    return {
      userSetEditNeedData: [],
      userSetEditVisible: false,
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
          { title: '用户权限管理', method: () => { window.histroy.back() } }
        ],

      },
      bankLinkShow: true,
      InformationSetEditVisible: false,
    }
  },
  mounted() {
    this.init();
    // this.selectTSubSystem()
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
        apiUrl: '/system/sysUserRoleList.api',//参数
      }).then(res => {
        _this.appServerData = res;
        _this.common.changeTable(_this, '.userSet .kl-table', [])
      })
    },
    // 格式化状态
    formatStatus(row) {
      return row.status === 1 ? "启用" : "禁用"
    },
    // 添加按钮点击事件
    appAdd(item, index) {
      this.bankLinkShow = false
      this.userSetEditVisible = true;
      if (index == 'see') {
        this.$set(this.crumbsData.titleList, "2", { title: '查看', method: () => { window.histroy.back() } });
        this.submitShow = false;
        this.userSetEditNeedData = item
        this.userSetEditNeedData.editGet = true
      } else {
        this.$set(this.crumbsData.titleList, "2", { title: '编辑', method: () => { window.histroy.back() } });
        this.submitShow = true;
        this.userSetEditNeedData = item
        this.userSetEditNeedData.editGet = false
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
    selectTSubSystem() {

      this.appServerData = {
        list: [
          {
            title: 'xxx招标成功',
            content: "",
            shortName: null,
            date: "2019-08-09",
            type: 0
          },
          {
            title: 'xxx招标成功',
            content: "",
            shortName: null,
            date: "2019-08-09",
            type: 1
          },
        ],
        rowCount: 200
      }
    },
    submit(){
      this.$refs.userSetEdit.submit();
    },
    closeDialog() {
      this.bankLinkShow = true;
      this.userSetEditVisible = false;
      this.submitShow = false;
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
.userSet {
  width: 100%;
  height: 100%;
}
</style>

