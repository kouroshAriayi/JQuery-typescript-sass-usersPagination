import { supabase } from "../lib/supabase";
import type { NewUser } from "../types";

async function getUsers() {
    const {data, error} = await supabase
        .from("pagination_profiles")
        .select("*")
        .order("created_at", { ascending: false });

    if(error) throw error;
    return data;
}

async function addUser(userData: NewUser) {
    const {data, error} = await supabase
        .from("pagination_profiles")
        .insert(userData)
        .select("*")
        .single();

    if(error) throw error;
    return data;
}

async function removeUser(userId: number) {
    const {data, error} = await supabase
        .from("pagination_profiles")
        .delete()
        .eq("id", userId)
        .select()
        .single();

    if(error) throw error;;
    return data;
}

async function updateUser(id: number, userData: NewUser) {
    const {data, error} = await supabase
        .from("pagination_profiles")
        .update(userData)
        .eq("id", id)
        .select()
        .single();

    if(error) throw error;
    return data;
}

export {
    getUsers,
    addUser,
    removeUser,
    updateUser
}