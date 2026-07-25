import { addUser, getUsers, updateUser } from "../api/profiles";
import type { NewUser, UserProps } from "../types";

export const state = {
    users: [] as UserProps[],
    filteredUsers: [] as UserProps[],
    loading: false,
    error: false,
    showNewRow: false,
    currentPage: 1,
    searchQuery: ""
}

export async function fetchUsers() {
    state.loading = true
    state.error = false

    try {
        const users = await getUsers();
        state.users = users;
        state.filteredUsers = users;
    } catch (err) {
        console.log(err)
        state.error = true
    } finally {
        state.loading = false
    }
}

export async function addNewUser(userData: NewUser) {
    const newUser = await addUser(userData)
    state.users.unshift(newUser);
    applySearchFilter();
    state.showNewRow = false
}

export async function editUser(id: number, data: NewUser) {
    const updatedUser = await updateUser(id, data)

    const userIndex = state.users.findIndex(
        user => user.id === id
    )

    if (userIndex !== -1) {
        state.users[userIndex] = updatedUser;
    }

    applySearchFilter()

    return updatedUser;
}

export function removeUserFromState(id: number) {
    state.users = state.users.filter(
        user => user.id !== id
    );

    state.filteredUsers = state.filteredUsers.filter(
        user => user.id !== id
    );
}


export function applySearchFilter() {
    const searchQuery = state.searchQuery;

    state.filteredUsers = state.users.filter(user => {
        return (
            user.username.toLowerCase().startsWith(searchQuery) ||
            String(user.userAge).startsWith(searchQuery) ||
            user.userSpecialty.toLowerCase().startsWith(searchQuery)
        );
    });
}