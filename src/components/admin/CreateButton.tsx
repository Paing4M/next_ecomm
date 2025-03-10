import React from "react";

const CreateButton = ({openModal, children}: { openModal: () => void, children: string | React.ReactNode }) => {
  return (
    <button onClick={openModal}
            className='bg-blue-500 rounded py-2 px-4 text-white text-center'>
      {children}
    </button>
  )
}

export default CreateButton
