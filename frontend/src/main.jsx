import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "./styles/globals.css";
import "./styles/glass.css";
import "./styles/animations.css";

import App from "./app/App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);