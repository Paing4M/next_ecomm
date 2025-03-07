'use client'

import {ProductSchemaI} from "@/lib/db/models/productModel";
import withProductCard from "@/lib/withProductCard";
import UserProductCard from "@/components/user/product/UserProductCard";

interface ProductListProps {
  products: ProductSchemaI[]
}

const ProductList = withProductCard(UserProductCard)

const UserProductList = ({products}: ProductListProps) => {
  return <ProductList products={products}/>
}

export default UserProductList
