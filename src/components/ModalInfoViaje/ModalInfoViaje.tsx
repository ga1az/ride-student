import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./styles/ModalInfoViaje.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { MapView } from "../MapView";
interface ModalInfoViajeProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  rides: any;
}

const ModalInfoViaje = ({ isOpen, setIsOpen, rides }: ModalInfoViajeProps) => {
  const history = useHistory();
  const [presentAlert] = useIonAlert();

  const user = useSelector((state: any) => state.user);

  async function updateViaje() {
    if (rides.cupos > 0) {
      if (!rides.pasajeros.includes(user.userUid)) {
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
        setIsOpen(false);
        return history.push("/");
      } else {
        presentAlert({
          message: "No puedes reservar un viaje que ya reservaste",
          buttons: ["OK"],
        });
      }
    } else {
      presentAlert({
        message: "Viaje no reservado",
        buttons: ["OK"],
      });
      const data = {
        estado: false,
      };
      await updateDoc(doc(db, "viajes", rides.id), data);
      setIsOpen(false);
      return history.push("/");
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
        <div style={{ padding: "1rem" }}>
          <MapView ride={rides} />
        </div>
        <p>Conductor: {rides.displayName}</p>
        <p>Destino: {rides.destino}</p>
        <p>Descripcion: {rides.desc}</p>
        <p>Hora de salida: {rides.horasalida}</p>
        <p>Precio: {rides.precio}</p>
        <p>Cupos disponibles: {rides.cupos}</p>

        <IonButton expand="full" onClick={updateViaje}>
          Unirse Al Viaje
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default ModalInfoViaje;
