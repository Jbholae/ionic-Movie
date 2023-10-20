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
`;

const SubmitCard = styled.div`
height :20px
  top: 120px;
`;

const Socials = () => {
  const { isLoading, data: socialData } = useQuery(["loadSocial"], fetchPosts, {
    enabled: true,
  });

  const { mutate, isLoading: postingData } = useMutation(createPost, {
    onSuccess: async (a: any) => {
      notification.success(a);
      console.log("success", a);
    },
    onError: (e: any) => {
      notification.error(e);
      console.log("error", e);
    },
  });
  const initialValues = {
    title: "",
    body: "",
    id: "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (value: any) => {
      mutate({
        id: socialData?.data?.id,
        title: value.title,
        body: value.body,
        ...value,
      });
    },
  });
  if (isLoading) {
    <div>
      <Spin />
    </div>;
  }
  return (
    <IonPageComponent>
      <form onSubmit={formik.handleSubmit}>
        <Wrapper>
          <IonHeader style={{ position: "sticky", top: 0 }}>
            <IonToolbar color={"primary"}>
              <IonTitle>Social</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList>
            {socialData &&
              socialData?.data.slice(0, 20).map((item: any) => {
                return (
                  <IonItem button key={item?.id} id="open-simsim">
                    <div>
                      <IonLabel>{item?.id}</IonLabel>
                      <IonLabel>{item?.body}</IonLabel>
                    </div>
                  </IonItem>
                );
              })}
          </IonList>
          <IonModalComponent trigger="open-simsim">
            <IonLabel>Post details</IonLabel>
          </IonModalComponent>

          <IonModalComponent trigger="open-modal">
            <SubmitCard>
              <IonTextarea
                name="title"
                placeholder="Title"
                onChange={(e) => formik.handleChange}
                onError={() => formik.touched.title && formik.errors.title}
              />
              <IonTextarea
                name="body"
                placeholder="Description"
                onChange={(e) => formik.handleChange}
                onError={() => formik.touched.body && formik.errors.body}
              />
            </SubmitCard>
            {postingData ? (
              <Spin />
            ) : (
              <IonButton onClick={() => formik.submitForm}>Submit</IonButton>
            )}
          </IonModalComponent>
          <IonFooter>
            <IonFabButton
              id="open-modal"
              style={{ position: "absolute", bottom: "110px", left: "310px" }}
            >
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFooter>
        </Wrapper>
      </form>
    </IonPageComponent>
  );
};

export default Socials;
