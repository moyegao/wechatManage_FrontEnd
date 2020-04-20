
<template>
  <div class="journalSet">
    <div class="main-content">
        <div class="bread-contain">
            <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
            <!-- <div class="bread-contain-right" v-show="bankLinkShow">
                <el-button class="el-icon-plus" type="primary" @click="appAdd('add')" size="mini">新建</el-button>
            </div>
            <div class="bread-contain-right" v-show="InformationSetEditVisible">
                <el-button size="mini" type="primary">保存</el-button>
                <el-button  icon="el-icon-caret-left" size="mini" @click="closeDialog">返回</el-button>
            </div> -->
        </div>
      <div class="kl-table" v-show="bankLinkShow">
        
          <div class="toolbar">
            <!-- <el-form :inline="true" size="mini" :model="formData" class="demo-form-inline">
                <el-form-item class="form-left">
                </el-form-item>
                
              
              <el-form-item class="form-right">
              </el-form-item>
            </el-form> -->
        </div>

        <el-table
          stripe border
          :data="appServerData.list"
          v-if="tableShow"
          :max-height="maxHeight">
          <el-table-column
            type="index"
            label="NO."
            width="50"
            fixed="left"
            :index="indexMethod">
          </el-table-column>

          <el-table-column
            prop="factory"
            label="角色名称"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="content"
            label="描述"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="date"
            min-width="100"
            label="最后修改人">
          </el-table-column>
          <el-table-column
            prop="content"
            label="最后修改时间"
            min-width="100">
          </el-table-column>

          <el-table-column label="操作"  width="100" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="appAdd(scope)">查看</el-button>
              <el-button type="text" @click="appAdd(scope)">编辑</el-button>
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
      <div v-show="InformationSetEditVisible">
          <InformationSetEdit></InformationSetEdit>
      </div>
    </div>
  </div>
</template>

<script>
import InformationSetEdit from "./InformationSetEdit"
  export default {
    name: "journalSet",
    components:{
        InformationSetEdit
    },
    data() {
      return {
        formData:{
            factory:'1',
            sort:'1',
            radio:'1',
            beginMonth:[],
            endMonth:[],
            beginYear:[],
            endYear:[],
        },
        factoryOption:[
            {
                label:'南沙',
                value:'1'
            },
            {
                label:'梅州',
                value:'2'
            },
        ],
        sortOption:[
            {
                label:'用户数',
                value:'1'
            },
            {
                label:'水司',
                value:'2'
            },
        ],
        tableShow: true,
        tableQuery:{
          page:1,
          pageCount:20
        },
        maxHeight:0,
        appServerData:[],
        showSelectIndex:-1,
        crumbsData :{  //面包屑
            titleList:[
                {title:'系统管理',path:'/waterManagement/index'},
                {title:'日志查看',method:()=>{window.histroy.back()}}
            ],
            
        },
        bankLinkShow:true,
        InformationSetEditVisible:false,
      }
    },
    mounted() {
      this.selectTSubSystem()
    },
    methods: {
      // 格式化状态
      formatStatus(row) {
        return row.status === 1 ?"启用" : "禁用"
      },
      // 添加按钮点击事件
      appAdd(val) {
        this.formData =
          {
            "title": 'xxx招标成功',
            "content": "",
            "shortName": null,
            "date": "2019-08-09",
            "type":0
          },
          {
            "title": 'xxx招标成功',
            "content": "",
            "shortName": null,
            "date": "2019-08-09",
            "type":1
          }
        // sessionStorage.setItem('formData',JSON.stringify(this.formData));
        this.bankLinkShow = false;
        this.InformationSetEditVisible = true;
        if(val==='add'){
            this.$set(this.crumbsData.titleList,"2",{title:'新建',method:()=>{window.histroy.back()}});
        }else{
            this.$set(this.crumbsData.titleList,"2",{title:'编辑',method:()=>{window.histroy.back()}});
        }
        
      },
      // 展示单元格内部选项框
      showSelect(scope) {
        this.showSelectIndex = scope.$index
      },
      // 单元格内下拉框点击事件
      editor(scope){
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
            list:[
                {    
                    title: 'xxx招标成功',
                    content: "",
                    shortName: null,
                    date: "2019-08-09",
                    type:0
                },
                {    
                    title: 'xxx招标成功',
                    content: "",
                    shortName: null,
                    date: "2019-08-09",
                    type:1
                },
            ],
            rowCount:200
        }
      },
      closeDialog(){
        this.bankLinkShow = true;
        this.InformationSetEditVisible = false;
        this.crumbsData.titleList.pop();
      }
    },
    watch:{
      maxHeight(){
        this.tableShow = false
        this.$nextTick(()=>{
          this.tableShow = true
        })
      }
    }
  }
</script>

<style lang="scss">
.journalSet{
    width: 100%;
    height: 100%;
}
</style>

