// Находим Overlay в DOM
const popupOverlay = document.querySelector('.overlay');
const popupElementArea = document.querySelector('.overlay__popup-area');
// Находим открытую карточку в DOM
const popupPhoto = popupElementArea.querySelector('.overlay__photo-card');
const popupPhotoCaption = popupElementArea.querySelector('.overlay__photo-caption');
// Находим формы в DOM
const profileForm = popupElementArea.querySelector('#profileForm');
const сardsForm = popupElementArea.querySelector('#cardsForm');
const popupForms = Array.from(popupElementArea.querySelectorAll('.overlay__form'));
// Находим кнопки в DOM
const popupCloseButton = document.querySelector('.overlay__close-button');
const popupEditButton = document.querySelector('.profile-info__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');
const popupSaveButton = document.querySelector('.overlay__save-button');
// Находим заголовок формы в DOM
const popupHeading = document.querySelector('.overlay__heading');
 // Находим поля формы в DOM
const nameInput = profileForm.querySelector('.overlay__item_el_heading');
const jobInput = profileForm.querySelector('.overlay__item_el_subheading');
const newCardName = сardsForm.querySelector('.overlay__item_el_name');
const newCardLink = сardsForm.querySelector('.overlay__item_el_link');
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

const toggleVisibility =(element) => {
  setTimeout(() => {
    element.classList.toggle('visible');
    element.classList.toggle('hidden');
  }, 0);
}

//вспомогательные функции
const togglePopupActivity = () => {
  toggleVisibility(popupOverlay);
  if (popupOverlay.classList.contains('overlay_opened')) {
    setTimeout(() => {
    popupOverlay.classList.toggle('overlay_opened');
    }, 150);
  }
  else popupOverlay.classList.toggle('overlay_opened');
}

const toggleFormActivity = (form) => {
  if (popupOverlay.classList.contains('overlay_opened')) {
    setTimeout(() => {
    form.classList.toggle('overlay__form_active');
    },150);
  }
  else form.classList.toggle('overlay__form_active');
}

const toggleCardsLike = (evt) => {
  evt.target.classList.toggle('photo-card__like_active');
}

const removePhotoCards = (evt) => {
  evt.target.parentElement.remove();
}

const togglePhotoActivity = () => {
  popupPhoto.classList.toggle('overlay__photo-card_active');
  popupElementArea.classList.toggle('overlay__popup-area_photo');
  popupPhotoCaption.classList.toggle('overlay__photo-caption_active');
}

// клонирование фотокарточки
const createCardElement = () => cardTemplate.querySelector('.photo-card').cloneNode(true);


// Добавление слушателей на фотокарточки
const addCardsListeners = () => {
  cardElement.querySelector('.photo-card__like').addEventListener('click', toggleCardsLike);
  cardElement.querySelector('.photo-card__trash').addEventListener('click', removePhotoCards);
  cardElement.querySelector('.photo-card__image').addEventListener('click', openPhotoPopup);
}

// открытие фотокарточки
const openPhotoPopup = (evt) => {
  popupPhoto.src = evt.target.src;
  popupPhotoCaption.textContent = evt.target.alt;
  togglePopupActivity();
  togglePhotoActivity();
}

//открытие форм
const openProfilePopup = () => {
  togglePopupActivity();
  toggleFormActivity(profileForm);
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
}

const openCardsFormPopup = () => {
  togglePopupActivity();
  toggleFormActivity(сardsForm);
  newCardName.value = '';
  newCardLink.value = '';
}

//Закрытие popup
const closePopup = () => {
  togglePopupActivity();
  popupForms.forEach((item) => {
    if (item.classList.contains('overlay__form_active')) {
      toggleFormActivity(item);
    }
  });
  if (popupPhoto.classList.contains('overlay__photo-card_active')) {
    togglePhotoActivity();
  }
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
  toggleFormActivity(profileForm);
  togglePopupActivity();
}

const handleCardsFormSubmit = (evt) => {
  evt.preventDefault();
  cardElement = createCardElement();
  cardElement.querySelector('.photo-card__image').src = newCardLink.value;
  cardElement.querySelector('.photo-card__image').alt = newCardName.value;
  cardElement.querySelector('.photo-card__title').textContent = newCardName.value;
  addCardsListeners();
  cardsContainer.prepend(cardElement);
  toggleFormActivity(cardsForm);
  togglePopupActivity();
}

//подгрузка 6 карточек при запуске
initialCards.forEach((item) => {
  cardElement = createCardElement();
  cardElement.querySelector('.photo-card__image').src = item.link;
  cardElement.querySelector('.photo-card__image').alt = item.name;
  cardElement.querySelector('.photo-card__title').textContent = item.name;
  addCardsListeners();
  cardsContainer.append(cardElement);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupEditButton.addEventListener('click', openProfilePopup);
popupAddButton.addEventListener('click', openCardsFormPopup);
popupCloseButton.addEventListener('click', closePopup);
profileForm.addEventListener('submit', handleProfileFormSubmit);
сardsForm.addEventListener('submit', handleCardsFormSubmit);
