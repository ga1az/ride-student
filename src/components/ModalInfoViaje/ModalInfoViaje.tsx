import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import "./styles/ModalInfoViaje.css";
import { useSelector } from "react-redux";
interface ModalInfoViajeProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  rides: any;
}

const ModalInfoViaje = ({ isOpen, setIsOpen, rides }: ModalInfoViajeProps) => {
  const [presentAlert] = useIonAlert();

  const user = useSelector((state: any) => state.user);

  async function updateViaje() {
    const data = {
      cupos: rides.cupos - 1,
      pasajeros: [...rides.pasajeros, user.userUid],
    };
    try {
      await updateDoc(doc(db, "viajes", rides.id), data);
      presentAlert({
        message: "Viaje reservado con exito",
        buttons: ["OK"],
      });
    } catch (error) {
      presentAlert({
        message: "Viaje no reservado",
        buttons: ["OK"],
      });
    }
  }
  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => setIsOpen(false)}>Cancelar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Conductor: {rides.displayName}</p>
        <p>Destino: {rides.destino}</p>
        <p>Descripcion: {rides.desc}</p>
        <p>Hora de salida: {rides.horasalida}</p>
        <p>Precio: {rides.precio}</p>
        <p>Pasajeros: {rides.pasajeros}</p>
        <p>Cupos disponibles: {rides.cupos}</p>

        <IonButton expand="full" onClick={updateViaje}>
          Unirse Al Viaje
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default ModalInfoViaje;
