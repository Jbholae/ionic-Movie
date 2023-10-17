import { Helmet } from "react-helmet";
import IonPageComponent from "../components/IonPageComponent";

const NotFound: React.FC = () => {
  return (
    <>
      <IonPageComponent>
        <Helmet>
          <title>Not Found</title>
        </Helmet>
        <h1>404 page</h1>
      </IonPageComponent>
    </>
  );
};

export default NotFound;
