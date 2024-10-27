"use client"
import axios from "axios"
import { useState, useEffect } from "react"
import { useProduct } from "@/app/hooks/useProduct"
import { useUser } from "@/app/hooks/useUser";
import { useRouter } from "next/navigation"
import ProductForm from "@/app/components/ProductForm"

export default function Create({params}) {
  const { products, editProduct } = useProduct()
  const { token, userData } = useUser()

  const [product, setProduct] = useState({})

  const [name, setName] = useState("")
  const [nameAlert, setNameAlert] = useState("")

  const [description, setDescription] = useState("")
  const [descriptionAlert, setDescriptionAlert] = useState("")

  const [price, setPrice] = useState("")
  const [priceAlert, setPriceAlert] = useState("")

  const [discount, setDiscount] = useState("");
  const [discountAlert, setDiscountAlert] = useState("");

  const [stock, setStock] = useState("");
  const [stockAlert, setStockAlert] = useState("");

  const [brand, setBrand] = useState("");
  const [brandAlert, setBrandAlert] = useState("");

  const [category, setCategory] = useState("");
  const [categoryAlert, setCategoryAlert] = useState("");

  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [color3, setColor3] = useState("");

  const [images, setImages] = useState([])

  const router = useRouter()
  useEffect(() => {
    if(products.length > 0){
      if (!token || userData._id !== process.env.NEXT_PUBLIC_ADMIN_ID) {
          router.push("/")
      }
    }
  }, [products])

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios(`${process.env.NEXT_PUBLIC_API_URL}/products/getone?id=${params.id}`)
        setProduct(data.product)
        setName(data.product.name)
        setDescription(data.product.description)
        setPrice(data.product.price)
        setDiscount(data.product.discount)
        setStock(data.product.stock)
        setBrand(data.product.brand)
        setCategory(data.product.category)
        setImages(data.product.images)
        setColor1(data.product.colors[0] || "")
        setColor2(data.product.colors[1] || "")
        setColor3(data.product.colors[2] || "")
      } catch (error) {
        console.log(error.message)
      }
    }
    getProduct()
  }, [params])
  const handleEdit = (e) => {
    e.preventDefault()

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
    formData.append('images', images[i]);
    }

    const product = JSON.stringify({ name, description, price, discount, stock, brand, category, colors: color1 !== "" || color2 !== "" || color3 !== "" ? [color1, color2, color3] : [] })
    formData.append('data', product.toString())
    
    if(confirm("Are you sure you want to Modify this product?")) return editProduct(params.id, formData)
  }
  return (
    <div className="main-container">
      {!token || userData._id !== process.env.NEXT_PUBLIC_ADMIN_ID ? (
        <div className="center">
          <h1>UNAUTHORIZED</h1>
        </div>
      ) : (
        <>
          <h1>Edit Product</h1>
      {product && (
        <form onSubmit={(e) => handleEdit(e)}>
            <input type="text" name="name" placeholder="Write a name" style={{ border: `${nameAlert !== "" ? " 1px solid red" : "none"}` }}
            onChange={(e) => { setName(e.target.value); setNameAlert("") }} value={name}/>
            {nameAlert !== "" && (<p className="error-text">{nameAlert}</p>)}

            <textarea type="text" name="description" id="description" placeholder="Write a review (max 255 characters)"
            style={{ border: `${descriptionAlert !== "" ? "1px solid red" : "none"}` }} value={description}
            onChange={(e) => { setDescription(e.target.value); setDescriptionAlert("") }} minLength={5} maxLength="255" />
            {descriptionAlert !== "" && (<p className="error-text">{descriptionAlert}</p>)}

            <div id="triple">

            <input 
                type="number" 
                placeholder="price" 
                value={price}
                style={{ border: `${priceAlert !== "" ? " 1px solid red" : "none"}` }}
                onChange={(e) => { setPrice(e.target.value); setPriceAlert("") }}/>
            {priceAlert !== "" && (<p className="error-text">{priceAlert}</p>)}

            <input
                type="number"
                placeholder="discount"
                max={90}
                value={discount}
                style={{ border: `${discountAlert !== "" ? "1px solid red" : "none"}` }}
                onChange={(e) => { setDiscount(e.target.value); setDiscountAlert("") }}
            />
            {discountAlert !== "" && (<p className="error-text">{discountAlert}</p>)}

            <input
                type="number"
                placeholder="stock"
                value={stock}
                style={{ border: `${stockAlert !== "" ? "1px solid red" : "none"}` }}
                onChange={(e) => { setStock(e.target.value); setStockAlert("") }}
            />
            {stockAlert !== "" && (<p className="error-text">{stockAlert}</p>)}

            </div>
            <input
                type="text"
                placeholder="brand"
                value={brand}
                style={{ border: `${brandAlert !== "" ? "1px solid red" : "none"}` }}
                onChange={(e) => { setBrand(e.target.value); setBrandAlert("") }}
            />
            {brandAlert !== "" && (<p className="error-text">{brandAlert}</p>)}

            <input
                type="text"
                placeholder="category"
                value={category}
                style={{ border: `${categoryAlert !== "" ? "1px solid red" : "none"}` }}
                onChange={(e) => { setCategory(e.target.value); setCategoryAlert("") }}
            />
            {categoryAlert !== "" && (<p className="error-text">{categoryAlert}</p>)}

            <div id="triple">
                <input type="text" placeholder="colors" value={color1} onChange={(e) => { setColor1(e.target.value); }} />
                <input type="text" placeholder="colors" value={color2} onChange={(e) => { setColor2(e.target.value); }} />
                <input type="text" placeholder="colors" value={color3} onChange={(e) => { setColor3(e.target.value); }} />
            </div>

            <input type="file" id="file-input" multiple accept="image/*" onChange={(e) => setImages(e.target.files)}/>
            {/* <div id="image-preview">
                {images ? images.map((image, i) => <img src={image} key={i} />) : <p>No images</p>}
            </div> */}
            <input type="submit" value="Create" />
        </form>
      )}
        </>
      )}
    </div>
  )
}