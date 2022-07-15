import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import "./assets/plugins/nucleo/css/nucleo.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";
import { Provider } from "react-redux";
import { configureStorage } from "./store/configureStore";
import { PersistGate } from "redux-persist/integration/react";

import AdminLayout from "./layouts/Admin.js";
import AuthLayout from "./layouts/Auth.js";
import routes from "./routes.js";

const { persistor, store } = configureStorage();
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <HashRouter>
        <Switch>
          {/* <Route path="/admin">
            <NavbarLayout>
              <AdminLayout />
            </NavbarLayout>
          </Route> */}
          {/* <Route
            path="/admin"
            render={(props) => (
              <NavbarLayout>
                <AdminLayout {...props} />
              </NavbarLayout>
            )}
          /> */}
          <Route
            path="/admin"
            render={(props) => <AdminLayout {...props} routes={routes} />}
          />
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Redirect from="/" to="/admin/index" />
        </Switch>
      </HashRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
