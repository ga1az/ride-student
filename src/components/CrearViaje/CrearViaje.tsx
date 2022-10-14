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
import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { logOutUser } from "../../features/userSlice";
import { db } from "../../firebase";
import { Header } from "../Header";
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
    return history.push("/login");
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
      cupos: data.cupo,
      descripcion: data.descripcion,
      horasalida: data.horasalida,
      pasajeros: [],
    });
    presentAlert({
      message: "Viaje Creado",
      buttons: ["OK"],
    });
    reset();
    return history.push("/");
  };
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
              <IonInput type="number" required {...register("precio")} />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Cantidad de pasajeros</IonLabel>
              <IonInput type="number" required {...register("cupo")} />
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

            <IonButton expand="block" type="submit">
              Crear Viaje
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CrearViaje;
