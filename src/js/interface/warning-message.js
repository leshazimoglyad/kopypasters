// Show/hide warning message
export function warningMessage(bool) {
    const warnMessageElem = document.querySelector(".search__warning-message");
    bool
            ? warnMessageElem.classList.remove("is-hidden")
            : warnMessageElem.classList.add("is-hidden");
}