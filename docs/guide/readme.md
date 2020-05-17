# Getting Started

## The Simplest Store

```js
import { createStore } from 'redux';

const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        count: state.count - 1,
      };
    default:
      return state;
  }
}

const store = createStore(counterReducer);
```

Now, you can access the state as `store.getState()`, and trigger a state change
with the `store.dispatch` method:

```js
store.dispatch({ type: 'INCREMENT' });

console.log(store.getState()); // -> { count: 1 };
```

In order to have an access to `store` in your React components, you need to
provide the created store to the root react component using `react-redux`'s
[`Provider`](https://react-redux.js.org/api/provider) component. `react-redux`
internally use
[`React.createContext API`](https://reactjs.org/docs/context.html#reactcreatecontext)
to make the Redux store accessible to deeply nested connected components:

```js
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

Now we can access store inside a react component using `react-redux`'s
[`useStore hook`](https://react-redux.js.org/api/hooks#usestore):

```js
import React from 'react';
import { useStore } from 'react-redux';

export const CounterComponent = () => {
  const store = useStore();
  return <div>{store.getState()}</div>;
};
```
