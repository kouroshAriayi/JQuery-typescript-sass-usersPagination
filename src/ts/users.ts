import $ from 'jquery';
import { removeUser } from "../api/profiles";
import type { NewUser } from "../types";
import { getNewUserInputs } from "./dom";
import { refreshTable } from "./pagination";
import { addNewUser, editUser, removeUserFromState } from "./state";
import { validateNewUser } from "./validators";
import swal from 'sweetalert';

export function addUserHandler() {
    $("#users_list").on('click', ".save-new-user", async () => {
        const newUserInputs = getNewUserInputs()
        const validationResult = validateNewUser(newUserInputs)
        if (!validationResult.valid) {
            $("#toast")
                .text(validationResult.message)
                .css("background-color", "red")
                .fadeIn(300)
                .delay(1000)
                .fadeOut(300);
        } else {
            const newUser: NewUser = {
                username: newUserInputs.username,
                userAge: newUserInputs.userAge,
                userSpecialty: newUserInputs.userSpecialty
            }

            try {
                await addNewUser(newUser);

                $("#toast")
                    .text("کاربر جدید اضافه شد")
                    .css("background-color", "green")
                    .fadeIn(300)
                    .delay(1000)
                    .fadeOut(300);

                refreshTable();

            } catch (err) {

                console.log(err);

                $("#toast")
                    .text("افزودن کاربر با مشکل مواجه شد!!!")
                    .css("background-color", "red")
                    .fadeIn(300)
                    .delay(1000)
                    .fadeOut(300);
            }
        }
    })
}

export function removeUserHandler() {
    $("#users_list").on('click', "button.remove_button", (e) => {
        const row = $(e.target).closest("tr")
        const trId = Number(row.data("id"))
        swal({
            title: "حذف کاربر!!!",
            text: "آیا از حذف این کاربر اطمینان دارید؟",
            icon: "warning",
            buttons: ["خیر", "بله"]
        }).then(async result => {
            if (result) {
                try {
                    await removeUser(trId)
                    removeUserFromState(trId);
                    $("#toast")
                        .text("کاربر با موفقیت حذف شد")
                        .css("background-color", "green")
                        .fadeIn(300)
                        .delay(1000)
                        .fadeOut(300);
                    refreshTable();
                } catch (err) {
                    console.log(err)
                    $("#toast")
                        .text("مشکلی رخ داده است!!!")
                        .fadeIn(300)
                        .delay(1000)
                        .fadeOut(300);
                }
            }
        })
    })
}

export function editUserHandler() {
    $("#users_list").on('click', ".edit_button", async (e) => {
        const row = $(e.currentTarget).closest("tr");

        const userId = row.data("id");

        const username = row.find("td:nth-child(2)").text().trim();
        const userAge = row.find("td:nth-child(3)").text().trim();
        const userSpecialty = row.find("td:nth-child(4)").text().trim();

        const editUserData = {
            username,
            userAge,
            userSpecialty
        }

        const isEditUserValid = validateNewUser(editUserData)

        if (!isEditUserValid.valid) {
            $("#toast")
                .text(isEditUserValid.message)
                .fadeIn(300)
                .delay(1000)
                .fadeOut(300);
            return;
        }

        try {
            await editUser(userId, editUserData)
            $("#toast")
                .text('کاربر با موفقیت ویرایش شد')
                .css("background-color", 'green')
                .fadeIn(300)
                .delay(1000)
                .fadeOut(300);
            refreshTable()
        } catch (err) {
            console.log(err);
            $("#toast")
                .text("ویرایش کاربر با مشکل مواجه شد!!!")
                .fadeIn(300)
                .delay(1000)
                .fadeOut(300);
        }
    })
}