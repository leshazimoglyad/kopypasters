import { loadingSpinnerToggle } from "../interface/spinner";
import { getGenresByID } from "../movies/movieCard";
import { fetchMovieById, fetchTrailerMovieById } from "../services/fetch";
import { loadFromStorage } from "../services/storage";

// импорт



const refs = {
        modalWindow: document.querySelector(".backdrop"),
        // openTrailerMovieBtn: document.querySelector(".btn_watch-trailer"),
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
        
        // // // в дата - объект с инфой, что пришел с Api============
        // const data = await fetchTrailerMovieById(id);
        // //  info - массив с объектами (в каждом объект есть 1 видео)
        // const info = data.data.results;
        // info.forEach(element => {
        //         if (element.name === 'Official Trailer') {
        //                 // ключ для видео в Ютубе
        //                 const keyforYouTube = element.key      
        //                 console.log(keyforYouTube);       
        //         }          
        // });
        
        
        console.log(filmInfo);
        const genreList = loadFromStorage("genres");
        refs.modalWindow.classList.toggle("is-hidden");
        const title = filmInfo.title;
        const originalTitle = filmInfo.original_title;
        const overview = filmInfo.overview;
        const popularity = filmInfo.popularity.toFixed(2);
        const vote = filmInfo.vote_average.toFixed(1);
        const voteCount = filmInfo.vote_count;
        const filmPosterValue = filmInfo.backdrop_path;
        const filmPoster = `https://image.tmdb.org/t/p/w500${filmPosterValue}`;
        console.log(filmPoster);
        console.log(filmPosterValue);

        let modalRender = refs.modal.insertAdjacentHTML(
                "afterbegin",
                `<button class="close_btn">
       <svg width="32" height="32"><use href="./images/icons.svg#icon-close"></use></svg>
   </button>
   <div class="modal_poster"><img src="${filmPoster}" alt=""/>
   </div>
   <div class="modal_info">
       <h2 class="modal_title">${title}</h2>
       <table>
           <tr>
               <td class="vote">Vote/Votes</td>
               <td class="votes-value">${vote}/${voteCount}</td>
           </tr>
           <tr>
               <td class="popularity">Popularity</td>
               <td class="popularity-value">${popularity}</td>
           </tr>
           <tr>
               <td class="original-title">Original title</td>
               <td class="original-title-value">${originalTitle}</td>
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
           <li>
               <button type="button" class="modal_list_button btn_watch-trailer">Watch movie trailer</button>
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
