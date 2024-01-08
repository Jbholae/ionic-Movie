import {
  IonButton,
  IonContent,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import IonPageComponent from "../components/IonPageComponent";
import { useMutation, useQuery } from "react-query";
import {
  createPost,
  fetchPostDetail,
  fetchPosts,
  updatePostDetail,
} from "../hooks/socials";
import styled from "styled-components";
import { add } from "ionicons/icons";
import { useRef, useState } from "react";
import { Loader } from "../components/Loader";

const Wrapper = styled.div`
  ion-item {
    --background: white;
  }

  ion-list {
    padding: 0px;
  }

  .fab-button {
    display: flex;
    justify-content: end;
    margin-right: 10px;
    position: sticky;
    bottom: 122px;
  }
`;
const IonModalComponent = styled(IonModal)`
  --width: 414px;
  --border-radius: 10px;
  --height: 400px;

  .input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;

    input {
      background: #fff;
      padding: 4px;
      border-radius: 4px;
      height: 2.5em;
      border: 1px solid black;
      outline: none;
    }
    textarea {
      background: #fff;
      padding: 4px;
      border-radius: 4px;
      border: 1px solid black;
      outline: none;
    }
  }
`;

const SubmitCard = styled.div`
  margin: 10px;
  height: 2500px;
  background: rgba(255, 255, 255, 0.79);
`;

const Socials = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const detailModal = useRef<HTMLIonModalElement>(null);
  const [detaiModalOpen, setDetailModalOpen] = useState<boolean>(false);
  const [toast, isToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [postId, setPostId] = useState<number>();
  const [getFormDetails, setDetailFormDetails] = useState({
    title: "",
    body: "",
  });
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

  const updateValues = (name: string, value: string) => {
    setDetailFormDetails((formDetails: any) => ({
      ...formDetails,
      [name]: value,
    }));
  };

  const {
    isLoading,
    data: socialData,
    refetch,
  } = useQuery(["loadSocial"], fetchPosts, {
    refetchOnWindowFocus: false,
    keepPreviousData: false,
  });

  const { isLoading: loadingPostDetails } = useQuery(
    ["postDetail", postId],
    fetchPostDetail,
    {
      refetchOnWindowFocus: false,
      keepPreviousData: false,
      enabled: postId ? true : false,
      onSuccess(data) {
        const res = data?.data;
        setDetailFormDetails((prevState: any) => {
          return {
            ...prevState,
            title: res.title,
            body: res.body,
          };
        });
      },
    }
  );

  function modalDismiss() {
    modal?.current?.dismiss();
  }

  function detailModalDismiss() {
    detailModal?.current?.dismiss();
  }

  const { mutate, isLoading: postingData } = useMutation(createPost, {
    onSuccess: async () => {
      setToastMessage("Success");
      isToastOpen(true);
      refetch();
      modalDismiss();
    },
    onError: () => {
      setToastMessage("Failed");
      isToastOpen(true);
    },
  });

  const { mutate: mutateUpdatePost, isLoading: updaingPost } = useMutation(
    updatePostDetail,
    {
      onSuccess: async () => {
        setToastMessage("Success");
        isToastOpen(true);
        refetch();
        detailModalDismiss();
      },
      onError: () => {
        setToastMessage("Failed");
        isToastOpen(true);
      },
    }
  );

  const submitForm = async () => {
    mutate({
      id: socialData?.data?.id,
      userId: socialData?.data?.id,
      title: formDetails.title,
      body: formDetails.body,
    });
  };

  const updatePost = async () => {
    mutateUpdatePost({
      userId: `${socialData?.data[0].id}`,
      payload: {
        id: postId,
        userId: socialData?.data?.id,
        title: getFormDetails.title,
        body: getFormDetails.body,
      },
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
        <IonToast
          message={toastMessage}
          isOpen={toast}
          duration={2000}
          onDidDismiss={() => isToastOpen(false)}
        ></IonToast>
        <IonModalComponent
          ref={detailModal}
          trigger="detail-open-modal"
          isOpen={detaiModalOpen}
          onDidDismiss={() => {
            setDetailModalOpen(false);
          }}
        >
          <Loader isLoading={loadingPostDetails}>
            <SubmitCard>
              <IonContent>
                <IonLabel>Post {postId} Detail</IonLabel>
                <div className="input-wrapper">
                  <input
                    name="title"
                    placeholder="Title"
                    value={getFormDetails.title}
                    onChange={(e: any) => {
                      updateValues("title", e?.target?.value);
                    }}
                  />
                </div>
                <div className="input-wrapper">
                  <textarea
                    name="body"
                    placeholder="Description"
                    value={getFormDetails.body}
                    rows={10}
                    cols={11}
                    onChange={(e: any) => {
                      updateValues("body", e?.target?.value);
                    }}
                  />
                </div>
                {updaingPost ? (
                  <Loader isLoading={updaingPost} />
                ) : (
                  <IonButton onClick={() => updatePost()}>Update</IonButton>
                )}
              </IonContent>
            </SubmitCard>
          </Loader>
        </IonModalComponent>
        <Loader isLoading={isLoading}>
          <IonList>
            {socialData &&
              socialData?.data.slice(0, 20).map((item: any) => {
                return (
                  <IonItem
                    button
                    key={item?.id}
                    id="detail-open-modal"
                    onClick={() => {
                      setDetailModalOpen(true);
                      setPostId(item?.id);
                    }}
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
        <IonModalComponent ref={modal} trigger="post-open-modal">
          <SubmitCard>
            <IonContent>
              <IonLabel>Create Post</IonLabel>
              <div className="input-wrapper">
                <input
                  name="title"
                  placeholder="Title"
                  value={formDetails?.title}
                  onChange={(e: any) => {
                    changeValues("title", e?.target?.value);
                  }}
                />
              </div>
              <div className="input-wrapper">
                <textarea
                  name="body"
                  placeholder="Description"
                  value={formDetails?.body}
                  rows={10}
                  cols={13}
                  onChange={(e: any) => {
                    changeValues("body", e?.target?.value);
                  }}
                />
              </div>
              {postingData ? (
                <Loader isLoading={isLoading || postingData} />
              ) : (
                <IonButton onClick={() => submitForm()}>Submit</IonButton>
              )}
            </IonContent>
          </SubmitCard>
        </IonModalComponent>
        <div className="fab-button">
          <IonFabButton id="post-open-modal">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </div>
      </Wrapper>
    </IonPageComponent>
  );
};

export default Socials;
