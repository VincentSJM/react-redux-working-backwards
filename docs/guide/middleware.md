# Middleware

- [official doc](https://redux.js.org/advanced/middleware)

- middleware type
  `({ getState, dispatch }) => (next: DispatchFunc) => DispatchFunc`

- dispatching function `DispatchFunc`

  - is a function that accepts an action or an async action `(action) => {...}`
  - it then may or may not dispatch one or more actions to the store.

- middleware api type `{ getState: () => State, dispatch: DispatchFunc }`

Redux middleware provides a third-party extension point between dispatching an
action, and the moment it reaches the reducer:

<p style="text-align: center; margin: 2em">
  <img style="width:100%;max-width:640px;" :src="$withBase('/reduxMiddleware.png')">
</p>

People use Redux middleware for logging, crash reporting, talking to an
asynchronous API, routing, and more.

## `applyMiddleware` from Redux

```js
import { createStore, applyMiddleware } from 'redux';
const reducer = (state, action) => {...};
const preloadedState = ...;

const store = createStore(
  reducer,
  preloadedState,
  applyMiddleware(thunk, logger, crashReporter)
)
```

- Execution Order of Multiple Middleware

Assuming you `applyMiddleware(middle1, middle2, middle3)`:

1. calling `store.dispatch()` passes the action to `middle1`
1. when `middle1` calls `next(action)`, it goes to `middle2`
1. when `middle2` calls `next(action)`, it goes to `middle3`
1. when `middle3` calls `next(action)`, it goes to the actual store and the
   reducer logic is executed.

[StackOverflow Question, answered by Redux author](https://stackoverflow.com/questions/46608411/order-of-multiple-middleware-in-react-redux)

## Thunk

Without middleware, Redux store only supports synchronous data flow. This is
what you get by default with createStore(). Asynchronous middleware like
[redux-thunk](https://github.com/reduxjs/redux-thunk/blob/master/src/index.js)
wraps the store's dispatch() method and allows you to dispatch something other
than action object, for example, functions.

- A [thunk](https://en.wikipedia.org/wiki/Thunk) is a function that wraps an
  expression to delay its evaluation.

```js
// calculation of 1 + 2 is immediate
const x = 1 + 2;

// calculation of 1 + 2 is delayed
// foo can be called later to perform the calculation
// foo is a thunk!
const foo = () => 1 + 2;
```

- A `thunk action` or `thunk` is no longer a plain action object, but a function
- A `thunk action creator` is a high order function that returns a `thunk`

```js
const thunkActionCreator = (userId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: 'users/fetchByIdStatus/pending' });
      const response = await userAPI.fetchById(userId);
      dispatch({
        type: 'users/fetchByIdStatus/fulfilled',
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: 'users/requestStatus/rejected',
        error,
      });
    }
  };
};
```

### `createAsyncThunk` from @reduxjs/toolkit

- [official doc](https://redux-toolkit.js.org/api/createAsyncThunk)

- type
  `(actionType: string, payloadCreator: Function, options?: Object) => ThunkActionCreator`

- example that achieve the same effect as our `thunkActionCreator`:

```js
const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId, thunkAPI) => {
    const response = await userAPI.fetchById(userId);
    return response.data;
  }
);
```

When the thunk action created by `createAsyncThunk` get dispatched, the thunk
will:

- dispatch the `pending` action first
- call the `payloadCreator` callback and wait for the returned promise to settle
  when the promise settles:
  - if the promise resolved successfully, dispatch the `fulfilled` action with
    the promise value as action.payload
  - if the promise resolved with a rejectWithValue(value) return value, dispatch
    the `rejected` action with the value passed into action.payload and
    'Rejected' as action.error.message
  - if the promise failed and was not handled with rejectWithValue, dispatch the
    `rejected` action with a serialized version of the error value as
    action.error

### Dive deep into `redux-thunk`

[redux-thunk](https://github.com/reduxjs/redux-thunk/blob/master/src/index.js)
is a 14 line code library and the meat of the code is as following:

```js
const thunkMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === 'function') {
    // if action is a thunk
    // execute the thunk
    return action(dispatch, getState);
  }

  return next(action);
};
```

## Logger

```js
const logger = ({ getState }) => (next) => (action) => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', getState());
  return result;
};
```

## Crash Reporter

```js
const crashReporter = ({ getState }) => (next) => (action) => {
  const stateBeforeAction = getState();
  try {
    return next(action);
  } catch (err) {
    Raven.captureException(err, {
      extra: {
        action,
        stateBeforeAction,
        state: getState(),
      },
    });
    throw err;
  }
};
```
