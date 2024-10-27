"use client"
import { useUser } from "../hooks/useUser"
import { useProduct } from "../hooks/useProduct"

export default function User() {
  const { cart, favoriteList, reviews } = useUser()
  const { handleFavorite } = useProduct()
  return (
    <div className="main-container">
      <h1>Profile</h1>

    </div>
  )
}
