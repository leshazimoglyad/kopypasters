const btn = document.querySelector(".upButton");

// Enable hover only on PC
// if ("ontouchstart" in window) {
//         btn.style.setProperty("--hoverBgColor", "#ff9800");
// }

window.addEventListener("scroll", () => {
        if (document.documentElement.scrollTop > 300) {
                btn.classList.add("is-shown");
        } else {
                btn.classList.remove("is-shown");
        }
});

btn.addEventListener("click", (e) => {
        e.preventDefault();

        scrollToTop();
});

export function scrollToTop() {
        window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
        });
}
