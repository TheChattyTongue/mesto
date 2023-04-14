let editBtn = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closeBtn = document.querySelector(".popup__close-btn");
let inputName = document.querySelector(".popup__input_type_name");
let inputDescription = document.querySelector(".popup__input_type_description");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
let editForm = document.querySelector(".popup__form");

editBtn.addEventListener("click", function () {
    popup.classList.add("popup_opened");
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
})

closeBtn.addEventListener("click", function () {
    popup.classList.remove("popup_opened");
})

editForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    popup.classList.remove("popup_opened");
})
