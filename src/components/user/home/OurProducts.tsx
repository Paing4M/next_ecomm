import Title from "@/components/user/Title";
import React from "react";
import {ProductSchemaI} from "@/lib/db/models/productModel";
import UserProductCard from "@/components/user/product/UserProductCard";
import withProductCard from "@/lib/withProductCard";
import ProductsLink from "@/components/user/product/ProductsLink";

const ProductList = withProductCard(UserProductCard)

const OurProducts = ({products}: { products: ProductSchemaI[] }) => {

  if (products.length == 0) return null;

  return (
    <>
      <div>
        <Title title={'Our Products'}/>

        <h1 className='text-xl font-bold'>Explore Our Products</h1>

        <div className='mt-5'>
          <ProductList className='sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' products={products}/>
        </div>
      </div>

      <ProductsLink/>
      <hr/>

    </>
  )
}

export default OurProducts
