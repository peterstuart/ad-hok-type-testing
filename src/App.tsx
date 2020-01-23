import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { addState } from "ad-hok";
import { get } from "lodash/fp";

const fOfP = <A, B>(a: A) => (b: B) => b;

const t = fOfP(1)(3);

const testFunc = addState("name", "setName", "hello")({ someProps: 3 });

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
