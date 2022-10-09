import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";

const Home: React.FC = () => {
  // const [rides, setRides] = useState([]);
  // Traer los datos de la bs de firebase
  // useEffect(() => {
  //   const q = query(collection(db, "viajes"));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const rides: any = [];
  //     querySnapshot.forEach((doc) => {
  //       rides.push({ ...doc.data(), id: doc.id });
  //     });
  //     setRides(rides);
  //   });
  //   return unsubscribe;
  // }, []);

  // const user = useSelector((state: any) => state.user);

  // Crear un registro en la base de datos
  // const onSubmit = async (data: any) => {
  //   await addDoc(collection(db, "viajes"), {
  //     uid: user.userUid,
  //     displayName: user.userName,
  //     email: user.userEmail,
  //     ...data,
  //   });
  // };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h1>asdf</h1>
      </IonContent>
    </IonPage>
  );
};

export default Home;
