"use client"
import { createContext, useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import axios from "axios";
const PostContext = createContext()

const PostProvider = ({ children }) => {
    const [modal, setModal] = useState(false)
    const [products, setProducts] = useState([])
    const { favoriteList, setFavoriteList, token } = useUser()

    const router = useRouter()

    useEffect(() => {
        const getProducts = async () => {
            try {
                const {data} = await axios(`${process.env.NEXT_PUBLIC_API_URL}/products`)
                setProducts(data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getProducts()
    },[])

    const handleFavorite = async (product) => {
        if( !token ) return
        
        const favoriteListState = []
        
        if( !favoriteList.some(productState => productState._id === product._id) ){
            setFavoriteList([...favoriteList, product])
            toast("Added to Favorites", { type: "success", position: "top-right" })
        }else{
            favoriteList.forEach(productState => {
                if(productState._id !== product._id){
                    favoriteListState.push(productState)
                }
            })
            toast("Removed from Favorites", { type: "success", position: "top-right" })
            setFavoriteList(favoriteListState)
        }

        const headers = {
            "Authorization": `${token}`
        }

        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/favorite`, {product: product._id}, {headers})

    }

    const deleteProduct = async (id) => {
        const headers = {
            "Authorization": `${token}`
        }
        const productsState = []
        if(confirm("Are you sure you want to delete this product?")){
            try {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products?id=${id}`, {headers})
                products.forEach(product => {
                    if(product._id !== id){
                        productsState.push(product)
                    }
                })
                setProducts(productsState)
                toast("Product deleted", { type: "success", position: "top-right" })
            } catch (error) {
                toast(error.message, { type: "error", position: "top-right" })
            }
        }
    }

    const createProduct = async (formData) => {
        const headers = { "Authorization": token, "Content-Type": "multipart/form-data" }

        try {
            const {data} = await axios.postForm(`${process.env.NEXT_PUBLIC_API_URL}/products/create`, formData, {headers})
            toast(data.msg, { type: "success", position: "top-right" })
            setTimeout(() => {
                router.refresh()
                router.push("/admin")
            }, 1000);
        } catch (error) {
            toast(error.message, { type: "error", position: "top-right" })
        }
    }

    const editProduct = async (id, formData) => {
        const headers = { "Authorization": token, "Content-Type": "multipart/form-data" }

        try {
            const {data} = await axios.putForm(`${process.env.NEXT_PUBLIC_API_URL}/products/update?id=${id}`, formData, {headers})
            toast(data.msg, { type: "success", position: "top-right" })
            setTimeout(() => {
                router.push("/admin")
            }, 1000);
        } catch (error) {
            toast(error.message, { type: "error", position: "top-right" })
        }
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
          }
    }

    return (
        <PostContext.Provider value={{ products, handleFavorite, modal, setModal , deleteProduct, createProduct, editProduct }}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContext
export { PostProvider }