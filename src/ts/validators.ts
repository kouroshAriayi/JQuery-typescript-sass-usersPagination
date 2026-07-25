import type { NewUser } from "../types"
import { AGE_MAX_LENGTH, SPECIALTY_MIN_LENGTH, USERNAME_MIN_LENGTH } from "./constants"
import { state } from "./state"

export const validateNewUser = ({
    username,
    userAge,
    userSpecialty
}: NewUser) => {

    const isUsernameExist = state.users.some(user => user.username === username.trim())

    if (username.trim().length === 0) {
        return {
            valid: false,
            message: "فیلد اسم خالی است!!!"
        }
    }

    else if (username.trim().length < USERNAME_MIN_LENGTH) {
        return {
            valid: false,
            message: "نام کاربر کمتر از 3 حرف است!!!"
        }
    }

    else if (isUsernameExist) {
        return {
            valid: false,
            message: "این نام کاربری در جدول وجود دارد!!!"
        }
    }

    else if (userAge.trim().length === 0) {
        return {
            valid: false,
            message: "فیلد سن خالی است!!!"
        }
    }

    else if (userAge.trim().length > AGE_MAX_LENGTH) {
        return {
            valid: false,
            message: "سن کاربر بیشتر از 3 عدد است!!!"
        }
    }

    else if (userSpecialty.trim().length === 0) {
        return {
            valid: false,
            message: "فیلد تخصص خالی است!!!"
        }
    }
    
    else if (userSpecialty.trim().length < SPECIALTY_MIN_LENGTH) {
        return {
            valid: false,
            message: "تعداد حروف تخصص کاربر کمتر از 3 حرف است!!!"
        }
    }

    return {
        valid: true,
        message: ""
    }
}