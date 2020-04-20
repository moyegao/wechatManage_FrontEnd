
export default ([
    {
      path: '/systemManagement',
      meta: {
        title: '系统管理'
      },
      component: resolve => require(['@/views/systemManagement'], resolve),
      children:[
        {
            path: '/',
            redirect:"InformationSet"
        },
        {
            path: 'InformationSet',
            meta: {
              title: '公众号信息配置'
            },
            component: resolve => require(['@/views/systemManagement/InformationSet'], resolve)
        },
        {
            path: 'meunSet',
            meta: {
              title: '公众号菜单配置'
            },
            component: resolve => require(['@/views/systemManagement/meunSet'], resolve)
        },
        {
          path: 'userSet',
          meta: {
            title: '公用户权限管理'
          },
          component: resolve => require(['@/views/systemManagement/userSet'], resolve)
        },
        {
          path: 'automaticRecovery',
          meta: {
            title: '自动回复配置'
          },
          component: resolve => require(['@/views/systemManagement/automaticRecovery'], resolve)
        },
        {
          path: 'activityConfiguration',
          meta: {
            title: '参观预约活动配置'
          },
          component: resolve => require(['@/views/systemManagement/activityConfiguration'], resolve)
        },
      //   {
      //     path: 'journalSet',
      //     meta: {
      //       title: '日志查看'
      //     },
      //     component: resolve => require(['@/views/systemManagement/journalSet'], resolve)
      // },
      // {
      // path: 'waterManagement',
      // meta: {
      //     title: '水司管理'
      // },
      // component: resolve => require(['@/views/systemManagement/waterManagement/index'], resolve)
      // },
      ]
    }
  ])