import styles from "./Info-Form.module.scss";
import TextField from "@mui/material/TextField";
import { PropTypes } from "prop-types";
import userStore from "../../../store/userStore";

const InfoFormComponent = ({ chatError, formRef, validateForm }) => {
  const { user, setUser } = userStore();

  return (
    <form className={styles.questionWrapper} ref={formRef}>
      <TextField
        required
        id=""
        label="First Name"
        variant="standard"
        value={user.firstName}
        onChange={(e) => {
          setUser({ firstName: e.target.value });
          validateForm();
        }}
      />
      <TextField
        required
        id=""
        label="Last Name"
        value={user.lastName}
        variant="standard"
        onChange={(e) => {
          setUser({ lastName: e.target.value });
          validateForm();
        }}
      />
      <TextField
        required
        id=""
        label="Occupation"
        variant="standard"
        value={user.occupation}
        onChange={(e) => {
          setUser({ occupation: e.target.value });
          validateForm();
        }}
      />
      <TextField
        required
        size="large"
        className={styles.input}
        label="Hobby/Activity"
        variant="standard"
        value={user.hobby}
        onChange={(e) => {
          setUser({ hobby: e.target.value });
          validateForm();
        }}
        type="text"
      />

      <span>{chatError}</span>
    </form>
  );
};

export default InfoFormComponent;

InfoFormComponent.propTypes = {
  sendQuestionTextToParent: PropTypes.func,
  chatError: PropTypes.string,
  validateForm: PropTypes.func,
};
