import React from "react";

interface ContainerHeaderProps {
  handleSearch: (value: string) => void
  openModal: () => void
  buttonText: string
}

const ContainerHeader = ({handleSearch, openModal, buttonText}: ContainerHeaderProps) => {
  return (
    <div className='gap-2 flex justify-between items-end md:items-center flex-col-reverse md:flex-row'>
      <input
        onChange={(e) => handleSearch(e.target.value)}
        className='py-2 px-4 focus:ring-2 outline-none focus:ring-blue-500 broder rounded w-full shadow max-w-[500px]'
        type="text"
        placeholder='Search ...'/>

      <button onClick={openModal}
              className='bg-blue-500 rounded py-2 px-4 text-white text-center'>
        {buttonText}
      </button>

    </div>
  )
}

export default ContainerHeader
