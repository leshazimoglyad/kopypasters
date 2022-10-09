// Must be from the information from localStorage and breakpoints
let totalElements = 0;
let perPage = 0;

function action(page) {
        // Function that rewrite movie form localStorage must be here
        initPagination(totalElements, perPage, page);
}

function createLi(item, currentPage, totalOfBtn) {
        let txt = "";
        let isArrowLeft = "";
        let isArrowRight = "";
        const li = document.createElement("li");
        if (item === "arrow-left") {
                // const svg = document.createElement('svg');
                // svg.setAttribute('width', 16);
                // svg.setAttribute('heigth', 16);
                // const use = document.createElement('use');
                // use.setAttribute('href', './images/icons.svg#icon-heart');
                // svg.append(use);
                // txt = svg;
                txt = document.createTextNode("<-");
                item = currentPage - 1;
                isArrowLeft = true;
        } else if (item === "arrow-right") {
                txt = document.createTextNode("->");
                item = currentPage + 1;
                isArrowRight = true;
        } else {
                txt = document.createTextNode(item);
        }
        // console.log(txt);
        li.appendChild(txt);
        li.classList.add("paginationLibrary-list__item");
        if (
                item === "..." ||
                (isArrowLeft === true && currentPage === 1) ||
                (isArrowRight === true && Number(currentPage) === Number(totalOfBtn))
        ) {
                li.classList.add("disabled");
        }
        // console.log("total", totalOfBtn);
        // console.log("current", currentPage);
        if (Number(item) === Number(currentPage)) {
                li.classList.add("paginationLibrary-list__item--active");
        }
        if (item >= 100) {
                li.classList.add("paginationLibrary-list__item--smallLeftPadding");
        }
        // li.setAttribute('name', item === '...' ? `btnDot` : `btn` + item);
        // li.setAttribute('title', item === '...' ? `dots` : item);
        li.dataset.page = item;
        return li;
}

function clearPaginationLibrary(pag) {
        pag.innerHTML = "";
}

function getTextForPaginationBtn(currentPage, totalOfBtn, currentBtn) {
        let txtOfBtn = "";
        if (totalOfBtn > 9) {
                if (currentPage >= 5 && currentPage < totalOfBtn - 4) {
                        switch (currentBtn) {
                                case 1: {
                                        txtOfBtn = 1;
                                        break;
                                }
                                case 2: {
                                        txtOfBtn = "...";
                                        break;
                                }
                                case 3: {
                                        txtOfBtn = currentPage - 2;
                                        break;
                                }
                                case 4: {
                                        txtOfBtn = currentPage - 1;
                                        break;
                                }
                                case 5: {
                                        txtOfBtn = currentPage;
                                        break;
                                }
                                case 6: {
                                        txtOfBtn = currentPage + 1;
                                        break;
                                }
                                case 7: {
                                        txtOfBtn = currentPage + 2;
                                        break;
                                }
                                case 8: {
                                        txtOfBtn = "...";
                                        break;
                                }
                                case 9: {
                                        txtOfBtn = totalOfBtn;
                                        break;
                                }
                        }
                } else if (currentPage >= 5 && currentPage >= totalOfBtn - 4) {
                        switch (currentBtn) {
                                case 1: {
                                        txtOfBtn = 1;
                                        break;
                                }
                                case 2: {
                                        txtOfBtn = "...";
                                        break;
                                }
                                case 3: {
                                        txtOfBtn = totalOfBtn - 6;
                                        break;
                                }
                                case 4: {
                                        txtOfBtn = totalOfBtn - 5;
                                        break;
                                }
                                case 5: {
                                        txtOfBtn = totalOfBtn - 4;
                                        break;
                                }
                                case 6: {
                                        txtOfBtn = totalOfBtn - 3;
                                        break;
                                }
                                case 7: {
                                        txtOfBtn = totalOfBtn - 2;
                                        break;
                                }
                                case 8: {
                                        txtOfBtn = totalOfBtn - 1;
                                        break;
                                }
                                case 9: {
                                        txtOfBtn = totalOfBtn;
                                        break;
                                }
                        }
                } else {
                        if (currentBtn === 8) {
                                txtOfBtn = "...";
                        } else if (currentBtn === 9) {
                                txtOfBtn = totalOfBtn;
                        } else {
                                txtOfBtn = currentBtn;
                        }
                }
        } else {
                txtOfBtn = currentBtn;
        }
        return txtOfBtn;
}

function initPagination(_totalElements, _perPage, currentPage = 1) {
        currentPage = Number(currentPage);
        const pag = document.querySelector(".paginationLibrary");
        clearPaginationLibrary(pag);
        const ul = document.createElement("ul");
        ul.classList.add("pagination-list");
        // console.log('totalElements', totalElements);
        // console.log('totalElements', perPage);
        const totalOfBtn = Math.ceil(_totalElements / _perPage);
        const btnInPagination = Math.min(totalOfBtn, 9);
        if (totalOfBtn > 1) {
                ul.appendChild(createLi("arrow-left", currentPage, totalOfBtn));
        }
        for (let i = 1; i <= btnInPagination; i += 1) {
                ul.appendChild(
                        createLi(
                                getTextForPaginationBtn(currentPage, totalOfBtn, i),
                                currentPage,
                                totalOfBtn,
                        ),
                );
        }
        if (totalOfBtn > 1) {
                ul.appendChild(createLi("arrow-right", currentPage, totalOfBtn));
        }
        ul.addEventListener("click", (evt) => {
                if (evt.target.nodeName !== "LI") {
                        return;
                }
                action(evt.target.dataset.page);
        });
        pag.appendChild(ul);
}

export { initPagination, clearPaginationLibrary };
