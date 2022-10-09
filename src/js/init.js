import { getMovieByName_deb, getGenres } from "./movies";

// Globar var for pagination instance
export let myPager;

// Wait the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
        // Refs to DOM elements
        const searchElem = document.querySelector(".search__input");
        const searchBtnElem = document.querySelector(".search__icon");

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
});