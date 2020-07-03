import React, { useState, useEffect, Children } from "react";
// import logo from './logo.svg';
import "./App.css";
import { timeoutPromise } from "./utils";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const QUERY = gql`
  query channles {
    channels {
      id
      ball
    }
  }
`;

function App({ children, InitialMsg }) {
  const [msg, setMsg] = useState(InitialMsg || "client");

  useEffect(() => {
    window.NUMBER = 7;
  }, [children]);

  return (
    <Query query={QUERY}>
      {({ data, loading }) => {
        if (loading) return <p>Loading... ...</p>;
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
            <ul className="list">
              {data && data.channels.map(({ id, name }) => {
                return <li key={id}>{name}</li>;
              })}
            </ul>
            {children}
          </div>
        );
      }}
    </Query>
  );
}

export default App;

App.displayName = "App";

App.getInitialProps = async () => {
  return await timeoutPromise(() => {
    const InitialMsg = typeof window === "undefined" ? "server" : "client";
    return { InitialMsg };
  }, 10);
};
