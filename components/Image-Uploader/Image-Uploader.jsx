import { useState } from "react";
import html2canvas from "html2canvas";
import styles from "./Image-Uploader.module.scss";
import postStore from "../../store/postStore.js";
import { SECTION } from "../../constants/constants.js";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { DndContext } from "@dnd-kit/core";
import DraggableLogo from "./Draggable-Logo/Draggable-Logo";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import placeholderImage from "../../public/placeholder.svg";
import ImageControlsMenu, {
  LOGOS,
} from "./Image-Controls-Menu/Image-Controls-Menu.jsx";
import userStore from "../../store/userStore.js";
import Image from "next/image";

const ImageUploaderComponent = () => {
  const [logoPosition, setLogoPosition] = useState({ top: 50, left: 50 });
  const [selectedLogo, setSelectedLogo] = useState("sigmaEngLogo");
  const [logoColor, setLogoColor] = useState(true);
  const { image, updateEditedImage } = postStore();
  const { updateSelectedStep } = userStore();

  const saveImageToState = () => {
    const element = document.getElementById("output-container");
    html2canvas(element, { useCORS: true, scale: 2 }).then((canvas) => {
      const dataURL = canvas.toDataURL("image/png");
      updateEditedImage(dataURL);
    });

    handleCloseModal();
  };

  const handleDragEnd = (event) => {
    const { delta } = event;
    setLogoPosition((prev) => ({
      top: prev.top + delta.y,
      left: prev.left + delta.x,
    }));
  };

  const handleCloseModal = () => {
    updateSelectedStep(SECTION.NONE);
  };

  const logoControls = (e) => {
    setSelectedLogo(e.logo);
    setLogoColor(e.color);
  };

  const handlePositionChange = (newPosition) => {
    setLogoPosition(newPosition);
  };
  return (
    <div className={styles.imageUploadComponent}>
      <ImageControlsMenu
        onLogoChange={(e) => logoControls(e)}
      ></ImageControlsMenu>
      {image ? (
        <DndContext
          onDragEnd={handleDragEnd}
          modifiers={[restrictToParentElement]}
        >
          <div id="output-container" className={styles.outputContainer}>
            <Image
              className={styles.uploadedImage}
              src={image}
              alt="Background"
            />
            <DraggableLogo
              logo={LOGOS[selectedLogo][logoColor]}
              position={logoPosition}
              onPositionChange={handlePositionChange}
            />
          </div>
        </DndContext>
      ) : (
        <div className={styles.outputContainer}>
          <Image src={placeholderImage}></Image>
        </div>
      )}
      {image && (
        <div className={styles.buttonRow}>
          <IconButton
            className={styles.saveButton}
            size="large"
            onClick={saveImageToState}
            disableRipple
          >
            <CheckCircleIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default ImageUploaderComponent;
