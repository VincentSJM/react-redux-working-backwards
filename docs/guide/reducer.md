# Reducer

- [official doc](https://redux.js.org/glossary#reducer)
- type `(state: S, action: A) => S`

The reducer is a pure function that takes the previous state and an action, and
returns the next state.

It's called a reducer because it's the type of function you would pass to
[`Array.prototype.reduce(reducer, ?initialValue)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).

It's very important that the reducer stays pure. Things you should **never** do
inside a reducer:

- Mutate its arguments;
- Perform side effects like API calls and routing transitions;
- Call non-pure functions, e.g. Date.now() or Math.random().

## `switch` statement reducer

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

## `createReducer` from @reduxjs/toolkit

### "Builder callback" API

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

### Object API

```js
import {createReducer, createAction} from '@reduxjs/toolkit`;

const increment = createAction('increment')
const decrement = createAction('decrement')

const counterReducer = createReducer(0, {
  [increment.type]: (state, action) => state + action.payload,
  [decrement.type]: (state, action) => state - action.payload
})
```

### Immer

You should **never** mutate the state object inside the plain reducer such as
the `switch` statement reducer.

However, @reduxjs/toolkit's `createReducer` is using
[Immer](https://immerjs.github.io/immer/docs/introduction) and the `state` param
is actually an Immer draft state and you can mutate it.
