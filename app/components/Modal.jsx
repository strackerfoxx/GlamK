"use client"
import {useEffect, useRef} from 'react'
import { useProduct } from '../hooks/useProduct';
import "../css/modal.css"


export default function Modal({children}) {
  const { modal, setModal } = useProduct();
  const overlayModalRef = useRef(null);
  useEffect(() => {
    const overlayModal = overlayModalRef.current;
    document.body.style.overflow = "hidden";

    overlayModal.addEventListener('click', function(event) {
        if (event.target === overlayModal) {
            document.body.style.overflow = "auto";
            return setModal(false);
        }
    });
  }, [modal])

  return (
    <div id='overlay-modal' ref={overlayModalRef}>
        <div id="modal-container">
            {children}
        </div>
    </div>
  )
}
