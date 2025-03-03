import React from "react";

const ModalTitle = ({children}: { children: React.ReactNode }) => {
  return (
    <h2 className='font-semibold text-lg capitalize'>{children}</h2>
  )
}

export default ModalTitle
