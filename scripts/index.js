// Находим форму в DOM
let formElement = document.querySelector('.profile-popup__form');
let profileOverlay = document.querySelector('.profile-overlay');
let popupCloseButton = document.querySelector('.profile-popup__close-button');
let popupEditButton = document.querySelector('.profile-info__edit-button');

// profileOverlay.classList.toggle('profile-overlay_closed');

function popupToggle() {
  profileOverlay.classList.toggle('profile-overlay_closed');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = formElement.querySelector('.profile-popup__item_el_heading');
    let jobInput = formElement.querySelector('.profile-popup__item_el_subheading');

    // Получите значение полей из свойства value
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let nameInputText = document.querySelector('.profile-info__user-name');
    let jobInputText = document.querySelector('.profile-info__user-status');
    // Вставьте новые значения с помощью textContent
    jobInputText.textContent = jobInputValue;
    nameInputText.textContent = nameInputValue;
    jobInput.placeholder = jobInputValue;
    nameInput.placeholder = nameInputValue;
    popupToggle();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
popupEditButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
