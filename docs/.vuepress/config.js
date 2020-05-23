module.exports = {
  base: '/react-redux-working-backwards/',
  title: 'React Redux Working Backwards',
  themeConfig: {
    sidebarDepth: 2,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Libraries', link: '/libraries'},
    ],
    sidebar: [
      '/installation',
      '/',
      '/guide/',
      {
        title: 'Core Concepts',
        collapsable: false,
        children: [
          '/guide/store',
          '/guide/reducer-part-one',
          '/guide/state',
          '/guide/actions',          
          '/guide/middleware',
          '/guide/reducer-part-two',
        ]
      }
    ]
  }
}