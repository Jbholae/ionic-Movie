import styled from "styled-components";
import IonPageComponent from "../components/IonPageComponent";
import { IonImg, IonText } from "@ionic/react";
import { useState } from "react";
import ImageCropModal from "../components/ImageCropModal";
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

  .avatar,
  ion-img {
    height: 77px;
    width: 77px;
    margin-bottom: 0.5rem;
    overflow: hidden;
    object-fit: cover;
    border-radius: 50%;
  }

  .profile-image {
    top: 30px;
    left: 12px;
    display: flex;
    justify-content: center;
    position: relative;
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
  const [cropimage, setCropImage] = useState<string>("");
  const [imgErr, setImgErr] = useState<string>("");

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileSrc: any
  ) => {
    setImgErr("");
    setCropImage(fileSrc);
    setModalOpen(true);
  };

  const handleImageUpload = (file: File, croppedImage: any) => {
    setCropImage(croppedImage);
    localStorage.setItem("profile", croppedImage);
    setImgErr("test");
    closeModal();
  };
  return (
    <IonPageComponent>
      <ImageCropModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleUpload={handleImageUpload}
        image={cropimage}
        uploading={false}
      />
      <Wrapper>
        <div className="profile-image">
          <div className="avatar">
            <IonImg
              src={
                localStorage.getItem("profile")
                  ? (localStorage.getItem("profile") as any)
                  : cropimage
                  ? cropimage
                  : "./assets/avatar/user-avatar.png"
              }
            />
          </div>
          <div className="add-button">
            <ImageUpload
              onChange={handleImageChange}
              className="icon-section"
              value={cropimage}
              setError={setImgErr}
            />
            <IonImg src="./assets/icon/plus-icon.svg" />
          </div>
        </div>
        {imgErr && <IonText className="err-msg">{imgErr}</IonText>}
      </Wrapper>
    </IonPageComponent>
  );
};

export default Profile;
