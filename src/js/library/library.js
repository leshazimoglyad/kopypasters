import { createMovieCard } from "../movies/movieCard";
import { attachOnloadToCards } from "../movies/moviesList";
import { loadFromStorage } from "../services/storage";

export function initLibrary() {
        showWatchedFilms();
        // eventListeners
        refs.watchedBtn.addEventListener("click", showWatchedFilms);
        refs.queueBtn.addEventListener("click", showQueuedFilms);
}

const refs = {
        watchedBtn: document.querySelector('[data-action="watched"]'),
        queueBtn: document.querySelector('[data-action="queued"]'),
        gallery: document.querySelector(".movies-section__grid"),
};

const genreList = loadFromStorage("genres");

// TEMPORARY LOCAL STORAGE
const watchedFilms = [
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
                popularity: 260.568,
                release_date: "2022-09-25",
                video: false,
                vote_average: 7.5,
                vote_count: 266,
        },
        {
                adult: false,
                backdrop_path: "/qtfMr08KQsWXnCHY0a96N8NpQ2l.jpg",
                id: 30984,
                name: "Bleach",
                original_language: "ja",
                original_name: "ブリーチ",
                overview: "For as long as he can remember, Ichigo Kurosaki has been able to see ghosts. But when he meets Rukia, a Soul Reaper who battles evil spirits known as Hollows, he finds his life is changed forever. Now, with a newfound wealth of spiritual energy, Ichigo discovers his true calling: to protect the living and the dead from evil.",
                poster_path: "/2EewmxXe72ogD0EaWM8gqa0ccIw.jpg",
                media_type: "tv",
                genre_ids: [10759, 16, 10765],
                popularity: 431.983,
                first_air_date: "2004-10-05",
                vote_average: 8.337,
                vote_count: 1252,
                origin_country: ["JP"],
        },
        {
                adult: false,
                backdrop_path: "/zgMjGYxVKwUKvl5UdT9jNkiNyCe.jpg",
                id: 1024530,
                title: "Grimcutty",
                original_language: "en",
                original_title: "Grimcutty",
                overview: "A suburban teen girl and her little brother must stop a terrifying internet meme brought to life by the hysteria of their parents.",
                poster_path: "/qvg75YJMfbHeDNirUrrgBMQImRn.jpg",
                media_type: "movie",
                genre_ids: [27],
                popularity: 55.751,
                release_date: "2022-10-10",
                video: false,
                vote_average: 5.364,
                vote_count: 12,
        },
        {
                adult: false,
                backdrop_path: "/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg",
                id: 94997,
                name: "House of the Dragon",
                original_language: "en",
                original_name: "House of the Dragon",
                overview: "The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their yoke. Most empires crumble from such heights. In the case of the Targaryens, their slow fall begins when King Viserys breaks with a century of tradition by naming his daughter Rhaenyra heir to the Iron Throne. But when Viserys later fathers a son, the court is shocked when Rhaenyra retains her status as his heir, and seeds of division sow friction across the realm.",
                poster_path: "/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
                media_type: "tv",
                genre_ids: [10765, 18, 10759],
                popularity: 7112.995,
                first_air_date: "2022-08-21",
                vote_average: 8.557,
                vote_count: 1689,
                origin_country: ["US"],
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
                popularity: 85.844,
                release_date: "2022-09-30",
                video: false,
                vote_average: 6.564,
                vote_count: 109,
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
                popularity: 244.833,
                release_date: "2022-09-28",
                video: false,
                vote_average: 6.6,
                vote_count: 123,
        },
        {
                adult: false,
                backdrop_path: "/83oeqwN64WtafGoITvsOzjKIQaM.jpg",
                id: 718930,
                title: "Bullet Train",
                original_language: "en",
                original_title: "Bullet Train",
                overview: "Unlucky assassin Ladybug is determined to do his job peacefully after one too many gigs gone off the rails. Fate, however, may have other plans, as Ladybug's latest mission puts him on a collision course with lethal adversaries from around the globe—all with connected, yet conflicting, objectives—on the world's fastest train.",
                poster_path: "/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg",
                media_type: "movie",
                genre_ids: [28, 35, 53],
                popularity: 4442.443,
                release_date: "2022-07-03",
                video: false,
                vote_average: 7.5,
                vote_count: 1628,
        },
        {
                adult: false,
                backdrop_path: "/jGcACEQ684x0C6jRlBrkEJyVm9m.jpg",
                id: 126254,
                name: "The Midnight Club",
                original_language: "en",
                original_name: "The Midnight Club",
                overview: "At a manor with a mysterious history, the 8 members of the Midnight Club meet each night at midnight to tell sinister stories – and to look for signs of the supernatural from the beyond.",
                poster_path: "/2Y4F9BHkacKIMnDBZI3GGKpG1If.jpg",
                media_type: "tv",
                genre_ids: [18, 9648],
                popularity: 171.338,
                first_air_date: "2022-10-07",
                vote_average: 7.63,
                vote_count: 27,
                origin_country: ["US"],
        },
        {
                adult: false,
                backdrop_path: "/1rO4xoCo4Z5WubK0OwdVll3DPYo.jpg",
                id: 84773,
                name: "The Lord of the Rings: The Rings of Power",
                original_language: "en",
                original_name: "The Lord of the Rings: The Rings of Power",
                overview: "Beginning in a time of relative peace, we follow an ensemble cast of characters as they confront the re-emergence of evil to Middle-earth. From the darkest depths of the Misty Mountains, to the majestic forests of Lindon, to the breathtaking island kingdom of Númenor, to the furthest reaches of the map, these kingdoms and characters will carve out legacies that live on long after they are gone.",
                poster_path: "/mYLOqiStMxDK3fYZFirgrMt8z5d.jpg",
                media_type: "tv",
                genre_ids: [10765, 10759, 18],
                popularity: 4894.814,
                first_air_date: "2022-09-01",
                vote_average: 7.689,
                vote_count: 1004,
                origin_country: ["US"],
        },
        {
                adult: false,
                backdrop_path: "/iiaU8m4kUyDnbqtlr2hyiXYUlcH.jpg",
                id: 723419,
                title: "Mr. Harrigan's Phone",
                original_language: "en",
                original_title: "Mr. Harrigan's Phone",
                overview: "Craig, a young boy living in a small town befriends an older, reclusive billionaire, Mr. Harrigan. The two form a bond over books and an iPhone, but when the man passes away the boy discovers that not everything dead is gone.",
                poster_path: "/gPn9e8eP7TeKQU4IeWAMzOajR40.jpg",
                media_type: "movie",
                genre_ids: [53, 18, 27],
                popularity: 566.71,
                release_date: "2022-10-05",
                video: false,
                vote_average: 6.705,
                vote_count: 200,
        },
        {
                adult: false,
                backdrop_path: "/3uG3Ki2QkBTVXHwGFhstdOOmivh.jpg",
                id: 886396,
                title: "Batman and Superman: Battle of the Super Sons",
                original_language: "en",
                original_title: "Batman and Superman: Battle of the Super Sons",
                overview: "After discovering he has powers, 11-year-old Jonathan Kent and assassin-turned-Boy-Wonder Damian Wayne must join forces to rescue their fathers (Superman & Batman) and save the planet from the malevolent alien force known as Starro.",
                poster_path: "/od29ZUbykEJMRK7KWhpw4rXrLWW.jpg",
                media_type: "movie",
                genre_ids: [16, 28, 878],
                popularity: 110.891,
                release_date: "2022-10-17",
                video: false,
                vote_average: 0.0,
                vote_count: 0,
        },
        {
                adult: false,
                backdrop_path: "/et1rWV1LCt4ViKB9eQWOVvnxJwS.jpg",
                id: 999722,
                title: "Old People",
                original_language: "de",
                original_title: "Old People",
                overview: "A woman who's returned home with her two kids to attend her sister's wedding must suddenly defend their lives against older people on a killing spree.",
                poster_path: "/nSguJmHeYv6cwTljOZduPJDTweS.jpg",
                media_type: "movie",
                genre_ids: [27],
                popularity: 98.717,
                release_date: "2022-10-07",
                video: false,
                vote_average: 6.531,
                vote_count: 48,
        },
        {
                adult: false,
                backdrop_path: "/7t5ALGBUOHafXpf25sXDLjm0GNt.jpg",
                id: 795109,
                title: "Catherine Called Birdy",
                original_language: "en",
                original_title: "Catherine Called Birdy",
                overview: "A teenage girl in Medieval England navigates life and tries to avoid the arranged marriages her father maps out for her.",
                poster_path: "/a6welBP7DtjHDsr6fwT5IuCS33f.jpg",
                media_type: "movie",
                genre_ids: [12, 35],
                popularity: 45.791,
                release_date: "2022-09-23",
                video: false,
                vote_average: 5.6,
                vote_count: 12,
        },
        {
                adult: false,
                backdrop_path: "/3O5voBAoeQ9kipZCKmx6uDfiRLc.jpg",
                id: 136699,
                name: "Glitch",
                original_language: "ko",
                original_name: "글리치",
                overview: "A young woman joins forces with a UFO enthusiast to investigate her boyfriend’s sudden disappearance and stumbles into a wild conspiracy.",
                poster_path: "/dspwDOosidQT85oPDDHMM9zmaLw.jpg",
                media_type: "tv",
                genre_ids: [35, 9648, 10765],
                popularity: 95.805,
                first_air_date: "2022-10-07",
                vote_average: 8.25,
                vote_count: 12,
                origin_country: ["KR"],
        },
        {
                adult: false,
                backdrop_path: "/gTkheiyTGscbDuJgh78hEZmiKnD.jpg",
                id: 901385,
                title: "Significant Other",
                original_language: "en",
                original_title: "Significant Other",
                overview: "Ruth and Harry decide to take a romantic backpacking trip through the Pacific Northwest, but amongst the beautiful scenery, Ruth makes an unexpected discovery that sets her off on a strange, frightening new path. The couple aren't alone in the woods, and they might not be the same when they come out...if they come out.",
                poster_path: "/liGvBdUsyOfiTJjNCD55JJfISzb.jpg",
                media_type: "movie",
                genre_ids: [878, 53, 27, 10749],
                popularity: 105.397,
                release_date: "2022-10-06",
                video: false,
                vote_average: 6.821,
                vote_count: 28,
        },
];

