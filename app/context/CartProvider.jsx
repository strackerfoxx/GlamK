import { createContext, useState } from "react";
import { useUser } from "../hooks/useUser";
import { toast } from 'react-toastify';
import axios from "axios";

const CartContext = createContext()
const CartProvider = ({children}) => {
    const [modal, setModal] = useState(false)
    const {token, cart, setCart} = useUser()
    
    const addProduct = async (product, color = undefined, quantity = 1) => {
        const headers = {
            "Authorization": `${token}`
        }
        let cartState = []

        if(cart.length > 0) {
            let productExists = false;

            cart.forEach((productState) => {
                if(productState.product._id === product._id && productState.color === color) {
                    // Si el producto ya existe con el mismo color, actualizamos la cantidad
                    productExists = true;
                    cartState.push({ product: productState.product, quantity: parseInt(quantity), color: productState.color, productId: productState.productId });
                } else {
                    // Mantenemos el producto en el carrito si no es el mismo producto/color
                    cartState.push(productState);
                }
            });

            // Si el producto no existía en el carrito con el mismo color, lo agregamos
            if (!productExists) {
                cartState.push({ product, quantity: parseInt(quantity), color });
            }
            setCart(cartState);
        } else {
            // Si el carrito está vacío, simplemente agregamos el producto
            cartState.push({ product: product, quantity: parseInt(quantity), color: color });
            setCart(cartState);
        }

        
        try {
            if(cart.some(productState => productState.product._id == product._id && productState.quantity === quantity && productState.color === color)) {
                toast("Product Already in Cart", { type: "information", position: "top-right" })
            }else{
                if(!color){ 
                    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {product: {id: product._id, quantity}}, {headers})
                }else{
                    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {product: {id: product._id, quantity, color}}, {headers})
                }
                toast("Added to cart", { type: "success", position: "top-right" })
            }
        } catch (error) {
            toast(error.message, { type: "error", position: "top-right" })
        }
    }

    const removeProduct = async (id, color) => {
        const headers = {
            "Authorization": `${token}`
        }
        const cartState = []
        try {
            cart?.forEach((product) => {
                if(product.product._id !== id) {
                    cartState.push(product)
                }
            })
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/remove`, {id, color}, {headers})
            toast("Removed from cart", { type: "success", position: "top-right" })
            setCart(cartState)
        } catch (error) {
            toast(error.message, { type: "error", position: "top-right" })
        }
    }

    const clearCart = async () => {
        const headers = {
            "Authorization": `${token}`
        }
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/cart/clear`, {headers})
            setCart([])
            toast("cart cleared", { type: "success", position: "top-right" })
        } catch (error) {
            toast(error.message, { type: "error", position: "top-right" })
        }
    }

    return(
        <CartContext.Provider value={{addProduct, removeProduct, modal, setModal, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}

export { CartProvider }
export default CartContext