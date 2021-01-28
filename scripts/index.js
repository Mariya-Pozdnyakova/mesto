// Находим форму в DOM
let formElement = document.querySelector('.overlay__form');
let profileOverlay = document.querySelector('.overlay');
let popupCloseButton = document.querySelector('.overlay__close-button');
let popupEditButton = document.querySelector('.profile-info__edit-button');
 // Находим поля формы в DOM
let nameInput = formElement.querySelector('.overlay__item_el_heading');
let jobInput = formElement.querySelector('.overlay__item_el_subheading');
// Выберите элементы, куда должны быть вставлены значения полей
let nameText = document.querySelector('.profile-info__user-name');
let jobText = document.querySelector('.profile-info__user-status');
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

// подгрузка 6 карточек при запуске
initialCards.forEach((item) => {
  const cardElement = cardTemplate.querySelector('.photo-card').cloneNode(true);
  cardElement.querySelector('.photo-card__image').src = item.link;
  cardElement.querySelector('.photo-card__image').alt = item.name;
  cardElement.querySelector('.photo-card__title').textContent = item.name;
  cardsContainer.append(cardElement);
});

function popupToggle() {
  profileOverlay.classList.toggle('overlay_opened');
}

function popupOpen() {
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
  popupToggle();
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.
       // Получите значение полей из свойства value
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    // Вставьте новые значения с помощью textContent
    jobText.textContent = jobInputValue;
    nameText.textContent = nameInputValue;
    popupToggle();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
popupEditButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupToggle);

