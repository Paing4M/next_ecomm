import ProductContainer from "@/components/admin/product/ProductContainer";
import {getCategoriesInUse} from "@/lib/actions/categoryActions";
import AdminLayout from "@/components/admin/AdminLayout";
import {getLimitProducts} from "@/lib/actions/productActions";
import {ProductSchemaI} from "@/lib/db/models/productModel";

const ProductPage = async () => {
  const products: ProductSchemaI[] = await getLimitProducts(20)
  const categories: CategoryI[] = await getCategoriesInUse()


  return (
    <AdminLayout>
      <ProductContainer products={products} categories={categories}/>
    </AdminLayout>
  )
}

export default ProductPage
