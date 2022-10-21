import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonList,
  useIonAlert,
  IonAvatar,
  IonHeader,
  IonPopover,
  IonToolbar,
} from "@ionic/react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { logOutUser } from "../../features/userSlice";
import { db } from "../../firebase";
import Destinoinput from "./inputDestino";
import "./styles/CrearViaje.css";
export interface CrearViajeInterface {}

const CrearViaje: React.FC<CrearViajeInterface> = () => {
  const [presentAlert] = useIonAlert();
  const history = useHistory();
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logOutUser());
    return window.location.replace("/login");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const direccion = Destinoinput("");
  const onSubmit = async (data: any) => {
    await addDoc(collection(db, "viajes"), {
      uid: user.userUid,
      displayName: user.userName,
      fecha: new Date(),
      destino: direccion.value,
      precio: data.precio,
      cupos: parseInt(data.cupo),
      descripcion: data.descripcion,
      horasalida: data.horasalida,
      pasajeros: [],
      estado: true,
    });
    presentAlert({
      message: "Viaje Creado",
      buttons: ["OK"],
    });
    reset();
    return history.push("/");
  };

  const [vehicle, setVehicle]: any = useState("");
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "vehiculos"),
        where("uidConductor", "==", user.userUid)
      ),
      (querySnapshot) => {
        let rides: any = {};
        querySnapshot.forEach((doc) => {
          rides = { ...doc.data(), id: doc.id };
        });
        setVehicle(rides);
      }
    );
    return unsubscribe;
  }, []);

  const isEmpty = Object.keys(vehicle).length === 0;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ padding: "0.2rem" }}>
          <>
            <IonAvatar
              id="popover-buttone"
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
            <IonPopover trigger="popover-buttone" dismissOnSelect={true}>
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
        <div style={{ marginTop: "3.5rem", padding: "2rem" }}>
          <IonText>
            <h1>Crear Viaje</h1>
          </IonText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <IonItem>
              <IonLabel position="floating">Destino</IonLabel>
              <IonInput
                type="text"
                {...direccion}
                {...register("destino")}
                required
              />
            </IonItem>
            {direccion.suggest?.length > 0 && (
              <IonList
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "1rem",
                }}
              >
                {direccion.suggest.map((suggestion: any, index: any) => {
                  return (
                    <IonItem
                      key={index}
                      onClick={() => {
                        direccion.setvalue(
                          suggestion.place_name.split(",").slice(0, 2).join(",")
                        );
                        direccion.setsuggest([]);
                      }}
                    >
                      {suggestion.place_name.split(",").slice(0, 2).join(",")}
                    </IonItem>
                  );
                })}
              </IonList>
            )}
            <IonItem>
              <IonLabel position="floating">Hora de salida</IonLabel>
              <IonInput type="time" {...register("horasalida")} required />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Precio</IonLabel>
              <IonInput
                type="number"
                required
                {...register("precio", { pattern: /^[1-9][0-9]*$/ })}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Cantidad de pasajeros</IonLabel>
              <IonInput
                type="number"
                required
                {...register("cupo", { pattern: /^[1-9][0-9]*$/ })}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Descripcion</IonLabel>
              <IonInput
                type="text"
                placeholder="En que lugar del duoc estas"
                required
                {...register("descripcion")}
              />
            </IonItem>

            <IonButton
              expand="block"
              type="submit"
              disabled={isEmpty ? true : false}
            >
              Crear Viaje
            </IonButton>
            {isEmpty ? (
              <IonText color="danger">No tienes un vehiculo registrado</IonText>
            ) : null}
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CrearViaje;
