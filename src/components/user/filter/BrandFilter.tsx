import Link from "next/link";
import {FilterI} from "@/components/user/product/Container";

interface BrandFilterProps {
  brands: string[];
  handleFilter: (key: keyof FilterI, value: string) => void
  selectedBrand: string[]
}

const BrandFilter = ({brands, handleFilter, selectedBrand}: BrandFilterProps) => {

  if (brands.length === 0) return null;

  return (
    <div>
      <h4 className=' font-semibold bg-gray-200 p-2
       rounded text-center'>Filter By Brand</h4>
      <hr className='my-2'/>

      <div>
        {brands.map((brand) => (
          <div key={brand} className='flex items-center gap-2 mb-2 last:mb-0'>
            <input
              onChange={(e) => handleFilter('brand', e.target.value)}
              id={brand}
              checked={selectedBrand.includes(brand)}
              value={brand}
              name={brand}
              type='checkbox'
            />

            <label htmlFor={brand} className='select-none cursor-pointer hover:text-redBackground'
            >{brand}</label>
          </div>
        ))}


      </div>

    </div>
  )
}

export default BrandFilter
