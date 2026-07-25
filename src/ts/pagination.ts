import $ from 'jquery';
import { state } from './state';
import { getPageIndexes, totalPages } from "./utils";
import { cacheDom, renderPaginationButtons, renderUser } from './dom';
import { ITEMS_PER_PAGE } from './constants';


export function changePage(pageNumber: number) {
    state.currentPage = pageNumber
    const elem = cacheDom();
    const { users, startIndex } = getCurrentPageUsers(pageNumber);
    renderUser(users, elem, startIndex);
}

export function initPaginationEvents() {
    $(".pagination_buttons").on('click', 'button', (e) => {
        $(".pagination_buttons button").removeClass("active");
        $(e.target).addClass('active')
        const pageButtonNumber = Number((e.target as HTMLElement).dataset.page)
        changePage(pageButtonNumber)
    })
}

export function refreshTable() {
    const elem = cacheDom();

    const pages = totalPages(
        state.filteredUsers.length,
        ITEMS_PER_PAGE
    );

    if (pages === 0) {
        state.currentPage = 1;

        renderPaginationButtons(
            state.currentPage,
            0,
            elem
        );

        renderUser([], elem, 0);

        return;
    }
    if (state.currentPage > pages) {
        state.currentPage = Math.max(pages, 1)
    }

    renderPaginationButtons(state.currentPage, pages, elem);
    const { users, startIndex } = getCurrentPageUsers(state.currentPage);

    renderUser(users, elem, startIndex)
}

export function getCurrentPageUsers(pageNumber: number) {
    const { startIndex, endIndex } = getPageIndexes(
        pageNumber,
        ITEMS_PER_PAGE
    );

    return {
        users: state.filteredUsers.slice(startIndex, endIndex),
        startIndex
    };
}

export function editUserRow() {
    const elem = cacheDom();
    $(elem.usersList).on('click', 'td', (e) => {
        const td = $(e.currentTarget);
        const index = td.index(); // از 0 شروع می‌شود

        if (index < 1 || index > 3) return;

        let value = td.text().trim();
        if (td.find("input").length) return;

        td.html(`
            <input
                class="edit-input"
                value="${value}"
            />     
        `)

        const input = td.find(".edit-input");
        input.trigger("focus");

        input.on("blur", () => {
            value = input.val() as string
            td.html(`${value}`)
            console.log(state.users)
        });
    })
}