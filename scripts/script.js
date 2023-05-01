let editBtn = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let popupPlace = document.querySelector(".popup_place");
let closeBtn = document.querySelectorAll(".popup__close-btn");
let inputName = document.querySelector(".popup__input_type_name");
let inputDescription = document.querySelector(".popup__input_type_description");
let inputPlace = document.querySelector(".popup__input_type_place");
let inputLink = document.querySelector(".popup__input_type_link");
let addButton = document.querySelector(".profile__add-button");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
let editForm = document.querySelector(".popup__form");
let addForm = document.querySelector(".popup__form_place")
let elements = document.querySelector(".elements");

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

let card = document.querySelector("#element").content

for (let j = 0; j < initialCards.length; j++) {
    let cardCopy = card.querySelector(".element").cloneNode(true)
    cardCopy.querySelector(".element__name").textContent = initialCards[j].name
    cardCopy.querySelector(".element__image").src = initialCards[j].link
    elements.prepend(cardCopy)
}


editBtn.addEventListener("click", function () {
    popup.classList.add("popup_opened");
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
})

for (let i = 0; i < closeBtn.length; i++) {
    closeBtn[i].addEventListener("click", function () {
        popup.classList.remove("popup_opened");
        popupPlace.classList.remove("popup_opened");
    })
}


editForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    popup.classList.remove("popup_opened");
})

addButton.addEventListener("click", function () {
    popupPlace.classList.add("popup_opened");
})

addForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    popupPlace.classList.remove("popup_opened");
    cardCopy = card.querySelector(".element").cloneNode(true)
    cardCopy.querySelector(".element__name").textContent = inputPlace.value
    cardCopy.querySelector(".element__image").src = inputLink.value
    elements.prepend(cardCopy)
})