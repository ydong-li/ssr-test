import React, { useState } from 'react'

export default function Child() {
  const [num, setNum] = useState(0)
  return <>
    <button onClick={() => setNum(num + 1)}>add</button>
    <p>{num}</p>
  </>
}