import React, { useState } from "react";
import { timeoutPromise } from "./utils";

export default function Child({ InitialNum, InitialMsg }) {
  const [num, setNum] = useState(InitialNum || 7);
  const [msg, setMsg] = useState(InitialMsg || "empty");

  return (
    <>
      <p>{msg}</p>
      <button onClick={() => setNum(num + 1)}>add</button>
      <p>{num}</p>
    </>
  );
}

Child.displayName = "Child";

Child.getInitialProps = async () => {
  return await timeoutPromise(() => {
    const InitialNum = typeof window === "undefined" ? 1 : 0;
    const InitialMsg = typeof window === "undefined" ? "server" : "client";
    return { InitialNum, InitialMsg };
  }, 30);
};
