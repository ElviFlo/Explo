import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";
import { FavoritesProvider } from "./context/FavoritesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 1800,
          }}
        />
        <App />
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>
);