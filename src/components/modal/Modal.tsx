import React from "react";
import ModalTitle from "@/components/modal/ModalTitle";
import {XIcon} from "lucide-react";

export interface ModalProps {
  children: React.ReactNode
  closeModal: () => void
  open?: boolean
}

const Modal = ({children, closeModal, open}: ModalProps) => {

  if (!open) return null

  return (
    <div
      className='absolute inset-0 w-screen h-screen bg-black/80 flex items-center justify-center '>
      <div
        className='overflow-y-scroll scrollbar-hide max-h-[calc(100vh-30px)] p-4 w-full max-w-[550px] bg-white rounded-lg shadow-md relative mx-4'>
        {children}

        <XIcon onClick={closeModal} className='absolute cursor-pointer right-4 top-4 w-6 h-6 text-black'/>
      </div>
    </div>
  )
}

Modal.Title = ModalTitle

export default Modal
