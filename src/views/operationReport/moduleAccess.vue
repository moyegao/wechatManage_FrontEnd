
<template>
  <div class="moduleAccess">
    <div class="main-content">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      </div>
      <div class="kl-table" v-show="bankLinkShow">

        <div class="toolbar">
          <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
            <el-form-item class="form-left">
              <el-form-item label="水司：">
                <el-select v-model="formData.groupCode" placeholder="请选择水司" clearable>
                  <el-option v-for="item in groupOption" :key="item.code" :label="item.name" :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="模块类型：">
                <el-select v-model="formData.moduleId" placeholder="请选择排序字段" clearable>
                  <el-option v-for="item in moduleOption" :key="item.value" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <br>
              <el-form-item label="">
                <el-radio v-model="formData.type" label='1'>按月统计</el-radio>
                <el-form-item>
                  <el-date-picker v-model="formData.beginMonth" type="month" value-format="yyyyMM" placeholder="选择开始月份">
                  </el-date-picker>
                  -
                  <el-date-picker v-model="formData.endMonth" type="month" value-format="yyyyMM" placeholder="选择结束月份">
                  </el-date-picker>
                </el-form-item>
                <el-radio v-model="formData.type" label='0'>按年统计</el-radio>
                <el-form-item>
                  <el-date-picker v-model="formData.beginYear" type="year" value-format="yyyy" placeholder="选择开始年份">
                  </el-date-picker>
                  -
                  <el-date-picker v-model="formData.endYear" type="year" value-format="yyyy" placeholder="选择结束年份">
                  </el-date-picker>
                </el-form-item>
              </el-form-item>
              <el-button class="compile" type="primary el-icon-search" @click="init" size="mini"></el-button>

            </el-form-item>
          </el-form>
        </div>

        <el-table stripe border :data="tableData.list" v-if="tableShow" :max-height="maxHeight">
          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="groupName" label="水司" min-width="100">
          </el-table-column>
          <el-table-column prop="date" label="统计月/年份" min-width="100">
          </el-table-column>
          <el-table-column prop="moduleName" min-width="100" label="模块名称">
          </el-table-column>
          <el-table-column prop="visitCount" label="访问数量" min-width="100">
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formData.page" :page-sizes="[50, 100, 500, 1000]" :page-size="formData.pageCount" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "moduleAccess",
  data() {
    return {
      formData: {
        groupCode: '',
        moduleId: '',//
        type: '1', //1为按月查询，0为按年查询
        beginDate: '',
        endDate: '',
        page: 1,
        pageCount: 50,


        beginYear: '',
        endYear: '',
        beginMonth: 0,
        endMonth: 0,
      },
      groupOption: [],
      moduleOption: [],
      tableShow: true,
      maxHeight: 0,
      tableData: [],
      showSelectIndex: -1,
      crumbsData: {  //面包屑
        titleList: [
          { title: '运营报表', path: '/moduleAccess/index' },
          { title: '模块访问统计', method: () => { window.histroy.back() } }
        ],

      },
      bankLinkShow: true,
    }
  },
  mounted() {
    // 默认月分
    this.formData.beginMonth = parseInt(this.common.date('month')) - 1 + ''
    this.formData.endMonth = this.common.date('month')
    // 默认年份
    let day = new Date()
    this.formData.beginYear = day.getFullYear() - 1 + ''
    this.formData.endYear = day.getFullYear() + ''
    this.init()
    this.getGroupOption()
    this.getModuleOption()
    
  },
  methods: {
    // 初始化列表数据
    init() {
      let _this = this
      if (this.formData.type == 1) {//1为按月查询，0为按年查询
        this.formData.beginDate = this.formData.beginMonth
        this.formData.endDate = this.formData.endMonth
      } else {
        this.formData.beginDate = this.formData.beginYear
        this.formData.endDate = this.formData.endYear
      }
      let params = {
        "data": {
          "page": this.formData.page,
          "pageCount": this.formData.pageCount,
          "groupCode": this.formData.groupCode,
          "moduleId": this.formData.moduleId,
          "type": this.formData.type,
          "beginDate": this.formData.beginDate,
          "endDate": this.formData.endDate
        },
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/report/moduleStatisticsList.api',//接口地址
      }).then(res => {
        _this.tableData = res;
        _this.tableData.total = Number(_this.tableData.total)
        _this.common.changeTable(_this, '.moduleAccess .kl-table', ['.moduleAccess .toolbar','.moduleAccess .block'])
      })
    },
    indexMethod(index) {
      return index + 1
    },
    handleSizeChange(val) { //显示多少数据一页
      this.formData.pageCount = val
      this.formData.page = 1
      this.init()
    },
    handleCurrentChange(val) {  //显示多少页码
      this.formData.page = val
      this.init()
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
    getModuleOption() {//获取模块下拉列表 
      let _this = this;
      let params = {//接口入参
        data: ["module"]
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/common/dictDownList.api',//接口地址
      }).then(res => {
        _this.moduleOption = res.module;
      })
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
.moduleAccess {
  width: 100%;
  height: 100%;
}
</style>

