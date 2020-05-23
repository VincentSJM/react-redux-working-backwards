# Actions

- [official doc](https://redux.js.org/glossary#action)
- type `{ type: string, [key: string]: any }`
  - Actions must have a `type` field that indicates the type of action being
    performed
- are objects, which are payloads of information that send data from your
  application to your store. They are the _only_ source of information for the
  store. You send them to the store using `store.dispatch()`.

```js
store.dispatch({ type: 'INCREMENT' });
```

## Flux Standard Action (FSA)

- [official doc](https://github.com/redux-utilities/flux-standard-action#introduction)
- type: `{type: string, payload?: any, error?: boolean, meta?: any}`
- is the recommended standard of action objects in the official
  [Redux Style Guide](https://redux.js.org/style-guide/style-guide#write-actions-using-the-flux-standard-action-convention)

A basic Flux Standard Action object:

```js
const action = {
  type: 'ADD_TODO',
  payload: {
    text: 'Do something.',
  },
};
```

An FSA that represents an error, analogous to a rejected Promise:

```js
const action = {
  type: 'ADD_TODO',
  payload: new Error(),
  error: true,
};
```

## Action Creators

- [official doc](https://redux.js.org/basics/actions#action-creators)
- type `(...arguments) => Action`
- are functions that create action objects.

```js
// action type
const INCREMENT = 'counter/increment';
// action creator function
function increment(amount) {
  return {
    type: INCREMENT,
    payload: amount,
  };
}
// action object
const action = increment(3);
// { type: 'counter/increment', payload: 3 }
```

## `createAction` from @reduxjs/toolkit

- [official doc](https://redux-toolkit.js.org/api/createAction)
- type: `(type: string, prepareAction?: Function) => ActionCreator`
- is a helper function for defining a Redux action type and creator

```js
// createAction return an action creator function
const increment = createAction('counter/increment');

// invoke the action creator function to get the action object
let action = increment();
// { type: 'counter/increment' }

action = increment(3);
// returns { type: 'counter/increment', payload: 3 }

console.log(increment.toString());
// 'counter/increment'

console.log(`The action type is: ${increment}`);
// 'The action type is: counter/increment'
```

## Dispatch Action From React Components

### `connect` and `mapDispatchToProps` from react-redux
