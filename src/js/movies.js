import { loadFromStorage } from "./services/storage.js";
import { createMovieCard } from "./style/movieCard";

// Clear gallery
function clearGallery() {
        const gallery = document.querySelector(".movies-section__grid");
        gallery.innerHTML = "";
}

// Rendering founded pictures to grid
function renderMoviesList(dataJSON) {
        // Element to render cards
        const gallery = document.querySelector(".movies-section__grid");

        // All data from server
        const { results: moviesList } = dataJSON;

        const genreList = loadFromStorage("genres");

        // Remap json to HTML elements
        const moviesCards = moviesList
                .map((movie) => {
                        // Return html
                        return createMovieCard(movie, genreList);
                })
                .join("");

        // Append new photos to DOM
        gallery.insertAdjacentHTML("beforeend", moviesCards);

        // ЩЕ ЗГОДИТЬСЯ
        // Get all new cards
        // const newCards = gallery.querySelectorAll(".movies-section__grid__card.new");

        // Add events to cards
        // attachEventsToCards(newCards);

        // return newCards;
}

// ЩЕ ЗГОДИТЬСЯ
// Events on click buttons in cards
// Add events on pictures and checking downloading complete
function attachEventsToCards(newCards) {
        newCards.forEach((card) => {
                // Get icons refs
                const icons = card.querySelector(".movies-section__grid__icon-wrapper");

                // Get link and img refs
                const link = card.firstElementChild;
                const img = link.firstElementChild;

                // If pic is loaded - remove skelet effect and add loaded mark on img
                img.onload = () => {
                        // Added random showing delay
                        setTimeout(() => {
                                card.classList.remove("new");
                                img.classList.add("loaded");
                        }, getRndInteger(400, 1000));
                };
        });
}

// Random nums
function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
}

// Initialization render gallery
export function initRender(dataJSON) {

        // Remove blank pic
        // const gallery = document.querySelector(".intro");
        // gallery.style.setProperty("display", "none");
        // gallery.classList.remove("gallery--empty-page");

        // Clear all gallery
        clearGallery();

        // Rendering part of gallery
        renderMoviesList(dataJSON);
}
