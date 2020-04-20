
export default ([
    {
      path: '/homePage',
      meta: {
        title: '首页'
      },
      component: resolve => require(['@/views/homePage/homePage'], resolve),
    }
  ])