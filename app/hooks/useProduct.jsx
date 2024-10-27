import { useContext } from "react";
import ProductContext from "../context/ProductProvider"

export const useProduct = () => {
    return useContext(ProductContext)
}