// const BASE_URL = 'https://api.themoviedb.org/3/'
// const API_KEY = '33349cc6688203a2df4b881be77c5531'


// // запит на отриманя фільмів 
// // https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US
// export default class TrailerService {
//     constructor() {
//         this.id = '';
//     }
// тзь

//     async fetchTrailers() {
//         const serverRequest = await fetch(`${BASE_URL}movie/${this.id}/videos?api_key=${API_KEY}&language=en-US`);
//         if (!serverRequest.ok) {
//             throw new Error(serverRequest.status);
//         }
//         const data = await serverRequest.json();
//         return data;
//     }
// }