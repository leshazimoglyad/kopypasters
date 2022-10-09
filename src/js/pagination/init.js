import Pagination from "../pagination/index.js";
import { getMovieByName_deb } from "../movies";

// Init pagination
export function initPagination({ total_pages = 1, per_page = 20, param }) {
    // Keyword for sending req
    const { keyword } = param;

    // Limit pages
    if (total_pages > 10000) total_pages = 10000;

    // Create instance of pagination class
    myPager = new Pagination(
            total_pages,
            per_page,

            function (page) {
                    // Send req with new page for same keyword
                    // Don't do new instance
                    getMovieByName_deb({
                            keyword,
                            page: page.current,
                            pagination: false,
                    });
            },
            ".pagination",
    );
}
