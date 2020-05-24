# Store

- [official doc](https://redux.js.org/api/store#store)
- A store is not a class. It's just an object with a few methods on it:
  - [`getState()`](https://redux.js.org/api/store#getstate)
  - [`dispatch(action)`](https://redux.js.org/api/store#dispatchaction)
  - [`subscribe(listener)`](https://redux.js.org/api/store#subscribelistener)
  - [`replaceReducer(nextReducer)`](https://redux.js.org/api/store#replacereducernextreducer)
- To create it, pass your root reducing function to `createStore`

## Create Redux Store

### `createStore` from redux

- [official doc](https://redux.js.org/api/createstore)
- type `(reducer, preloadedState?, enhancer?) => Store`

```js
import { createStore, applyMiddleware } from 'redux';

const reducer = (state = [], action) => {...};

const store = createStore(reducer, ['Use Redux'], applyMiddleware(logger));
```

### `configureStore` from @reduxjs/toolkit

- [official doc](https://redux-toolkit.js.org/api/configureStore)
- type
  `(options: {reducer, middleware?, devTools?, preloadedState?, enhancers?}) => Store`

`configureStore` wraps `createStore` to provide simplified configuration options
and good defaults. It can automatically combine your slice reducers, adds
whatever Redux middleware you supply, includes `redux-thunk` by default, and
enables use of the Redux DevTools Extension.

```js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({ reducer: rootReducer });
// The store now has redux-thunk added and the Redux DevTools Extension is turned on
```

## Accessing the Store from React Components

### `useStore` hook from react-redux

- [official doc](https://react-redux.js.org/api/hooks#usestore)
