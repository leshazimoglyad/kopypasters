// Toggle spinner
export function loadingSpinnerToggle() {
    const spinnerElem = document.querySelector(".movies-section__loading-spinner");
    spinnerElem.classList.toggle("visually-hidden");
}