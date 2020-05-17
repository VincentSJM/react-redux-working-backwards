# Actions

Actions are payloads of information that send data from your application to your
store. They are the _only_ source of information for the store. You send them to
the store using `store.dispatch()`.

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

A basic Flux Standard Action:

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

## @reduxjs/toolkit `createAction`
