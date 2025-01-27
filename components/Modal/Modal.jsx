import styles from "./Modal.module.scss";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { PropTypes } from "prop-types";
import userStore from "./../../store/userStore";
import { SECTION } from "../../constants/constants.js";
import { EDIT_SECTION } from "./../../constants/constants";

const ModalComponent = ({ scale, title, helpText, children }) => {
  const { updateSelectedStep, updateSelectedEditSection } = userStore();

  const handleCloseModal = () => {
    updateSelectedEditSection(EDIT_SECTION.NONE);
    updateSelectedStep(SECTION.NONE);
  };

  return (
    <div className={`${styles.modal} ${scale ? styles.scaleUp : null}`}>
      <div className={styles.close}>
        {title === "" ? null : <h2>{title}</h2>}
        <IconButton
          className={styles.x}
          size="large"
          onClick={handleCloseModal}
          disableRipple
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div className={styles.header}>
        {helpText && <p className={styles.helpText}>{helpText}</p>}
      </div>
      {children}
    </div>
  );
};

ModalComponent.propTypes = {
  scale: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node,
  titleCenter: PropTypes.bool,
  helpText: PropTypes.string,
};

export default ModalComponent;
