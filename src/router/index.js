import Vue from 'vue'
import Router from 'vue-router'
import operationReport from "./modules/operationReport"
import systemManagement from "./modules/systemManagement"
import businessManagement from "./modules/businessManagement"
import index from "./modules/index"

Vue.use(Router)

export default new Router({
  routes: [
    {
      "path":'/',
      meta: {
        title: '登录'
      },
      component: resolve => require(['@/views/login'], resolve)
    },
    {
      path: '/home',
      meta: {
        title: '主容器'
      },
      component: resolve => require(['@/views/home'], resolve),
      children:[
      	{
          path: '/',
          meta: {
            title: '首页'
          },
          component: resolve => require(['@/views/homePage/homePage'], resolve)
        },
      	{
          path: '/newsRelease',
          meta: {
            title: '新闻发布'
          },
          component: resolve => require(['@/views/newsRelease/index'], resolve)
        },
        {
          path: 'selfHelpMeterReading',
          meta: {
            title: '自助抄表'
          },
          component: resolve => require(['@/views/businessManagement/selfHelpMeterReading'], resolve)
        },
      	// {
        //   path: '/messageRelease',
        //   meta: {
        //     title: '信息发布'
        //   },
        //   component: resolve => require(['@/views/messageRelease/index'], resolve)
        // },
        // 运营报表
        ...operationReport,
        // 系统管理
        ...systemManagement,
        // 业务管理
        ...businessManagement,
        // 首页
        ...index,
      ]
    }
  ]
})
