
<template>
  <div class="homePage">
    <div class="homePage_top">
      <el-card class="box-card">
        <!-- <div v-for="o in 4" :key="o" class="text item">
                    {{'列表内容 ' + o }}
                </div> -->
        <!-- <table>
                    <tr>
                        <th>昨日业务办理量</th>
                        <th>本月业务办理量</th>
                        <th>上月业务办理量</th>
                        <th>上年业务办理量</th>
                    </tr>
                    <tr>
                        <td>10000</td>
                        <td>10000</td>
                        <td>10000</td>
                        <td>10000</td>
                    </tr>
                </table> -->
        <div class="box-card-top">模块访问统计</div>
        <table class="table_1" style="width:100%" border="1" height="130">
          <tr>
            <td>昨日模块访问量</td>
            <td>{{moduleData.yesCount}}</td>
          </tr>
          <tr>
            <td>本月模块访问量</td>
            <td>{{moduleData.monCount}}</td>
          </tr>
          <tr>
            <td>上月模块访问量</td>
            <td>{{moduleData.lastMonCount}}</td>
          </tr>
          <tr>
            <td>上年模块访问量</td>
            <td>{{moduleData.lastYearCount}}</td>
          </tr>
        </table>
      </el-card>

      <el-card class="box-card">
        <!-- <div v-for="o in 4" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div> -->
        <div class="box-card-top">业务办理统计</div>
        <table class="table_1" style="width:100%" border="1" height="130">
          <tr>
            <td>昨日业务办理量</td>
            <td>{{businessData.yesCount}}</td>
          </tr>
          <tr>
            <td>本月业务办理量</td>
            <td>{{businessData.monCount}}</td>
          </tr>
          <tr>
            <td>上月业务办理量</td>
            <td>{{businessData.lastMonCount}}</td>
          </tr>
          <tr>
            <td>上年业务办理量</td>
            <td>{{businessData.lastYearCount}}</td>
          </tr>
        </table>
      </el-card>

      <el-card class="box-card">
        <!-- <div v-for="o in 4" :key="o" class="text item">
                    {{'列表内容 ' + o }}
                </div> -->
        <!-- <table>
                    <tr>
                        <th>昨日业务办理量</th>
                        <th>本月业务办理量</th>
                        <th>上月业务办理量</th>
                        <th>上年业务办理量</th>
                    </tr>
                    <tr>
                        <td>10000</td>
                        <td>10000</td>
                        <td>10000</td>
                        <td>10000</td>
                    </tr>
                </table> -->
        <div class="box-card-top">推送消息统计</div>
        <table class="table_1" style="width:100%" border="1" height="130">
          <tr>
            <td>昨日推送消息条数</td>
            <td>{{noticeData.yesCount}}</td>
          </tr>
          <tr>
            <td>本月推送消息条数</td>
            <td>{{noticeData.monCount}}</td>
          </tr>
          <tr>
            <td>上月推送消息条数</td>
            <td>{{noticeData.lastMonCount}}</td>
          </tr>
          <tr>
            <td>上年推送消息条数</td>
            <td>{{noticeData.lastYearCount}}</td>
          </tr>
        </table>
      </el-card>

      <el-card class="box-card">
        <!-- <div v-for="o in 4" :key="o" class="text item">
                    {{'列表内容 ' + o }}
                </div> -->
        <!-- <table>
                    <tr>
                        <th>昨日业务办理量</th>
                        <th>本月业务办理量</th>
                        <th>上月业务办理量</th>
                        <th>上年业务办理量</th>
                    </tr>
                    <tr>
                        <td>10000</td>
                        <td>10000</td>
                        <td>10000</td>
                        <td>10000</td>
                    </tr>
                </table> -->
        <div class="box-card-top">用户缴费统计</div>
        <table class="table_1" style="width:100%" border="1" height="130">
          <tr>
            <td>昨日用户缴费金额</td>
            <td>{{payData.yesCount}}</td>
          </tr>
          <tr>
            <td>本月用户缴费金额</td>
            <td>{{payData.monCount}}</td>
          </tr>
          <tr>
            <td>上月用户缴费金额</td>
            <td>{{payData.lastMonCount}}</td>
          </tr>
          <tr>
            <td>上年用户缴费金额</td>
            <td>{{payData.lastYearCount}}</td>
          </tr>
        </table>
      </el-card>
    </div>

    <!-- <div class="homePage_central">
      <div class="central_left">
        <div style="width: 400px;height:200px; display: inline-block;" id="chartmain"></div>
      </div>

      <div style="" class="central_right">
        <div style="width: 400px;height:200px; display: inline-block;" id="chartmain2"></div>
      </div>
      <div class="clear"></div>
    </div> -->

    <div class="homePage_bottom">
      <div style="" class="bottom_left">
        <div style="width: 100%;height:230px; display: inline-block;" id="chartLine"></div>
      </div>

      <div style="" class="bottom_left">
        <div style="width: 100%;height:230px; display: inline-block;" id="chartLine2"></div>
      </div>

      <div style="" class="bottom_left">
        <div style="width: 100%;height:230px; display: inline-block;" id="chartLine3"></div>
      </div>

      <div style="" class="bottom_left">
        <div style="width: 100%;height:230px; display: inline-block;" id="chartLine4"></div>
      </div>

      <!-- <div style="" class="bottom_middle">
      </div>

      <div style="" class="bottom_right">
        <div style="width: 400px;height:200px; display: inline-block;" id="chartLine2"></div>
      </div> -->
      <div class="clear"></div>
    </div>

    <div class="homePage_bottom">
      <div style="" class="bottom_left">
        <div style="width: 100%;height:230px; display: inline-block;" id="chartLine5"></div>
      </div>

      <div style="" class="bottom_left">
        <div style="width: 100%;height:230px; display: inline-block;" id="chartLine6"></div>
      </div>

      <div style="" class="bottom_left">
        <div style="width: 100%;height:230px; display: inline-block;" id="chartLine7"></div>
      </div>

      <div style="" class="bottom_left">
        <div style="width: 100%;height:230px; display: inline-block;" id="chartLine8"></div>
      </div>

      <!-- <div style="" class="bottom_middle">
      </div>

      <div style="" class="bottom_right">
        <div style="width: 400px;height:200px; display: inline-block;" id="chartLine2"></div>
      </div> -->
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "homePage",
  data() {
    return {
      echartPieCustomTitle: "各水司用户占比",
      echartPieCustomLegend: ['大口径', '小口径'],
      echartPieCustomData: [
        { value: 335, name: '大口径' },
        { value: 310, name: '小口径' },
      ],
      echartPieCustomTitle2: "各水司缴费总额占比",
      echartPieCustomLegend2: ['大口径', '小口径'],
      echartPieCustomData2: [
        { value: 335, name: '大口径' },
        { value: 310, name: '小口径' },
      ],
      // 业务访问数据
      businessData: {},
      // 模块访问数据
      moduleData: {},
      // 推送消息访问数据
      noticeData: {},
      // 用户缴费数据
      payData: {},
    }
  },
  mounted() {
    // this.echartPieCustom();
    // this.echartPieCustom2();
    this.init();


  },
  methods: {
    // 初始化页面数据
    init() {
      let _this = this;
      if (localStorage.getItem('roleId') != 1) {
        return
      }
      let params = {//接口入参
        "data": {},
      }
      this.$api.fetch({
        params: params,//参数
        apiUrl: '/index/homeMap.api',//接口地址
      }).then(res => {
        this.businessData = res.business;
        this.moduleData = res.module;
        this.noticeData = res.notice;
        this.payData = res.pay;

        this.echarBarCustom();
        this.getechart();
        this.getechart4();
        this.getechart5();
        this.getechart6();
        this.getechart7();
        this.getechart8();
        this.getLine();
      })
    },
    getLine() {
      let myChart = this.$echarts.init(document.getElementById('chartLine3'))
      var option = {
        title: {
          text: '推送消息统计图',
          x: 'center',
          align: 'right'
        },
        xAxis: {
          type: 'category',
          data: this.noticeData.companyKey
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.noticeData.companyValue,
          type: 'line'
        }]
      };
      myChart.setOption(option);
    },
    // 饼图--各水司用户占比
    getechart() {
      let myChart = this.$echarts.init(document.getElementById('chartLine2'))
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '业务办理统计图',
          x: 'center',
          align: 'right'
        },
        xAxis: {
          type: 'category',
          data: this.businessData.companyKey
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.businessData.companyValue,
          type: 'line'
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    echartPieCustom() {
      let myChart = this.$echarts.init(document.getElementById('chartmain'))
      //   let option = {
      //     title: {
      //       text: this.echartPieCustomTitle,
      //       x: 'center',
      //       textStyle: {
      //         fontWeight: "normal",
      //         fontSize: 14
      //       },
      //     },
      //     tooltip: {
      //       trigger: 'item',
      //       formatter: "{b}：{c}(万吨) <br/>{a}：{d}%"
      //     },
      //     legend: {
      //       data: this.echartPieCustomLegend,
      //       type: 'scroll',
      //       orient: 'vertical',
      //       show: false,
      //       right: 0,
      //       top: 20,
      //       bottom: 20,
      //       textStyle: {
      //         fontSize: 12
      //       }
      //     },
      //     color: ['#f77a76 ', '#66b5f0', '#a1de8e', '#98adff', '#ffca64', '#78d8cc'],
      //     series: [
      //       {
      //         name: '占比',
      //         type: 'pie',
      //         radius: ['45%', '65%'],
      //         center: ['40%', '60%'],
      //         avoidLabelOverlap: false,
      //         label: {
      //           normal: {
      //             show: false,
      //             position: 'center'
      //           },
      //           emphasis: {
      //             show: true,
      //             textStyle: {
      //               fontSize: '12',
      //               fontWeight: 'bold'
      //             }
      //           }
      //         },
      //         labelLine: {
      //           normal: {
      //             show: false
      //           }
      //         },
      //         data: this.echartPieCustomData
      //       }
      //     ]
      //   };
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          data: ['梧州水司', '儋州水司', '梅州水司', '清溪水司']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '梧州水司' },
              { value: 310, name: '儋州水司' },
              { value: 234, name: '梅州水司' },
              { value: 135, name: '清溪水司' }
            ]
          }
        ]
      };
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })

    },
    // 饼图--各水司缴费占比
    echartPieCustom2() {
      let myChart = this.$echarts.init(document.getElementById('chartmain2'))
      //   let option = {
      //     title: {
      //       text: this.echartPieCustomTitle2,
      //       x: 'center',
      //       textStyle: {
      //         fontWeight: "normal",
      //         fontSize: 14
      //       },
      //     },
      //     tooltip: {
      //       trigger: 'item',
      //       formatter: "{b}：{c}(万吨) <br/>{a}：{d}%"
      //     },
      //     legend: {
      //       data: this.echartPieCustomLegend2,
      //       type: 'scroll',
      //       orient: 'vertical',
      //       show: false,
      //       right: 10,
      //       textStyle: {
      //         fontSize: 12
      //       }
      //     },
      //     color: ['#f77a76 ', '#66b5f0', '#a1de8e', '#98adff', '#ffca64', '#78d8cc'],
      //     series: [
      //       {
      //         name: '占比',
      //         type: 'pie',
      //         radius: ['45%', '65%'],
      //         center: ['40%', '60%'],
      //         avoidLabelOverlap: false,
      //         label: {
      //           normal: {
      //             show: false,
      //             position: 'center'
      //           },
      //           emphasis: {
      //             show: true,
      //             textStyle: {
      //               fontSize: '12',
      //               fontWeight: 'bold'
      //             }
      //           }
      //         },
      //         labelLine: {
      //           normal: {
      //             show: false
      //           }
      //         },
      //         data: this.echartPieCustomData2
      //       }
      //     ]
      //   };
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          data: ['梧州水司', '儋州水司', '梅州水司', '清溪水司']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '梧州水司' },
              { value: 310, name: '儋州水司' },
              { value: 234, name: '梅州水司' },
              { value: 135, name: '清溪水司' }
            ]
          }
        ]
      };
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })

    },
    echarBarCustom() {
      let myChart = this.$echarts.init(document.getElementById('chartLine'))
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '模块访问统计图',
          x: 'center',
          align: 'right'
        },
        xAxis: {
          type: 'category',
          data: this.moduleData.companyKey
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.moduleData.companyValue,
          type: 'line'
        }]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    // 饼图--各水司用户占比
    getechart4() {
      let myChart = this.$echarts.init(document.getElementById('chartLine4'))
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '用户缴费统计图',
          x: 'center',
          align: 'right'
        },
        xAxis: {
          type: 'category',
          data: this.payData.companyKey
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.payData.companyValue,
          type: 'line'
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    // 饼图--各水司用户占比
    getechart5() {
      let myChart = this.$echarts.init(document.getElementById('chartLine5'))
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '模块访问统计图',
          x: 'center',
          align: 'right'
        },
        xAxis: {
          type: 'category',
          data: this.moduleData.monthKey
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.moduleData.monthValue,
          type: 'line'
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    // 饼图--各水司用户占比
    getechart6() {
      let myChart = this.$echarts.init(document.getElementById('chartLine6'))
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '业务办理统计图',
          x: 'center',
          align: 'right'
        },
        xAxis: {
          type: 'category',
          data: this.businessData.monthKey
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.businessData.monthValue,
          type: 'line'
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    // 饼图--各水司用户占比
    getechart7() {
      let myChart = this.$echarts.init(document.getElementById('chartLine7'))
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '推送消息统计图',
          x: 'center',
          align: 'right'
        },
        xAxis: {
          type: 'category',
          data: this.noticeData.monthKey
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.noticeData.monthValue,
          type: 'line'
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    // 饼图--各水司用户占比
    getechart8() {
      let myChart = this.$echarts.init(document.getElementById('chartLine8'))
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '用户缴费统计图',
          x: 'center',
          align: 'right'
        },
        xAxis: {
          type: 'category',
          data: this.payData.monthKey
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.payData.monthValue,
          type: 'line'
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  //   getechart() {
  //     let myChart = this.$echarts.init(document.getElementById('chartLine2'))
  //     // 指定图表的配置项和数据
  //     var option = {
  //       title: {
  //         text: '业务办理数量按月/年柱状图'
  //       },
  //       tooltip: {},
  //       legend: {
  //         x: 'right',
  //         data: ['办理数量']
  //       },
  //       xAxis: {
  //         data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
  //       },
  //       yAxis: {},
  //       series: [{
  //         name: '办理数量',
  //         type: 'bar',
  //         data: [5, 20, 36, 10, 10, 20]
  //       }]
  //     };
  //     // 使用刚指定的配置项和数据显示图表。
  //     myChart.setOption(option);
  //   },
}
</script>
<style lang="scss">
$imgWidth: 200px;
$theme-color: #297acc;
.homePage {
  height: 100%;
  margin: 10px;

  .homePage_top {
    margin: 0 auto;
    width: 100%;
    height: 35%;
    // border: 1px solid red;

    .el-card {
      display: inline-block;
      margin: 0px 5px;
      .table_1 {
        td {
          text-align: center;
          width: 60%;
        }
      }
    }
  }
  .homePage_central {
    height: 30%;
    // border: 1px solid red;
    margin: 0px 30px;
    .central_left {
      border: 1px solid white;
      width: 49%;
      display: inline-block;
      float: left;
      #chartmain {
        margin-left: 150px;
      }
    }
    .central_right {
      border: 1px solid white;
      width: 49%;
      display: inline-block;
      float: right;
    }
  }
  .homePage_bottom {
    margin: 0 auto;
    height: 31%;
    // width: 65%;
    // border: 1px solid red;
    .bottom_left {
      margin: 0 auto;
      height: 100%;
      display: inline-block;
      width: 24.5%;
      border: 1px solid white;
    }
    .bottom_middle {
      margin: 0 auto;
      display: inline-block;
      width: 25%;
      border: 1px solid white;
      height: 100%;
    }
    .bottom_right {
      margin: 0 auto;
      display: inline-block;
      width: 25%;
      border: 1px solid white;
      height: 100%;
    }
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 23%;
    .box-card-top {
      width: 100%;
      text-align: center;
      padding-bottom: 10px;
      font-size: 16px;
    }
  }
  .clear {
    clear: both;
  }
}
</style>
