import withProductCard from "@/lib/withProductCard";
import {ProductSchemaI} from "@/lib/db/models/productModel";
import AdminProductCard from "@/components/admin/product/AdminProductCard";

interface AdminProductListProps {
  products: ProductSchemaI[];
  handleEdit: (product: ProductSchemaI) => void;
  handleDelete: (id: string) => void;
}

const ProductList = withProductCard(AdminProductCard)

const AdminProductList = ({products, handleEdit, handleDelete}: AdminProductListProps) => {
  return (
    <ProductList
      handleDelete={handleDelete} handleEdit={handleEdit}
      className='grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      products={products}/>
  )
}

export default AdminProductList
