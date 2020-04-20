/**
 * 公用函数方法
 */
'use strict'
import Vue from 'vue'

let common = {}

// 当前日期
common.date = (s) => {
	let day = new Date()
  let res
    day.setTime(day.getTime())
    let year = day.getFullYear()
    let month= day.getMonth()
    let d = day.getDate()
    if (s === 'month') {
      res = year + (month + 1 < 10 ? "0" + (month + 1) : (month + 1) + '')
    }else if (s === 'lastMonth'){
    	res = year  + (month <10 ? "0"+month:month + '')
    }else if (s === 'halfYear'){
    	res =  year  + (month- 5 <10 ? "0" + (month-5):(month-5) + '')
    }else if (typeof(s) === 'number'){
    	day.setTime(day.getTime() + s)
		let year = day.getFullYear()
		let month= day.getMonth()
    let d = day.getDate()
      res =  year + "-" +(month+1 <10? "0" + (month+1) : month+1 )+ "-" + (d<10? "0"+d:d)
    }else {
    	res = year + "-" + (month+1 <10? "0" + (month+1) : month+1 ) + "-" + (d<10? "0"+d:d)
    }
    return res
}
// 表格高度计算
 function calcHeight(that,father,brother){
  let $fatherHeight = $(father).height();
  let $brothersHeight  = 0;
  if(typeof brother === "object"){
    for(let i in brother){
      $brothersHeight += $(brother[i]).height()
      
    }
  }
    that.maxHeight = $fatherHeight-$brothersHeight-30
  }

  common.changeTable=(that,father,brother)=>{
      calcHeight(that,father,brother);
      $(window).resize(function() {//动态监听监听网页窗口变化
        calcHeight(that,father,brother)
    });
  }

  // 关闭前二次确认
  // this.chargeObjectEqual({ a: '133', b: '马飞' }, 'set'); sessionstorage存储表单对象
    // this.dialogShow = this.chargeObjectEqual({ a: '1331', b: '马飞' }, 'get'); 返回boolean值，确认关闭弹出框返回false，取消返回true
  common.chargeObjectEqual=(obj, change)=> {
    if (change == 'set') {
      sessionStorage.setItem('oldOBJ', JSON.stringify(obj))
    } else if (change == 'get') {
      var oldOBJ = JSON.parse(sessionStorage.getItem('oldOBJ'))

      // 当前Object对象
      var propsCurr = Object.getOwnPropertyNames(obj);
      // 要比较的另外一个Object对象
      var propsCompare = Object.getOwnPropertyNames(oldOBJ);
      if (propsCurr.length != propsCompare.length) {
        this.$confirm('您填写的信息尚未保存, 是否确认离开?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return false;
        }).catch(() => {
          return true
        });
      }
      for (var i = 0, max = propsCurr.length; i < max; i++) {
        var propName = propsCurr[i];
        if (obj[propName] !== oldOBJ[propName]) {
          this.$confirm('您填写的信息尚未保存, 是否确认离开?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return false;
        }).catch(() => {
          return true
        });
        }
      }
      return false;
    }
  }

  // 下载模板
  common.downFile = (url) => {
    let elemIF = document.createElement("iframe")
    // elemIF.src =  `${url}/fileDown.htm?importType=1`
    elemIF.src = url;
    elemIF.style.display = "none"
    document.body.appendChild(elemIF)
  }
  //导出
  // npm i XLSX 下载
  //busicode: 接口路径,
  // obj:查询条件对象 
  //tHeader:excel表头["姓名","学号","年龄"...]
  //filterVal:excel表头对应字段 ['name', 'code', 'age'...]
  //filename:excel 文件名  
  //total:数据列表的总数
  common.exportExcel=(busicode,obj,tHeader,filterVal,filename,total)=>{
    let listData = {}
    // this.tableQuery.pageCount = this.historyData.total ===0? 20:this.historyData.total
    obj.pageCount = total ===0? 20:total

    let params ={
      // "busicode":busicode,
      "data": obj
    }
    this.$api.fetch({
      apiUrl: busicode,//路径
      method: 'post',//请求方法
      params:params,//参数
      needErrorCallback:true
    }).then(res =>{
      if(res.code===0){
        listData = res.data
        if (!listData.list[0]) {
          this.$notify({
            title: '警告',
            message:'表格没有相关数据',
            type: 'error'
          })
        } else {
          import('@/vendor/Export2Excel').then(excel => {
            // const tHeader = ['水表编号', '抄表日期', '所属小区','厂家编号','厂家','型号', '当日读数', '修正读数', '当日水量', '数据状态',  '用户编号','集中器编号','用户地址']
            const tHeader = tHeader;
            // const filterVal = ['code', 'daytime', 'areaName','fcode','factoryName','model','lvalue', 'fixValue','flux', 'status', 'usn', 'concentrator', 'position']
            const filterVal = filterVal;
            const list = listData.list
            // const data = this.formatJson(filterVal, list)
            const data = list.map(v => filterVal.map(j => {
              return v[j]
            }))
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: filename,
              autoWidth: '100'
            })
          })
          // this.tableQuery.pageCount = 20
        }
      }
    })
  }
export default common