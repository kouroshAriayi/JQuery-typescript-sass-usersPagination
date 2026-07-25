import $ from 'jquery';
import { state } from './state';
import { refreshTable } from './pagination';

export function searchUser() {
    $(".pagination_search").on('input', 'input', (e) => {
        state.searchQuery = ($(e.target).val() as string).toLowerCase().trim();

        state.filteredUsers = state.users.filter(user => {
            return (
                user.username.toLowerCase().startsWith(state.searchQuery) ||
                String(user.userAge).startsWith(state.searchQuery) ||
                user.userSpecialty.toLowerCase().startsWith(state.searchQuery)
            )
        })

        state.currentPage = 1;
        state.showNewRow = false;
        refreshTable()
    })
}