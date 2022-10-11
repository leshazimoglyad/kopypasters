export default class PaginationLibrary {
        constructor(btnInPagination) {
                this.totalElements = 0;
                this.perPage = 0;
                this.currentPage = 1;
                this.paginationContainerClass = "";
                this.btnInPagination = btnInPagination;
        }
        get paginationContainer() {
                return this.paginationContainerClass;
        }

        set paginationContainer(newContainerClass) {
                this.paginationContainerClass = newContainerClass;
        }

        clearPaginationLibrary() {
                const paginationContainer = document.querySelector(
                        `.${this.paginationContainerClass}`,
                );
                paginationContainer.innerHTML = "";
        }

        getTextForPaginationBtn(totalOfBtn, currentBtn) {
                let txtOfBtn = "";
                if (totalOfBtn > 9) {
                        if (this.currentPage >= 5 && this.currentPage < totalOfBtn - 4) {
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
                                                txtOfBtn = this.currentPage - 2;
                                                break;
                                        }
                                        case 4: {
                                                txtOfBtn = this.currentPage - 1;
                                                break;
                                        }
                                        case 5: {
                                                txtOfBtn = this.currentPage;
                                                break;
                                        }
                                        case 6: {
                                                txtOfBtn = this.currentPage + 1;
                                                break;
                                        }
                                        case 7: {
                                                txtOfBtn = this.currentPage + 2;
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
                        } else if (this.currentPage >= 5 && this.currentPage >= totalOfBtn - 4) {
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

        initPagination(_totalElements, _perPage, currentPage = 1) {
                this.totalElements = _totalElements;
                this.perPage = _perPage;
                this.currentPage = Number(currentPage);
                this.clearPaginationLibrary();
                const ul = document.createElement("ul");
                ul.classList.add("pagination-list");
                // console.log('totalElements', totalElements);
                // console.log('totalElements', perPage);
                const totalOfBtn = Math.ceil(this.totalElements / this.perPage);
                this.btnInPagination = Math.min(totalOfBtn, this.btnInPagination);
                if (totalOfBtn > 1) {
                        ul.appendChild(this.createLi("arrow-left", totalOfBtn));
                }
                for (let i = 1; i <= this.btnInPagination; i += 1) {
                        ul.appendChild(
                                this.createLi(
                                        this.getTextForPaginationBtn(totalOfBtn, i),
                                        totalOfBtn,
                                ),
                        );
                }
                if (totalOfBtn > 1) {
                        ul.appendChild(this.createLi("arrow-right", totalOfBtn));
                }
                ul.addEventListener("click", (evt) => {
                        if (evt.target.nodeName !== "LI") {
                                return;
                        }
                        this.action(evt.target.dataset.page);
                });
                const paginationContainer = document.querySelector(
                        `.${this.paginationContainerClass}`,
                );
                paginationContainer.appendChild(ul);
        }

        action(page) {
                // Function that rewrite movie form localStorage must be here
                this.initPagination(totalElements, perPage, page);
        }

        createLi(item, totalOfBtn) {
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
                        item = this.currentPage - 1;
                        isArrowLeft = true;
                } else if (item === "arrow-right") {
                        txt = document.createTextNode("->");
                        item = this.currentPage + 1;
                        isArrowRight = true;
                } else {
                        txt = document.createTextNode(item);
                }
                // console.log(txt);
                li.appendChild(txt);
                li.classList.add("paginationLibrary-list__item");
                if (
                        item === "..." ||
                        (isArrowLeft === true && this.currentPage === 1) ||
                        (isArrowRight === true && Number(this.currentPage) === Number(totalOfBtn))
                ) {
                        li.classList.add("disabled");
                }
                // console.log("total", totalOfBtn);
                // console.log("current", currentPage);
                if (Number(item) === Number(this.currentPage)) {
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
}
