// Находим Overlay в DOM
const popupProfile = document.querySelector('.popup-profile');
const popupCard = document.querySelector('.popup-card');
const popupPhoto = document.querySelector('.popup-photo');
// Находим открытую карточку в DOM
const popupPhotoCard = popupPhoto.querySelector('.popup__photo-card');
const popupPhotoCaption = popupPhoto.querySelector('.popup__photo-caption');
// Находим формы в DOM
const profileForm = popupProfile.querySelector('#profileForm');
const сardsForm = popupCard.querySelector('#cardsForm');
// Находим кнопки в DOM
const profileCloseButton = popupProfile.querySelector('.popup__close-button');
const cardCloseButton = popupCard.querySelector('.popup__close-button');
const photoCloseButton = popupPhoto.querySelector('.popup__close-button');

const popupEditButton = document.querySelector('.profile-info__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');
const popupSaveButton = сardsForm.querySelector('.popup__save-button');
// Находим заголовок формы в DOM
const popupHeading = document.querySelector('.popup__heading');
 // Находим поля формы в DOM
const nameInput = profileForm.querySelector('.popup__item_el_heading');
const jobInput = profileForm.querySelector('.popup__item_el_subheading');
const newCardName = сardsForm.querySelector('.popup__item_el_name');
const newCardLink = сardsForm.querySelector('.popup__item_el_link');
// Выберите элементы, куда должны быть вставлены значения полей
const nameText = document.querySelector('.profile-info__user-name');
const jobText = document.querySelector('.profile-info__user-status');
// Находим html - шаблон для фото карточек
const cardTemplate = document.querySelector('#card-template').content;
//находим область контейнер для фотокарточек
const cardsContainer = document.querySelector('.photo-cards');

//массив с данными по фото карточкам
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

//вспомогательные функции

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

const closePopupButton = (close) => {
  closePopup(close.target.parentElement.parentElement);
  removeKeyListners();
}

const closePopupOverlay = (evt) => {
  closePopup(evt.target);
  removeKeyListners();
}

function closePopupEcape(evt) {
  // alert(evt.key);
  if (evt.key==='Escape') {
    closePopup(document.querySelector('.popup_opened'));
    removeKeyListners();
  };
}

const toggleCardsLike = (evt) => {
  evt.target.classList.toggle('photo-card__like_active');
}

const removePhotoCards = (evt) => {
  evt.target.parentElement.remove();
}

// удалить слушатель по кнопке
function removeKeyListners() {
  document.removeEventListener('keydown',closePopupEcape);
}
// добавить слушатель по кнопке
function addKeyListners() {
  document.addEventListener('keydown',closePopupEcape);
}

// клонирование фотокарточки
const createCardElement = () => cardTemplate.querySelector('.photo-card').cloneNode(true);

// Добавление слушателей на фотокарточки
const addCardsListeners = (cardElement) => {
  cardElement.querySelector('.photo-card__like').addEventListener('click', toggleCardsLike);
  cardElement.querySelector('.photo-card__trash').addEventListener('click', removePhotoCards);
  cardElement.querySelector('.photo-card__image').addEventListener('click', openPhotoPopup);
}

// открытие фотокарточки
const openPhotoPopup = (evt) => {
  popupPhotoCard.src = evt.target.src;
  popupPhotoCaption.textContent = evt.target.alt;
  openPopup(popupPhoto);
  addKeyListners();
}

//открытие форм
const openProfilePopup = () => {
  openPopup(popupProfile);
  addKeyListners();
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
}

const openCardsFormPopup = () => {
  openPopup(popupCard);
  addKeyListners();
  newCardName.value = '';
  newCardLink.value = '';
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                      // Так мы можем определить свою логику отправки.
                      // О том, как это делать, расскажем позже.
      // Получите значение полей из свойства value
  let nameInputValue = nameInput.value;
  let jobInputValue = jobInput.value;
  // Вставьте новые значения с помощью textContent
  jobText.textContent = jobInputValue;
  nameText.textContent = nameInputValue;
  closePopup(popupProfile);
  removeKeyListners();
}

// создание карточки
const createCard = (src, alt, text) => {
  const cardElement = createCardElement();
  cardElement.querySelector('.photo-card__image').src = src;
  cardElement.querySelector('.photo-card__image').alt = alt;
  cardElement.querySelector('.photo-card__title').textContent = text;
  addCardsListeners(cardElement);
  return cardElement;
}

const handleCardsFormSubmit = (evt) => {
  evt.preventDefault();
  cardsContainer.prepend(createCard(newCardLink.value, newCardName.value, newCardName.value));
  closePopup(popupCard);
  removeKeyListners();
  popupSaveButton.classList.add('popup__button_disabled');
  popupSaveButton.setAttribute('disabled', true);
}

//подгрузка 6 карточек при запуске
initialCards.forEach((item) => {
  cardsContainer.append(createCard(item.link, item.name, item.name));
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupEditButton.addEventListener('click', openProfilePopup);
popupAddButton.addEventListener('click', openCardsFormPopup);
profileCloseButton.addEventListener('click', closePopupButton);
cardCloseButton.addEventListener('click', closePopupButton);
photoCloseButton.addEventListener('click', closePopupButton);
profileForm.addEventListener('submit', handleProfileFormSubmit);
сardsForm.addEventListener('submit', handleCardsFormSubmit);
popupProfile.addEventListener('click',closePopupOverlay);
popupCard.addEventListener('click',closePopupOverlay);
popupPhoto.addEventListener('click',closePopupOverlay);

// popupProfile.addEventListener('click', item => {item.target.classList.toggle('popup_opened')});
