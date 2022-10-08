const PREFIX_POSTER_URL = "https://image.tmdb.org/t/p/w500/";

// Blank image
import blankImage from "../../images/no-image.svg"

// Get genres by IDs
function getGenresByID({ genres: genresList }, ids) {

        const res = [];

        genresList.forEach((genre) => {
                if (ids.includes(genre["id"])) {
                        res.push(genre["name"]);
                }
        });

        return res.join(", ");
}

// Create box of image
export function createMovieCard(movie, genreList) {
        const {
                // id,
                // backdrop_path,
                poster_path,
                title,
                // original_title,
                genre_ids,
                release_date,
                // rate,
                // votes,
                // popularity,
                // about,
        } = movie;

        // Get genres by ID
        const genres = getGenresByID(genreList, genre_ids);

        // Preparing url, check posterImage on NULL
        let posterImage = PREFIX_POSTER_URL;

        // SCSS modifacator for blank image
        let imgBlank = '';

        if (poster_path) { 
                posterImage += `${poster_path}`
        } else {
                posterImage = `${blankImage}`
                imgBlank = 'movies-section__image--blank';
        };
        
        // Release date           
        const date = release_date ? release_date.slice(0, 4) : false;

        const movieCard = `

                <div class="movies-section__card">
                                                
                        <img class="movies-section__image ${imgBlank}" src="${posterImage}" alt="${title || "No title"}" loading="lazy" />                        
                        
                        <ul class="movies-section__info">
                                <li class="movies-section__item">
                                        <span class="movies-section__${title ? 'title' : "title--no-info"}">${title || "No title"}</span>
                                </li>
                                <li class="movies-section__item movies-section__add-info">
                                        <span class="movies-section__${genres ? 'genres' : "genres--no-info"}">${genres || "No genres"}</span>
                                        <span>|</span>
                                        <span class="movies-section__${date ? 'year' : "year--no-info"}">${date || "No date"}</span>
                                </li>
                        </ul>
                </div>
    
        `;

        return movieCard;
}
