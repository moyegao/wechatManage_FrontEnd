
<template>
  <div class="userStatistics">
    <div class="main-content">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      </div>
      <div class="kl-table" v-show="bankLinkShow">
        <div class="toolbar">
          <el-form :inline="true" size="mini" :model="tableQuery" class="demo-form-inline">
            <el-form-item class="form-left">

              <el-form-item label="水司：">
                <el-select clearable v-model="tableQuery.groupCode" placeholder="请选择水司">
                  <el-option v-for="item in groupOption" :key="item.code" :label="item.name" :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="排序字段：">
                <el-select clearable v-model="tableQuery.sort" placeholder="请选择排序字段">
                  <el-option v-for="item in sortOption" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <el-button class="compile" type="primary el-icon-search" @click="init" size="mini"></el-button>
              </el-form-item>
              <i>注：（活跃用户为3个月以内在微厅进行过操作的用户）</i>
              <!-- <el-form-item label="">
                <el-radio v-model="tableQuery.type" label='0'>按月统计</el-radio>
                <el-form-item>
                  <el-date-picker v-model="tableQuery.beginMonth" type="month" value-format="yyyyMM" placeholder="选择开始月份">
                  </el-date-picker>
                  -
                  <el-date-picker v-model="tableQuery.endMonth" type="month" value-format="yyyyMM" placeholder="选择结束月份">
                  </el-date-picker>
                </el-form-item>
                <el-radio v-model="tableQuery.type" label='1'>按年统计</el-radio>
                <el-form-item>
                  <el-date-picker v-model="tableQuery.beginYear" type="year" value-format="yyyy" placeholder="选择开始年份">
                  </el-date-picker>
                  -
                  <el-date-picker v-model="tableQuery.endYear" type="year" value-format="yyyy" placeholder="选择结束年份">
                  </el-date-picker>
                </el-form-item>
              </el-form-item> -->
              

            </el-form-item>

            <el-form-item class="form-right">
            </el-form-item>
          </el-form>
        </div>

        <el-table stripe border :data="tableData.list" v-if="tableShow" :max-height="maxHeight">
          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>
          <el-table-column prop="groupCode" label="水司编号" min-width="100">
          </el-table-column>
          <el-table-column prop="groupName" label="水司" min-width="100">
          </el-table-column>
          <el-table-column prop="userCount" min-width="100" label="用户数">
          </el-table-column>
          <el-table-column prop="activeCount" label="活跃用户数" min-width="100">
          </el-table-column>

        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableQuery.page" :page-sizes="[50, 100, 500, 1000]" :page-size="tableQuery.pageCount" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userStatistics",
  data() {
    return {
      tableQuery: {
        groupCode: '',
        sort: '',//1为按用户数，2为按活跃用户数
        // type: '0', //0为按月查询，1为按年查询
        // beginDate: '',
        // endDate: '',
        page: 1,
        pageCount: 50,

        // beginYear: '',
        // endYear: '',
        // beginMonth: '',
        // endMonth: '',
      },
      groupOption: [],
      moduleOption: [],
      factoryOption: [],
      sortOption: [
        { value: '1', label: '用户数' },
        { value: '2', label: '活跃用户数' }
      ],
      tableShow: true,
      maxHeight: 0,
      tableData: [],
      crumbsData: {  //面包屑
        titleList: [
          { title: '运营报表', path: '/userStatistics/index' },
          { title: '用户统计', method: () => { window.histroy.back() } }
        ],
      },
      bankLinkShow: true,
    }
  },
  mounted() {
    this.init()
    this.getGroupOption()
  },
  methods: {
    // 初始化列表数据
    init() {
      let _this = this
      // if (this.tableQuery.type == 0) {//0为按月查询，1为按年查询
      //   this.tableQuery.beginDate = this.tableQuery.beginMonth
      //   this.tableQuery.endDate = this.tableQuery.endMonth
      // } else {
      //   this.tableQuery.beginDate = this.tableQuery.beginYear
      //   this.tableQuery.endDate = this.tableQuery.endYear
      // }
      let params = {
        "data": {
          "page": this.tableQuery.page,
          "pageCount": this.tableQuery.pageCount,
          "groupCode": this.tableQuery.groupCode,
          "sort": this.tableQuery.sort,
          // "type": this.tableQuery.type,
          // "beginDate": this.tableQuery.beginDate,
          // "endDate": this.tableQuery.endDate
        },
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/report/userStatisticsList.api',//参数
      }).then(res => {
        _this.tableData = res;
        _this.tableData.total = Number(_this.tableData.total)
        _this.common.changeTable(this, '.userStatistics .kl-table', [])
      })
    },
    search() {

    },
    indexMethod(index) {//序号
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
.userStatistics {
  width: 100%;
  height: 100%;
}
</style>

