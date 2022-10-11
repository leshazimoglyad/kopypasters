import { getMovieByName_deb } from "../movies/movies";

// Refs to DOM elements
const searchElem = document.querySelector(".search__input");
const searchBtnElem = document.querySelector(".search__icon");

export default function initHeaderSearchForm() {
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
}
