const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  };
  
  const enableValidation = (selectors) => {
    const { formSelector,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass } = selectors;
  
    const hasInvalidInput = (inputList) => {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    };
  
    const toggleButtonState = (inputList, buttonElement) => {
      if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
      } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
      }
    };
  
    const showInputError = (formElement, inputElement, errorMessage) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(errorClass);
    };
  
    const hideInputError = (formElement, inputElement) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(inputErrorClass);
      errorElement.classList.remove(errorClass);
      errorElement.textContent = '';
    };
  
    const isValid = (formElement, inputElement) => {
      if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
      } else {
        hideInputError(formElement, inputElement);
      }
    };
  
    const setEventListeners = (formElement) => {
      const inputList = Array.from(formElement.querySelectorAll(inputSelector));
      const buttonElement = formElement.querySelector(submitButtonSelector);
      toggleButtonState(inputList, buttonElement);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          isValid(formElement, inputElement);
          toggleButtonState(inputList, buttonElement);
        });
      });
    };
  
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  };
  
  enableValidation(validationSettings); 