import { useState, useRef } from "react";
import styles from "./Stepper.module.scss";
import { run, extractBulletPointsAndHeaders } from "../../config/gemini.js";
import ActiveStepContents from "./Active-Step-Contents/Active-Step-Contents";
import { STEPS, STEPS_LIST } from "../../constants/constants.js";
import ButtonRowContents from "./Button-Row-Contents/Button-Row-Contents";
import { PropTypes } from "prop-types";
import postStore from "../../store/postStore.js";
import userStore from "./../../store/userStore";

const StepperComponent = () => {
  const formRef = useRef();
  const [activeStep, setActiveStep] = useState(STEPS.INFO);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatError, setChatError] = useState("");
  const [selectedPerkItems, setSelectedPerkItems] = useState([]);

  const { user } = userStore();
  const { updateListOfPerks, selectedPerksList, updateMainText } = postStore();

  const fetchAIResponse = async (prompt) => {
    setLoading(true);
    try {
      const answer = await run(prompt);
      return answer.response.text();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error) => {
    console.error("Error:", error);
    setChatError("Something went wrong. Please try again.");
  };

  const fetchAndProcessHobbyQuestion = async (nextStep) => {
    try {
      const hobbyQuestion = `the person is a ${user.hobby}, what skills could he learn from that that hobby that helps them in their job as a${user.occupation}?`;
      const answer = await fetchAIResponse(hobbyQuestion);
      const answersList = extractBulletPointsAndHeaders(answer);
      const filteredList = answersList.filter(
        (item) => item.bulletPoint.trim() !== ""
      );
      updateListOfPerks(filteredList);
      setActiveStep(nextStep);
    } catch (error) {
      handleError(error);
    }
  };

  const validateForm = () => {
    if (formRef.current) {
      setIsFormValid(formRef.current.checkValidity());
    }
  };

  const fetchAndProcessPerksQuestion = async (nextStep) => {
    try {
      const continuousString = selectedPerksList
        .map((item) => `${item.header}: ${item.bulletPoint}`)
        .join(" ");
      const perksQuestion = `Write a 200 word text about ${user.firstName} with these skills: ${continuousString} that works as a ${user.occupation}.`;
      const answer = await fetchAIResponse(perksQuestion);
      updateMainText(answer);
      setActiveStep(nextStep);
    } catch (error) {
      handleError(error);
    }
  };

  const LoadingSpinner = () => (
    <>
      <div className="absoluteWithBlur"></div>
      <div className={styles.spinner}></div>
    </>
  );

  const StepIndicator = ({ step, isActive }) => (
    <li>
      <div className={styles.circleWrapper}>
        <span
          className={`${styles.circle} ${isActive ? styles.activeCircle : ""}`}
        ></span>
      </div>
      {step !== "Confirm" && (
        <div className={styles.lineWrapper}>
          <div className={styles.line}></div>
        </div>
      )}
      <div className={styles.titleWrapper}>
        <div className={styles.title}>{step}</div>
      </div>
    </li>
  );

  // StepIndicator.propTypes = {
  //   step: PropTypes.string,
  //   isActive: PropTypes.func,
  // };

  return (
    <div className={styles.stepper}>
      <div className={styles.stepsRowWrapper}>
        <ul className={styles.stepsRow}>
          {STEPS_LIST.map((step) => (
            <StepIndicator
              key={step}
              step={step}
              isActive={activeStep === step}
            />
          ))}
        </ul>
      </div>
      <div className={styles.contentsRow}>
        {loading ? <LoadingSpinner></LoadingSpinner> : null}
        <ActiveStepContents
          activeStep={activeStep}
          chatError={chatError}
          formRef={formRef}
          passSelectedItems={(e) => setSelectedPerkItems(e)}
          validateForm={(e) => validateForm(e)}
        ></ActiveStepContents>
      </div>
      <div className={styles.buttonsRow}>
        <ButtonRowContents
          isDisabled={isFormValid}
          isLoading={loading}
          activeStep={activeStep}
          handleSendHobbyQuestion={() =>
            fetchAndProcessHobbyQuestion(STEPS.PERKS)
          }
          handleSendPerksQuestion={() =>
            fetchAndProcessPerksQuestion(STEPS.CONFIRM)
          }
        ></ButtonRowContents>
      </div>
    </div>
  );
};

export default StepperComponent;

StepperComponent.propTypes = {
  sendCloseToParent: PropTypes.func,
};
