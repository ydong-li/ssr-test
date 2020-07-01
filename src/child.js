import React, { useState } from "react";

export default function Child({ initialNum }) {
  const [num, setNum] = useState(initialNum || 7);
  return (
    <>
      <p>I am Child</p>
      <button onClick={() => setNum(num + 1)}>add</button>
      <p>{num}</p>
    </>
  );
}

Child.getInitialProps = async () => {
  return await InitialNum();
};

function InitialNum() {
  return new Promise((res) => {
    setTimeout(() => {
      const initialNum = typeof window === "undefined" ? 1 : 0;
      res({ initialNum });
    }, 500);
  });
}
