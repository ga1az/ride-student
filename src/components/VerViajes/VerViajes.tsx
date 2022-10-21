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
  const [idItem, setIdItem] = useState({});
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logOutUser());
    return window.location.replace("/login");
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

  function onClickItem(id: any) {
    setIsOpen(true);
    setIdItem({
      displayName: id.displayName,
      id: id.id,
      precio: id.precio,
      destino: id.destino,
      desc: id.descripcion,
      horasalida: id.horasalida,
      pasajeros: id.pasajeros,
      cupos: id.cupos,
    });
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ padding: "0.2rem" }}>
          <>
            <IonAvatar
              id="popover-buttona"
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
            <IonPopover trigger="popover-buttona" dismissOnSelect={true}>
              <IonContent>
                <IonList>
                  <IonItem button={true} detail={false} href="/perfil">
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
          <h1 style={{ marginLeft: "2rem" }}>Viajes Disponibles</h1>
          <IonList>
            {rides.map((ride: any, index: any) => (
              <IonItem key={index} onClick={() => onClickItem(ride)}>
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
            <ModalInfoViaje
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              rides={idItem}
            />
          </IonList>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default VerViajes;
