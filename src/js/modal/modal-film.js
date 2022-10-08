const refs = {
        modalWindow: document.querySelector(".backdrop"),
        closeBtn: document.querySelector(".close_btn"),
        openBtn: document.querySelector(".movies-section__grid"),
};
refs.openBtn.addEventListener("click", openModalWindow);
refs.closeBtn.addEventListener("click", closeModal);

function openModalWindow(e) {
        const filmCard = e.target.nodeName;
        if (filmCard !== "IMG") return;
        refs.modalWindow.classList.toggle("is-hidden");
}

function closeModal() {
        refs.modalWindow.classList.toggle("is-hidden");
}
