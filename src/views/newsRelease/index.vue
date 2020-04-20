 <template>
  <div class="newsRelease">
    <div class="main-content">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-show="bankLinkShow">
          <el-button class="el-icon-plus" type="primary" @click="appAdd('scope', 'add')" size="mini">新建</el-button>
        </div>
        <div class="bread-contain-right" v-show="newsReleaseEditVisible">
          <div style="float:left">
            <el-radio-group v-model="newsReleaseEditNeedData.type" @change="changeType">
              <el-radio-button label="1">群发消息</el-radio-button>
              <el-radio-button label="2">模板消息</el-radio-button>
            </el-radio-group>
          </div>
          <el-button size="mini" type="primary" @click="submit" v-if="submitShow">保存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
        </div>
      </div>
      <div class="kl-table" v-show="bankLinkShow">

        <el-table stripe border :data="appServerData.list" v-if="tableShow" :max-height="maxHeight">
          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="type" label="消息类型" min-width="100">
          </el-table-column>

          <el-table-column prop="title" label="新闻标题" min-width="100">
          </el-table-column>

          <el-table-column prop="publishBy" label="发布人" min-width="100">
          </el-table-column>

          <el-table-column prop="publishTime" min-width="100" label="发布时间">
          </el-table-column>

          <el-table-column prop="statusName" min-width="100" label="发布状态">
          </el-table-column>

          <el-table-column label="操作" width="200px" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="appAdd(scope.row, 'edit')" v-if="scope.row.status==0">编辑</el-button>
              <el-button type="text" @click="appAdd(scope.row, 'see')" v-else>查看</el-button>
              <!-- <span style="color:#e6e6e6;">|</span> -->
              <el-button type="text" @click="release(scope.row)" v-if="scope.row.status==0">发布</el-button>
              <!-- <el-button type="text" disabled v-else-if="scope.row.status==1">已发布</el-button>
              <el-button type="text" disabled v-else>待发布</el-button>
              <span style="color:#e6e6e6;" v-if="scope.row.status==0">|</span> -->
              <el-button type="text" @click="deleteData(scope.row)" v-if="scope.row.status==0">删除</el-button>

            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableQuery.page" :page-sizes="[50, 100, 500, 1000]" :page-size="tableQuery.pageCount" layout="total, sizes, prev, pager, next, jumper" :total="appServerData.total">
          </el-pagination>
        </div>
      </div>
      <div class="eidt_box" v-if="newsReleaseEditVisible">
        <newsReleaseEdit ref="newsReleaseEdit" :newsReleaseEditNeedData="newsReleaseEditNeedData"></newsReleaseEdit>
      </div>
    </div>
  </div>
</template>
 
 <script>
import newsReleaseEdit from "./newsReleaseEdit"
export default {
  name: "newsRelease",
  components: {
    newsReleaseEdit
  },
  data() {
    return {
      submitShow: false,
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
          { title: '新闻发布', path: '/newsRelease/index' },
          // {title:'银行直联',method:()=>{window.histroy.back()}}
        ],

      },
      bankLinkShow: true,
      newsReleaseEditVisible: false,
      newsReleaseEditNeedData: {
        type: '1',
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
        "data": {
          "page": this.tableQuery.page,
          "pageCount": this.tableQuery.pageCount,
        },
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/news/wxNewsList.api',//接口地址
      }).then(res => {
        _this.appServerData = res;
        _this.common.changeTable(_this, '.newsRelease .kl-table', ['.newsRelease .bread-contain', '.newsRelease .block'])
      })
    },
    changeType(type){
      this.$refs.newsReleaseEdit.changeType(type);
    },
    // 格式化状态
    formatStatus(row) {
      return row.status === 1 ? "启用" : "禁用"
    },
    submit() {
      this.$refs.newsReleaseEdit.submitForm('ruleForm');
    },
    // 操作列按钮点击事件
    appAdd(item, index) {
      console.log(item);
      this.bankLinkShow = false;
      this.newsReleaseEditVisible = true;
      if (index == 'see') {
        this.$set(this.crumbsData.titleList, "1", { title: '查看', method: () => { window.histroy.back() } });
        this.submitShow = false;
        this.newsReleaseEditNeedData = item
        this.newsReleaseEditNeedData.editGet = true
        this.newsReleaseEditNeedData.content = 'see'
      } else if (index == 'add') {
        this.submitShow = true;
        this.$set(this.crumbsData.titleList, "1", { title: '新建', method: () => { window.histroy.back() } });
        this.newsReleaseEditNeedData.editGet = false
        this.newsReleaseEditNeedData.content = 'add'
        this.newsReleaseEditNeedData.type = '1'
      } else if (index == 'edit') {
        this.submitShow = true;
        this.$set(this.crumbsData.titleList, "1", { title: '编辑', method: () => { window.histroy.back() } });
        this.newsReleaseEditNeedData = item
        this.newsReleaseEditNeedData.editGet = false
        this.newsReleaseEditNeedData.content = 'edit'
      }

    },
    // 发布按钮
    release(item) {
      let _this = this
      this.$confirm('确定发布该条新闻？')
        .then(() => {
          let params = {
            "data": item.id
          }
          this.$api.fetch({
            params: params,//参数
            apiUrl: '/news/wxNewsPublish.api',//接口地址
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
      this.$confirm('确定删除该条新闻？')
        .then(() => {
          let params = {
            "data": item.id
          }
          this.$api.fetch({
            params: params,//参数
            apiUrl: '/news/wxNewsDelete.api',//接口地址
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
      this.newsReleaseEditVisible = false;
      this.crumbsData.titleList.pop();
      this.newsReleaseEditNeedData.type = '1'
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
.newsRelease {
  width: 100%;
  height: 100%;
}
.eidt_box {
  overflow-y: scroll;
  height: 100%;
}
</style>