import axios from "axios";

export default async function fetchById(id) {
        const URL = "https://api.themoviedb.org/";
        const FILTER = `3/movie/${id}`;
        const API_KEY = "d5db08081a23b85f2c18e58b0bb5a9b8";

        return await axios.get(`${URL}${FILTER}?${API_KEY}`);
        
}


