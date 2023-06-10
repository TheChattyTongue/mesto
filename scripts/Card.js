import openPopup from "./index.js";
export default class Card {
    constructor(name, link, templateSelector) {
      this.name = name;
      this.link = link;
      this.templateSelector = templateSelector;
    }
  
    _getTemplate() {
      const template = document.querySelector(this.templateSelector).content;
      return template;
    }
  
    _setEventListeners(cardElement) {
      const likeButton = cardElement.querySelector(".element__like");
      likeButton.addEventListener("click", this._handleLike);
  
      const deleteButton = cardElement.querySelector(".element__trash");
      deleteButton.addEventListener("click", this._handleDelete);
  
      const image = cardElement.querySelector(".element__image");
      image.addEventListener("click", this._handleImageClick);
    }
  
    _handleLike(evt) {
      evt.target.classList.toggle("element__like_active");
    }
  
    _handleDelete(evt) {
      evt.target.closest(".element").remove();
    }
  
    _handleImageClick(evt) {
      const popupImageCrop = document.querySelector(".popup_crop");
      const image = popupImageCrop.querySelector(".popup__image");
      const description = popupImageCrop.querySelector(".popup__des");
  
      image.src = evt.target.src;
      image.alt = evt.target.alt;
      description.textContent = evt.target.alt;
  
      openPopup(popupImageCrop);
    }
  
    _createCardElement() {
      const template = this._getTemplate();
      const cardElement = template.querySelector(".element").cloneNode(true);
      const imageElement = cardElement.querySelector(".element__image");
      const nameElement = cardElement.querySelector(".element__name");
  
      imageElement.src = this.link;
      imageElement.alt = this.name;
      nameElement.textContent = this.name;
  
      return cardElement;
    }
  
    createCard() {
      const cardElement = this._createCardElement();
      this._setEventListeners(cardElement);
      return cardElement;
    }
  }
  