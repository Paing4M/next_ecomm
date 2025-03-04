import ProductContainer from "@/components/admin/product/ProductContainer";
import {getAllCategories} from "@/lib/actions/categoryActions";

const ProductPage = async () => {
  const categories: CategoryHomeInterface[] = await getAllCategories()


  return (
    <ProductContainer categories={categories}/>
  )
}

export default ProductPage
