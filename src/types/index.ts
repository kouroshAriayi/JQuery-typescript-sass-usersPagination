import type { cacheDom } from "../ts/dom";

export interface UserProps {
    id: number;
    username: string;
    userAge: string;
    userSpecialty: string;
    country: string;
    city: string;
}

export interface NewUser {
    username: string;
    userAge: string;
    userSpecialty: string;
}

export type DomElements = ReturnType<typeof cacheDom>;