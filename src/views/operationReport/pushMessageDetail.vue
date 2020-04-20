
<template>
  <div class="pushMessageDetail">
    <div class="main-content">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-show="pushMessageDetailEditVisible">
          <!-- <el-button size="mini" type="primary">保存</el-button> -->
          <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        </div>
      </div>

      <div v-if="pushMessageDetailEditVisible">
        <pushMessageDetailEdit :pushMessageDetailEditNeedData='pushMessageDetailEditNeedData'></pushMessageDetailEdit>
      </div>

      <div class="kl-table" v-show="bankLinkShow">

        <div class="toolbar">
          <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
            <el-form-item class="form-left">

              <el-form-item label="水司：">
                <el-select clearable v-model="formData.groupCode" placeholder="请选择水司">
                  <el-option v-for="item in groupOption" :key="item.code" :label="item.name" :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="消息类型：">
                <el-select v-model="formData.noticeType" placeholder="请选择排序字段" clearable>
                  <el-option v-for="item in sortOption" :key="item.value" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="日期：">
                <el-date-picker v-model="formData.date" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>

              <el-button class="compile" type="primary el-icon-search" @click="init" size="mini"></el-button>

            </el-form-item>

            <el-form-item class="form-right">
              <!-- <el-button class="compile" type="primary el-icon-search"  @click="search" size="mini"></el-button> -->
            </el-form-item>
          </el-form>
        </div>

        <el-table stripe border :data="appServerData.list" v-if="tableShow" max-height="500px">
          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="groupName" label="水司" min-width="100">
          </el-table-column>
          <el-table-column prop="pushDate" label="推送日期" min-width="100">
          </el-table-column>
          <el-table-column prop="noticeName" min-width="100" label="消息类型">
          </el-table-column>
          <el-table-column prop="noticeTitle" label="消息标题" min-width="100">
          </el-table-column>

          <el-table-column label="操作" width="200px" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="check(scope.row)">查看</el-button>

            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="formData.page"
            :page-sizes="[50, 100, 500, 1000]"
            :page-size="formData.pageCount"
            layout="total, sizes, prev, pager, next, jumper"
            :total="appServerData.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pushMessageDetailEdit from "./pushMessageDetailEdit"
export default {
  name: "pushMessageDetail",
  components: {
    pushMessageDetailEdit
  },
  data() {
    return {
      formData: {
        groupCode: '',
        noticeType: '',
        date: [],
        page: 1,
        pageCount: 50
      },
      groupOption: [],
      sortOption: [],
      tableShow: true,
      maxHeight: 0,
      appServerData: [],
      showSelectIndex: -1,
      crumbsData: {  //面包屑
        titleList: [
          { title: '运营报表', path: '/pushMessageDetail/index' },
          { title: '推送消息统计', method: () => { window.histroy.back() } }
        ],

      },
      bankLinkShow: true,
      pushMessageDetailEditVisible: false,
      pushMessageDetailEditNeedData: [],
    }
  },
  mounted() {
    let day = new Date()
    let year = day.getFullYear()
		let month= day.getMonth()
    let d = day.getDate()
    month = month < 10 ? '0' + month: month + ''
    let begin = year + '-' + month + '-' + d
    this.formData.date.push(begin)
    this.formData.date.push(this.common.date('number'))
    this.init();
    this.getNoticeOption();
    this.getGroupOption();
    
  },
  methods: {
    // 初始化列表数据
    init() {
      let _this = this
      let params = {
        "data": {
          "page": this.formData.page,
          "pageCount": this.formData.pageCount,
          "groupCode": this.formData.groupCode,
          "noticeType": this.formData.noticeType,
        },
      }
      if (this.formData.date.length == 1) {
        params.beginDate = this.formData.date[0];
      }else if (this.formData.date.length == 2) {
        params.data.beginDate = this.formData.date[0];
        params.data.endDate = this.formData.date[1];
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/report/noticeDetailList.api',//参数
      }).then(res => {
        _this.appServerData = res;
        // _this.tableData.total = Number(_this.tableData.total)
        _this.common.changeTable(_this, '.pushMessageDetail .kl-table', ['.pushMessageDetail .toolbar','.pushMessageDetail .block'])
      })
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
    getNoticeOption() {//获取消息类型下拉列表 
      let _this = this;
      let params = {//接口入参
        data: ["notice"]
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/common/dictDownList.api',//接口地址
      }).then(res => {
        _this.sortOption = res.notice;
      })
    },
    // 格式化状态
    formatStatus(row) {
      return row.status === 1 ? "启用" : "禁用"
    },
    search() {

    },
    // 添加按钮点击事件
    check(item) {
      this.bankLinkShow = false;
      this.pushMessageDetailEditVisible = true;
      this.$set(this.crumbsData.titleList, "2", { title: '查看', method: () => { window.histroy.back() } });
      this.pushMessageDetailEditNeedData = item
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
    closeDialog() {
      this.bankLinkShow = true;
      this.pushMessageDetailEditVisible = false;
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
.pushMessageDetail {
  width: 100%;
  height: 100%;
}
</style>

