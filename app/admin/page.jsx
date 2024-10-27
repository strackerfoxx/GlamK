"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "../hooks/useUser"
import { useProduct } from "../hooks/useProduct"
import Link from "next/link"

import "../css/admin.css"

export default function Admin() {
  const router = useRouter()
  const { token, userData } = useUser()
  const { products, deleteProduct } = useProduct()

  useEffect(() => {
    if(products.length > 0){
      if (!token || userData._id !== process.env.NEXT_PUBLIC_ADMIN_ID) {
          router.push("/")
      }
    }
  }, [products])

  return (
    <div className="main-container">
      {!token || userData._id !== process.env.NEXT_PUBLIC_ADMIN_ID ? (
        <div className="center">
          <h1>UNAUTHORIZED</h1>
        </div>
      ) : (
        <>
        <div id="top">
          <h1>Control Panel</h1>
          <Link href={`/admin/create`} className="action">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </Link>
        </div>

        <ul id="products">
            {products.map((product) => (
              <li key={product._id}>
                <img src={product.images[0]} alt={product.description} />
                <h4 id="name">{product.name}</h4>
                <span>{product.price}$</span>
                <p>stock: {product.stock}</p>
                <p>brand: {product.brand}</p>
                <p id="description">{product.description}</p>
                <p>category: {product.category}</p>
                <p>available: {product.available}</p>
                <p>images: {product.images.length}</p>
                <p>discount: {product.discount}%</p>
                <p>visible: {product.visible}</p>
                <div>

                <p>colors: </p>
                <div id="colors">
                    {product.colors.map((color) => (
                      <div key={color} style={{ backgroundColor: color, margin: "0 3px", width: "20px", height: "20px" }}></div>
                    ))}
                  </div>
                </div>
                
                <div id="actions">
                  <Link href={`/product/${product._id}`} className="action">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                  </Link>
                  <Link href={`/admin/product/${product._id}`} className="action" id="action-edit">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                  </Link>
                  <button onClick={() => deleteProduct(product._id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                  </button>
                </div>
              </li>
            ))}
        </ul>
        
      </>
      ) }
    </div>
  )
}
