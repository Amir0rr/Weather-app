import { messageEL, resultBox } from "../common.js";

const renderError = (errorMessage) => {
  messageEL.classList.add("message-error");
  messageEL.textContent = errorMessage;
  resultBox.classList.add("hidden");
};

export default renderError;
