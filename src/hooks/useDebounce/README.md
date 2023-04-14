# useDebounce

The `useDebounce` hook is a utility for debouncing a value or a function in React applications. It returns the debounced value after a certain amount of time has passed since the last update. This is useful for cases where a value or a function needs to be updated frequently, but you don't want to trigger updates too often to avoid performance issues.

## Usage

To use the `useDebounce` hook, simply import it and call it from within a functional component:

```tsx
import { useDebounce } from '@reactutilities/hooks';

function MyComponent() {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 500);

  function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  return (
    <div>
      <input type="text" value={searchValue} onChange={handleSearchInputChange} />
      <p>Debounced value: {debouncedSearchValue}</p>
    </div>
  );
}
```

In this example, `useDebounce` is called with the `searchValue` state and a delay of 500 milliseconds. The debouncedSearchValue is then used to display the debounced value of the search input.

You can also use `useDebounce` with a function that needs to be debounced:

```tsx
function MyComponent() {
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState([]);
  
  const debouncedSearch = useDebounce(async (value: string) => {
    const response = await fetch(`/api/search?q=${value}`);
    const data = await response.json();
    setResults(data);
  }, 500);

  function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
    debouncedSearch(event.target.value);
  }

  return (
    <div>
      <input type="text" value={searchValue} onChange={handleSearchInputChange} />
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

In this example, `useDebounce` is called with an asynchronous function that fetches search results from an API and updates the results state. The `debouncedSearch` function is then called with the search input value, which triggers the debouncing of the function. This ensures that the API is not called too frequently while the user is typing in the search input.

## API

The `useDebounce` hook has the following signature:

```tsx
function useDebounce<T>(value: T, delay: number): T
```

It takes two arguments:
|Name|Type|Description|
|---|---|---|
|value|`T`|The value or function to debounce.|
|delay|`number`|The amount of time (in milliseconds) to wait before executing the debounced function.|