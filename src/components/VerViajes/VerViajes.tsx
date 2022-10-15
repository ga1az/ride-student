import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonAvatar,
  IonHeader,
  IonPopover,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { query, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logOutUser } from "../../features/userSlice";
import { db } from "../../firebase";
import { ModalInfoViaje } from "../ModalInfoViaje";
import "./styles/VerViajes.css";
export interface VerViajesInterface {}

const VerViajes: React.FC<VerViajesInterface> = () => {
  const [isOpen, setIsOpen] = useState(false);
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
                    Option 1
                  </IonItem>
                  <IonItem button={true} detail={false}>
                    Option 2
                  </IonItem>
                </IonList>
              </IonContent>
            </IonPopover>
          </>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <h1 style={{ marginLeft: "2rem" }}>Viajes Disponibles</h1>
          <IonList>
            {rides.map((ride: any, index: any) => (
              <IonItem key={index} onClick={() => setIsOpen(true)}>
                <IonCard style={{ width: "100%" }}>
                  <IonCardHeader>
                    <IonCardTitle>Conductor: {ride.displayName}</IonCardTitle>
                    <IonCardSubtitle>Precio: {ride.precio}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>Destino: {ride.destino}</p>
                    <p>Desc: {ride.descripcion}</p>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <p>Cupos disponibles: {ride.cupos}</p>
                      <p>Hora salida:{ride.horasalida}</p>
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonItem>
            ))}
          </IonList>
          <ModalInfoViaje isOpen={isOpen} />
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default VerViajes;
