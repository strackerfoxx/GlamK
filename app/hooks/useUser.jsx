import { useContext } from "react";
import UserContext from "../context/UserProvider"

export const useUser = () => {
    return useContext(UserContext)
}