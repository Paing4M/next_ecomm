import {Metadata} from "next";
import {getAllProductBrands, getFilteredProducts} from "@/lib/actions/productActions";
import {getAllCategories} from "@/lib/actions/categoryActions";
import FilterContainer from "@/components/filter/FilterContainer";
import ProductList from "@/components/product/ProductList";
import Container from "@/components/product/Container";

export const metadata: Metadata = {
  title: 'Shop',
}

interface ShopPageProps {
  searchParams: Promise<{ [key: string]: string[] }>
}

const ShopPage = async ({searchParams}: ShopPageProps) => {
  const {brand, category, sort} = await searchParams
  const brands: string[] = await getAllProductBrands()
  const categories: CategoryHomeInterface[] = await getAllCategories()
  const products = await getFilteredProducts({brand, category})


  return (
    <div className='py-3 h-fit '>
      <Container categories={categories} brands={brands} products={products}/>
    </div>
  )
}
export default ShopPage
