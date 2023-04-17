# For

The `For` component allows you to render a list of items in an array as a series of React elements. It takes in an array of items, a fallback element to render if the array is empty, and a function that defines how each item in the array should be rendered.

## Usage

```tsx
import { For } from '@reactutilities/components';

function App() {
  const items = ['Apple', 'Banana', 'Cherry'];

  return (
    <For each={items} fallback={<div>No items to display.</div>}>
      {(item, index) => <div key={index}>{item}</div>}
    </For>
  );
}
```

## API

The `For` component accepts the following props:

|Name|Type|Description|
|---|---|---|
|each|`T[]`|A required array of items to render.|
|fallback |`React.ReactNode \| null`|An optional React node to render if the array is empty.|
|children|`(item: T, index: number) => JSX.Element`|A required function that accepts each item in the array and its index as arguments and returns a JSX element to render.|

## Example

Here's an example that demonstrates how to use the `For` component to render a list of blog posts:

```tsx
import { For } from '@reactutilities/components';

function Blog() {
  const posts = [
    { id: 1, title: 'Post 1', content: 'Content for Post 1' },
    { id: 2, title: 'Post 2', content: 'Content for Post 2' },
    { id: 3, title: 'Post 3', content: 'Content for Post 3' },
  ];

  return (
    <For each={posts} fallback={<div>No posts to display.</div>}>
      {post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      )}
    </For>
  );
}
```

In this example, the `For` component is used to iterate through the posts array and render each blog post as a div element. The fallback prop is used to render a message if the array is empty.
