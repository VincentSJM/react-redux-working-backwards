# State

When designing a reducer, you should think about the shape of state first.

```js
const initialState = ...;

const reducer = (state = initialState, action) {...};
// `state = initialState` is the way JavaScript assign default to function parameter
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
```

## Normalizing State

- [official doc](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape)

Usually a REST API can return following data:

```js
// GET /api/users
const users = [
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
]

```

If you put this data directly into your state, the performance for you to update
it can be slow:

```js
// update fist name for user with id '001'
// you need to find the user first, it has time complexity of O(N)
const user = users.find((u) => u.id === '001');
```

We can normalize it into a hashmap shape:

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

## Getting Redux State into React Components

### `connect` and `mapStateToProps` from react-redux

- [official doc](https://react-redux.js.org/api/connect)

### `useSelector` hook from react-redux

- [official doc](https://react-redux.js.org/api/hooks#useselector)

### Reselect library

- [official doc](https://github.com/reduxjs/reselect/blob/master/README.md)
