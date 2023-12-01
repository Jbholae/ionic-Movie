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
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import {
  bodyOutline,
  clipboardOutline,
  starHalfOutline,
  trophyOutline,
} from "ionicons/icons";
import IonPageComponent from "../components/IonPageComponent";
import styled from "styled-components";
import { useQuery } from "react-query";
import { movieDetails } from "../hooks/movies";
import { Loader } from "../components/Loader";

const Wrapper = styled.div`
  ion-card {
    --background: white;
  }

  ion-toolbar {
    --background: white;
  }

  ion-item {
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
  
  const {
    isLoading,
    isFetching,
    data: detailData,
  } = useQuery(["movieDetail", match.params.id], movieDetails);

  {
    return (
      <IonPageComponent>
        <Wrapper>
          <Loader isLoading={isLoading || isFetching}>
            <IonHeader style={{ position: "sticky", top: 0 }}>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonBackButton defaultHref="/movies"></IonBackButton>
                </IonButtons>
                <IonTitle>{detailData?.data?.Genre}</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{detailData?.data?.Title}</IonCardTitle>
                <IonCardSubtitle>{detailData?.data?.Year}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonImg src={detailData?.data?.Poster} />
                <IonItem lines="none">
                  <IonIcon
                    icon={starHalfOutline}
                    slot="start"
                    color="warning"
                  ></IonIcon>
                  <IonLabel>{detailData?.data?.imdbRating}</IonLabel>
                </IonItem>
              </IonCardContent>
            </IonCard>
            <IonModalComponent
              trigger="open-modal"
              handleBehavior="cycle"
              initialBreakpoint={0.25}
              breakpoints={[0, 2.5, 0.5, 0.75]}
            >
              <Wrapper className="ion-padding modal-body">
                <IonItem lines="none" slot="header">
                  <IonIcon icon={clipboardOutline} slot="start" />
                  <IonLabel>{`${detailData?.data?.Director}`}</IonLabel>
                </IonItem>

                <IonItem lines="none" slot="header">
                  <IonIcon icon={bodyOutline} slot="start" />
                  <IonLabel className="ion-text-wrap">
                    {detailData?.data?.Actors}
                  </IonLabel>
                </IonItem>

                <IonItem lines="none" slot="header">
                  <IonIcon icon={trophyOutline} slot="start" />
                  <IonLabel className="ion-text-warp">
                    {detailData?.data?.Awards}
                  </IonLabel>
                </IonItem>
                <p className="ion-padding" style={{ padding: 20 }}>
                  {detailData?.data?.Plot}
                </p>
              </Wrapper>
            </IonModalComponent>
            <IonFooter>
              <IonButton expand="full" id="open-modal">
                Show more
              </IonButton>
            </IonFooter>
          </Loader>
        </Wrapper>
      </IonPageComponent>
    );
  }
};

export default Details;
