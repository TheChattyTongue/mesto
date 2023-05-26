const editBtn = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector(".popup_edit");
const card = document.querySelector("#element").content
const addCardPopup = document.querySelector(".popup_place");
const popupsCloseBtns = document.querySelectorAll(".popup__close-btn");
const editProfileInputName = document.querySelector(".popup__input_type_name");
const editProfileInputDescription = document.querySelector(".popup__input_type_description");
const addCardInputPlace = document.querySelector(".popup__input_type_place");
const addCardInputLink = document.querySelector(".popup__input_type_link");
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editForm = document.querySelector(".popup__form_edit");
const addForm = document.querySelector(".popup__form_place")
const elements = document.querySelector(".elements");
const popupImageCrop = document.querySelector(".popup_crop");

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

function createCard () {
  const cardCopy = card.querySelector(".element").cloneNode(true);
  const like = cardCopy.querySelector(".element__like");
    like.addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like_active");
    })
    const trash = cardCopy.querySelector(".element__trash");
    trash.addEventListener("click", function (evt) {
      evt.target.parentElement.remove();
    })
    const cardImg = cardCopy.querySelector(".element__image")
    cardImg.addEventListener("click", function (evt) {
      openPopup(popupImageCrop)
      popupImageCrop.querySelector(".popup__image").src = evt.target.src
      popupImageCrop.querySelector(".popup__des").textContent = cardCopy.querySelector(".element__name").textContent;
    })
    return cardCopy;
}

const closePopupOverlay = (evt) => {
  if (evt.target.classList.contains("popup")) {
    const popup = evt.target.closest(".popup");
    closePopup(popup);
  }
};

const closePopupEscape = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

function openPopup (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("click", closePopupOverlay);
  document.addEventListener('keydown', closePopupEscape);
  resetValidation(popup);
}

function closePopup (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("click", closePopupOverlay);
  document.removeEventListener('keydown', closePopupEscape);
}

for (let j = 0; j < initialCards.length; j++) {
    const readyCardCopy = createCard()
    readyCardCopy.querySelector(".element__name").textContent = initialCards[j].name;
    readyCardCopy.querySelector(".element__image").src = initialCards[j].link;
    elements.append(readyCardCopy)
}

editBtn.addEventListener("click", function () {
    openPopup(editProfilePopup)
    editProfileInputName.value = profileName.textContent;
    editProfileInputDescription.value = profileDescription.textContent;
})

for (let i = 0; i < popupsCloseBtns.length; i++) {
    popupsCloseBtns[i].addEventListener("click", function () {
      popupsCloseBtns[i].closest(".popup").classList.remove("popup_opened");
    })
}

editForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    profileName.textContent = editProfileInputName.value;
    profileDescription.textContent = editProfileInputDescription.value;
    closePopup(editProfilePopup)
})

addButton.addEventListener("click", function () {
  openPopup(addCardPopup)
})

addForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    closePopup(addCardPopup)
    const readyCardCopy = createCard()
    readyCardCopy.querySelector(".element__name").textContent = addCardInputPlace.value
    readyCardCopy.querySelector(".element__image").src = addCardInputLink.value
    addCardInputPlace.value = ""
    addCardInputLink.value = ""
    elements.prepend(readyCardCopy)
})

const resetValidation = (popup) => {
  const form = popup.querySelector(".popup__form");
  const errorElements = form.querySelectorAll(".popup__input-error");
  const inputElements = form.querySelectorAll(".popup__input");

  errorElements.forEach((errorElement) => {
    errorElement.textContent = "";
    errorElement.classList.remove("popup__input-error_active");
  });

  inputElements.forEach((inputElement) => {
    inputElement.classList.remove("popup__input_type_error");
  });
};