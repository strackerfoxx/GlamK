"use client"
import { useProduct } from "./hooks/useProduct";

import Slider from "./components/Slider";
import SliderProducts from "./components/SliderProducts";

export default function Home() {

  const images = [
    <img
        src="/advertising1.jpg"
        alt="Previous"
      />,
      <img
        src="/advertising2.jpg"
        alt="Current"
      />,
      <img
        src="/advertising3.jpg"
        alt="Next"
      />
  ];
  const {products} = useProduct()
  return (
    <div className="main-container">
        <Slider items={images} />
        
        <div className="center">
          <div className="main-container center">
              <SliderProducts products={products}/>
          </div>
        </div>
    </div>
  );
}
