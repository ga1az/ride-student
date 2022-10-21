import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonPopover,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import {
  query,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../features/userSlice";
import { db } from "../../firebase";
import { viajes } from "../../types";
import "./styles/Index.css";
import { trash } from "ionicons/icons";

export interface IndexInterface {}

const Index: React.FC<IndexInterface> = () => {
  const [presentAlert] = useIonAlert();
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logOutUser());
    return window.location.replace("/login");
  };
  const [rides, setRides] = useState([]);
  const [vehicle, setVehicle]: any = useState();
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
  const tusviajespedidos = rides.filter((ride: viajes) =>
    ride.pasajeros.includes(user.userUid)
  );

  async function onDelete(ride: any) {
    presentAlert({
      header: "Eliminar viaje",
      message: "Solo debes eliminar el viaje cuando termines tu recorrido",
      buttons: [
        "Cancelar",
        {
          text: "Confirmar",
          handler: async () => {
            await deleteDoc(doc(db, "viajes", ride));
          },
        },
      ],
    });
  }

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
          <h1 style={{ marginLeft: "2rem" }}>Tus viajes Pedidos</h1>
          <IonList>
            {tusviajespedidos.map((ride: viajes, index: any) => (
              <IonItem key={index}>
                <IonCard style={{ width: "100%" }}>
                  <IonCardHeader>
                    <IonCardTitle>Conductor: {ride.displayName}</IonCardTitle>
                    <IonCardSubtitle>Precio: {ride.precio}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>Destino: {ride.destino}</p>
                    <p>Descripcion: {ride.descripcion}</p>
                    <p>Hora salida: {ride.horasalida}</p>
                    <p>Puestos: {ride.cupos}</p>
                  </IonCardContent>
                </IonCard>
              </IonItem>
            ))}
          </IonList>
        </IonCard>
        <IonCard>
          <h1 style={{ marginLeft: "2rem" }}>Tus viajes creados</h1>
          <IonList>
            {tusviajes.map((ride: any, index: any) => (
              <IonItem key={index}>
                <IonCard style={{ width: "100%" }}>
                  <IonCardHeader>
                    {ride.estado === false ? (
                      <IonCardTitle>LLENO</IonCardTitle>
                    ) : null}
                    <IonCardTitle>{ride.displayName}</IonCardTitle>
                    <IonCardSubtitle>{ride.precio}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p>{ride.destino}</p>
                        <p>{ride.descripcion}</p>
                        <p>Cupos: {ride.cupos}</p>
                      </div>
                      <IonButton
                        fill="outline"
                        onClick={() => onDelete(ride.id)}
                      >
                        <IonIcon icon={trash} />
                      </IonButton>
                    </div>
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
