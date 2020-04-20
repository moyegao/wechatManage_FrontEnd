
<template>
  <div class="selfHelpMeterReading">
    <div class="main-content">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right">
          <el-button class="el-icon-plus" type="primary" @click="exportData" size="mini">导出当月抄表数据</el-button>
        </div>
      </div>

      <div class="kl-table">
        <div class="toolbar">
          <el-form :inline="true" size="mini" :model="tableQuery" class="demo-form-inline">
            <el-form-item class="form-left">

              <el-form-item label='抄表时间：'>
                <el-date-picker v-model="tableTime" @change="getDatePicker" type="daterange" value-format="yyyy-MM-dd" range-separator="至" :clearable="true" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>

              <el-form-item label="用户编号：">
                <el-input class="user-inp" v-model="tableQuery.userNo" placeholder="请输入用户编号"></el-input>
                <el-button class="compile" type="primary el-icon-search" @click="init" size="mini"></el-button>
              </el-form-item>

            </el-form-item>

            <el-form-item class="form-right">
            </el-form-item>
          </el-form>
        </div>
        <el-table stripe border :data="appServerData.list" :max-height="maxHeight">
          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="userNo" label="用户编号" min-width="100">
          </el-table-column>

          <el-table-column prop="userName" label="用户名称" min-width="100">
          </el-table-column>

          <el-table-column prop="lastReadDate" label="上次抄表日期" min-width="100">
          </el-table-column>

          <el-table-column prop="lastReadNum" label="上次抄表读数" min-width="100">
          </el-table-column>

          <el-table-column prop="thisReadNum" label="当前读数" min-width="100">
          </el-table-column>

          <el-table-column prop="value" label="本月用水量" min-width="100">
          </el-table-column>

          <el-table-column prop="threePhaseAvg" label="三期均量" min-width="100">
          </el-table-column>

          <el-table-column prop="time" label="抄表时间" min-width="140">
          </el-table-column>

          <el-table-column label="操作" width="200px" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="imageShow(scope.row)">查看图片</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableQuery.page" :page-sizes="[50, 100, 500, 1000]" :page-size="tableQuery.pageCount" layout="total, sizes, prev, pager, next, jumper" :total="appServerData.total">
          </el-pagination>
        </div>
      </div>

    </div>

    <el-dialog title="查看图片" :visible.sync="dialogTableVisible">
      <div class="img-box">
        <el-image v-for="item in imgData" :key="item" :src="item"></el-image>
      </div>

    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "selfHelpMeterReading",
  // components: {
  //   messageReleaseEdit
  // },
  data() {
    return {
      imgData: [],
      dialogTableVisible: false,



      tableTime: [],
      appServerData: {
        list: [
          {}
        ]
      },
      // 查询条件对象
      tableQuery: {
        page: 1,
        pageCount: 20,
        groupCode: localStorage.getItem('groupCode'),
      },
      tableShow: false,
      maxHeight: 0,

      crumbsData: {  //面包屑
        titleList: [
          { title: '自助抄表', path: '/businessManagement/selfHelpMeterReading' },
        ],

      },
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
        "data": this.tableQuery
      }
      this.$api.fetch({
        params: params,
        apiUrl: '/meterRead/meterReadList',
      }).then(res => {
        _this.appServerData = res;
        _this.common.changeTable(_this, '.selfHelpMeterReading .kl-table', ['.selfHelpMeterReading .bread-contain', '.selfHelpMeterReading .block'])
      })
    },
    // 导出当月抄表数据按钮
    exportData() {
      let _this = this

      var params = {
        "data": {},
        "busicode": "meterRead",
        "token": localStorage.getItem('token'),
      }
      window.open('http://' + window.location.host + '/wxmanage/exportExcel.api?json=' + encodeURI(JSON.stringify(params)))
      // window.open('http://' + '192.168.137.30:9999' + '/wxmanage/exportExcel.api?json=' + encodeURI(JSON.stringify(params)))
    },
    // 获取日期框数据
    getDatePicker(date) {
      if (date !== undefined && date !== null) {
        this.tableQuery.beginReadDate = date[0]
        this.tableQuery.endReadDate = date[1]
      } else {
        this.tableQuery.beginReadDate = ''
        this.tableQuery.endReadDate = ''
      }
    },
    // 查看图片按钮
    imageShow(row){
      this.imgData = row.pic
      this.dialogTableVisible = true
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




    indexMethod(index) {
      return index + 1
    },
  }
}
</script>

<style lang="scss">
.selfHelpMeterReading {
  width: 100%;
  height: 100%;
  .user-inp {
    width: 75%;
  }
  .img-box {
    width: 100%;
    height: 100%;
    .el-image {
      // width: 100%;
      // height: 100%;
    }
  }
}
</style>

