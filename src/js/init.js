import { getMovieByName_deb, getGenres } from "./movies";
import initModalFilmDetails from "./modal/modal-film";

export let isHome;

// Wait the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
        //If page is library.html we need add to movieCard vote_average
        isHome = document.title === "Kinoteka" ? true : false;

        // Init for Home page
        if (isHome) {
                console.log('1')
                initHomePage();
        }
});

function initHomePage() {
        // Refs to DOM elements
        const searchElem = document.querySelector(".search__input");
        const searchBtnElem = document.querySelector(".search__icon");

        // Init modal window for film details
        initModalFilmDetails();

        // On Enter click
        searchElem.addEventListener("keydown", (e) => {
                if (e.keyCode === 13) {
                        e.preventDefault();
                        getMovieByName_deb({
                                keyword: searchElem.value,
                                pagination: true,
                        });
                }
        });

        // On button click
        searchBtnElem.addEventListener("click", () => {
                getMovieByName_deb({
                        keyword: searchElem.value,
                        pagination: true,
                });
        });

        getGenres();
        getMovieByName_deb({ pagination: true });
}
