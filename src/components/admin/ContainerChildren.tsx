import React from "react";

const ContainerChildren = ({children}: { children: React.ReactNode }) => {
  return (
    <div className='mt-3'>
      {children}
    </div>
  )
}

export default ContainerChildren
