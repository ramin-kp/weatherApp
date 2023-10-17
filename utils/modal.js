const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modal__msg");

const showModal = (text) => {
  modalText.innerHTML = text;
  modal.style.display = "flex";
};
const closeModal = () => {
  modal.style.display = "none";
};
export { showModal, closeModal };
