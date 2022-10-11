import { loadingSpinnerToggle } from "../interface/spinner";
import { fetchMovieDetailsById } from "../services/fetch";
import { scrollableBody } from "../helpers";

const YOUTUBE_URL = "https://www.youtube.com/watch?v=";
const WATCHED_STORE = "watchedFilms";
const QUEUED_STORE = "queuedFilms";

let id;
let filmInfoParsed;

// Blank image
import blankImage from "../../images/no-image.svg";
import {
        appendToStorage,
        loadFromStorage,
        removeKeyFromStorage,
        saveToStorage,
} from "../services/storage";
import { getQueuedFromLocalStorage, getWatchedFromLocalStorage } from "../library/library";

// References to elements
const refs = {
        grid: document.querySelector(".movies-section__grid"),
        modalDetailOverlay: document.querySelector(".backdrop"),
        closeBtn: document.querySelector(".modal-detail__close-button"),
        posterImage: document.querySelector(".modal-detail__image"),
        title: document.querySelector(".modal-detail__title"),
        votesAVG: document.querySelector(".modal-detail__vote-avg"),
        votesCount: document.querySelector(".modal-detail__vote-count"),
        popularity: document.querySelector(".modal-detail__popularity"),
        orgTitle: document.querySelector(".modal-detail__org-title"),
        genres: document.querySelector(".modal-detail__genres"),
        article: document.querySelector(".modal-detail__article"),
        youtubeLink: document.querySelector(".modal-detail__youtube-link"),

        watchBtn: document.getElementById("watch-btn"),
        queueBtn: document.getElementById("queue-btn"),
};

// Init attaching
export default function initModalFilmDetails() {
        refs.grid.addEventListener("click", openMovieDetailModal);
}

// Join genres array to string
export function parseGenres(genres) {
        return genres.map((genre) => genre.name).join(", ");
}

// Get trailer video from videosList
function parseTrailers(trailersList) {
        for (const video of trailersList) {
                if (video.name === "Official Trailer") {
                        return `${YOUTUBE_URL}${video.key}`;
                }
        }
}

async function openMovieDetailModal(e) {
        const filmCard = e.target;

        // Get video ID from data card
        id = filmCard.closest("div").getAttribute("data-id");

        // Return if no id
        if (!id) {
                return;
        }

        // Clear image for first
        refs.posterImage.setAttribute("src", blankImage);

        // Post req by id
        const filmInfo = await getMovieById(id);
        // console.log(filmInfo);
        // Show modal
        refs.modalDetailOverlay.classList.toggle("is-hidden");

        // Attach clicks event on Modal (for close window)
        refs.modalDetailOverlay.addEventListener("click", closeModal);
        document.addEventListener("keydown", closeModal);

        // Hide scroll on body
        scrollableBody(false);

        // Export data
        const {
                title = "NO TITLE",
                original_title = "No original title",
                overview = "No overview...",
                popularity,
                release_date,
                vote_average,
                vote_count,
                poster_path,
                genres,
                videos: { results: trailersList },
        } = filmInfo;

        // Save temp object
        filmInfoParsed = {
                id,
                title,
                original_title,
                overview,
                popularity,
                release_date,
                genres,
                vote_average,
                vote_count,
                poster_path,
                videos: { results: trailersList },
        };

        // Film trailer
        const trailer = parseTrailers(trailersList);
        trailer && refs.youtubeLink.setAttribute("href", trailer);

        // Parse names of genres
        const genresStr = genres.length > 0 ? parseGenres(genres) : "No genres";

        // Title
        refs.title.innerText = title;

        // Poster image
        poster_path
                ? refs.posterImage.setAttribute(
                          "src",
                          `https://image.tmdb.org/t/p/w500${poster_path}`,
                  )
                : refs.posterImage.setAttribute("src", blankImage);

        // Original title
        refs.orgTitle.innerText = original_title || "NO TITLE";

        // Popularity
        refs.popularity.innerText = popularity ? popularity.toFixed(2) : "No info";

        // Genres
        refs.genres.innerText = genresStr || "No info";

        // Overview
        refs.article.innerText = overview || "No info";

        // Votes
        refs.votesCount.innerText = vote_count || "0";

        // Avg votes
        refs.votesAVG.innerText = vote_average ? vote_average.toFixed(1) : "0";

        // Check statuses
        setButtonStatus("all", checkLibrary(id));

        // Attach click events on buttons
        refs.watchBtn.addEventListener("click", handleChangeStatus);
        refs.queueBtn.addEventListener("click", handleChangeStatus);
}

