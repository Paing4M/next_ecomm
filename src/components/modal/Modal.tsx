import React from "react";

export interface ModalProps {
  children: React.ReactNode
  closeModal: () => void
  open?: boolean
}

const Modal = ({children, closeModal, open}: ModalProps) => {

  if (!open) return null

  return (
    <div className='absolute inset-0 w-full h-full bg-black/80 flex items-center justify-center'>
      <div className='p-4 bg-white rounded-lg shadow-md'>
        {children}
      </div>

    </div>
  )
}

export default Modal
