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
import { useForm } from "react-hook-form";
import React from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";
export interface LoginInterface {}

const RecuperarContra: React.FC<LoginInterface> = () => {
  const history = useHistory();
  const [presentAlert] = useIonAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
      await presentAlert({
        message: "Se ha enviado un correo para recuperar la contraseña",
        buttons: ["OK"],
      });
      return history.push("/login");
    } catch (error: any) {
      presentAlert({
        message: error.message,
        buttons: ["OK"],
      });
      return;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Recuperar Contraseña</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="contentdiv">
          <form onSubmit={handleSubmit(onSubmit)}>
            <IonList className="list">
              <IonItem className="item">
                <IonLabel position="floating">Email</IonLabel>
                <IonInput type="email" {...register("email")} required />
              </IonItem>
              <IonButton type="submit" expand="block">
                Recuperar Contraseña
              </IonButton>
            </IonList>
            <a href="/login">Ya tienes una cuenta?</a>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RecuperarContra;
