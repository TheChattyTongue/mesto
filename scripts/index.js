import Card from "./Card.js"
import FormValidator from "./FormValidator.js"
const editingBtn = document.querySelector(".profile__edit-button");
const editingProfilePopup = document.querySelector(".popup_edit");
const addingCardPopup = document.querySelector(".popup_place");
const popupsCloseBtns = document.querySelectorAll(".popup__close-btn");
const editingProfileInputName = document.querySelector(".popup__input_type_name");
const editingProfileInputDescription = document.querySelector(".popup__input_type_description");
const addingCardInputPlace = document.querySelector(".popup__input_type_place");
const addingCardInputLink = document.querySelector(".popup__input_type_link");
const addingButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editingForm = document.querySelector(".popup__form_edit");
const addingForm = document.querySelector(".popup__form_place")
const elements = document.querySelector(".elements");
const popups = document.querySelectorAll(".popup");

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const closePopupOverlay = (evt) => {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
};

const closePopupEscape = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

export default function openPopup (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEscape);
}

function disableSubmitBtn (popup) {
  const popupSubmitBtn = popup.querySelector(".popup__submit");
  popupSubmitBtn.disabled = true;
  popupSubmitBtn.classList.add("popup__submit_inactive");
}

function closePopup (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupEscape);
}

editingBtn.addEventListener("click", function () {
    openPopup(editingProfilePopup)
    disableSubmitBtn(editingProfilePopup)
    editingProfileInputName.value = profileName.textContent;
    editingProfileInputDescription.value = profileDescription.textContent;
})

for (let i = 0; i < popupsCloseBtns.length; i++) {
    popupsCloseBtns[i].addEventListener("click", function () {
      const closestPopup = popupsCloseBtns[i].closest(".popup");
      closePopup(closestPopup);
    })
}

editingForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    profileName.textContent = editingProfileInputName.value;
    profileDescription.textContent = editingProfileInputDescription.value;
    closePopup(editingProfilePopup);
    
})

addingButton.addEventListener("click", function () {
  openPopup(addingCardPopup)
  disableSubmitBtn(addingCardPopup)
})

addingForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    closePopup(addingCardPopup)
    const name = addingCardInputPlace.value;
    const link = addingCardInputLink.value;
    addingCardInputPlace.value = ""
    addingCardInputLink.value = ""
    const readyCardCopy = renderCard(name, link, '#element');
    elements.prepend(readyCardCopy)
})

for (let i = 0; i < popups.length; i++) {
  popups[i].addEventListener("click", closePopupOverlay);
}

function renderCard(name, link, templateSelector) {
  const card = new Card(name, link, templateSelector);
  return card.createCard();
}

for (let j = 0; j < initialCards.length; j++) {
  const card = initialCards[j];
  const cardElement = renderCard(card.name, card.link, '#element');
  elements.append(cardElement);
}

const forms = Array.from(document.querySelectorAll(validationSettings.formSelector));
forms.forEach((formElement) => {
  const formValidator = new FormValidator(validationSettings, formElement);
  formValidator.enableValidation();
});