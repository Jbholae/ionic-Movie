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
import Tabs from "./pages/Tabs";
import Socials from "./pages/Social";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/tabs" component={Tabs} />
        <Route path="/movies" component={Home} />
        <Route path="/movies/:id" component={Details} />
        <Route path="/socials" component={Socials} />

        <Route exact path="/">
          <Redirect to="/tabs" />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
