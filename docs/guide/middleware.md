# Middleware

- type `({ getState, dispatch }) => next => action => any`

## Logger

```js
const logger = (store) => (next) => (action) => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};
```

## Crash Reporter

```js
const crashReporter = (store) => (next) => (action) => {
  const stateBeforeAction = store.getState();
  try {
    return next(action);
  } catch (err) {
    Raven.captureException(err, {
      extra: {
        action,
        stateBeforeAction,
        state: store.getState(),
      },
    });
    throw err;
  }
};
```

## Thunk

Without middleware, Redux store only supports synchronous data flow. This is
what you get by default with createStore(). Asynchronous middleware like
[redux-thunk](https://github.com/reduxjs/redux-thunk/blob/master/src/index.js)
wraps the store's dispatch() method and allows you to dispatch something other
than action object, for example, functions.

A [thunk](https://en.wikipedia.org/wiki/Thunk) is a function that wraps an
expression to delay its evaluation.

```js
// calculation of 1 + 2 is immediate
const x = 1 + 2;

// calculation of 1 + 2 is delayed
// foo can be called later to perform the calculation
// foo is a thunk!
const foo = () => 1 + 2;
```

[redux-thunk](https://github.com/reduxjs/redux-thunk/blob/master/src/index.js)
is a 14 line code library and the meat of the code is as following:

```js
const thunkMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  return next(action);
};
```

Let's define an action creator that returns a async function.

```js
const asyncActionCreator = () => {
  return async (dispatch, getState) => {
    try {
      const { counter } = getState();
      const resp = await fetch(`/api/${counter}`);
      const data = await resp.json();
      dispatch({
        type: 'SOME_TYPE',
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: 'SOME_TYPE',
        payload: err,
        error: true,
      });
    }
  };
};
```

## `applyMiddleware` from Redux

### Order of `applyMiddleware`

```js
applyMiddleware(thunk, logger, crashReporter);
```

[StackOverflow question answered by Redux author](https://stackoverflow.com/questions/46608411/order-of-multiple-middleware-in-react-redux)
