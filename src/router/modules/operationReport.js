
export default ([
    {
      path: '/operationReport',
      meta: {
        title: '运营报表'
      },
      component: resolve => require(['@/views/operationReport'], resolve),
      children:[
        {
            path: '/',
            redirect:"userStatistics"
        },
        {
          path: 'userStatistics',
          meta: {
            title: '用户统计'
          },
          component: resolve => require(['@/views/operationReport/userStatistics'], resolve)
        },
        {
          path: 'moduleAccess',
          meta: {
            title: '模块访问统计'
          },
          component: resolve => require(['@/views/operationReport/moduleAccess'], resolve)
        },
        {
          path: 'businessManagement',
          meta: {
            title: '业务办理统计'
          },
          component: resolve => require(['@/views/operationReport/businessManagement'], resolve)
        },
        {
          path: 'pushMessageDetail',
          meta: {
            title: '业务办理明细'
          },
          component: resolve => require(['@/views/operationReport/pushMessageDetail'], resolve)
        },
        {
          path: 'pushMessage',
          meta: {
            title: '推送消息统计'
          },
          component: resolve => require(['@/views/operationReport/pushMessage'], resolve)
        },
        {
          path: 'userPayment',
          meta: {
            title: '用户缴费统计'
          },
          component: resolve => require(['@/views/operationReport/userPayment'], resolve)
        },
      ]
    }
  ])