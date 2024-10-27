"use client"
import { useUser } from "@/app/hooks/useUser";
import { useCart } from "../hooks/useCart";
import Link from "next/link";
import Image from "next/image";
import "@/app/css/cart.css"

export default function page() {
  const { cart } = useUser()
  const { clearCart, removeProduct } = useCart()
  
  return (
    <div className="main-container">
      <h1>Cart</h1>
      <div className="cart-container">
          <ul id="cart">
            {cart?.map((product) => (
              <li key={product.productId}>
                <Link href={`/product/${product.product._id}`}>
                  {/* <Image src={product.product.images[0]} alt={product.product.description} width={"100"} height={"100"} /> */}
                  <img src={product.product.images[0]} alt={product.product.description} />
                </Link>
                <div className="information">
                  <Link href={`/product/${product.product._id}`}>
                    <h3>{product.product.name}</h3>
                  </Link>
                  <div className="center">
                    <div className="color-container" style={{ backgroundColor: product.color, margin: "0 10px" }}></div>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
                <span>{product.product.price}$</span>
                <button className="remove" onClick={() => removeProduct(product.product._id, product.color)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
          <div id="total">
            <h3>Total: <span>{cart?.reduce((acc, curr) => acc + curr.quantity * curr.product.price, 0)}$</span></h3>
            <p>Products: <span>{cart?.length}</span></p>
            <button onClick={() => clearCart()} >Clear cart</button>
          </div>
      </div>
    </div>
  )
}
