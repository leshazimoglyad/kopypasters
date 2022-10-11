import { createMovieCard } from "../movies/movieCard";
import { attachOnloadToCards } from "../movies/moviesList";
import { loadFromStorage } from "../services/storage";

export function initLibrary() {
        showWatchedFilms();
        // eventListeners
        refs.watchedBtn.addEventListener("click", showWatchedFilms);
        refs.queueBtn.addEventListener("click", showQueuedFilms);
}

const refs = {
        watchedBtn: document.querySelector('[data-action="watched"]'),
        queueBtn: document.querySelector('[data-action="queued"]'),
        gallery: document.querySelector(".movies-section__grid"),
};

const genreList = loadFromStorage("genres");

// const queuedFilms = [];

// localStorage.setItem("watchedFilms", JSON.stringify(watchedFilms));
// localStorage.setItem("queuedFilms", JSON.stringify(queuedFilms));

// WATCHED
function showWatchedFilms() {
        refs.queueBtn.classList.remove("library-btn--active");
        refs.watchedBtn.classList.add("library-btn--active");
        clearGallery();
        const watchedFilms = getWatchedFromLocalStorage();
        if (watchedFilms.length === 0) {
                displayMessage();
                return;
        }
        const markup = renderWatchedFilms(watchedFilms);
        refs.gallery.insertAdjacentHTML("beforeend", markup);

        // Get all cards
        const cards = document.querySelectorAll(".movies-section__card");

        // Add events to cards
        attachOnloadToCards(cards);
}

export function getWatchedFromLocalStorage() {
        try {
                const savedFilms = localStorage.getItem("watchedFilms");
                const parsedFilmsData = JSON.parse(savedFilms);
                // console.log(parsedFilmsData);
                return parsedFilmsData;
        } catch (e) {
                console.log(e);
        }
}

function renderWatchedFilms(watchedFilms) {
        let perPage = 0;
        let currentPage = 2;
        if (window.innerWidth > 0 && window.innerWidth < 768) {
                perPage = 4;
                console.log("mobile");
        } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
                perPage = 8;
                console.log("tablet");
        } else if (window.innerWidth >= 1200) {
                perPage = 9;
                console.log("desktop");
                // initPagination();
        }
        const firstIndexOfArray = currentPage > 0 ? (currentPage - 1) * perPage : 0;
        let lastIndexOfArray = 0;
        if (currentPage > 0) {
                if (currentPage * perPage - 1 < watchedFilms.length) {
                        lastIndexOfArray = currentPage * perPage - 1;
                } else {
                        lastIndexOfArray = watchedFilms.length;
                }
        }

        let markup = "";

        for (let i = firstIndexOfArray; i <= lastIndexOfArray; i += 1) {
                markup = markup + createMovieCard(watchedFilms[i], genreList);
                // debugger;
        }

        return markup;
        // // comment

        // return watchedFilms
        //         .map((film) => {
        //                 return createMovieCard(film, genreList);
        //         })
        //         .join("");
}

// QUEUED
function showQueuedFilms() {
        refs.queueBtn.classList.add("library-btn--active");
        refs.watchedBtn.classList.remove("library-btn--active");
        clearGallery();
        const queuedFilms = getQueuedFromLocalStorage();
        if (queuedFilms.length === 0) {
                displayMessage();
                return;
        }
        const markup = renderQueuedFilms(queuedFilms);
        refs.gallery.insertAdjacentHTML("beforeend", markup);
}

export function getQueuedFromLocalStorage() {
        try {
                const savedFilms = localStorage.getItem("queuedFilms");
                const parsedFilmsData = JSON.parse(savedFilms);
                // console.log(parsedFilmsData);
                return parsedFilmsData;
        } catch (e) {
                console.log(e);
        }
}

function renderQueuedFilms(queuedFilms) {
        console.log(queuedFilms);
        return queuedFilms.map((film) => {
                createMovieCard(film);
                console.log(film);
        });
}

//to display message when there are no films in WATCHED/ QUEUE:

function displayMessage() {
        const messageMarkup = `<p class="movies-section__message"> Oops, seems like it's empty. Go to <a href="./index.html" class="movies-section__message--bold">Home</a> to add some films.</p>`;
        refs.gallery.insertAdjacentHTML("beforeend", messageMarkup);
}

function clearGallery() {
        refs.gallery.innerHTML = "";
}

export { showQueuedFilms, showWatchedFilms };
