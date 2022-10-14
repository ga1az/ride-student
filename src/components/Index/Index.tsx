import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonPopover,
  IonToolbar,
} from "@ionic/react";
import { query, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logOutUser } from "../../features/userSlice";
import { db } from "../../firebase";
import { viajes } from "../../types";
import "./styles/Index.css";
export interface IndexInterface {}

const Index: React.FC<IndexInterface> = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = () => {
    dispatch(logOutUser());
    return history.push("/login");
  };
  const [rides, setRides] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "viajes"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const rides: any = [];
      querySnapshot.forEach((doc) => {
        rides.push({ ...doc.data(), id: doc.id });
      });
      setRides(rides);
    });
    return unsubscribe;
  }, []);

  const tusviajes = rides.filter((ride: viajes) => ride.uid === user.userUid);

  return (
    <IonPage>
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
                    Mi perfil
                  </IonItem>
                  <IonItem button={true} detail={false} onClick={onLogout}>
                    Cerrar sesión
                  </IonItem>
                </IonList>
              </IonContent>
            </IonPopover>
          </>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardContent>
            <IonCardHeader>
              <h1>Vehiculo Pedido</h1>
            </IonCardHeader>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <h1 style={{ marginLeft: "2rem" }}>Tus viajes creados</h1>
          <IonList>
            {tusviajes.map((ride: any, index: any) => (
              <IonItem key={index}>
                <IonCard style={{ width: "100%" }}>
                  <IonCardHeader>
                    <IonCardTitle>{ride.displayName}</IonCardTitle>
                    <IonCardSubtitle>{ride.precio}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>{ride.destino}</p>
                    <p>{ride.descripcion}</p>
                  </IonCardContent>
                </IonCard>
              </IonItem>
            ))}
          </IonList>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Index;
