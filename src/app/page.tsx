"use client";
import JSZip from "jszip";
import styles from "./LinkedInPostPage.module.scss";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import placeholderImage from "../../public/placeholder.svg";
import ModalComponent from "./../../components/Modal/Modal";
import StepperComponent from "./../../components/Stepper/Stepper";
import ImageUploaderComponent from "./../../components/Image-Uploader/Image-Uploader.tsx";
import { EDIT_SECTION, SECTION } from "../../constants/constants";
import postStore from "../../store/postStore";
import userStore from "../../store/userStore";
import EditTextComponent from "./../../components/Edit-Text/Edit-Text";
import Image from "next/image";
import { capitalizeFirstLetter } from "../../utils/utils";
import NumberedSelector from "./../../components/Numbered-Selector/Numbered-selector";

const LinkedInPostPage = () => {
  const { editedImage, mainText, introText, isHelpOpen, updateIsHelpOpen } =
    postStore();
  const {
    user,
    selectedStep,
    updateSelectedStep,
    selectedEditSection,
    updateSelectedEditSection,
  } = userStore();

  const SECTIONS = [
    { sectionNumber: "01", title: "Text", isNumberLeft: true },
    { sectionNumber: "02", title: "Picture", isNumberLeft: false },
  ];

  const handleAboutClick = () => {
    updateSelectedEditSection(EDIT_SECTION.INTRO_TEXT);
  };

  const handleBodyClick = () => {
    updateSelectedEditSection(EDIT_SECTION.MAIN_TEXT);
  };

  const handleImageClick = () => {
    updateSelectedEditSection(EDIT_SECTION.IMAGE);
  };

  const handleSelectionFromChild = (section) => {
    updateSelectedStep(section);
  };

  const handleCloseModal = () => {
    updateIsHelpOpen(false);
  };

  const handleDownload = async () => {
    if (!editedImage) {
      alert("Please upload an image first!");
      return;
    }

    const zip = new JSZip();
    zip.file("image-with-logo.png", editedImage.split(",")[1], {
      base64: true,
    });
    const textContent = `${introText} \n \n ${mainText}`;
    zip.file("post.txt", textContent);
    zip.generateAsync({ type: "blob" }).then((content) => {
      const folderName = `${user.firstName}_${user.lastName}_post`;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(content);
      a.download = `${folderName}.zip`;
      a.click();
    });
  };

  const renderModalContent = () => {
    switch (selectedStep) {
      case SECTION.FIRST:
        return (
          <ModalComponent
            scale={true}
            title={"Personal Information"}
            helpText={
              "Enter the desired data, make a few choices and you will generate a personal text about yourself."
            }
          >
            <StepperComponent />
          </ModalComponent>
        );

      case SECTION.SECOND:
        return (
          <ModalComponent
            scale={true}
            title={"Picture"}
            helpText={
              "Choose a picture that you would like to use for your LinkedIn post. You can also choose which logo to use and where to position it."
            }
          >
            <ImageUploaderComponent />
          </ModalComponent>
        );
      default:
        return null;
    }
  };

  const renderModalEditContent = () => {
    switch (selectedEditSection) {
      case EDIT_SECTION.INTRO_TEXT:
        return (
          <ModalComponent
            scale={true}
            title={"Edit Intro Text"}
            helpText={"undefined"}
          >
            <EditTextComponent
              text={introText}
              section={EDIT_SECTION.INTRO_TEXT}
            ></EditTextComponent>
          </ModalComponent>
        );

      case EDIT_SECTION.MAIN_TEXT:
        return (
          <ModalComponent
            scale={true}
            title={"Edit Main Text"}
            helpText={
              "Choose a picture that you would like to use for your LinkedIn post. You can also choose which logo to use and where to position it."
            }
          >
            <EditTextComponent
              text={mainText}
              section={EDIT_SECTION.MAIN_TEXT}
            ></EditTextComponent>
          </ModalComponent>
        );
      case EDIT_SECTION.IMAGE:
        return (
          // TODO: Change to edit image component.
          <ModalComponent
            scale={true}
            title={"Picture"}
            helpText={
              "Choose a picture that you would like to use for your LinkedIn post. You can also choose which logo to use and where to position it."
            }
          >
            <ImageUploaderComponent />
          </ModalComponent>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.wrapper}>
      {isHelpOpen && (
        <div className={styles.aaaq}>
          <div className={styles.aaaabsolute}>
            <div className={styles.close}>
              <IconButton size="large" onClick={handleCloseModal} disableRipple>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </div>
      )}
      <div className={styles.relative}>
        <div
          className={`${styles.linkedinPost} ${
            selectedStep === SECTION.NONE &&
            selectedEditSection === EDIT_SECTION.NONE
              ? styles.boxShadow
              : styles.border
          }`}
        >
          <div className={`${styles.postHeader}`}>
            <Image
              src="/sce_logo.jpg"
              width={"200"}
              height={"200"}
              alt="Profile"
              className={styles.profilePicture}
            />
            <div className={styles.userInfo}>
              <h4 className={styles.userName}>{`${capitalizeFirstLetter(
                user.firstName
              )} ${capitalizeFirstLetter(user.lastName)}`}</h4>
              <p className={styles.userTitle}>
                {`${
                  user.occupation === ""
                    ? "Engineer"
                    : capitalizeFirstLetter(user.occupation)
                } at Sigma Connectivity Engineering`}
              </p>
              <span className={styles.postTime}>Just now</span>
            </div>
          </div>

          <div className={`${styles.postContent}`}>
            <div className={styles.textSection}>
              {SECTIONS.map((section, index) => (
                <div
                  key={index}
                  className={`${styles.annotation} ${
                    styles[`annotation0${index + 1}`]
                  }`}
                >
                  <NumberedSelector
                    selectSection={handleSelectionFromChild}
                    section={section}
                  />
                </div>
              ))}
              <p className="pointer" onClick={handleAboutClick}>
                {introText}
              </p>
              <p className="pointer" onClick={handleBodyClick}>
                {mainText}
              </p>
            </div>
            {editedImage ? (
              <div onClick={handleImageClick} className={styles.imageContainer}>
                <Image
                  className={styles.postImage}
                  src={editedImage}
                  width={700}
                  alt="Post Image"
                  height={700}
                ></Image>
              </div>
            ) : (
              <Image
                src={placeholderImage}
                width={700}
                height={700}
                alt="Placeholder"
                onClick={handleImageClick}
                className={`${styles.noImage} flexCenter`}
              ></Image>
            )}
          </div>
          <div className={styles.postFooter}>
            <button className={styles.postAction}>Like</button>
            <button className={styles.postAction}>Comment</button>
            <button className={styles.postAction} onClick={handleDownload}>
              Share
            </button>
          </div>
          {selectedStep !== SECTION.NONE ||
          selectedEditSection !== EDIT_SECTION.NONE ? (
            <div className={styles.absolute}></div>
          ) : null}
          {renderModalContent()}
          {renderModalEditContent()}
        </div>
      </div>
    </div>
  );
};

export default LinkedInPostPage;
