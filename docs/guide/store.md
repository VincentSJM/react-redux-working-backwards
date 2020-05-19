# Store

## `createStore` from redux

- [official doc](https://redux.js.org/api/createstore)
- type `(reducer, preloadedState?, enhancer?) => Store`

example:

```js
import { createStore, applyMiddleware } from 'redux';

const reducer = (state = [], action) => {...};
const store = createStore(reducer, ['Use Redux'], applyMiddleware(logger));
```

### arguments

- `enhancer` is a decorator function whose signature is
  `createStore => createStore`

## `configureStore` from @reduxjs/toolkit

- [official doc](https://redux-toolkit.js.org/api/configureStore)
- type
  `(options: {reducer, middleware?, devTools?, preloadedState?, enhancers?}) => EnhancedStore`

`configureStore` wraps `createStore` to provide simplified configuration options
and good defaults. It can automatically combine your slice reducers, adds
whatever Redux middleware you supply, includes `redux-thunk` by default, and
enables use of the Redux DevTools Extension.
