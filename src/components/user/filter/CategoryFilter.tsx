'use client'


import {FilterI} from "@/components/user/product/Container";

interface CategoryFilterProps {
  categories: CategoryI[]
  handleFilter: (key: keyof FilterI, value: string) => void
  selectedCategory: string[]
}

const CategoryFilter = ({categories, handleFilter, selectedCategory}: CategoryFilterProps) => {

  if (categories.length === 0) return null


  return (
    <div>
      <h4 className='rounded text-center font-semibold p-2 bg-gray-200'>Filter By Category</h4>
      <hr className='my-2'/>

      <div className=''>

        {categories.map((category) => (
          <div key={category._id} className='flex items-center gap-2 mb-2 last:mb-0'>
            <input
              onChange={(e) => handleFilter('category', e.target.value)}
              id={category.name}
              checked={selectedCategory.includes(category.slug)}
              value={category.slug}
              name={category.name}
              type='checkbox'
            />

            <label htmlFor={category.name} className='select-none cursor-pointer hover:text-redBackground'
            >{category.name}</label>
          </div>
        ))}


      </div>

    </div>
  )
}

export default CategoryFilter
