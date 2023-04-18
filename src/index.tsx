import React from 'react'
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import "./index.scss";
import App from "./App";
import "./firebase/firebase";
import store, { persistor } from "./redux/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <HashRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </HashRouter>
);
