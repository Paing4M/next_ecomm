import withProductCard from "@/lib/withProductCard";
import ProductCard from "@/components/card/ProductCard";
import {ProductSchemaI} from "@/lib/db/models/productModel";

const ProductList = withProductCard(ProductCard)

const AdminProductList = ({products}: { products: ProductSchemaI[] }) => {
  return (
    <ProductList products={products}/>
  )
}

export default AdminProductList
