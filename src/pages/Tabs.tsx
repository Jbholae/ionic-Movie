import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import IonPageComponent from "../components/IonPageComponent";
import Home from "./Home";
import Socials from "./Social";
import { Redirect, Route } from "react-router-dom";
import { camera, logoAndroid } from "ionicons/icons";
import Details from "./Details";



const Tabs = () => {
  return (
    <IonPageComponent>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/movies" component={Home} />
          <Route path="/movies/:id" component={Details} />
          <Route path="/socials" component={Socials} />
          <Route exact path="/">
            <Redirect to="/tabs/movies" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="movies" href="/movies">
            <IonIcon icon={camera}></IonIcon>
            <IonLabel>Movies</IonLabel>
          </IonTabButton>

          <IonTabButton tab="socials" href="/socials">
            <IonIcon icon={logoAndroid}></IonIcon>
            <IonLabel>Socials</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonPageComponent>
  );
};

export default Tabs;
