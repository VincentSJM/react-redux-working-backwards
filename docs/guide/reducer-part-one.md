# Reducer: Part I

- [official doc](https://redux.js.org/glossary#reducer)
- type `(state: S, action: A) => S`

A reducer is a pure function that takes the previous state and an action, and
returns the next state.

It's very important that the reducer stays pure. Things you should **never** do
inside a reducer:

- Mutate its arguments;
- Perform side effects like API calls and routing transitions;
- Call non-pure functions, e.g. Date.now() or Math.random().

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

- [official doc](https://redux-toolkit.js.org/api/createReducer)

#### "Builder callback" API

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

#### Object API

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
[Immer library](https://immerjs.github.io/immer/docs/introduction) internally,
which lets you write code that "mutates" some data, but actually applies the
updates immutably. This makes it effectively impossible to accidentally mutate
state in a reducer.
