"use client"
import axios from "axios";
import { createContext, useState, useEffect } from "react";
const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [cart, setCart] = useState([])
    const [favoriteList, setFavoriteList] = useState([])
    const [reviews, setReviews] = useState([])
    const [userData, setUserData] = useState({})

    useEffect(() => {
        if (localStorage.getItem("user")) {
            const userState = JSON.parse(localStorage.getItem("user"))
            setToken(userState.token)
            setUserData({ _id: userState._id, name: userState.name })

            const getUser = async () => {
                const headers = {
                    "Authorization": `${userState.token}`
                }
                try {
                    const { data } = await axios(`${process.env.NEXT_PUBLIC_API_URL}/users/getuser`, { headers })
                    setCart(data.cart.products)
                    setFavoriteList(data.favoriteList.products)
                    setReviews(data.reviews)
                } catch (error) {
                    console.log(error.message)
                }
            }
            getUser()
        }

    }, [token])
    return (
        <UserContext.Provider value={{ token, setToken, userData, cart, setCart, favoriteList, setFavoriteList, reviews, setReviews }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
export { UserProvider }