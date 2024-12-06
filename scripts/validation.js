const settings = {
  formSelector: ".modal__form", //declaring a configuration [config] object - period for selectors
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled", // without period for classes
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__label__error_visible",
};

const showInputError = (formEl, inputEl, errorMsg, config) => {
  //need config obj
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add(config.inputErrorClass);
};

const hideInputError = (formEl, inputEl, config) => {
  //need config obj
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  inputEl.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (formEl, inputEl, config) => {
  //need config obj
  console.log(inputEl.validationMessage);
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config); // use config obj
  } else {
    hideInputError(formEl, inputEl, config); //use config obj
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEl, config);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove(config.inactiveButtonClass); //use config object
  }
};

const disableButton = (buttonEl, config) => {
  buttonEl.disabled = true;
  buttonEl.classList.add(config.inactiveButtonClass); //use config obj
};

const resetValidation = (formEl, inputList, config) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input, config);
  });
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonElement = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

enableValidation(settings); // parameter matches declared variable const settings
