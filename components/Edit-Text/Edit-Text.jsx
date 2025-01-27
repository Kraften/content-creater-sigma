import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { TextareaAutosize } from "@mui/base";

import styles from "./Edit-Text.module.scss";
import postStore from "../../store/postStore";
import userStore from "../../store/userStore";
import { SECTION } from "../../constants/constants";
import { EDIT_SECTION } from "../../constants/constants";

const EditTextComponent = ({ text, section }) => {
  const { updateIntroText, updateMainText } = postStore();
  const { updateSelectedStep, updateSelectedEditSection } = userStore();

  const handleClose = () => {
    updateSelectedEditSection(EDIT_SECTION.NONE);
    updateSelectedStep(SECTION.NONE);
  };

  const handleTextChange = (e) => {
    if (section === EDIT_SECTION.INTRO_TEXT) updateIntroText(e.target.value);
    else if (section === EDIT_SECTION.MAIN_TEXT) updateMainText(e.target.value);
  };

  return (
    <>
      <TextareaAutosize
        sx={{
          "&:focus": {
            outline: "none",
          },
        }}
        id="outlined-adornment-password"
        onChange={(e) => handleTextChange(e)}
        className={styles.textInput}
        value={text}
      />
      <div className={styles.buttonRow}>
        <IconButton
          className={styles.saveButton}
          size="large"
          onClick={handleClose}
          disableRipple
        >
          <CheckCircleIcon />
        </IconButton>
      </div>
    </>
  );
};

export default EditTextComponent;
