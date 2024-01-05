import { IonContent, IonPage } from "@ionic/react";
import styled from "styled-components";
import FooterComponent from "./FooterComponent";

const Wrapper = styled.div`
  max-width: 414px;
  margin: auto;
  position: relative;
  height: 100vh;

  .footer-wrapper {
    width: 21.6vw;
    position: fixed;
    bottom: 0px;
    z-index: 100;
    background: rgba(255, 255, 255, 0.9);
  }

  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.79) 0%,
    rgba(255, 255, 255, 0.79) 100%
  );
  @media (max-width: 414px) {
    min-width: 100%;
  }
`;

const Content = styled(IonContent)`
  width: 100vw;
  overflow: auto;
  --ion-background-color: linear-gradient(
    0deg,
    rgba(189, 195, 199, 0.79) 0%,
    rgba(44, 62, 80, 0.79) 100%
  );
`;

const IonPageComponent = ({ children }: any) => {
  return (
    <IonPage>
      <Content>
        <Wrapper>
          {children}
          <div className="footer-wrapper">
            <FooterComponent />
          </div>
        </Wrapper>
      </Content>
    </IonPage>
  );
};
export default IonPageComponent;
