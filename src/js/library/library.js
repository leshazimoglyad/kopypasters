import { createMovieCard } from "../movies/movieCard";
import { attachOnloadToCards } from "../movies/moviesList";
import { loadFromStorage } from "../services/storage";

export function initLibrary() {
        // eventListeners
        refs.addToWatchedBtn.addEventListener("click", handleAddToWatchedBtn);
        refs.addToQueueBtn.addEventListener("click", handleAddToQueueBtn);
}

const refs = {
        addToWatchedBtn: document.querySelector('[data-action="watched"]'),
        addToQueueBtn: document.querySelector('[data-action="queue"]'),
        gallery: document.querySelector(".movies-section__grid"),
};

const genreList = loadFromStorage("genres");

// TEMPORARY LOCAL STORAGE
const watchedFilms = [
        {
                adult: false,
                backdrop_path: "/3r3tZgKTw1554hcFoUfydLHE38w.jpg",
                id: 338947,
                title: "Hellraiser",
                original_language: "en",
                original_title: "Hellraiser",
                overview: "A young woman struggling with addiction comes into possession of an ancient puzzle box, unaware that its purpose is to summon the Cenobites, a group of sadistic supernatural beings from another dimension.",
                poster_path: "/f9ZAIUxTTk23vo1BC9Ur1Rx5c2E.jpg",
                media_type: "movie",
                genre_ids: [27, 9648],
                popularity: 174.881,
                release_date: "2022-09-28",
                video: false,
                vote_average: 6.631,
                vote_count: 107,
        },
        {
                adult: false,
                backdrop_path: "/pfAZP7JvTTxqgq7n6A1OYgkAdEW.jpg",
                id: 894205,
                title: "Werewolf by Night",
                original_language: "en",
                original_title: "Werewolf by Night",
                overview: "On a dark and somber night, a secret cabal of monster hunters emerge from the shadows and gather at the foreboding Bloodstone Temple following the death of their leader. In a strange and macabre memorial to the leader’s life, the attendees are thrust into a mysterious and deadly competition for a powerful relic—a hunt that will ultimately bring them face to face with a dangerous monster.",
                poster_path: "/mvIvNKRIJPPS7WSFarFhOAGIVnU.jpg",
                media_type: "movie",
                genre_ids: [28, 14, 27, 9648],
                popularity: 186.12,
                release_date: "2022-09-25",
                video: false,
                vote_average: 7.52,
                vote_count: 230,
        },
        {
                adult: false,
                backdrop_path: "/pfAZP7JvTTxqgq7n6A1OYgkAdEW.jpg",
                id: 894205,
                title: "Werewolf by Night",
                original_language: "en",
                original_title: "Werewolf by Night",
                overview: "On a dark and somber night, a secret cabal of monster hunters emerge from the shadows and gather at the foreboding Bloodstone Temple following the death of their leader. In a strange and macabre memorial to the leader’s life, the attendees are thrust into a mysterious and deadly competition for a powerful relic—a hunt that will ultimately bring them face to face with a dangerous monster.",
                poster_path: "/mvIvNKRIJPPS7WSFarFhOAGIVnU.jpg",
                media_type: "movie",
                genre_ids: [28, 14, 27, 9648],
                popularity: 186.12,
                release_date: "2022-09-25",
                video: false,
                vote_average: 7.52,
                vote_count: 230,
        },
        {
                adult: false,
                backdrop_path: "/pfAZP7JvTTxqgq7n6A1OYgkAdEW.jpg",
                id: 894205,
                title: "Werewolf by Night",
                original_language: "en",
                original_title: "Werewolf by Night",
                overview: "On a dark and somber night, a secret cabal of monster hunters emerge from the shadows and gather at the foreboding Bloodstone Temple following the death of their leader. In a strange and macabre memorial to the leader’s life, the attendees are thrust into a mysterious and deadly competition for a powerful relic—a hunt that will ultimately bring them face to face with a dangerous monster.",
                poster_path: "/mvIvNKRIJPPS7WSFarFhOAGIVnU.jpg",
                media_type: "movie",
                genre_ids: [28, 14, 27, 9648],
                popularity: 186.12,
                release_date: "2022-09-25",
                video: false,
                vote_average: 7.52,
                vote_count: 230,
        },
        {
                adult: false,
                backdrop_path: "/pfAZP7JvTTxqgq7n6A1OYgkAdEW.jpg",
                id: 894205,
                title: "Werewolf by Night",
                original_language: "en",
                original_title: "Werewolf by Night",
                overview: "On a dark and somber night, a secret cabal of monster hunters emerge from the shadows and gather at the foreboding Bloodstone Temple following the death of their leader. In a strange and macabre memorial to the leader’s life, the attendees are thrust into a mysterious and deadly competition for a powerful relic—a hunt that will ultimately bring them face to face with a dangerous monster.",
                poster_path: "/mvIvNKRIJPPS7WSFarFhOAGIVnU.jpg",
                media_type: "movie",
                genre_ids: [28, 14, 27, 9648],
                popularity: 186.12,
                release_date: "2022-09-25",
                video: false,
                vote_average: 7.52,
                vote_count: 230,
        },
        {
                adult: false,
                backdrop_path: "/pfAZP7JvTTxqgq7n6A1OYgkAdEW.jpg",
                id: 894205,
                title: "Werewolf by Night",
                original_language: "en",
                original_title: "Werewolf by Night",
                overview: "On a dark and somber night, a secret cabal of monster hunters emerge from the shadows and gather at the foreboding Bloodstone Temple following the death of their leader. In a strange and macabre memorial to the leader’s life, the attendees are thrust into a mysterious and deadly competition for a powerful relic—a hunt that will ultimately bring them face to face with a dangerous monster.",
                poster_path: "/mvIvNKRIJPPS7WSFarFhOAGIVnU.jpg",
                media_type: "movie",
                genre_ids: [28, 14, 27, 9648],
                popularity: 186.12,
                release_date: "2022-09-25",
                video: false,
                vote_average: 7.52,
                vote_count: 230,
        },
        {
                adult: false,
                backdrop_path: "/pfAZP7JvTTxqgq7n6A1OYgkAdEW.jpg",
                id: 894205,
                title: "Werewolf by Night",
                original_language: "en",
                original_title: "Werewolf by Night",
                overview: "On a dark and somber night, a secret cabal of monster hunters emerge from the shadows and gather at the foreboding Bloodstone Temple following the death of their leader. In a strange and macabre memorial to the leader’s life, the attendees are thrust into a mysterious and deadly competition for a powerful relic—a hunt that will ultimately bring them face to face with a dangerous monster.",
                poster_path: "/mvIvNKRIJPPS7WSFarFhOAGIVnU.jpg",
                media_type: "movie",
                genre_ids: [28, 14, 27, 9648],
                popularity: 186.12,
                release_date: "2022-09-25",
                video: false,
                vote_average: 7.52,
                vote_count: 230,
        },
        {
                adult: false,
                backdrop_path: "/iHc14vucwUMl6WuvQa4iPfoEdy9.jpg",
                id: 799546,
                title: "Luckiest Girl Alive",
                original_language: "en",
                original_title: "Luckiest Girl Alive",
                overview: "A successful woman in New York City finds her life upended when she is forced to confront a dark truth that threatens to unravel her meticulously crafted life.",
                poster_path: "/e0vrbTmTf2ZcW5CIS9qJ8FDbsU9.jpg",
                media_type: "movie",
                genre_ids: [80, 18],
                popularity: 61.317,
                release_date: "2022-09-30",
                video: false,
                vote_average: 6.591,
                vote_count: 82,
        },
        {
                adult: false,
                backdrop_path: "/3r3tZgKTw1554hcFoUfydLHE38w.jpg",
                id: 338947,
                title: "Hellraiser",
                original_language: "en",
                original_title: "Hellraiser",
                overview: "A young woman struggling with addiction comes into possession of an ancient puzzle box, unaware that its purpose is to summon the Cenobites, a group of sadistic supernatural beings from another dimension.",
                poster_path: "/f9ZAIUxTTk23vo1BC9Ur1Rx5c2E.jpg",
                media_type: "movie",
                genre_ids: [27, 9648],
                popularity: 174.881,
                release_date: "2022-09-28",
                video: false,
                vote_average: 6.631,
                vote_count: 107,
        },
];

