"use client"
import axios from "axios"
import "../css/review-modal.css"
import { useUser } from "../hooks/useUser"
import { useState } from "react"
import { toast, ToastContainer } from 'react-toastify';

export default function ReviewModal({ product }) {
    
    const [title, setTitle] = useState("")
    const [titleAlert, setTitleAlert] = useState("")

    const [description, setDescription] = useState("")
    const [descriptionAlert, setDescriptionAlert] = useState("")
    
    const [images, setImages] = useState([])

    const [rating, setRating] = useState(5)

    const { token } = useUser()

    const handleSubmitReview = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        if (title === "") setTitleAlert("Title is required")
        if (description === "") setDescriptionAlert("Description is required")
        if (title === "" || description === "") return

        const review = JSON.stringify({title, description, rating, product})
        formData.append('data', review.toString())

        const headers = { "Authorization": token, "Content-Type": "multipart/form-data" }
        try {
            const {data} = await axios.postForm(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, formData, {headers})
            toast(data.msg, { type: "success", position: "top-right" })
        } catch (error) {
            toast(error.message, { type: "error", position: "top-right" })
        }
    }

  return (
    <form className="review-form" onSubmit={handleSubmitReview}>
        <label>Write a review</label>

        <input type="text" name="title" placeholder="Write a title" style={{border: `${titleAlert !== "" ? " 1px solid red" : "none"}`}}
        onChange={(e) => {setTitle(e.target.value); setTitleAlert("")}} />
        {titleAlert !== "" && (<p className="error-text">{titleAlert}</p>)}

        <textarea type="text" name="description" placeholder="Write a review (max 255 characters)"
        style={{border: `${descriptionAlert !== "" ? "1px solid red" : "none"}`}}
        onChange={(e) => {setDescription(e.target.value); setDescriptionAlert("")}} minLength={5} maxLength="255" />
        {descriptionAlert !== "" && (<p className="error-text">{descriptionAlert}</p>)}

        <div id="rating-image">
            <select name="rating" id="rating" onChange={(e) => setRating(e.target.value)}>
                <option value={5}>5</option>
                <option value={4}>4</option>
                <option value={3}>3</option>
                <option value={2}>2</option>
                <option value={1}>1</option>
            </select>
            <input type="file" id="file-input" multiple accept="image/*" onChange={(e) => setImages(e.target.files)}/>
        </div>
        <input type="submit" />
    </form>
  )
}
