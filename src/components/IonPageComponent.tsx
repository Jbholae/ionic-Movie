import { IonContent, IonPage } from "@ionic/react";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 414px;
  border: 1px solid red;
  margin: auto;
  position: relative;
  min-height: 100vh;

  background-color:'var(--ion-color-primary)
  /* background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.79) 0%,
      rgba(255, 255, 255, 0.79) 100%
    ) */
  @media (max-width: 414px) {
    min-width: 100%;
  }
`;

const Content = styled(IonContent)`
  width: 100vw;
  overflow: auto;
  --ion-background-color: white;
`;

const IonPageComponent = ({ children }: any) => {
  return (
    <IonPage>
      <Content>
        <Wrapper>{children}</Wrapper>
      </Content>
    </IonPage>
  );
};
export default IonPageComponent;
