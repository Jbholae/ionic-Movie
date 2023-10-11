import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

import "antd/dist/antd.css";
import "./App.css";
import Details from "./pages/Details";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/movies" component={Home} />
        <Route exact path="/movies/:id" component={Details} />
        <Route exact path="/">
          <Redirect to="/movies" />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
