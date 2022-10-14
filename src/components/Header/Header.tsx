import {
  IonHeader,
  IonToolbar,
  IonAvatar,
  IonPopover,
  IonContent,
  IonItem,
  IonList,
} from "@ionic/react";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logOutUser } from "../../features/userSlice";
import "./styles/Header.css";
export interface HeaderInterface {}

const Header: React.FC<HeaderInterface> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = () => {
    dispatch(logOutUser());
    return history.push("/login");
  };
  return (
    <IonHeader>
      <IonToolbar style={{ padding: "0.2rem" }}>
        <>
          <IonAvatar
            id="popover-button"
            slot="end"
            style={{
              width: "40px",
              height: "40px",

              border: "3px solid gray",
            }}
          >
            <img
              alt="Silhouette of a person's head"
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
            />
          </IonAvatar>
          <IonPopover trigger="popover-button" dismissOnSelect={true}>
            <IonContent>
              <IonList>
                <IonItem button={true} detail={false}>
                  Ver mi perfil
                </IonItem>
                <IonItem button={true} detail={false} onClick={onLogout}>
                  Cerrar sesion
                </IonItem>
              </IonList>
            </IonContent>
          </IonPopover>
        </>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
