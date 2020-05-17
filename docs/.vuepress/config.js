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
          '/guide/reducers',
          '/guide/state',
          '/guide/actions',
          '/guide/selectors',
          '/guide/slices',
          '/guide/thunks',
          '/guide/middlewares'
        ]
      }
    ]
  }
}