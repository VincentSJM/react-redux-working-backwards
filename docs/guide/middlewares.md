# Middlewares

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
    const { counter } = getState();
    const resp = await fetch(`/api/${counter}`);
    const data = await resp.json();
    dispatch({
      type: 'SOME_TYPE',
      payload: data,
    });
  };
};
```

## `applyMiddleware` from Redux

### Order of `applyMiddleware`

```js
applyMiddleware(thunk, logger, crashReporter);
```

[StackOverflow question answered by Redux author](https://stackoverflow.com/questions/46608411/order-of-multiple-middleware-in-react-redux)
