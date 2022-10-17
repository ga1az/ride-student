import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles/MiPerfil.css";
import { updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useForm } from "react-hook-form";
export interface MiPerfilInterface {}

const MiPerfil: React.FC<MiPerfilInterface> = () => {
  const [presentAlert] = useIonAlert();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const user = useSelector((state: any) => state.user);
  const onSubmit = async (data: any) => {
    try {
      await addDoc(collection(db, "vehiculos"), {
        modelo: data.modelo,
        uidConductor: user.userUid,
        color: data.color,
        placa: data.placa,
      });
      presentAlert({
        message: "Vehiculo Creado",
        buttons: ["OK"],
      });
      reset();
    } catch (error) {
      presentAlert({
        message: "Error al crear vehiculo",
        buttons: ["OK"],
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div
            style={{
              display: "flex",
              marginLeft: "1rem",
            }}
          >
            <a
              style={{
                backgroundColor: "inherit",
                color: "white",
                textDecoration: "none",
              }}
              href="/index"
            >
              Volver
            </a>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h1>Mi Perfil</h1>
          <IonItem style={{ marginBottom: "0" }}>
            <IonLabel>Nombre:</IonLabel>
            <IonInput value={user.userName} disabled></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Correo:</IonLabel>
            <IonInput value={user.userEmail} disabled></IonInput>
          </IonItem>
        </div>
        <div>
          <h1>Agregar Vehiculo</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <IonList>
              <IonItem>
                <IonLabel>Modelo:</IonLabel>
                <IonInput required {...register("modelo")}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel>Color:</IonLabel>
                <IonInput required {...register("color")}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel>Placa:</IonLabel>
                <IonInput required {...register("placa")}></IonInput>
              </IonItem>
              <IonButton type="submit" expand="block">
                Agregar
              </IonButton>
            </IonList>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MiPerfil;
