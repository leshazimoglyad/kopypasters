import { getRndInteger } from "../helpers/index.js";
import { loadFromStorage } from "../services/storage.js";
import { createMovieCard } from "./movieCard";
import { nextPage } from "../pagination/util";
import { nextCard } from "./nextCard";

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

        //Add next card
        initNextCard(gallery);

        // Get all cards
        const cards = gallery.querySelectorAll(".movies-section__card");

        // Add events to cards
        attachOnloadToCards(cards);
}

// Next card
function initNextCard(gallery) {
        // Insert markup of card to gallery
        gallery.insertAdjacentHTML("beforeend", nextCard);
        
        // Looking for element
        const nextBtn = document.querySelector(".next-card__container");

        // Attach listener
        nextBtn.addEventListener("click", nextPage);
}

// Add events on pictures and checking downloading complete
export function attachOnloadToCards(cards) {
        cards.forEach((card) => {
                // Get link and img refs
                const img = card.firstElementChild;

                // Faid in effect
                img.onload = () => {
                        // Added random showing delay
                        setTimeout(() => {
                                img.classList.add("loaded");
                        }, getRndInteger(200, 500));
                };
        });
}

// Initialization render gallery
export function initRender(dataJSON) {
        // Clear all gallery
        clearGallery();

        // Rendering part of gallery
        renderMoviesList(dataJSON);
}
