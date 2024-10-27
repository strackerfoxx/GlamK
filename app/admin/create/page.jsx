"use client"
import { useEffect } from "react";
import { useProduct } from "@/app/hooks/useProduct"
import { useUser } from "@/app/hooks/useUser";
import ProductForm from "@/app/components/ProductForm";
import { useRouter } from "next/navigation";
import "@/app/css/admin.css";

export default function Create() {
  const router = useRouter()
  const { token, userData } = useUser()
  const { products, createProduct } = useProduct()

  useEffect(() => {
    if(products.length > 0){
      if (!token || userData._id !== process.env.NEXT_PUBLIC_ADMIN_ID) {
          router.push("/")
      }
    }
  }, [products])

  const handleCreate = (formData) => {
    if(confirm("Are you sure you want to create this product?")) return createProduct(formData)
  }
  return (
    <div className="main-container">
      {!token || userData._id !== process.env.NEXT_PUBLIC_ADMIN_ID ? (
        <div className="center">
          <h1>UNAUTHORIZED</h1>
        </div>
      ) : (
        <>
          <h1>Create Product</h1>
          <ProductForm handle={handleCreate} />
        </>
      )}
      
    </div>
  )
}
