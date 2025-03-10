import AdminLayout from "@/components/admin/AdminLayout";
import {getAllCategories} from "@/lib/actions/categoryActions";
import CategoryContainer from "@/components/admin/category/CategoryContainer";

const CategoryPage = async () => {
  const categories: CategoryI[] = await getAllCategories() || []


  return (
    <AdminLayout>
      <CategoryContainer categories={categories}/>
    </AdminLayout>
  )
}

export default CategoryPage
