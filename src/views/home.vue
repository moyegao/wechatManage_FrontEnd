<template>
  <div class="custom-home">
    <header>
      <first-Nav :firstNav="firstNav" @changeNav="changeNav">
        <div class="header-top-right">
          <i>
            <img :src=" userInfo.photourl" alt>
          </i>

          <b>{{userName}}</b>
          <span @click="quit" style="cursor: pointer;">
            <i class="el-icon-switch-button"></i>
            退出
          </span>
        </div>
      </first-Nav>

    </header>

    <section class="kl-container">
      <aside v-show="menuShow" class="primary-menu">
        <aside class="kl-aside">
          <second-Nav :secondNav="secondNav"></second-Nav>
        </aside>
        <!-- <div class="collapse" @click="collapse">
            <i class="el-icon-arrow-left leftChange"></i>
        </div> -->
      </aside>
      <div class="kl-main" style="margin-left: 0px;" id="main-home">
        <router-view v-if='isRouterAlive'></router-view>
      </div>

    </section>
  </div>
</template>
<script>
export default {
  name: "custom-home",
  data() {
    return {
      firstNav: {
        title: '后台管理系统',
        logoSrc: require('../assets/images/logo3.png'),
        navData: {
          navList: [

          ],
          activeChanel: '/homePage',
        },
      },
      secondNav: {
        navList: [

        ],

      },
      userInfo: {
        photourl: require('../assets/images/cute.jpeg')
      },
      menuShow: true,
      isRouterAlive: true,
      userName: localStorage.getItem('userName')
    }
  },
  mounted() {
    this.getMenu();
    this.$nextTick(() => {
      $("#app #firstNav #nav .navList").children('li').eq(0).addClass("active").siblings().removeClass("active")
    })
  },
  methods: {
    getMenu() {
      this.firstNav.navData = {
        navList: [
          {
            Navtitle: '首页',
            icon: '1',
            path: '/homePage',

          },
          {
            Navtitle: '新闻发布',
            icon: '1',
            path: '/newsRelease',

          },
          {
            Navtitle: '业务管理',
            icon: '1',
            path: '/businessManagement',
            children: [
              {
                icon: "test-1",
                type: 'firstmenu',
                url: "/businessManagement/messageRelease",
                NavName: "信息发布",
                children: []
              },
              // {
              //   icon: "test-2",
              //   type: 'firstmenu',
              //   url: "/businessManagement/selfHelpMeterReading",
              //   NavName: "自助抄表",
              //   children: []
              // },
            ]

          },
          {
            Navtitle: '运营报表',
            icon: '1',
            path: '/operationReport',
            children: [
              {
                icon: "systemMan1-1",
                type: 'firstmenu',
                url: "/operationReport/userStatistics",
                NavName: "用户统计",
                children: []
              },
              {
                icon: "systemMan1-2",
                type: 'firstmenu',
                url: "/operationReport/moduleAccess",
                NavName: "模块访问统计",
                children: []
              },
              {
                icon: "systemMan1-3",
                type: 'firstmenu',
                url: "/operationReport/businessManagement",
                NavName: "业务办理统计",
                children: []
              },
              {
                icon: "systemMan1-4",
                type: 'firstmenu',
                url: "/operationReport/pushMessage",
                NavName: "推送消息统计",
                children: []
              },
              {
                icon: "systemMan1-6",
                type: 'firstmenu',
                url: "/operationReport/pushMessageDetail",
                NavName: "推送消息明细",
                children: []
              },
              {
                icon: "systemMan1-5",
                type: 'firstmenu',
                url: "/operationReport/userPayment",
                NavName: "用户缴费统计",
                children: []
              },
            ],

          },
          {
            Navtitle: '系统管理',
            icon: '1',
            path: '/systemManagement',
            children: [
              // {
              //   icon:"waterSet-1",
              //   type: 'firstmenu',
              //   url: "/systemManagement/waterManagement",
              //   NavName:"水司管理",
              //   children:[]
              // },
              {
                icon: "waterSet-2",
                type: 'firstmenu',
                url: "/systemManagement/InformationSet",
                NavName: "公众号信息配置",
                children: []
              },
              {
                icon: "waterSet-2",
                type: 'firstmenu',
                url: "/systemManagement/meunSet",
                NavName: "公众号菜单配置",
                children: []
              },
              {
                icon: "waterSet-2",
                type: 'firstmenu',
                url: "/systemManagement/userSet",
                NavName: "用户权限管理",
                children: []
              },
              {
                icon: "waterSet-2",
                type: 'firstmenu',
                url: "/systemManagement/automaticRecovery",
                NavName: "自动回复配置",
                children: []
              },
              {
                icon: "waterSet-2",
                type: 'firstmenu',
                url: "/systemManagement/activityConfiguration",
                NavName: "参观预约活动配置",
                children: []
              },
              // {
              //   icon:"waterSet-2",
              //   type: 'firstmenu',
              //   url: "/systemManagement/journalSet",
              //   NavName:"日志查看",
              //   children:[]
              // },
            ],

          },

        ],
      };
      if (localStorage.getItem('roleId') == 1) {
        this.firstNav.navData.navList.splice(1, 2)
      } else if (localStorage.getItem('roleId') == 2) {// 新闻发布
        this.firstNav.navData.navList.splice(0, 1)
        this.firstNav.navData.navList.splice(1, 3)
      } else if (localStorage.getItem('roleId') == 3 || localStorage.getItem('roleId') == 4) {//信息发布
        this.firstNav.navData.navList.splice(0, 2)
        this.firstNav.navData.navList.splice(1, 2)
        if (localStorage.getItem('roleId') == 3) {
          // 添加自助抄表链接
          // console.log(this.firstNav.navData.navList[0].children);
          this.firstNav.navData.navList[0].children.push({
            icon: "test-2",
            type: 'firstmenu',
            url: "/businessManagement/selfHelpMeterReading",
            NavName: "自助抄表",
            children: []
          })
        }
      }
      this.$router.push(this.firstNav.navData.navList[0].path)//进入第一个菜单
      this.changeNav(this.firstNav.navData.navList[0]);
    },
    //退出登录
    quit() {
      window.localStorage.removeItem("taken")
      window.location.href = window.location.search + '/wxmanage/#/'// 跳到登录页（代码走读）
      // window.location.href = 'http://localhost:8082'// 跳到登录页（代码走读）
      // // window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://' + this.host + ':8080/cas.htm'

      //         if(this.host=='localhost'){
      //           window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://' + this.host + ':8080/cas.htm'

      //         }else {
      //           window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://jc.uat.gdhwater.com/cas.htm'

      //         }
      // window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://' + this.host + ':8080/cas.htm'
    },

    // 页面重加载函数
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true))
    },

    changeNav(val) {
      let arr = ['/homePage', '/newsRelease'];
      if (arr.includes(val.path)) {
        this.menuShow = false;
        $(".primary-menu").css('width', '0px');
        $('.kl-main').css('width', 'calc(100% - 10px)');
        $('.primary-menu .kl-aside').css('display', 'none');
        $('.primary-menu .leftChange').addClass('el-icon-arrow-right').removeClass('el-icon-arrow-left');
      } else {
        this.menuShow = true;
        $(".primary-menu").css('width', '200px');
        $('.kl-main').css('width', 'calc(100% - 210px)');
        $('.primary-menu .kl-aside').css('display', 'block');
        $('.primary-menu .leftChange').addClass('el-icon-arrow-left').removeClass('el-icon-arrow-right');
      }

      this.firstNav.navData.navList.forEach((item, index) => {
        if (val.path === item.path) {
          this.secondNav.navList = item.children;
          // this.$router.push(item.children[0].url);
        }
      })
    },
    collapse() {
      $('.primary-menu').addClass('animation');
      $('.kl-main').addClass('animation');
      if ($('.primary-menu').width() === 0) {
        $('.primary-menu').css('width', '200px');

        $('.kl-main').css('width', 'calc(100% - 230px)');
        $('.primary-menu .kl-aside').css('display', 'block');
        $('.primary-menu .leftChange').addClass('el-icon-arrow-left').removeClass('el-icon-arrow-right');
      } else {
        $('.primary-menu').css('width', '0px');
        $('.kl-main').css('width', 'calc(100% - 30px)');
        $('.primary-menu .kl-aside').css('display', 'none');
        $('.primary-menu .leftChange').addClass('el-icon-arrow-right').removeClass('el-icon-arrow-left');
      }
    }
  }


}
</script>

