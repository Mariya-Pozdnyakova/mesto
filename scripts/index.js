// Находим Overlay в DOM
const profileOverlay = document.querySelector('.overlay');
const formArea = document.querySelector('.overlay__popup-area');
// Находим формы в DOM
const profileForm = formArea.querySelector('#profileForm');
const сardsForm = formArea.querySelector('#cardsForm');
const popupForms = Array.from(formArea.querySelectorAll('.overlay__form'));
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

//подгрузка 6 карточек при запуске
initialCards.forEach((item) => {
  const cardElement = cardTemplate.querySelector('.photo-card').cloneNode(true);
  cardElement.querySelector('.photo-card__image').src = item.link;
  cardElement.querySelector('.photo-card__image').alt = item.name;
  cardElement.querySelector('.photo-card__title').textContent = item.name;
  cardsContainer.append(cardElement);
});

//вспомогательные функции
const popupToggle = () => {
  profileOverlay.classList.toggle('overlay_opened');
}

const formToggle = (form) => {
  form.classList.toggle('overlay__form_active');
}
//открытие форм
const profileOpen = () => {
  popupToggle();
  formToggle(profileForm);
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
}

const newCardOpen = () => {
  popupToggle();
  formToggle(сardsForm);
  newCardName.value = '';
  newCardLink.value = '';

}
//Закрытие popup
const popupClose = () => {
  popupToggle();
  popupForms.forEach((item) => {
    if (item.classList.contains('overlay__form_active')) {
      formToggle(item);
    }
  });
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
const handleFormSubmit = (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                      // Так мы можем определить свою логику отправки.
                      // О том, как это делать, расскажем позже.
      // Получите значение полей из свойства value
  if (profileForm.classList.contains('overlay__form_active')) {
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
    // Вставьте новые значения с помощью textContent
    jobText.textContent = jobInputValue;
    nameText.textContent = nameInputValue;
    formToggle(profileForm);
  }
  if (cardsForm.classList.contains('overlay__form_active')) {
    const cardElement = cardTemplate.querySelector('.photo-card').cloneNode(true);
    cardElement.querySelector('.photo-card__image').src = newCardLink.value;
    cardElement.querySelector('.photo-card__image').alt = newCardName.value;
    cardElement.querySelector('.photo-card__title').textContent = newCardName.value;
    cardsContainer.prepend(cardElement);
    formToggle(cardsForm);
  }
  popupToggle();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
  popupEditButton.addEventListener('click', profileOpen);
  popupAddButton.addEventListener('click', newCardOpen);
  popupCloseButton.addEventListener('click', popupClose);
  popupForms.forEach((item) => {item.addEventListener('submit', handleFormSubmit)});
