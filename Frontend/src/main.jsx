import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "../src/styles/varriables.css";
import "../src/styles/global.css";
import "../src/styles/layout.css";
import "./index.css";
// cnnD:\MedAI\MedAI\Frontend\src\styles
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
