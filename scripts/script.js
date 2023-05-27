const editingBtn = document.querySelector(".profile__edit-button");
const editingProfilePopup = document.querySelector(".popup_edit");
const card = document.querySelector("#element").content
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
const popupImageCrop = document.querySelector(".popup_crop");
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

function createCard (name, link) {
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
      popupImageCrop.querySelector(".popup__image").alt = cardCopy.querySelector(".element__name").textContent;
      popupImageCrop.querySelector(".popup__des").textContent = cardCopy.querySelector(".element__name").textContent;
    })

    cardCopy.querySelector('.element__name').textContent = name;
    cardCopy.querySelector('.element__name').alt = name;
    cardCopy.querySelector('.element__image').src = link;

    return cardCopy;
}

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

function openPopup (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEscape);
  if (popup.querySelector(".popup__submit") != null) {
    const popupSubmitBtn = popup.querySelector(".popup__submit");
    popupSubmitBtn.disabled = true;
    popupSubmitBtn.classList.add("popup__submit_inactive");
  }
}

function closePopup (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupEscape);
}

for (let j = 0; j < initialCards.length; j++) {
  const readyCardCopy = createCard(initialCards[j].name, initialCards[j].link);
  elements.append(readyCardCopy);
}

editingBtn.addEventListener("click", function () {
    openPopup(editingProfilePopup)
    editingProfileInputName.value = profileName.textContent;
    editingProfileInputDescription.value = profileDescription.textContent;
})

for (let i = 0; i < popupsCloseBtns.length; i++) {
    popupsCloseBtns[i].addEventListener("click", function () {
      popupsCloseBtns[i].closest(".popup").classList.remove("popup_opened");
    })
}

editingForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    profileName.textContent = editingProfileInputName.value;
    profileDescription.textContent = editingProfileInputDescription.value;
    closePopup(editingProfilePopup)
})

addingButton.addEventListener("click", function () {
  openPopup(addingCardPopup)
})

addingForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    closePopup(addingCardPopup)
    const name = addingCardInputPlace.value;
    const link = addingCardInputLink.value;
    addingCardInputPlace.value = ""
    addingCardInputLink.value = ""
    const readyCardCopy = createCard(name, link);
    elements.prepend(readyCardCopy)
})

for (let i = 0; i < popups.length; i++) {
  popups[i].addEventListener("click", closePopupOverlay);
}