import React, { useEffect } from "react";
// import logo from './logo.svg';
import "./App.css";
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

function App({ children }) {

  useEffect(() => {
    window.NUMBER = 7;
  }, [children]);

  return (
    <Query query={QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading... ...</p>;
        if (error) console.warn(error);
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
                SSR + Apollo
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
              {data && data.channels.map(({ id, ball }) => {
                  return <li key={id}>{ball}</li>;
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
