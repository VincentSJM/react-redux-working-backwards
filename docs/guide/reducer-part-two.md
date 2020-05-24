# Reducer: Part II

## Reducer Glossary

- **_reducer_**: any function with the signature `(state, action) => newState`
- **_root reducer_**: the reducer function that is actually passed as the first
  argument to `createStore`.
- **_slice reducer_**: a reducer that is being used to handle updates to one
  specific slice of the state tree, usually done by passing it to
  `combineReducers`
- **_case function_**: a function that is being used to handle the update logic
  for a specific action. This may actually be a reducer function (**_case
  reducer_**), or it may require other parameters to do its work properly.
- **_higher-order reducer_**: a function that takes a reducer function as an
  argument, and/or returns a new reducer function as a result (such as
  `combineReducers`)
- [official doc](https://redux.js.org/recipes/structuring-reducers/splitting-reducer-logic)

## Slice reducer

### `createSlice` from @reduxjs/toolkit

- [official doc](https://redux-toolkit.js.org/api/createslice)

## High-Order Reducer

### `combineReducers` from redux

- [official doc](https://redux.js.org/api/combinereducers)

### Beyond `combineReducers`

- [official doc](https://redux.js.org/recipes/structuring-reducers/beyond-combinereducers)
