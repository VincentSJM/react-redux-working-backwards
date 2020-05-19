module.exports = {
  base: '/react-redux-working-backwards/',
  title: 'React Redux Working Backwards',
  themeConfig: {
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
          '/guide/reducer',
          '/guide/state',
          '/guide/actions',          
          '/guide/middleware',
          '/guide/slices',
        ]
      }
    ]
  }
}