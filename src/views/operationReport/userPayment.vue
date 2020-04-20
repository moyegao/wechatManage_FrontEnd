
<template>
  <div class="userPayment">
    <div class="main-content">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-show="bankLinkShow"></div>
        <div class="bread-contain-right" v-show="userPaymentEditVisible">
          <el-button size="mini" type="primary">保存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        </div>
      </div>
      <div class="kl-table" v-show="bankLinkShow">

        <div class="toolbar">
          <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
            <el-form-item class="form-left">

              <el-form-item label="统计类型：">
                <el-select v-model="formData.countType" placeholder="请选择统计类型">
                  <el-option v-for="item in factoryOption" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <br>
              <el-form-item label="">
                <el-radio v-model="formData.type" label="1">按月统计</el-radio>
                <el-form-item>
                  <el-date-picker v-model="formData.beginMonth" type="month" value-format="yyyyMM" placeholder="选择开始月份">
                  </el-date-picker>
                  -
                  <el-date-picker v-model="formData.endMonth" type="month" value-format="yyyyMM" placeholder="选择结束月份">
                  </el-date-picker>
                </el-form-item>
                <el-radio v-model="formData.type" label="0">按年统计</el-radio>
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

            <el-form-item class="form-right">
              <!-- <el-button class="compile" type="primary el-icon-search"  @click="search" size="mini"></el-button> -->
            </el-form-item>
          </el-form>
        </div>

        <el-table stripe border :data="appServerData.list" v-if="tableShow && formData.countType == '1'" :max-height="maxHeight">
          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="groupName" label="水司" min-width="100">
          </el-table-column>
          <el-table-column prop="date" label="统计月/年份" min-width="100">
          </el-table-column>
          <el-table-column prop="money" label="缴费金额" min-width="100">
          </el-table-column>
        </el-table>

        <br>

        <el-table stripe border :data="appServerData.list" v-if="tableShow && formData.countType == '2'" :max-height="maxHeight">
          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="busiName" label="业务类型" min-width="100">
          </el-table-column>
          <el-table-column prop="date" label="统计月/年份" min-width="100">
          </el-table-column>
          <el-table-column prop="money" min-width="100" label="缴费金额">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userPayment",
  data() {
    return {
      formData: {
        page: 1,
        pageCount: 20,
        countType: '1',
        type: '1',
        beginMonth: '',
        endMonth: '',
        beginYear: '',
        endYear: '',

        beginDate: '',
        endDate: '',
      },
      factoryOption: [
        {
          label: '按水司',
          value: '1'
        },
        {
          label: '按业务',
          value: '2'
        },
      ],
      sortOption: [
        {
          label: '我的用水',
          value: '1'
        },
        {
          label: '公共服务',
          value: '2'
        },
        {
          label: '更多精彩',
          value: '3'
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
          { title: '运营报表', path: '/userPayment/index' },
          { title: '用户缴费统计', method: () => { window.histroy.back() } }
        ],
      },
      bankLinkShow: true,
      userPaymentEditVisible: false,
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
      if (this.formData.type == 1) {//0为按月查询，1为按年查询
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
          "countType": this.formData.countType,
          "type": this.formData.type,
          "beginDate": this.formData.beginDate,
          "endDate": this.formData.endDate
        },
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/report/payStatisticsList.api',//接口地址
      }).then(res => {
        _this.appServerData = res;
      })
    },
    // 格式化状态
    formatStatus(row) {
      return row.status === 1 ? "启用" : "禁用"
    },
    // 添加按钮点击事件
    appAdd(val) {
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
      this.userPaymentEditVisible = true;
      if (val === 'add') {
        this.$set(this.crumbsData.titleList, "2", { title: '新建', method: () => { window.histroy.back() } });
      } else {
        this.$set(this.crumbsData.titleList, "2", { title: '编辑', method: () => { window.histroy.back() } });
      }

    },
    indexMethod(index) {//序号
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
      this.userPaymentEditVisible = false;
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
.userPayment {
  width: 100%;
  height: 100%;
}
</style>

