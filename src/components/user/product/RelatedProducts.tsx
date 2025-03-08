import {ProductSchemaI} from "@/lib/db/models/productModel";
import Title from "@/components/user/Title";
import ProductCard from "@/components/card/ProductCard";
import withProductCard from "@/lib/withProductCard";
import UserProductCard from "@/components/user/product/UserProductCard";


const ProductList = withProductCard(UserProductCard);
const RelatedProducts = ({products}: { products: ProductSchemaI[] }) => {

  if (products.length === 0) return null;

  return (
    <div className='mt-[8rem]'>
      <Title title='Related Items'/>
      <ProductList className='sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4' products={products}/>
    </div>
  )
}

export default RelatedProducts
