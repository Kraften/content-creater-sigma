import styles from "./Bread-Text-Step.module.scss";
import { PropTypes } from "prop-types";
import postStore from "../../../store/postStore";
import { TextareaAutosize } from "@mui/base";

const BreadTextStep = () => {
  const { mainText, updateMainText } = postStore();

  return (
    <>
      <TextareaAutosize
        id="outlined-adornment-password"
        onChange={(e) => updateMainText(e.target.value)}
        className={styles.textInput}
        value={mainText}
      />
    </>
  );
};

export default BreadTextStep;

BreadTextStep.propTypes = {
  activeStep: PropTypes.string,
  chatError: PropTypes.string,
  passSelectedPerksToParent: PropTypes.func,
};