const queuedFilms = [];

localStorage.setItem("watchedFilms", JSON.stringify(watchedFilms));
localStorage.setItem("queuedFilms", JSON.stringify(queuedFilms));

// WATCHED
function handleAddToWatchedBtn() {
        refs.addToQueueBtn.classList.remove("library-btn--active");
        refs.addToWatchedBtn.classList.add("library-btn--active");
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

function getWatchedFromLocalStorage() {
        try {
                const savedFilms = localStorage.getItem("watchedFilms");
                const parsedFilmsData = JSON.parse(savedFilms);
                console.log(parsedFilmsData);
                return parsedFilmsData;
        } catch (e) {
                console.log(e);
        }
}

function renderWatchedFilms(watchedFilms) {
        return watchedFilms
                .map((film) => {
                        return createMovieCard(film, genreList);
                })
                .join("");
}

// QUEUED
function handleAddToQueueBtn() {
        refs.addToQueueBtn.classList.add("library-btn--active");
        refs.addToWatchedBtn.classList.remove("library-btn--active");
        clearGallery();
        const queuedFilms = getQueuedFromLocalStorage();
        if (queuedFilms.length === 0) {
                displayMessage();
                return;
        }
        const markup = renderQueuedFilms(queuedFilms);
        refs.gallery.insertAdjacentHTML("beforeend", markup);
}

function getQueuedFromLocalStorage() {
        try {
                const savedFilms = localStorage.getItem("queuedFilms");
                const parsedFilmsData = JSON.parse(savedFilms);
                console.log(parsedFilmsData);
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

export { handleAddToQueueBtn, handleAddToWatchedBtn };
