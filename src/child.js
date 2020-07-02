import React, { useState } from "react";

export default function Child({ InitialNum, InitialMsg }) {
  const [num, setNum] = useState(InitialNum || 7);
  const [msg, setMsg] = useState(InitialMsg || 'empty');
  return (
    <>
      <p>{msg}</p>
      <button onClick={() => setNum(num + 1)}>add</button>
      <p>{num}</p>
    </>
  );
}

// Child.getInitialProps = async () => {
//   return await InitialProps();
// };

// function InitialProps() {
//   return new Promise((res) => {
//     setTimeout(() => {
//       const InitialNum = typeof window === "undefined" ? 1 : 0;
//       const InitialMsg = typeof window === "undefined" ? 'server' : 'client';
//       res({ InitialNum, InitialMsg });
//     }, 500);
//   });
// }
