import InfoFormComponent from "../Info-Form/Info-Form";
import ListAnswers from "../List-Answers/List-Answers";
import { STEPS } from "../../../constants/constants";
import { PropTypes } from "prop-types";
import BreadTextStep from "../Bread-Text-Step/Bread-Text-Step";

const ActiveStepContents = ({
  activeStep,
  chatError,
  formRef,
  validateForm,
}) => {
  const stepContentSwitcher = () => {
    switch (activeStep) {
      case STEPS.INFO:
        return (
          <InfoFormComponent
            formRef={formRef}
            validateForm={validateForm}
            chatError={chatError}
          ></InfoFormComponent>
        );
      case STEPS.PERKS:
        return <ListAnswers></ListAnswers>;
      case STEPS.CONFIRM:
        return <BreadTextStep></BreadTextStep>;
      default:
        break;
    }
  };

  return <>{stepContentSwitcher()}</>;
};

export default ActiveStepContents;

ActiveStepContents.propTypes = {
  activeStep: PropTypes.string,
  chatError: PropTypes.string,
  passSelectedPerksToParent: PropTypes.func,
  validateForm2: PropTypes.func,
};
