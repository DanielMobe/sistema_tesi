import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import "@fontsource/poppins";
import "@fontsource/montserrat";
import { Provider } from "react-redux";
// import store from "./state/create-store";
// import { store } from "./state/create-store";
// import configureStore from "./state/create-store";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./state/create-store";

// const store = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
