import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router";
import { CrearViaje } from "../../components/CrearViaje";
import { carOutline, homeOutline, pushOutline } from "ionicons/icons";
import { VerViajes } from "../../components/VerViajes";
import "./Home.css";
import { useSelector } from "react-redux";
import { Login } from "../Login";
import Index from "../../components/Index/Index";

const Home: React.FC = () => {
  const user = useSelector((state: any) => state.user);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            {user.userUid ? (
              <Route exact path="/index">
                <Index />
              </Route>
            ) : (
              <Route exact path="/login">
                <Login />
              </Route>
            )}
            {user.userUid ? (
              <Route exact path="/viajes">
                <VerViajes />
              </Route>
            ) : (
              <Route exact path="/login">
                <Login />
              </Route>
            )}
            {user.userUid ? (
              <Route path="/crearviaje">
                <CrearViaje />
              </Route>
            ) : (
              <Route exact path="/login">
                <Login />
              </Route>
            )}
            {user.userUid ? (
              <Route exact path="/">
                <Redirect to="/index" />
              </Route>
            ) : (
              <Route exact path="/login">
                <Login />
              </Route>
            )}
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="index" href="/index">
              <IonIcon icon={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="viajes" href="/viajes">
              <IonIcon icon={carOutline} />
              <IonLabel>Viajes</IonLabel>
            </IonTabButton>
            <IonTabButton tab="crearviaje" href="/crearviaje">
              <IonIcon icon={pushOutline} />
              <IonLabel>Crear viaje</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default Home;
