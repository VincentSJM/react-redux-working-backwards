# Actions

In Redux, Actions are objects, which are payloads of information that send data
from your application to your store. They are the _only_ source of information
for the store. You send them to the store using `store.dispatch()`.

- type:

```ts
export interface Action<T = any> {
  type: T;
}
```

## Flux Standard Action (FSA)

- type:

```ts
export interface FluxStandardAction<
  Type extends string = string,
  Payload = undefined,
  Meta = undefined
> {
  type: Type;
  payload?: Payload;
  error?: boolean;
  meta?: Meta;
}
```

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

Action creators are functions that create action objects.

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

A helper function for defining a Redux action type and creator

- type:

```ts
function createAction(type: string, prepareAction?: Function): Function;
```

- example:

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
