import { loadingSpinnerToggle } from "../interface/spinner";
import { getGenresByID } from "../movies/movieCard";
import { fetchMovieById } from "../services/fetch";
import { loadFromStorage } from "../services/storage";

const refs = {
        modalWindow: document.querySelector(".backdrop"),
        closeBtn: document.querySelector(".close_btn"),
        openBtn: document.querySelector(".movies-section__grid"),
        modalTitle: document.querySelector(".modal_title"),
        votesValue: document.querySelector(".votes-value"),
        popularityValue: document.querySelector(".popularity-value"),
        originalTitleValue: document.querySelector(".original-title-value"),
        modal: document.querySelector(".modal"),
};

export default function initModalFilmDetails() {
        refs.openBtn.addEventListener("click", openModalWindow);
        refs.closeBtn.addEventListener("click", closeModal);
}

async function openModalWindow(e) {
        const filmCard = e.target;
        const id = filmCard.closest("div").getAttribute("data-id");

        if (!id) {
                return;
        }

        const filmInfo = await getMovieById(id);
        console.log(filmInfo);
        const genreList = loadFromStorage("genres");
        refs.modalWindow.classList.toggle("is-hidden");
        const title = filmInfo.title;
        const originalTitle = filmInfo.original_title;
        const overview = filmInfo.overview;
        const popularity = filmInfo.popularity.toFixed(2);
        const vote = filmInfo.vote_average.toFixed(1);
        const voteCount = filmInfo.vote_count;
        const filmPosterValue = filmInfo.poster_path;
        const filmPoster = `https://image.tmdb.org/t/p/w500${filmPosterValue}`;
        //   console.log(filmPoster);
        //   console.log(filmPosterValue);

        let modalRender = refs.modal.insertAdjacentHTML(
                "afterbegin",
                `<button class="close_btn">
       <svg width="32" height="32"><use href="./images/icons.svg#icon-close"></use></svg>
   </button>
   <div class="modal_poster"><img class="modal_img" src="${filmPoster}" alt=""/>
   </div>
   <div class="modal_info">
       <h2 class="modal_title">${title}</h2>
       <table class="modal_table">
           <tr class="modal_table_raw">
               <td class="vote data_name ">Vote/Votes</td>
               <td class="votes-value data_value modal_table_data"><span class="vote_bcg">${vote}</span> /  ${voteCount}</td>
           </tr>
           <tr class="modal_table_raw">
               <td class="popularity data_name ">Popularity</td>
               <td class="popularity-value data_value modal_table_data">${popularity}</td>
           </tr>
           <tr class="modal_table_raw">
               <td class="original-title data_name ">Original title</td>
               <td class="original-title-value data_value modal_table_data">${originalTitle}</td>
           </tr>
       </table>

       <p class="modal_txt">About</p>
       <p class="modal_article">${overview}</p>
       <ul class="modal_list_btn list">
           <li>
               <button type="button" class="modal_list_button btn_primary">Add to Watched</button>
           </li>
           <li>
               <button type="button" class="modal_list_button btn_secondary">Add to Queue</button>
           </li>
       </ul>
   </div>`,
        );
        //        const genres = getGenresByID({genreList}, ids);
        //        console.log(ids);
        //        console.log(genres);
}

function closeModal() {
        refs.modalWindow.classList.toggle("is-hidden");
}

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
