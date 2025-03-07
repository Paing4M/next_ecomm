import ProductContainer from "@/components/admin/product/ProductContainer";
import {getAllCategories} from "@/lib/actions/categoryActions";
import AdminLayout from "@/components/admin/AdminLayout";

const ProductPage = async () => {
  const categories: CategoryHomeInterface[] = await getAllCategories()


  return (
    <AdminLayout>
      <ProductContainer categories={categories}/>
    </AdminLayout>
  )
}

export default ProductPage
