//append
const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
    alt: "window view of snowy resort",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
    alt: "restaurant terrace streetside",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
    alt: "an outdoor cafe",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
    alt: "a very long bridge, over the forest and through the trees",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
    alt: "tunnel with morning light",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
    alt: "mountain house",
  },
  {
    name: "Red Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
    alt: "red bridge",
  },
];
console.log(initialCards);
// Profile elements
const profileModalEditButton = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const addCardModalBtn = document.querySelector(".profile__add-btn");
//Form elements
const editModal = document.querySelector("#edit-modal");
const editFormElement = document.forms["edit-profile-form"];
// const editFormElement = editModal.querySelector(".modal__form");
const editModalCloseBtn = editModal.querySelector(".modal__close-button");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.forms["add-card-form"];
// const addCardForm = addCardModal.querySelector(".modal__form");
const addCardModalCloseBtn = addCardModal.querySelector(".modal__close-button");
const addCardSubmitBtn = addCardModal.querySelector(".modal__submit-button");
const addCardLinkInput = addCardModal.querySelector("#add-card-link-input");
const addCardCaptionInput = addCardModal.querySelector(
  "#add-card-caption-input"
);
//Preview modal
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(
  ".modal__close-button_type_preview"
);
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalImageCaption = previewModal.querySelector(
  ".modal__caption-title"
);
// Card elements
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  console.log(data);
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.alt;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_liked");
  });
  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageElement.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImage.src = data.link;
    previewModalImageCaption.textContent = data.name;
    previewModalImage.alt = data.alt || data.name;
  });
  return cardElement;
}
function openModal(modal) {
  modal.classList.add("modal_opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal);
}
function cardSubmitHandler(evt) {
  evt.preventDefault();
  console.log(addCardLinkInput.value);
  console.log(addCardCaptionInput.value);
  const inputValues = {
    name: addCardCaptionInput.value,
    link: addCardLinkInput.value,
    alt: addCardCaptionInput.value,
  };
  const cardEl = getCardElement(inputValues);
  cardsList.prepend(cardEl);
  closeModal(addCardModal);
  // addCardForm.reset();
  evt.target.reset();
}
profileModalEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  openModal(editModal);
});

addCardModalBtn.addEventListener("click", () => {
  openModal(addCardModal);
});

editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});

addCardModalCloseBtn.addEventListener("click", () => {
  closeModal(addCardModal);
});

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
addCardForm.addEventListener("submit", cardSubmitHandler);

initialCards.forEach((item) => {
  const cardEl = getCardElement(item);
  cardsList.append(cardEl);
});
