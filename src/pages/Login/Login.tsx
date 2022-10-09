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
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";
import "./styles/Login.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/userSlice";
export interface LoginInterface {}

const Login: React.FC<LoginInterface> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [presentAlert] = useIonAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      dispatch(
        loginUser({
          userName: userCredentials.user?.displayName,
          userEmail: userCredentials.user?.email,
          userUid: userCredentials.user?.uid,
        })
      );
      return history.push("/");
    } catch (error: any) {
      presentAlert({
        message: error.message,
        buttons: ["OK"],
      });
      return;
    }

    //delete dates from form
  };

  const handleRegister = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider).then((result) => {
      dispatch(
        loginUser({
          userName: result.user?.displayName,
          userEmail: result.user?.email,
          userUid: result.user?.uid,
        })
      );
      return history.push("/");
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ingresar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit(onSubmit)} className="content">
          <IonList className="list">
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
            <a href="">Olvidaste tu contraseña?</a>
            <IonButton type="submit" expand="block">
              Ingresar
            </IonButton>
            <a href="/register">No tienes una cuenta? registrarse aqui!</a>
            <IonButton expand="block" fill="clear" onClick={handleRegister}>
              Iniciar con google
            </IonButton>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;
