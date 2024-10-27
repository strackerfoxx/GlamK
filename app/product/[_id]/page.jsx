"use client"
import axios from "axios"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation";

import ReactImageMagnify from 'react-image-magnify';
import { toast, ToastContainer } from 'react-toastify';

import { useCart } from "@/app/hooks/useCart";
import { useProduct } from "@/app/hooks/useProduct";
import { useUser } from "@/app/hooks/useUser";

import Modal from "@/app/components/Modal";
import ReviewModal from "@/app/components/ReviewModal";

export default function Product({ params }) {
    const [product, setProduct] = useState({})
    const [reviews, setReviews] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState({ hexa: "", index: 0 })

    const [mainImage, setMainImage] = useState("")

    const { addProduct } = useCart()
    const { modal, setModal } = useProduct()
    const { token } = useUser()

    const router = useRouter()

    const quantityArray = []
    for (let i = 0; i < product.stock; i++) {
        quantityArray.push(i + 1)
    }

    let raiting = 0
    let totalRaiting = 0

    reviews.forEach((review) => {
        raiting += review.review.rating;
        totalRaiting = raiting / reviews?.length;
    })

    useEffect(() => {
        const getProduct = async () => {
            try {
                const { data } = await axios(`${process.env.NEXT_PUBLIC_API_URL}/products/getone?id=${params._id}`)

                setProduct(data.product)
                setColor({ hexa: data.product.colors[0] })
                setReviews(data.reviews)
                setMainImage(data.product?.images[0])

            } catch (error) {
                console.log(error.message)
            }
        }
        getProduct()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        addProduct(product, color.hexa, quantity)
    }

    return (
        <>
            {modal && (<Modal> <ReviewModal product={params._id} /> </Modal>)}

            <div className="main-container">
                <div className="detail">
                    <div className="detail-img">
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                src: mainImage
                            },
                            largeImage: {
                                src: mainImage,
                                width: 1300,
                                height: 1300
                            }
                        }} />
                        <div className="other-images">
                            {product?.images?.map((img) =>
                                <Image key={img} src={img} width={75} height={75} onMouseEnter={() => setMainImage(img)} alt={product?.name} />
                            )}
                        </div>
                    </div>
                    <div className="detail-info">
                        <span>{product.brand}</span>
                        <h1>{product?.name}</h1>
                        <h2>${product?.price} usd</h2>


                        <div className="colors">
                            {product?.colors?.map((color, index) => <button onClick={() => setColor({ hexa: color })}
                                className="color" key={color} style={{ backgroundColor: color }}></button>)}
                        </div>

                        <form onSubmit={handleSubmit}>
                            <select name="quantity" onChange={(e) => setQuantity(e.target.value)}>
                                {quantityArray?.map(q => <option key={q} value={q}>{q}</option>)}
                            </select>
                            <input type="submit" value="Add to cart" />
                        </form>
                    </div>
                </div>
                <hr />
                <div className="description">
                    <span>About the Product</span>
                    <p>{product?.description}</p>
                </div>
                <hr />



                <div className="reviews">
                    <div className="center">
                        <h3>Ratings & Reviews: <span>({reviews?.length})</span></h3>
                    </div>



                    <div id="ratings">
                        <div id="table">
                            {totalRaiting > 0 ? <h4>sumary: {totalRaiting}</h4> : <h4>No Reviews</h4>}
                            <p>5 stars</p>
                            <p>4 stars</p>
                            <p>3 stars</p>
                            <p>2 stars</p>
                            <p>1 star</p>
                        </div>

                        <div id="add-review" onClick={() => { if (token) { setModal(true) } else { router.push("/signup") } }}>
                            <h3>Write a Review</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>

                    </div>
                    {reviews?.map((review) => (
                        <div className="review" key={review.review._id}>
                            <h4>{review.author.name}</h4>
                            <h3>{review.review.title} | rating: {review.review.rating}</h3>
                            <p>{review.review.description}</p>
                            {review.review.images?.map((img) =>
                                <img key={img} src={img} alt={product?.name} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>

    )
}