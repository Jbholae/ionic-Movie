import { IonIcon, IonLabel } from "@ionic/react";
import React from "react";
import styled from "styled-components";
import { people, videocam } from "ionicons/icons";
import { useHistory } from "react-router";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 10px;

  div {
    display: flex;
    width: 50px;
    flex-direction: column;

    ion-lable {
      font-size: 8px;
      line-height: 18px;
      text-align: center;
    }

    ion-icon {
      align-self: cetner;
      font-size: 33px;
      cursor: pointer;
    }
  }
`;

const FooterComponent = () => {
  const { push } = useHistory();
  return (
    <Wrapper>
      <div onClick={() => push("/")}>
        <IonIcon icon={videocam} />
        <IonLabel>Movies</IonLabel>
      </div>
      <div onClick={() => push("/Socials")}>
        <IonIcon icon={people} />
        <IonLabel>Socials</IonLabel>
      </div>
      <div onClick={() => push("/Profile")}>
        <IonIcon icon={people} />
        <IonLabel>Profile</IonLabel>
      </div>
    </Wrapper>
  );
};

export default FooterComponent;
