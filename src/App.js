import React, { useState, useEffect, Children } from "react";
// import logo from './logo.svg';
import "./App.css";
import { timeoutPromise } from "./utils";
import { Link } from "react-router";
import axios from "axios";

function App({ children, InitialMsg }) {
  const [msg, setMsg] = useState(InitialMsg || "client");

  useEffect(() => {
    window.NUMBER = 7;
  }, [children]);

  useEffect(() => {
    setMsg(InitialMsg);
  }, [InitialMsg]);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Render from {msg}
        </a>
        <button
          onClick={() => {
            console.log(123123);
          }}
        >
          click me
        </button>
      </header>
      <Link to="/b">to B</Link>
      <Link to="/c">to C</Link>
      {children}
    </div>
  );
}

export default App;

App.displayName = "App";

App.getInitialProps = async () => {
  const InitialNum = typeof window === "undefined" ? 1 : 0;
  const { data: InitialMsg } = await axios.get("http://localhost:3777/api");
  return { InitialNum, InitialMsg };
};
