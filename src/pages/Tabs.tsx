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
import Socials from "./Socials";
import { Redirect, Route } from "react-router-dom";
import { camera, logoAndroid } from "ionicons/icons";
import styled from "styled-components";
import Details from "./Details";
const Wrapper = styled.div`
  ion-tab-bar {
    color: blue;
  }
`;

const Tabs = () => {
  return (
    <Wrapper>
      <IonPageComponent>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/movies" component={Home} />
            <Route exact path="/movies/:id" component={Details} />
            <Route exact path="/socials" component={Socials} />
            <Route exact path="/">
              <Redirect to="/movies" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="movies" href="/movies">
              <IonIcon icon={camera}></IonIcon>
              <IonLabel>Movies</IonLabel>
            </IonTabButton>

            <IonTabButton tab="socials" href="/socials">
              <IonIcon icon={logoAndroid}></IonIcon>
              <IonLabel>Movies</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
        {/* <Wrapper>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Redirect exact path="/" to="/tabs" />
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/movies">
                <IonIcon icon={playCircle} />
                <IonLabel>Listen now</IonLabel>
              </IonTabButton>

              <IonTabButton tab="radio" href="/socials">
                <IonIcon icon={radio} />
                <IonLabel>Radio</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </Wrapper> */}
        {/* <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route
              path="/movies"
              render={() => <Home />}
              component={Home}
              exact={true}
            />
            <Route path="/movies/:id" component={Details} />
            <Route
              path="/socials"
              render={() => <Socials />}
              component={Socials}
              exact={true}
            />
            <Route exact path="/">
              <Redirect to="/tabs" />
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
      </IonReactRouter> */}
      </IonPageComponent>
    </Wrapper>
  );
};

export default Tabs;
