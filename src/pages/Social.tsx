import {
  IonCard,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import IonPageComponent from "../components/IonPageComponent";
import { useQuery } from "react-query";
import { fetchPosts } from "../hooks/socials";
import styled from "styled-components";

const Wrapper = styled.div`
  ion-item {
    --background: white;
  }
`;

const Socials = () => {
  const { isLoading, data: socialData } = useQuery(["loadSocial"], fetchPosts, {
    enabled: true,
  });

  console.log(socialData?.data, "socialData");
  return (
    <IonPageComponent>
      <Wrapper>
        <IonHeader style={{ position: "sticky", top: 0 }}>
          <IonToolbar color={"primary"}>
            <IonTitle>Social</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {socialData &&
            socialData?.data.slice(0, 20).map((item: any) => {
              console.log(item, "item");
              return (
                <IonItem button id="open-modal">
                  <div>
                    <IonLabel>{item?.id}</IonLabel>
                    <IonLabel>{item?.body}</IonLabel>
                  </div>
                </IonItem>
              );
            })}
        </IonList>

        <IonModal trigger="open-modal" handleBehavior="cycle"></IonModal>
        <IonFooter style={{ position: "sticky" }}>
          <IonFabButton></IonFabButton>
        </IonFooter>
      </Wrapper>
    </IonPageComponent>
  );
};

export default Socials;
