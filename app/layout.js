"use client";
import "./css/globals.css";
import "./css/main.css";
import "./css/products.css";
import "./css/product-page.css";
import "./css/sign.css";
import "./css/header.css";
import "./css/alert.css";

import "react-toastify/dist/ReactToastify.css";

import { UserProvider } from "./context/UserProvider";
import { PostProvider } from "../app/context/ProductProvider"
import { CartProvider } from "./context/CartProvider";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Link from "next/link";

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  useEffect(() => {
    if(active){
      document.body.style.overflow = 'hidden';
    }else{
      document.body.style.overflow = 'auto';
    }
  }, [active])
  
  return (
    <html lang="es">
        <head>
          <title>GlamK</title>
          <meta name="description" content="Explora nuestra tienda en línea de maquillaje para encontrar una amplia gama de 
          productos de alta calidad Descubre las últimas tendencias en maquillaje y encuentra tus productos 
          escindibles para lograr looks deslumbrantes. ¡Aprovecha nuestras promociones exclusivas y envío rápido! Haz tu pedido hoy mismo."/>
        </head>
      <body>
        <UserProvider>
            <PostProvider>
                <CartProvider >
                    {pathname !== "/signin" && pathname !== "/signup" && pathname !== "/admin" && pathname !== "/admin/create" &&  <Header active={active} setActive={setActive}/>}
                    <main>
                    <ToastContainer
                        position="top-right"
                        autoClose={1000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                      {active &&
                        <aside id="overlay">
                            <div id="overlay-content" >
                              <Link href="/">
                                <h2>GlamK</h2>
                              </Link>
                              <Link href="/profile">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6" id="profile-icon">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                  </svg>
                              </Link>
                              
                              <Link href="/cart" className="icon-link">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                  </svg>
                                  <p>Cart</p>
                              </Link>
                              <Link href="/favorites" className="icon-link">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="heart-svg" onClick={() => handleHeartClick(product)}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                  </svg>
                                  <p>Favorites</p>
                              </Link>
                              <Link href={"/configurations"} className="icon-link">
                                  <p>Config</p>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                  </svg>
                              </Link>
                            </div>
                            <div onClick={() => setActive(!active)}>

                            </div>
                        </aside>
                      }
                      {children}
                    </main>
                    {pathname !== "/signin" && pathname !== "/signup" && pathname !== "/admin" && pathname !== "/admin/create" && <Footer />}
                </CartProvider>
            </PostProvider>
        </UserProvider>
      </body>
    </html>
  );
}
