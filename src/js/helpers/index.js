// Random nums
export function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
}

// Show/hide scroll on the body
export function scrollableBody(bool) {
        bool ? (document.body.style.overflow = "auto") : (document.body.style.overflow = "hidden");
}
