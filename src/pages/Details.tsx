import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { DetailsResult, useApi } from "../hooks/useapi";
import { useState } from "react";
import {
  bodyOutline,
  clipboardOutline,
  starHalfOutline,
  trophyOutline,
} from "ionicons/icons";
import IonPageComponent from "../components/IonPageComponent";
import styled from "styled-components";

const Wrapper = styled.div``;
const IonModalComponent = styled(IonModal)`
  --width: 14px;
  --border-radius: 10px;
  border: 1px solid blue;

  .modal-body {
    width: "335px";
    height: auto;
    margin: 20px auto;
    border-radius: 50px;
    padding: 34px 0;
    border: "1px solid red",


    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
interface DetailsPageProps extends RouteComponentProps<{ id: string }> {}

const Details: React.FC<DetailsPageProps> = ({ match }) => {
  const { getDetails } = useApi();
  const [information, setInformation] = useState<DetailsResult | null>(null);
  useIonViewWillEnter(async () => {
    const id = match.params.id;
    const data = await getDetails(id);
    console.log(data, "this is data");
    setInformation(data);
  });
  return (
    <IonPageComponent>
      <IonModalComponent
        isOpen={true}
        // trigger="open-modal"
        handleBehavior="cycle"
        initialBreakpoint={0.25}
        breakpoints={[0, 2.5, 0.5, 0.75]}
      >
        <Wrapper
          className="ion-padding modal-body"
          /* style={{
              width: "95%",
              margin: "20px auto",
              border: "1px solid red",
            }} */
        >
          <IonItem lines="none">
            <IonIcon icon={clipboardOutline} slot="start" />
            <IonLabel>{information?.Director}</IonLabel>
          </IonItem>

          <IonItem lines="none">
            <IonIcon icon={bodyOutline} slot="start" />
            <IonLabel className="ion-text-wrap">{information?.Actors}</IonLabel>
          </IonItem>

          <IonItem lines="none">
            <IonIcon icon={trophyOutline} slot="start" />
            <IonLabel className="ion-text-warp">{information?.Awards}</IonLabel>
          </IonItem>
          <p className="ion-padding" style={{ padding: 20 }}>
            {information?.Plot}
          </p>
        </Wrapper>
      </IonModalComponent>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/movies"></IonBackButton>
          </IonButtons>
          <IonTitle>{information?.Genre}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <Wrapper>
        {information && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{information.Title}</IonCardTitle>
              <IonCardSubtitle>{information.Year}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonImg src={information.Poster} />
              <IonItem lines="none">
                <IonIcon icon={starHalfOutline} slot="start" color="warning">
                  <IonLabel>{information.imdbRating}</IonLabel>
                </IonIcon>
              </IonItem>
            </IonCardContent>
          </IonCard>
        )}
      </Wrapper>
      <IonFooter>
        <IonButton expand="full" id="open-modal">
          Show more
        </IonButton>
      </IonFooter>
    </IonPageComponent>
  );
};

export default Details;
