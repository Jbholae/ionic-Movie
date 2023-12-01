import {
  IonButton,
  IonCard,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import IonPageComponent from "../components/IonPageComponent";
import { useMutation, useQuery } from "react-query";
import { createPost, fetchPosts } from "../hooks/socials";
import styled from "styled-components";
import { add } from "ionicons/icons";
import { useFormik } from "formik";
import { Spin, notification } from "antd";
import { useState } from "react";
import { useHistory } from "react-router";
import { Loader } from "../components/Loader";

const Wrapper = styled.div`
  ion-item {
    --background: white;
  }
`;
const IonModalComponent = styled(IonModal)`
  --width: 414px;
  --border-radius: 10px;
  --height: 200px;

  .modal-body {
    width: 335px;
    padding: 34px 0px;
    height: 20px;
  }

  .input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    background: #fff;
  }
`;

const SubmitCard = styled.div`
height :20px
  top: 120px;
`;

const Socials = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [formDetails, setFormDetails] = useState<any>({
    title: "",
    body: "",
  });

  const changeValues = (name: string, value: string) => {
    setFormDetails((formDetails: any) => ({
      ...formDetails,
      [name]: value,
    }));
  };
  const { isLoading, data: socialData } = useQuery(["loadSocial"], fetchPosts, {
    enabled: true,
  });

  const { mutate, isLoading: postingData } = useMutation(createPost, {
    onSuccess: async (a: any) => {
      notification.success(a);
      setIsOpen(false);
      console.log("success", a);
    },
    onError: (e: any) => {
      notification.error(e);
      console.log("error", e);
    },
  });

  const submitForm = async () => {
    mutate({
      id: socialData?.data?.id,
      userId: socialData?.data?.id,
      title: formDetails.title,
      body: formDetails.body,
    });
  };

  return (
    <IonPageComponent>
      <Wrapper>
        <IonHeader style={{ position: "sticky", top: 0 }}>
          <IonToolbar color={"primary"}>
            <IonTitle>Social</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Loader isLoading={isLoading}>
          <IonList>
            {socialData &&
              socialData?.data.slice(0, 20).map((item: any) => {
                return (
                  <IonItem
                    button
                    key={item?.id}
                    id="open-simsim"
                    onClick={() => setDetailOpen(true)}
                  >
                    <div>
                      <IonLabel>{item?.id}</IonLabel>
                      <IonLabel>{item?.body}</IonLabel>
                    </div>
                  </IonItem>
                );
              })}
          </IonList>
        </Loader>
        <IonModalComponent isOpen={detailOpen}>
          <IonLabel>Post details</IonLabel>
        </IonModalComponent>

        <IonModalComponent isOpen={isOpen}>
          <SubmitCard>
            <div className="input-wrapper">
              <input
                name="title"
                placeholder="Title"
                value={formDetails?.title}
                onChange={(e: any) => {
                  console.log("tete", e);
                  changeValues("title", e?.target?.value);
                }}
              />
            </div>
            <input
              name="body"
              placeholder="Description"
              value={formDetails?.body}
              onChange={(e: any) => {
                changeValues("body", e?.target?.value);
              }}
            />
          </SubmitCard>
          {postingData ? (
            <Loader isLoading={isLoading || postingData} />
          ) : (
            <IonButton onClick={() => submitForm()}>Submit</IonButton>
          )}
        </IonModalComponent>
        <IonFooter>
          <IonFabButton
            style={{ position: "absolute", bottom: "110px", left: "310px" }}
            onClick={() => setIsOpen(true)}
          >
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFooter>
      </Wrapper>
    </IonPageComponent>
  );
};

export default Socials;
