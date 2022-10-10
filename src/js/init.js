import { getMovieByName_deb, getGenres } from "./movies";
import initModalFilmDetails from "./modal/modal-film";
import initHeaderSearchForm from "./header/header";
import { handleAddToQueueBtn, handleAddToWatchedBtn } from "./library/library";
export let isHome;

// Wait the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
        isHome = document.title === "Kinoteka" ? true : false;

        // Init modal window for film details
        initModalFilmDetails();

        // Init for Home page
        if (isHome) {
                // Init search
                initHeaderSearchForm();

                getGenres();
                getMovieByName_deb({ pagination: true });
        } else {
                const refs = {
                        addToWatchedBtn: document.querySelector('[data-action="watched"]'),
                        addToQueueBtn: document.querySelector('[data-action="queue"]'),
                        gallery: document.querySelector(".movies-section__grid"),
                };
                refs.addToWatchedBtn.addEventListener("click", handleAddToWatchedBtn);
                refs.addToQueueBtn.addEventListener("click", handleAddToQueueBtn);
        }
});
