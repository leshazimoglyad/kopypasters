(() => {
    const refs = {
      openModalBtn: document.querySelector('[data-footer-modal-open]'),
      closeModalBtn: document.querySelector('[data-footer-modal-close]'),
      modal: document.querySelector('[data-modal]'),
    };
  
    refs.openModalBtn.addEventListener('click', toggleModal);
    refs.closeModalBtn.addEventListener('click', toggleModal);
  
    function toggleModal() {
      document.body.classList.toggle('modal-open');
      refs.modal.classList.toggle('is-hidden');
    }

  })();