'use client';

import Image from "next/image";
import Modal from "../Modal";

interface ImageModelProps{
    src?:string | null,
    isOpen?:boolean,
    onClose:()=>void
}
const ImageModel :React.FC<ImageModelProps> = ({onClose,isOpen,src}) => {
    if(!src){
        return null;
    }
    return (
    <Modal onClose={onClose} isOpen={isOpen} >
       <div className="w-80 h-80">
         <Image alt="Image" fill src={src} className="object-cover" />
       </div>
    </Modal>
  )
}

export default ImageModel
