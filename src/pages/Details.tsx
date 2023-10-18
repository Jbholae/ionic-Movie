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

const Wrapper = styled.div`
  ion-card {
    --background: white;
  }
`;
const IonModalComponent = styled(IonModal)`
  --width: 414px;
  --border-radius: 10px;

  .modal-body {
    width: 335px;
    padding: 34px 20px;
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
        trigger="open-modal"
        handleBehavior="cycle"
        initialBreakpoint={0.25}
        breakpoints={[0, 2.5, 0.5, 0.75]}
      >
        <Wrapper className="ion-padding modal-body">
          <IonItem lines="none" slot="header">
            <IonIcon icon={clipboardOutline} slot="start" />
            <IonLabel>{information?.Director}</IonLabel>
          </IonItem>

          <IonItem lines="none" slot="header">
            <IonIcon icon={bodyOutline} slot="start" />
            <IonLabel className="ion-text-wrap">{information?.Actors}</IonLabel>
          </IonItem>

          <IonItem lines="none" slot="header">
            <IonIcon icon={trophyOutline} slot="start" />
            <IonLabel className="ion-text-warp">{information?.Awards}</IonLabel>
          </IonItem>
          <p className="ion-padding" style={{ padding: 20 }}>
            {information?.Plot}
          </p>
        </Wrapper>
      </IonModalComponent>
      <IonHeader style={{ position: "sticky", top: 0 }}>
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
