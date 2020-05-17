module.exports = {
  base: '/react-redux-working-backwards/',
  title: 'React Redux Working Backwards',
  themeConfig: {
    sidebar: [
      '/installation',
      '/',
      '/guide/',
      {
        title: 'Core Concepts',
        collapsable: false,
        children: [
          '/guide/state',
          '/guide/selectors',
          '/guide/actions',
          '/guide/thunks',
          '/guide/slices',
          '/guide/middlewares'
        ]
      }
    ]
  }
}