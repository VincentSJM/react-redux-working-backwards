# State

When designing a reducer, you should think about the shape of state first.

```js
const initialState = ...;

const reducer = (state = initialState, action) {...};
```

You can use TypeScript type or interface to help you think about state. The
state can be primitive value, object or array, just like what
[JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
has.

If you are designing a slice of reducer first and combine reducers into a root
reducer later, you need to think about how the slice of state map to the root
state tree:

```ts
type Todo = {...};
const todosInitialState: [Todo] = [];
const todosReducer = (state = todosInitialState, action) => {...};

const rootReducer = combineReducers({todos: todosReducer});
// rootState will have following mapping:
// type rootState = { todos: [Todo]}
```

The other way is to put everything into root state and root reducer first, and
see how action and state generate the next state. If you see some pieces of
state are always referenced or updated together, refactor them into a slice of
state and reducer.

## Normalizing State

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
  // JavaScript object is not an ordered map, you will lose order info
  // we need to add that back
  userOrder: ['001', '002', '003', ...];
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
