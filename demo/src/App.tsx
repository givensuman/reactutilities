import { useState } from 'react'
import create from "../../src/stores/create"

const store = create({
  count1: 0,
  count2: 0,
  count3: 0
})

function App() {
  return (
    <Counter />
  )
}

function Counter() {

  const { get, set, subscribe } = store

  const unsubscribe = subscribe('count1', ({ count1 }) => console.log(count1))

  return (
    <>
    <button onClick={() => set(({ count1 }) => ({ count1: count1 + 1 }))}>
      {get(state => state.count1)}
    </button>
    <button onClick={() => set((state) => ({ ...state, count2: state.count2 + 1 }))}>
      {get(state => state.count2)}
    </button>
    <button onClick={() => set((state) => ({ ...state, count3: state.count3 + 1 }))}>
      {get(state => state.count3)}
    </button>
    </>
  )
}

export default App
