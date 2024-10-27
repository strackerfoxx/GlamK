"use client"
import { useState } from "react"
import "@/app/css/admin.css";

export default function ProductForm({ handle }) {
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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name === "") setNameAlert("Name is required")
        if (description === "") setDescriptionAlert("Description is required")
        if (price === "") setPriceAlert("Price is required")
        if (discount === "") setDiscountAlert("Discount is required")
        if (parseInt(discount) > 90) setDiscountAlert("Discount CAN NOT be more than 90%")
        if (stock === "") setStockAlert("Stock is required")
        if (brand === "") setBrandAlert("Brand is required")
        if (category === "") setCategoryAlert("Category is required")
        if (name === "" || description === "" || price === "" || discount === "" || stock === "" || brand === "" || category === "") return

        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
        }

        const product = JSON.stringify({ name, description, price, discount, stock, brand, category, colors: color1 == ! "" || color2 == ! "" || color3 == ! "" ? `[${color1}, ${color2}, ${color3}]` : [] })
        formData.append('data', product.toString())

        handle(formData)
    }
  return (
    <form onSubmit={handleSubmit}>
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
  )
}
