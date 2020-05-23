# Reducer

- [official doc](https://redux.js.org/glossary#reducer)
- type `(state: S, action: A) => S`

A reducer is a pure function that takes the previous state and an action, and
returns the next state.

It's very important that the reducer stays pure. Things you should **never** do
inside a reducer:

- Mutate its arguments;
- Perform side effects like API calls and routing transitions;
- Call non-pure functions, e.g. Date.now() or Math.random().

## Reducer Glossary

- **_reducer_**: any function with the signature `(state, action) => newState`
- **_root reducer_**: the reducer function that is actually passed as the first
  argument to `createStore`.
- **_slice reducer_**: a reducer that is being used to handle updates to one
  specific slice of the state tree, usually done by passing it to
  `combineReducers`
- **_higher-order reducer_**: a function that takes a reducer function as an
  argument, and/or returns a new reducer function as a result (such as
  `combineReducers`)

## Create Reducer

### Simple `switch` statement reducer

You can use `if` statement if you want. `switch` statement reducer is more
common in redux official docs.

```js
function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'increment':
      return state + action.payload;
    case 'decrement':
      return state - action.payload;
    default:
      return state;
  }
}
```

### `createReducer` from @reduxjs/toolkit

- "Builder callback" API

```js
import {createReducer, createAction} from '@reduxjs/toolkit`;

const increment = createAction('increment')
const decrement = createAction('decrement')

createReducer(0, builder =>
  builder.addCase(increment, (state, action) => {
    return state++;
  }).addCase(decrement, (state, action) => {
    return state--;
  })
)

```

- Object API

```js
import {createReducer, createAction} from '@reduxjs/toolkit`;

const increment = createAction('increment')
const decrement = createAction('decrement')

const counterReducer = createReducer(0, {
  [increment.type]: (state, action) => state + action.payload,
  [decrement.type]: (state, action) => state - action.payload
})
```

You should **never** mutate the state object inside the plain reducer such as
the `switch` statement reducer.

However, @reduxjs/toolkit's `createReducer` is using
[Immer](https://immerjs.github.io/immer/docs/introduction) and the `state` param
is actually an Immer draft state and you can mutate it.

## Slice reducer

### `createSlice` from @reduxjs/toolkit

- [official doc](https://redux-toolkit.js.org/api/createslice)

## High-Order Reducer

### `combineReducers` from redux

- [official doc](https://redux.js.org/api/combinereducers)

### Beyond `combineReducers`

- [official doc](https://redux.js.org/recipes/structuring-reducers/beyond-combinereducers)
