import React from "react";

const ModelTitle = ({children}: { children: React.ReactNode }) => {
  return (
    <h2 className='font-semibold text-lg capitalize'>{children}</h2>
  )
}

export default ModelTitle
