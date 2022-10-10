import { loadingSpinnerToggle } from "../interface/spinner";
import { fetchMovieById } from "../services/fetch";

// Blank image
import blankImage from "../../images/no-image.svg";

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

        watchedBtn: document.querySelector(".modal-detail__btn--watched"),
        queueBtn: document.querySelector(".modal-detail__btn--queue"),
};

export default function initModalFilmDetails() {
        refs.grid.addEventListener("click", openModalWindow);
        refs.closeBtn.addEventListener("click", closeModal);
}

function parseGenres(genres) {
        return genres.map((genre) => genre.name).join(", ");
}

async function openModalWindow(e) {
        const filmCard = e.target;

        // Get video ID from data card
        const id = filmCard.closest("div").getAttribute("data-id");

        // Return if no id
        if (!id) {
                return;
        }

        // Post req by id
        const filmInfo = await getMovieById(id);

        // Show modal
        refs.modalDetailOverlay.classList.toggle("is-hidden");

        // Export data
        const {
                title = "NO TITLE",
                original_title = "No original title",
                overview = "No overview...",
                popularity = 0,
                vote_average = 0,
                vote_count = 0,
                poster_path,
                genres,
        } = filmInfo;

        // Parse names of genres        
        const genresStr = (genres.length > 0) ? parseGenres(genres) : "No genres";

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
        refs.orgTitle.innerText = original_title;
        // Popularity
        refs.popularity.innerText = popularity.toFixed(2);
        // Genres
        refs.genres.innerText = genresStr;
        // Overview
        refs.article.innerText = overview;
        // Votes
        refs.votesCount.innerText = vote_count;
        // Avg votes
        refs.votesAVG.innerText = vote_average.toFixed(1);

        const watched = refs.watchedBtn.getAttribute("data-status");
        const queue = refs.queueBtn.getAttribute("data-status");

        // Check statuses
        checkStatuses(watched, queue);

        refs.watchedBtn.addEventListener("click", handleWatched);
        refs.queueBtn.addEventListener("click", handleQueue);
}

function handleWatched() {
        // Читаємо локалстор
        // Шукаємо айді
        // якщо є - видаляємо з стору, прибираємо клас з кнопки, прибираємо датаатр.
}

function handleQueue() {}

// Checking statuses
function checkStatuses(watched, queue) {
        if (watched == "watched") {
                refs.watchedBtn.classList.add("watched");
                refs.watchedBtn.innerText = "Remove from Watched";
        } else {
                refs.watchedBtn.classList.remove("watched");
                refs.watchedBtn.innerText = "Add to Watched";
        }

        if (queue == "in-queue") {
                refs.queueBtn.classList.add("in-queue");
                refs.queueBtn.innerText = "Remove from Queue";
        } else {
                refs.queueBtn.classList.remove("in-queue");
                refs.queueBtn.innerText = "Add to Queue";
        }
}

// Close modal
function closeModal() {
        refs.modalDetailOverlay.classList.toggle("is-hidden");
}

// Fetch movie by ID
async function getMovieById(id) {
        try {
                // spinner
                loadingSpinnerToggle();
                await new Promise((resolve) => setTimeout(resolve, 300));

                // Send http req, trying get the pictures
                const response = await fetchMovieById(id);

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
