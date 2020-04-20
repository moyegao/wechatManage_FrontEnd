
export default ([
    {
      path: '/businessManagement',
      meta: {
        title: '业务管理'
      },
      component: resolve => require(['@/views/businessManagement'], resolve),
      children:[
        {
            path: '/',
            redirect:"messageRelease"
        },
        {
          path: 'messageRelease',
          meta: {
            title: '信息发布'
          },
          component: resolve => require(['@/views/businessManagement/messageRelease'], resolve)
        },
        {
          path: 'selfHelpMeterReading',
          meta: {
            title: '自助抄表'
          },
          component: resolve => require(['@/views/businessManagement/selfHelpMeterReading'], resolve)
        },
      ]
    }
  ])