import NotFound from "./pages/NotFound";
import { Redirect, Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "./App.css";
import "antd/dist/antd.css";
import Home from "./pages/Home";
import "@ionic/react/css/core.css";
import Details from "./pages/Details";
import Socials from "./pages/Socials";
import Profile from "./pages/Profile";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* <Route exact path="/tabs" component={Tabs} /> */}
        <Route exact path="/movies" component={Home} />
        <Route exact path="/movies/:id" component={Details} />
        <Route exact path="/socials" component={Socials} />
        <Route exact path="/profile" component={Profile} />
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
