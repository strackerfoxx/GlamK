"use client"
import { useState, useEffect } from "react"
import { useProduct } from "../hooks/useProduct"
import { useCart } from "../hooks/useCart"
import { useUser } from "../hooks/useUser"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import "../css/search.css"

import Image from "next/image"

export default function Search() {
  const [productsFiltred, setProductsFiltred] = useState([])
  const [paramProducts, setParamProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])

  const { products, handleFavorite } = useProduct();
  const { favoriteList } = useUser()
  const { addProduct } = useCart()

  const router = useSearchParams().get("param")
  
  useEffect(() => {
    const productsState = []
    const categoriesState = []
    const brandsState = []

    if(!router){
      setProductsFiltred(products); 
      setParamProducts(products); 
      products.forEach(product => {
            if(!categoriesState.includes( product.category )) categoriesState.push(product.category)
            if(!brandsState.includes( product.brand )) brandsState.push(product.brand)
            console.log(product)
      })
      setCategories(categoriesState)
      setBrands(brandsState)
      return
    }

    const routerSeparated = router.toLowerCase().split(" ")

    products.forEach(product => {
      const nameSeparated = product.name.toLowerCase().split(" ")
      const categorySeparated = product.category.toLowerCase().split(" ")
      const brandSeparated = product.brand.toLowerCase().split(" ")

      if(!routerSeparated || routerSeparated.length === 0 ) return
      if (nameSeparated.includes(routerSeparated[0]) || categorySeparated.includes(routerSeparated[0]) || brandSeparated.includes(routerSeparated[0])) {
        productsState.push(product)
      }
    })

    productsState.forEach(product => {
      if(!categoriesState.includes( product.category )) categoriesState.push(product.category)
      if(!brandsState.includes( product.brand )) brandsState.push(product.brand)
    })

    if(!routerSeparated || routerSeparated.length === 0) return setProductsFiltred(products)
    setProductsFiltred(productsState)
    setParamProducts(productsState)
    setCategories(categoriesState)
    setBrands(brandsState)

  }, [products, router])
  
  const handleOrderBy = (e) => {
    const order = e.target.value

    if(order === "") setProductsFiltred(paramProducts)
    if(order === "desc") setProductsFiltred(productsFiltred.slice().sort((a, b) => b.price - a.price))
    if(order === "asc") setProductsFiltred(productsFiltred.slice().sort((a, b) => a.price - b.price))
  }

  const handleCategory = (e) => {
    const productsState = []

    if(e.target.value === "all") return setProductsFiltred(paramProducts)

    paramProducts.forEach(product => {
      if(product.category === e.target.value) productsState.push(product)
    })
  
    setProductsFiltred(productsState)
  }

  const handleBrand = (e) => {
    const productsState = []

    if(e.target.value === "all") return setProductsFiltred(paramProducts)

    paramProducts.forEach(product => {
      if(product.brand === e.target.value) productsState.push(product)
    })

    setProductsFiltred(productsState)
  }

  const handleCartClick = (product) => {
    let color = product.colors[0]
    if (!color) return addProduct(product)
    addProduct(product, color)
  };

  const handleHeartClick = (product) => {
    handleFavorite(product)
  };

  return (
    <div id="search-container">
      <aside>
        <select name="orderby" id="orderby" onChange={handleOrderBy}>
          <option value="">Order By</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
        <select name="category" id="category" onChange={handleCategory}>
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select name="brand" id="brand" onChange={handleBrand}>
          <option value="all">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </aside>
      <div id="products-container">
        <div className="products-list center">{productsFiltred.map(product => (
          <div className="product" key={product._id}>
            <div className="image-container">
                    <Link href={`/product/${product._id}`} className='link' id='image-link'>
                        <Image className="clickeable" src={product.images[0]} alt={product.description} width={"500"} height={"250"} />
                    </Link>
                    <svg xmlns="http://www.w3.org/2000/svg" fill={favoriteList?.some(productState => productState._id === product._id) ? "#da0b5b" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} className="heart-svg" onClick={() => handleHeartClick(product)}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </div>
            <Link href={`/product/${product._id}`} className='link'>
              <h3 className="clickeable">{product.name}</h3>
            </Link>
            <p>price: </p>

            <div className="price-stock">
              <p><span>${product.price}</span></p>
              <button className="cart-btn" onClick={() => handleCartClick(product)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </button>
            </div>
          </div>
        ))}</div>
      </div>
    </div>
  )
}
