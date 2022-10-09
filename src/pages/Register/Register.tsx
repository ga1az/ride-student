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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";
import "./styles/Register.css";
export interface RegisterInterface {}

const Register: React.FC<RegisterInterface> = () => {
  const history = useHistory();
  const [presentAlert] = useIonAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    //Confirm two passwords match
    if (data.password !== data.confirmPass) {
      presentAlert({
        message: "Contraseñas no coinciden!",
        buttons: ["OK"],
      });
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(auth.currentUser!, { displayName: data.name });
      await presentAlert({
        message: "Usuario creado con éxito!",
        buttons: ["OK"],
      });
      return history.push("/login");
    } catch (error: any) {
      presentAlert({
        message: "Correo ya registrado",
        buttons: ["OK"],
      });
      return;
    }

    //delete dates from form
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit(onSubmit)} className="content">
          <IonList className="list">
            <IonItem className="item">
              <IonLabel position="floating">Nombre de usuario</IonLabel>
              <IonInput type="text" {...register("name")} required />
            </IonItem>
            <IonItem className="item">
              <IonLabel position="floating">Email</IonLabel>
              <IonInput type="email" {...register("email")} required />
            </IonItem>
            <IonItem>
              {errors.password && (
                <span style={{ color: "red" }}>Minimo 6 caracteres</span>
              )}
              <IonLabel position="floating">password</IonLabel>
              <IonInput
                type="password"
                {...register("password", { minLength: 6 })}
                required
              />
            </IonItem>
            <IonItem>
              {errors.confirmPass && (
                <span style={{ color: "red" }}>Minimo 6 caracteres</span>
              )}
              <IonLabel position="floating">Confirmar password</IonLabel>
              <IonInput
                type="password"
                {...register("confirmPass", { minLength: 6 })}
                required
              />
            </IonItem>
            <IonButton type="submit" expand="block">
              Registrarse
            </IonButton>
            <a href="/login">Ya tienes una cuenta?</a>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Register;
