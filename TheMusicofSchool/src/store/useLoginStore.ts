import { create } from "zustand";


interface ILoginStore{
    user: string | null;
    isLoggedIn: boolean;
    login: (user: string) => void;
    logout: () => void;
}

export const useLoginStore = create<ILoginStore>((set) => ({
    user: null,
    isLoggedIn: false,
    login: (user: string) => {set ({user, isLoggedIn: true})},
    logout: () => {
        window.localStorage.removeItem("user_token");
        set(
            {user: null, isLoggedIn: false}
        )
    }
}) 
)