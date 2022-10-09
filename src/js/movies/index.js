import { fetchMovie, fetchGenres } from "../services/fetch";
import { debounce } from "lodash";
import { initRender } from "./moviesList";
import { saveToStorage } from "../services/storage.js";
import { loadingSpinnerToggle } from "../interface/spinner";
import { warningMessage } from "../interface/warning-message";
import { initPagination } from "../pagination/init";

export const DEBOUNCE_DELAY = 300;

// Post http req and trying to get pictures
async function getMovieByName(param) {
        try {
                // Hide warning message
                warningMessage(false);

                // Show loading spinner
                loadingSpinnerToggle();
                await new Promise((resolve) => setTimeout(resolve, 300));

                // Send http req, trying get the pictures
                const response = await fetchMovie(param);

                // Check statuses
                if (response.status !== 200) {
                        throw new Error(response.status);
                }

                if (response.data === undefined) {
                        throw new Error("Incorrect data");
                }

                // Get JSON of pictures
                const dataJSON = response.data;

                // Get total pages and cur page
                const { total_pages } = dataJSON;

                // Hide loading spinner
                loadingSpinnerToggle();

                // Return if founded nothing and show warning
                if (total_pages == 0) {
                        warningMessage(true);
                        return;
                }

                // Initialization rendering gallery
                initRender(dataJSON);

                // Initialization pagination
                const { pagination } = param;
                if (pagination) initPagination({ total_pages, param });
        } catch (error) {
                console.log(error);
        }
}

// Wrap in lodash for debouncing
const getMovieByName_deb = debounce((param) => {
        getMovieByName(param);
}, DEBOUNCE_DELAY);

// Post http req and trying to get pictures
async function getGenres() {
        try {
                // Send http req, trying get the pictures
                const response = await fetchGenres();

                if (response.status !== 200) {
                        throw new Error(response.status);
                }

                if (response.data === undefined) {
                        throw new Error("Incorrect data");
                }

                // Get JSON of pictures
                const dataJSON = response.data;

                // Save genres to localStorage
                saveToStorage("genres", dataJSON);
        } catch (error) {
                console.log(error);
        }
}

export { getMovieByName_deb, getGenres };
