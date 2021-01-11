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

function popupToggle() {
  profileOverlay.classList.toggle('overlay_opened');
}

function popupOpen() {
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
  popupToggle()
}

function popupClose() {
  popupToggle()
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
    popupClose();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
popupEditButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
