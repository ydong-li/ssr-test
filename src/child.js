import React, { useEffect, useState } from "react";
import { timeoutPromise } from "./utils";
import axios from "axios";

export default function Child({ InitialNum, InitialMsg }) {
  const [num, setNum] = useState(InitialNum || 7);
  const [msg, setMsg] = useState(InitialMsg || "empty");

  useEffect(() => {
    setMsg(InitialMsg);
  }, [InitialMsg]);
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
  const InitialNum = typeof window === "undefined" ? 1 : 0;
  const { data: InitialMsg } = await axios.get("http://localhost:3777/api");
  return { InitialNum, InitialMsg };
};
