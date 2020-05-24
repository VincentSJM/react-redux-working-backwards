# State

When designing a reducer, you should think about the shape of state first.

```js
// store/state.js
const state = { count: 0 };

export default state;
```

```js
// store/reducer.js
import initialState from './state';

const reducer = (state = initialState, action) {...};
// `state = initialState` is the way JavaScript assign default to function parameter
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
```

The `initialState` can be primitive value such as `number`, `string` or
`boolean`.

However, the global state of your Redux application is often a deeply nested
`object`, and we call it a `state tree` or an `object tree`.

One Redux store has
[a single state tree](https://redux.js.org/introduction/three-principles#single-source-of-truth).
The single state tree does not conflict with modularity - in the chapter
[Reducer: Part II](./reducer-part-two.md) we will discuss how to split your
state and reducer into slices.

## Getting Redux State into React Components

### `connect` and `mapStateToProps` from react-redux

- [official doc](https://react-redux.js.org/using-react-redux/connect-mapstate#defining-mapstatetoprops)
- [official api doc](https://react-redux.js.org/api/connect)

### `useSelector` hook from react-redux

- [official doc](https://react-redux.js.org/api/hooks#useselector)

### Reselect library

- [official doc](https://github.com/reduxjs/reselect/blob/master/README.md)

## Normalizing State

- [official doc](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape)

It is often the case that a REST API returns data in the form of
`an array of objects`. If you put the data directly into the state, the state
might look like following. The time complexity for you to find a user by id in
this array is `O(N)`.

```js
const state ={
  // GET /api/users
  users: [
    {
      id: '001',
      firstName: ...,
      lastName: ...,
    },
    {
      id: '002',
      firstName: ...,
      lastName: ...,
    },
    {
      id: '003',
      firstName: ...,
      lastName: ...,
    },
    ...
  ],
};
```

We can normalize the data into a hashmap shape in order to have `O(1)` access:

```js
const state = {
  users: {
    byId: {
      '001': {
        id: '001',
        firstName: ...,
        lastName: ...,
      },
      '002': {
        id: '002',
        firstName: ...,
        lastName: ...,
      },
      '003': {
        id: '003',
        firstName: ...,
        lastName: ...,
      },
      ...
    },
    // JavaScript object is not an ordered map
    // we need to add back order info
    idOrder: ['001', '002', '003', ...],
  },
}

const user001 = state.users['001']; // O(1) access
```

You can use [normalizr](https://github.com/paularmstrong/normalizr) library to
help normalize and denormalize data.
