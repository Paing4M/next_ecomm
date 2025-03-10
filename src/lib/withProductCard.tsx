import {ProductSchemaI} from "@/lib/db/models/productModel";
import {ComponentType} from "react";

interface ProductListProps {
  products: ProductSchemaI[]
  className?: string
  handleEdit?: (product: ProductSchemaI) => void
  handleDelete?: (id: string) => void
}

const withProductCard = (CardComponent: ComponentType<{
  product: ProductSchemaI,
  handleEdit: (product: ProductSchemaI) => void
  handleDelete: (id: string) => void
}>) => {

  return function ProductList({products, className, handleEdit, handleDelete}: ProductListProps) {
    if (products.length === 0) return <p className='text-redBackground text-center w-full p-2'>No product found.</p>

    return (

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
        {products.map((product) => (
          <CardComponent handleDelete={handleDelete!} handleEdit={handleEdit!} key={product._id} product={product}/>
        ))}
      </div>

    )
  }

}

export default withProductCard;