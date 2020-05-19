# Splitting Up Reducer Logic

- [official doc](https://redux.js.org/recipes/structuring-reducers/splitting-reducer-logic)

Due to using a single state tree, all state of our application is contained
inside one big object. However, as our application grows in scale, the store can
get really bloated.

## slice reducer

### `createSlice` from @reduxjs/toolkit

### cross slice

- [official doc](https://redux.js.org/recipes/structuring-reducers/beyond-combinereducers#sharing-data-between-slice-reducers)

## `combineReducers` from redux