// On click buttons events
const handleChangeStatus = (e) => {
        const { isWatched, isQueued } = checkLibrary(id);

        // Watched button
        if (e.target.id == "watch-btn") {
                if (isWatched !== -1) {
                        removeKeyFromStorage(WATCHED_STORE, isWatched);
                        setButtonStatus("watch-btn", false);
                } else {
                        appendToStorage(WATCHED_STORE, filmInfoParsed);
                        setButtonStatus("watch-btn", true);
                }
        }

        // Queued button
        if (e.target.id == "queue-btn") {
                if (isQueued !== -1) {
                        removeKeyFromStorage(WATCHED_STORE, isQueued);
                        setButtonStatus("queue-btn", true);
                } else {
                        appendToStorage(QUEUED_STORE, filmInfoParsed);
                        setButtonStatus("queue-btn", false);
                }
        }
};

// Change style of buttons
function setButtonStatus(btn, status) {
        console.log(btn);
        switch (btn) {
                case "watch-btn":
                        console.log("WW");
                        refs.watchBtn.innerText = !status ? "Add to Watched" : "Unwatched";
                        break;
                case "queue-btn":
                        console.log("Q");
                        refs.queueBtn.innerText = !status ? "Add to Queue" : "Unqueued";
                        break;
                default:
                        console.log("ALLL");
                        refs.watchBtn.innerText = !status ? "Add to Watched" : "Unwatched";
                        refs.queueBtn.innerText = !status ? "Add to Queue" : "Unqueued";
                        break;
        }
}

// Checking statuses
function checkLibrary(id) {
        let watchedFilms = getWatchedFromLocalStorage(WATCHED_STORE);
        let queuedFilms = getQueuedFromLocalStorage(QUEUED_STORE);

        if (watchedFilms === null || watchedFilms === undefined) {
                saveToStorage(WATCHED_STORE, []);
                watchedFilms = [];
        }

        if (queuedFilms === null || queuedFilms === undefined) {
                saveToStorage(QUEUED_STORE, []);
                queuedFilms = [];
        }

        let isWatched = -1;
        let isQueued = -1;

        if (watchedFilms.length > 0) {
                console.log("1");
                isWatched = watchedFilms.findIndex((film) => film.id == id);
        }

        if (queuedFilms.length > 0) {
                console.log("2");
                isQueued = queuedFilms.findIndex((queued) => queued.id == id);
        }

        return { isWatched, isQueued };
}

// Close modal
function closeModal(e) {
        // Keyboard event
        if (e.type === "keydown") {
                // Not escape
                if (e.keyCode !== 27) {
                        return;
                }
        }

        // Mouse event
        else {
                // Closest parent is "button" and class is "backdrop"
                if (!e.target.closest("button") && !e.target.classList.contains("backdrop")) {
                        return;
                }

                // Not close buttons
                if (e.target.classList.contains("modal-detail__btn")) return;
        }

        // Toggle hidden class
        refs.modalDetailOverlay.classList.toggle("is-hidden");

        // Show scroll on body
        scrollableBody(true);

        // Deattach keyboard and mouse events
        refs.modalDetailOverlay.removeEventListener("click", closeModal);
        document.removeEventListener("keydown", closeModal);

        // Deattach buttons events
        refs.watchBtn.removeEventListener("click", handleChangeStatus);
        refs.queueBtn.removeEventListener("click", handleChangeStatus);
}

// Fetch movie by ID
async function getMovieById(id) {
        try {
                // spinner
                loadingSpinnerToggle();
                await new Promise((resolve) => setTimeout(resolve, 300));

                // Send http req, trying get the pictures
                const response = await fetchMovieDetailsById(id);

                // Check statuses
                if (response.status !== 200) {
                        throw new Error(response.status);
                }

                if (response.data === undefined) {
                        throw new Error("Incorrect data");
                }

                // Get JSON of pictures
                const dataJSON = response.data;

                // Hide loading spinner
                loadingSpinnerToggle();

                return dataJSON;
        } catch (error) {
                console.log(error);
        }
}
