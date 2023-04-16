# useLocalStorage

The `useLocalStorage` hook is a React hook that returns a stateful value and a function to update it, which persists in the browser's localStorage. This hook simplifies the process of persisting data in the browser, making it easy to store and retrieve data from localStorage without having to write boilerplate code.

## Usage

To use the `useLocalStorage `hook, simply import it and call it from within a functional component:

```tsx
import { useLocalStorage } from '@reactutilities/hooks';

function MyComponent() {
  const [value, setValue] = useLocalStorage('myKey', 'myValue');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
    </div>
  );
}
```

In this example, `useLocalStorage` is called with a key string and an initial value. The hook returns a tuple containing the current value and a function to update it. The value is then used to set the initial value of the input field, and the setValue function is used to update the value state whenever the input field is changed.

You can also use the `useLocalStorage` hook to persist complex objects:

```tsx
interface User {
  name: string;
  age: number;
}

function MyComponent() {
  const [user, setUser] = useLocalStorage<User>('user', { name: '', age: 0 });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, name: event.target.value });
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, age: Number(event.target.value) });
  };

  return (
    <div>
      <input type="text" value={user.name} onChange={handleNameChange} />
      <input type="number" value={user.age} onChange={handleAgeChange} />
    </div>
  );
}
```

In this example, the `useLocalStorage `hook is called with a key string and an initial value of a User object. The user state is then used to set the initial value of two input fields, and the setUser function is used to update the user state whenever either input field is changed.

## API

The `useLocalStorage` hook has the following signature:

```tsx
function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void]
```

Where key is the key to use when storing the value in localStorage, and initialValue is the initial value to use when the key is not found in localStorage. The hook returns a tuple containing the current value and a function to update it.

Note that the value you pass to `useLocalStorage` will be stringified and stored in localStorage as a string. When you retrieve the value with `useLocalStorage`, it will be parsed back into its original type.