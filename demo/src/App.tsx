import { useState } from 'react'
import css from '../../src/css/index'

const styles = `
  background-color: blue;
  color: red;
`

function App() {
  return (
    <Counter />
  )
}

function Counter() {
  return (
    <>
      <Button />
    </>
  )
}

function Button() {
  const style = {
    color: '#000000',
    ':hover': {
      color: '#ffffff'
    }
  };

  return (
    <button style={style}>
      Click me
    </button>
  );
}

export default App
