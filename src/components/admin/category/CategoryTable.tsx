import {PencilIcon, Trash2Icon} from "lucide-react";

interface CategoryTableProps {
  categories: CategoryI[]
  handleEdit: (category: CategoryI) => void
  handleDelete: (id: string) => void
}


const CategoryTable = ({categories, handleEdit, handleDelete}: CategoryTableProps) => {

  if (categories && categories.length === 0) return <p className='text-sm text-redBackground text-center py-3'>No
    Category Found.</p>

  return (
    <div className=' overflow-x-auto z-[1]'>
      <table className='w-full text-left'>
        <thead className='text-gray-700 uppercase bg-white'>
        <tr>
          <th scope='col' className='table_p hidden md:inline-block'>ID</th>
          <th scope='col' className='table_p'>Name</th>
          <th scope='col' className='table_p'>Slug</th>
          <th scope='col' className='table_p'>Action</th>
        </tr>
        </thead>

        <tbody>
        {categories.map(category => (
          <tr key={category._id} className='border-b border-gray-300'>
            <th scope='row' className='table_p font-bold hidden md:inline-block'>{category._id}</th>
            <th scope='row' className='table_p font-bold '>{category.name}</th>
            <td className='table_p text-gray-600'>{category.slug}</td>
            <td className='table_p text-gray-600'>
              <div className='flex gap-2'>

                <button
                  onClick={() => handleDelete(category._id)}
                  className='min-w-[60px] flex items-center justify-center rounded text-gray-200 px-2 bg-redBackground py-1'>
                  <Trash2Icon/>
                </button>
                <button
                  onClick={() => handleEdit(category)}
                  className='min-w-[60px] flex items-center justify-center rounded text-gray-200 px-2 bg-green-500 py-1'>
                  <PencilIcon/></button>

              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default CategoryTable