<style lang="scss">
@import "../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.custom-home {
  width: 100%;
  height: 100%;
  .header-top-right {
    display: flex;
    align-items: center;
    height: 100%;
    float: right;
    .el-input__icon {
      line-height: 45px;
    }
    & > span {
      color: #fff;
      font-size: 14px;
      i {
        color: #fff;
        font-size: 14px;
        vertical-align: middle;
        height: 14px;
        width: 14px;
      }
    }
    & > * {
      float: left;
    }
    i {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 30px;
        height: 30px;
        float: left;
      }
    }
    b {
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      padding: 0 20px 0 10px;
      font-weight: 400;
    }
  }
  #firstNav {
    .setting {
      padding-right: 50px;
    }
    .navList > li {
      height: 25px !important;
    }
  }
  .primary-menu {
    float: left;
    width: 200px;
    height: 100%;
    position: relative;
    background: #fff;
    .kl-aside {
      position: absolute;
      left: 0px;
      width: 200px;
      z-index: 1000;
      background: #fff;
      height: calc(100% - 18px);
      color: #000;
      border-radius: 3px;
      .el-menu {
        width: 100%;
        border: none;
        overflow: auto;
        background: transparent;
        background: #fff;
        height: 100%;

        .el-menu-item {
          height: 38px;
        }

        .el-menu-item.is-active {
          background: #328ed1;
          color: #fff;
        }

        .el-menu-item {
          width: 100%;

          text-align: center;
        }
        li.el-submenu {
          color: #000;
          .el-menu {
            background: transparent;
          }
          .el-submenu__title {
            text-align: left;
            height: 50px !important;
            line-height: 50px !important;
            font-size: 14px;
            font-weight: 700;
            &:hover,
            &:focus {
              background: $theme-color;
            }
          }
        }
        .el-menu-item {
          background: transparent;
          color: #3b3a3a;
          text-align: left;
          height: 38px !important;
          line-height: 38px !important;
          font-size: 14px;
          font-weight: 700;
          &:hover,
          &:focus {
            background: $theme-color;
          }
          &.is-active {
            background: $theme-color;
            color: #fff;
            height: 38px !important;
            line-height: 38px !important;
          }
        }
      }
      .kr-title {
        color: #3195f4;
        cursor: pointer;
        font-size: 20px;
        font-weight: bold;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        text-align: center;
      }

      .switch-btn {
        position: relative;
        width: 18px;
        height: 100%;
        float: left;
        background: rgba(0, 70, 142, 0.1);
        line-height: 100%;
        text-align: center;
        .glyphicon-menu-right,
        .glyphicon-menu-left {
          vertical-align: middle;
          background: rgb(0, 70, 141);
          color: #fff;
          height: 60px;
          line-height: 60px;
          font-weight: bolder;
          position: absolute;
          top: 50%;
          left: 3%;
          transform: translateY(-50%);
          border-radius: 0 3px 3px 0;
        }
      }
    }
  }
  & > .kl-container {
    height: calc(100% - 90px);
    position: relative;
    background: #eaf4ff;
    padding: 10px;
    width: calc(100% - 20px);
    .kl-main {
      height: 100%;
      float: right;
      width: calc(100% - 210px);
      border-radius: 3px;
      background: #fff;
      .model-first-rank {
        padding: 0px;
      }
    }
  }
  .toolbar {
    width: calc(100% - 20px);
    padding: 0px 10px;
    .demo-form-inline {
      zoom: 1;
      &:after {
        display: block;
        content: "";
        clear: both;
      }
      & > .toolbar-left {
        float: left;
      }
      & > .toolbar-right {
        float: right;
      }
    }
  }
  .kl-table {
    // width: calc(100% - 20px);
    padding: 0px 10px;
    .block {
      text-align: right;
      padding: 10px 0px;
    }
    .el-table--striped .el-table__body tr.el-table__row--striped td {
      background: #f5f5f5;
    }
    .el-table__header {
      th {
        color: #111;
        background: #f3f5fb;
      }
    }
    .el-table td,
    .el-table th {
      padding: 4px 0;
      text-align: center;
    }
    .el-table {
      border: 1px solid #ebeef5;
      .cell {
        line-height: 30px;
        height: 30px;
      }
      .el-table__fixed-right {
        /*border-left: 1px solid #ebeef5*/
        .el-button {
          font-size: 12px;
        }
      }
    }
  }
  .bread-contain {
    width: calc(100% - 10px);
    zoom: 1;
    border-bottom: 1px solid #eaf4ff;
    margin-bottom: 10px;
    &::after {
      display: block;
      content: "";
      clear: both;
    }
    .bread-contain-right {
      float: right;
      width: 50%;
      text-align: right;
      line-height: 40px;
    }
    #crumbs {
      float: left;
      width: 40%;
      padding-right: 0px;
      // .is-link{
      //   color: #606266 !important;
      //   font-weight: 500 !important;
      // }
      // .el-breadcrumb__inner{
      //   font-weight: 700;
      //   color: #409eff;
      // }
    }
  }
  // 搜索按钮
  .compile {
    background: #faa646;
    border: 1px solid #faa646;
  }
  // 按钮公共样式
  .el-button--info {
    color: #f8fafe;
    background: #297acc;
    border-color: #d3d4d6;
  }
}
</style>
