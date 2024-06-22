/* eslint-disable react/jsx-filename-extension */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

const rootDiv = document.querySelector("#root");
const root = ReactDOM.createRoot(rootDiv);
root.render(<App />);
