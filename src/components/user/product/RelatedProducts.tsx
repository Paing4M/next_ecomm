import {ProductShemaI} from "@/lib/db/models/productModel";
import Title from "@/components/Title";
import ProductCard from "@/components/product/ProductCard";

const RelatedProducts = ({products}: { products: ProductShemaI[] }) => {

  if (products.length === 0) return null;

  return (
    <div className='mt-[8rem]'>
      <Title title='Related Items'/>
      <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>

        {products.map(product => (
          <ProductCard key={product._id} product={product}/>
        ))}


      </div>
    </div>
  )
}

export default RelatedProducts
