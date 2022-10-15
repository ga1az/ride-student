import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import "./styles/ModalInfoViaje.css";
interface ModalInfoViajeProps {
  isOpen: boolean;
}

const ModalInfoViaje = ({ isOpen }: ModalInfoViajeProps) => {
  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => (isOpen = false)}>Cancel</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>This is modal content</p>
      </IonContent>
    </IonModal>
  );
};

export default ModalInfoViaje;
