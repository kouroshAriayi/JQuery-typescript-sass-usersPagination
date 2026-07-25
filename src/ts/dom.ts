import type { UserProps } from "../types";
import $ from 'jquery';
import { state } from "./state";
import { refreshTable } from "./pagination";

export function cacheDom() {
    return {
        usersList: $("#users_list"),
        paginationButton: $(".pagination_buttons")
    }
}

export function getNewUserInputs() {
    return {
        username : $(".newUsername").val() as string,
        userAge : $(".newAge").val() as string,
        userSpecialty : $(".newSpecialty").val() as string
    }
}

export function createUserRow(user: UserProps, index: number, startIndex: number) {
    const userNumber = startIndex + index + 1;
    return `
        <tr data-id=${user.id} class="${userNumber % 2 === 0 ? 'even' : 'odd'}">
            <td>${userNumber}</td>
            <td>${user.username}</td>
            <td>${user.userAge}</td>
            <td>${user.userSpecialty}</td>
            <td>
                <button class="edit_button">ویرایش</button>
            </td>
            <td>
                <button class="remove_button">حذف</button>
            </td>
        </tr>
    `
}

export function renderUser(
    users: UserProps[],
    elem: { usersList: JQuery<HTMLElement> },
    startIndex: number
) {
    if(state.filteredUsers.length === 0) {
        elem.usersList.html(`
            <tr>
                <td colspan="6">
                    کاربری پیدا نشد
                </td>
            </tr>    
        `);

        return;
    }

    let html = "";

    if (state.showNewRow) {
        html += insertNewField();
    }
    html += [...users]
        .map((user, index) => createUserRow(user, index, startIndex))
        .join("");
    elem.usersList.html(html);
}

export function renderPaginationButtons(currentPage: number, pages: number, elem: { paginationButton: JQuery<HTMLElement> }) {
    let buttons = "";
    for (let page = 1; page <= pages; page++) {
        buttons += `
            <button
                data-page="${page}"
                class="${page === currentPage ? 'active' : ''}"
            >
                ${page}
            </button>
        `
    }

    elem.paginationButton.html(buttons)
}

export function insertNewField() {

    return `
        <tr class="new-user">
            <td>?</td>

            <td>
                <input class="newUsername"/>
            </td>

            <td>
                <input class="newAge"/>
            </td>

            <td>
                <input class="newSpecialty"/>
            </td>

            <td>
                <button class="edit-new-user" disabled>
                    ویرایش کردن
                </button>
            </td>
            <td>
                <button class="save-new-user">
                    اضافه کردن
                </button>
            </td>
        </tr>
    `;
}

export function initAddUserEvent() {
    $(".pagination_header button").on("click", (e) => {
        if ($(e.target).is("[action='remove']")) {
            state.showNewRow = false;
            refreshTable()
            return;
        }

        state.showNewRow = true;
        refreshTable()
    });
}

export function renderTable() {
    const elem = $(".pagination-wrapper");

    if (state.filteredUsers.length === 0) {
        elem.html(`
            <h2 id="empty_search_message">کاربری پیدا نشد</h2>
        `);
        return;
    }

    elem.html(`
        <table class="pagination-table">
            <thead>
                <tr>
                    <th>شماره</th>
                    <th>نام</th>
                    <th>سال</th>
                    <th>تخصص</th>
                    <th>ویرایش کردن</th>
                    <th>حذف/اضافه کردن</th>
                </tr>
            </thead>

            <tbody id="users_list"></tbody>
        </table>

        <div class="pagination_buttons"></div>
    `);
}

export function renderApp() {
    $("#app").html(`
        <div id="toast"></div>
        <div class="pagination">
            <div class="pagination_header">
                <div>
                    <button action="add">اضافه کردن فیلد جدید</button>
                    <button action="remove">حذف کردن فیلد جدید</button>
                </div>
                <h3>نکته: بعد از اضافه شدن فیلد جدید به جدول، روی هر قسمت کلیک و فیلد رو پر کنید.</h3>
            </div>
            <div class="pagination-content">
                <div class="pagination_search">
                    <h2>جستوجوی کاربران</h2>
                    <input placeholder="جستوجو نام یا سن یا تخصص کاربر" />
                </div>
                <div class="pagination-wrapper">
                    
                    <table class="pagination-table">
                        <thead>
                            <tr>
                                <th>شماره </th>
                                <th> نام </th>
                                <th> سن </th>
                                <th> تخصص </th>
                                <th>ویرایش کردن</th>
                                <th>حذف/اضافه کردن</th>
                            </tr>
                        </thead>

                        <tbody id = "users_list"> </tbody>
                    </table>

                    <div class="pagination_buttons"> </div>
                </div>
            </div>
        </div>    
    `)
}