import styled from "styled-components";
import IonPageComponent from "../components/IonPageComponent";
import { IonImg, IonText } from "@ionic/react";
import { useState } from "react";
import ImageCropModal from "../components/ImageCropModal";
import { useQuery } from "react-query";
import { fetchPhoto } from "../hooks/socials";
import { ImageUpload } from "../components/ImageUpload";

const Wrapper = styled.div`
  min-height: 100vh;

  .image {
    display: flex;
    justify-content: center;
    border: 1px solid #ffd9;
    border-radius: 50px;
    width: 100px;
    height: 100px;
    position: absolute;
    right: 150px;
    left: 150px;
    top: 110px;
  }

  .avatar {
    height: 77px;
    width: 77px;
    margin-bottom: 0.5rem;
  }

  .profile-image {
    top: 30px;
    display: flex;
    justify-content: center;
    position: relative;
    .upload-section {
      top: 0em;
      border-radius: 50%;
      position: absolute;
      height: 77px;
      width: 77px;
      cursor: pointer;
    }
  }

  .add-button {
    position: absolute;
    justify-content: center;
    align-item: center;
    position: relative;
    top: 60px;
    right: 20px;
    ion-img {
      border-radius: 50%;
      background-color: white;
      height: 1.2em;
      width: 1.2em;
    }
    .icon-section {
      top: 0em;
      position: absolute;
      height: 1em;
      width: 1em;
      cursor: pointer;
    }
  }
`;

const Profile = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [image, setImage] = useState("");
  const [imgErr, setImgErr] = useState<string>("");
  // const [isImgUploading, setIsImgUploading] = useState<boolean>(false);
  // const [showToast, setShowToast] = useToast(false);
  // const [showUploadMsg, setShowUploadMsg] = useState<boolean>(false);
  // const [iconUrl, setIconUrl] = useState<string>("");

  const { data: imageData, isLoading: imageLoading } = useQuery(
    ["fetchImage", 1],
    fetchPhoto,
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    }
  );

  /* const { mutate: mutationUploadImage, isLoading: updaingImage } = useMutation(
    updatePhoto,
    {
      onSuccess: async () => {
        console.log("yeah");
      },
      onError: (err: any) => {
        console.log("error uploading", err);
      },
    }
  ); */

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileSrc: any
  ) => {
    setImgErr("");
    setImage(fileSrc);
    setModalOpen(true);
  };

  const handleImageUpload = (file: File, croppedImage: any) => {
    /* if (userProfileData?.id) {
      setIsImgUploading(true);
      // api to get image
      getUploadImageUrl(userProfileData?.id, file?.type)
        .then((res) => handleImgFormData(res?.data, file, croppedImage))
        .catch((err) => {
          closeModal();
          setIsImgUploading(false);
          if (err?.response?.data?.error === "File format not supported") {
            setImgErr("File should not be more than 2 MB");
          } else {
            setShowToast(true);
          }
        });
    } */
  };

  const handleImgFormData = (data: any, file: File, croppedImage: any) => {
    const formData = new FormData();
    if (data?.fields) {
      formData.append("key", data?.fields?.key ?? "");
      formData.append("bucket", data?.fields?.bucket ?? "");
      formData.append("X-Amz-Algorithm", data?.fields["X-Amz-Algorithm"] ?? "");
      formData.append(
        "X-Amz-Credential",
        data?.fields["X-Amz-Credential"] ?? ""
      );
      formData.append("X-Amz-Date", data?.fields["X-Amz-Date"] ?? "");
      formData.append("X-Amz-Signature", data?.fields["X-Amz-Signature"] ?? "");
      formData.append(
        "X-Amz-Security-Token",
        data?.fields["X-Amz-Security-Token"] ?? ""
      );
      formData.append("Policy", data?.fields["Policy"] ?? "");
      formData.append("Content-Type", data?.fields["Content-Type"] ?? "");
      formData.append("file", file);
      // api to post image
      /* uploadImage({ url: data?.url, data: formData })
        .then((res) => {
          setIsImgUploading(false);
          setIconUrl(croppedImage);
          setShowUploadMsg(true);
          closeModal();
        })
        .catch((err) => {
          closeModal();
          setIsImgUploading(false);
          setShowToast(true);
        }); */
    }
  };

  return (
    <IonPageComponent>
      <ImageCropModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleUpload={handleImageUpload}
        image={image}
        uploading={false}
      />
      <Wrapper>
        <div className="profile-image">
          <div className="avatar">
            <IonImg src={image ? image : "./assets/avatar/user-avatar.png"} />
          </div>
          <div className="add-button">
            <ImageUpload
              onChange={handleImageChange}
              className="icon-section"
              value={image}
              setError={setImgErr}
            />
            <IonImg src="./assets/icon/plus-icon.svg" />
          </div>
        </div>
        {imgErr && <IonText className="err-msg">{imgErr}</IonText>}
        {/* </IonCol> */}
        {/* </IonRow> */}
      </Wrapper>
    </IonPageComponent>
  );
};

export default Profile;
