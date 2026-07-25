import $ from 'jquery';
import "./style.scss"
import { ITEMS_PER_PAGE } from "./ts/constants";
import { cacheDom, initAddUserEvent, renderApp, renderPaginationButtons } from "./ts/dom";
import { changePage, editUserRow, initPaginationEvents } from "./ts/pagination";
import { searchUser } from "./ts/search";
import { fetchUsers, state } from "./ts/state";
import { addUserHandler, editUserHandler, removeUserHandler } from "./ts/users";
import { totalPages } from "./ts/utils";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <h2>در حال بارگزارری...</h2>
`

await fetchUsers();

if (state.error) {
  $("#app").html(`
    <h2>مشکلی رخ داده است</h2>
  `);
} else {
  renderApp()

  const elem = cacheDom();

  const pages = totalPages(state.users.length, ITEMS_PER_PAGE)

  renderPaginationButtons(state.currentPage, pages, elem);

  initPaginationEvents()
  initAddUserEvent()
  addUserHandler()
  removeUserHandler()
  searchUser()
  editUserRow()
  editUserHandler()

  changePage(1)
}