import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { Home, Login, Register } from "./pages";
import { useSelector } from "react-redux";
import { RecuperarContra } from "./pages/RecuperarContra";
import { MiPerfil } from "./components/MiPerfil";

setupIonicReact();

const App: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {user.userUid ? (
            <Route path="/" component={Home} />
          ) : (
            <Redirect to="/login" />
          )}
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/recuperar" component={RecuperarContra} />
          {user.userUid ? (
            <Route path="/perfil" component={MiPerfil} />
          ) : (
            <Redirect to="/login" />
          )}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
