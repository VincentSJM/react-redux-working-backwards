# What is State Management?

Let's start with a simple react counter app:

```js
import React, {useState} from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [counter, setCounter] = useState(0);
  return (
    <button onClick={() => setCounter(val => val + 1)}>
      {counter}
    </button>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

It is a self-contained app with the following parts:

* The state, the source of truth that drives our app;
* The view, a declarative mapping of the state;
* The actions, the possible ways the state could change in reaction to user inputs from the view.

This is a simple representation of the concept of "one-way data flow":

<p style="text-align: center; margin: 2em">
  <img style="width:100%;max-width:450px;" src="/flow.png">
</p>

However, the simplicity quickly breaks down when we have **multiple components that share a common state**:

- Multiple views may depend on the same piece of state.
- Actions from different views may need to mutate the same piece of state.

For problem one, passing props can be tedious for deeply nested components, and simply doesn't work for sibling components. For problem two, we often find ourselves resorting to solutions such as reaching for direct parent/child instance references or trying to mutate and synchronize multiple copies of the state via events. Both of these patterns are brittle and quickly lead to unmaintainable code.

So why don't we extract the shared state out of the components, and manage it in a global singleton? With this, our component tree becomes a big "view", and any component can access the state or trigger actions, no matter where they are in the tree!

By defining and separating the concepts involved in state management and enforcing rules that maintain independence between views and states, we give our code more structure and maintainability.

# When Should I Use It?

React state management is pretty simple: call setState and let React re-render. That's it! Now there's a few steps involved.

1. User types in input box
1. Call action creator to get an action
1. Dispatch action to Redux
1. Redux inserts the action into the root reducer
1. The root reducer delegates that action to the correct reducer
1. The reducer returns a new state given the old state and the action object
1. That new state becomes the store's state
1. React is then called by Redux and told to update

So what was one step became several. But each step of this is testable, and that's great. And it's explicit and verbose. It's long to follow, but it's an easy breadcrumb trailer to follow when things go awry.