import React, { useState } from 'react'

export default function Child() {
  const initialNum = typeof window === 'undefined' ? 1 : 0
  const [num, setNum] = useState(initialNum)
  return <>
    <p>I am Child</p>
    <button onClick={() => setNum(num + 1)}>add</button>
    <p>{num}</p>
  </>
}