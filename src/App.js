import MomentUtils from "@date-io/moment";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createBrowserHistory } from "history";
import { SnackbarProvider } from "notistack";
import React from "react";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import { Router } from "react-router-dom";
import "./assets/scss/index.scss";
// import { GoogleAnalytics, ScrollReset } from "./components";
import { ScrollReset } from "./components";
import "./mixins/moment";
import "./mixins/prismjs";
import "./mixins/validate";
import routes from "./routes";
import store from "./store";
import theme from "./theme";

const history = createBrowserHistory();

function App() {

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <SnackbarProvider maxSnack={3}>
            <Router history={history}>
              <ScrollReset />
              {/* <GoogleAnalytics /> */}
              {/* <CookiesNotification /> */}
              {renderRoutes(routes)}
            </Router>
          </SnackbarProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
