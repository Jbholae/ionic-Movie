import Cropper from "react-easy-crop";
import styled from "styled-components";
import React, { useState, useCallback } from "react";
import { IonRange, IonModal, IonIcon } from "@ionic/react";
import { closeOutline, addOutline, removeOutline } from "ionicons/icons";
import { Button } from "antd";

interface Props {
  image: string;
  isModalOpen: boolean;
  closeModal: () => void;
  handleUpload: (file: File, croppedImage: any) => void;
  uploading?: boolean;
}

interface Crop {
  x: number;
  y: number;
}

interface CroppedAreaPixels extends Crop {
  width: number;
  height: number;
}

const Modal = styled(IonModal)<{ zoom: number }>`
  --width: 520px;
  --height: 520px;
  --border-radius: 5px;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.2);

  .ion-delegate-host {
    background-color: #efefef;
  }

  header {
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(115, 115, 115);

    .close-btn-modal {
      cursor: pointer;
      font-size: 20px;
    }
  }

  .cropper {
    position: relative;
    height: 100%;
    margin: 24px 24px 0;

    .reactEasyCrop_Container {
      z-index: 999;
      height: 70%;
      width: 100%;

      img {
        object-fit: contain;
      }
    }
  }

  .range-wrapper {
    display: flex;
    align-items: center;
    position: relative;
    width: 70%;
    margin: 0 auto;
    margin-top: 300px;

    .icon {
      font-size: 25px;
    }

    .zoom-in {
      cursor: ${(props) => (props.zoom === 3 ? "normal" : "pointer")};
    }

    .zoom-out {
      cursor: ${(props) => (props.zoom === 1 ? "normal" : "pointer")};
    }

    ion-range {
      top: 72%;
      z-index: 1000;
      --bar-background: #ffffff;
      --bar-background-active: #3880ff;
      --bar-height: 4px;
      --knob-background: white;
      --knob-box-shadow: 0px 0.5px 4px rgba(0, 0, 0, 0.12),
        0px 6px 13px rgba(0, 0, 0, 0.12);
      --bar-border-radius: 2px;
      --knob-size: 26px;
      width: 80%;
    }
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;

    .btn {
      width: 150px;
    }

    .save-btn {
      margin-left: 15px;
    }
  }
`;

const ImageCropModal: React.FC<Props> = ({
  image,
  isModalOpen,
  closeModal,
  handleUpload,
  uploading = false,
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedAreaPixels | null>(null);

  const onCropChange = (crop: Crop) => {
    setCrop(crop);
  };

  const onCropComplete = (_: any, croppedAreaPixels: CroppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onZoomIn = () => {
    if (zoom !== 3) {
      setZoom(() => zoom + 0.1);
    }
  };

  const onZoomOut = () => {
    if (zoom !== 1) {
      setZoom(() => zoom - 0.1);
    }
  };

  function getCroppedImg(imageSrc: string, croppedAreaPixels: any) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.addEventListener("load", () => {
        const canvas = document.createElement("canvas");
        const ctx: any = canvas.getContext("2d");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const roundedRadius = croppedAreaPixels.width / 2; // Adjust the rounded corner radius as needed
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;
        ctx.beginPath();
        ctx.moveTo(roundedRadius, 0);
        ctx.lineTo(canvas.width - roundedRadius, 0);
        ctx.quadraticCurveTo(canvas.width, 0, canvas.width, roundedRadius);
        ctx.lineTo(canvas.width, canvas.height - roundedRadius);
        ctx.quadraticCurveTo(
          canvas.width,
          canvas.height,
          canvas.width - roundedRadius,
          canvas.height
        );
        ctx.lineTo(roundedRadius, canvas.height);
        ctx.quadraticCurveTo(
          0,
          canvas.height,
          0,
          canvas.height - roundedRadius
        );
        ctx.lineTo(0, roundedRadius);
        ctx.quadraticCurveTo(0, 0, roundedRadius, 0);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(
          image,
          croppedAreaPixels.x * scaleX,
          croppedAreaPixels.y * scaleY,
          croppedAreaPixels.width * scaleX,
          croppedAreaPixels.height * scaleY,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );
        // Extract type from dataURL src.
        const imgType = image?.src?.split(":")[1]?.split(";")[0];
        canvas.toBlob((blob: any) => {
          resolve(URL.createObjectURL(blob));
        }, imgType || "image/png");
      });
      image.addEventListener("error", (error) => reject(error));
    });
  }

  const generateCropImage = async (
    imageSrc: string,
    croppedAreaPixels: any
  ) => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      return croppedImage;
    } catch (e) {
      console.error(e);
    }
  };

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage: any = await generateCropImage(
        image,
        croppedAreaPixels
      );
      const response = await fetch(croppedImage);
      const blobData = await response.blob();
      const file = new File([blobData], "Profile Image", {
        type: blobData.type,
      });
      handleUpload(file, croppedImage);
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line
  }, [croppedAreaPixels, image]);

  return (
    <Modal
      isOpen={isModalOpen}
      onDidDismiss={closeModal}
      zoom={zoom}
      canDismiss={!uploading}
    >
      <header>
        <span>{"Edit Image"}</span>
        {!uploading ? (
          <IonIcon
            icon={closeOutline}
            className="close-btn-modal"
            onClick={() => closeModal()}
          />
        ) : null}
      </header>
      <div className="cropper">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          onZoomChange={onZoomChange}
        />
        <div className="range-wrapper">
          <IonIcon
            icon={removeOutline}
            className="icon zoom-out"
            onClick={onZoomOut}
          />
          <IonRange
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onIonChange={(e) => onZoomChange(e.detail.value as number)}
          ></IonRange>
          <IonIcon
            icon={addOutline}
            className="icon zoom-in"
            onClick={onZoomIn}
          />
        </div>
      </div>

      <div className="button-wrapper">
        <Button className="btn" onClick={closeModal} disabled={uploading}>
          {"Cancel"}
        </Button>
        <Button
          className="btn save-btn"
          color="#B80629"
          onClick={showCroppedImage}
          disabled={uploading}
        >
          {uploading ? "Uploading" : "Save"}
        </Button>
      </div>
    </Modal>
  );
};

export default ImageCropModal;
