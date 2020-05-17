# Reducers

The reducer is a pure function that takes the previous state and an action, and
returns the next state.

```ts
export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;
```

It's called a reducer because it's the type of function you would pass to
[`Array.prototype.reduce(reducer, ?initialValue)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).
It's very important that the reducer stays pure. Things you should **never** do
inside a reducer:

- Mutate its arguments;
- Perform side effects like API calls and routing transitions;
- Call non-pure functions, e.g. Date.now() or Math.random().

## switch statement reducer

## @reduxjs/toolkit `createReducer()`
