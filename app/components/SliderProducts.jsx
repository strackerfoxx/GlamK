"use client"
import { useRef, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { useProduct } from '../hooks/useProduct';
import { useUser } from '../hooks/useUser';

import '../css/slider-products.css';

import Image from 'next/image';
import Link from 'next/link';

const Carousel = ({ products = [] }) => {
  const wrapperRef = useRef(null);
  const carouselRef = useRef(null);

  const { addProduct } = useCart();
  const { handleFavorite } = useProduct();
  const { favoriteList } = useUser()

  useEffect(() => {
    if(products.length > 0) {
      const carousel = carouselRef.current;
      const firstCardWidth = carousel.querySelector(".card").offsetWidth;
      const carouselChildren = [...carousel.children];
      const cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

      // Insert copies of the last few cards to the beginning of the carousel for infinite scrolling
      carouselChildren.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
      });

      // Insert copies of the first few cards to the end of the carousel for infinite scrolling
      carouselChildren.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
      });

      const handleScroll = () => {
        // If the carousel is at the beginning, scroll to the end
        if (carousel.scrollLeft === 0) {
          carousel.classList.add("no-transition");
          carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
          carousel.classList.remove("no-transition");
        }
        // If the carousel is at the end, scroll to the beginning
        else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
          carousel.classList.add("no-transition");
          carousel.scrollLeft = carousel.offsetWidth;
          carousel.classList.remove("no-transition");
        }
      };

      carousel.addEventListener("scroll", handleScroll);

      // Cleanup event listeners on component unmount
      return () => {
        carousel.removeEventListener("scroll", handleScroll);
      };
    }
  }, [products]);

  const handleLeftClick = () => {
    const carousel = carouselRef.current;
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    carousel.scrollLeft -= firstCardWidth;
  };

  const handleRightClick = () => {
    const carousel = carouselRef.current;
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    carousel.scrollLeft += firstCardWidth;
  };

  const handleCartClick = (product) => {
    let color = product.colors[0]
    if(!color) return addProduct(product)
    addProduct(product, color)
  };

  const handleHeartClick = (product) => {
    handleFavorite(product)
  };

  return (
    <div className="wrapper" ref={wrapperRef}>
      <i id="left" className="fa-solid fa-angle-left" onClick={handleLeftClick}>&lt;</i>
      <ul className="carousel" ref={carouselRef}>
          {products.map((product) => (
            <li className="card" key={product._id}>
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
                    <span>${product.price}</span>
                    <button className="cart-btn" onClick={() => handleCartClick(product)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </button>
                </div>
            </li>
          ))}
      </ul>
      <i id="right" className="fa-solid fa-angle-right" onClick={handleRightClick}>&gt;</i>
    </div>
  );
};

export default Carousel;