const queuedFilms = [];

localStorage.setItem("watchedFilms", JSON.stringify(watchedFilms));
localStorage.setItem("queuedFilms", JSON.stringify(queuedFilms));

// WATCHED
function showWatchedFilms() {
        refs.queueBtn.classList.remove("library-btn--active");
        refs.watchedBtn.classList.add("library-btn--active");
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
        // let perPage = 0;
        // let currentPage = 2;
        // if (window.innerWidth > 0 && window.innerWidth < 768) {
        //         perPage = 4;
        //         console.log("mobile");
        // } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
        //         perPage = 8;
        //         console.log("tablet");
        // } else if (window.innerWidth >= 1200) {
        //         perPage = 9;
        //         console.log("desktop");
        //         // initPagination();
        // }
        // const firstIndexOfArray = currentPage > 0 ? (currentPage - 1) * perPage : 0;
        // let lastIndexOfArray = 0;
        // if (currentPage > 0) {
        //         if (currentPage * perPage - 1 < watchedFilms.length) {
        //                 lastIndexOfArray = currentPage * perPage - 1;
        //         } else {
        //                 lastIndexOfArray = watchedFilms.length;
        //         }
        // }

        // let markup = "";

        // for (let i = firstIndexOfArray; i <= lastIndexOfArray; i += 1) {
        //         markup = markup + createMovieCard(watchedFilms[i], genreList);
        //         // debugger;
        // }

        // return markup;
        // comment

        return watchedFilms
                .map((film) => {
                        return createMovieCard(film, genreList);
                })
                .join("");
}

// QUEUED
function showQueuedFilms() {
        refs.queueBtn.classList.add("library-btn--active");
        refs.watchedBtn.classList.remove("library-btn--active");
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

export { showQueuedFilms, showWatchedFilms };
