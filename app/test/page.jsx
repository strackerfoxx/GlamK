"use client"
import ReactImageMagnify from 'react-image-magnify';
import SliderProducts from '../components/SliderProducts';
import Modal from '../components/Modal';
import { useCart } from '../hooks/useCart';
import '../css/test.css';

const App = () => {
  return (
    <div>
      <h1>Product Slider</h1>
      {/* <div id="image-container">
          <img src="../advertising1.jpg" alt="Imagen Original" className="original-image" />
          <div className="zoomed-image-container">
              <img src="../advertising1.jpg" alt="Imagen con Zoom" className="zoomed-image" />
          </div>
      </div> */}
      <div style={{ width: "500px", height: "600px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ReactImageMagnify {...{
          smallImage: {
            alt: 'Wristwatch by Ted Baker London',
            isFluidWidth: true,
            src: "${process.env.NEXT_PUBLIC_API_URL}/products/getimages?img=HQEIhaRu7vGU5SRZ.dRP.jpeg"
          },
          largeImage: {
            src: "${process.env.NEXT_PUBLIC_API_URL}/products/getimages?img=HQEIhaRu7vGU5SRZ.dRP.jpeg",
            width: 1800,
            height: 900
          }
        }} />
        <p>text</p>
      </div>
      {/* <SliderProducts /> */}
    </div>
  );
};

export default App;