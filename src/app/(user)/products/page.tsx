import {Metadata} from "next";
import {getAllProductBrands, getFilteredProducts, getProductTags} from "@/lib/actions/productActions";
import {getCategoriesInUse} from "@/lib/actions/categoryActions";
import Container from "@/components/user/product/Container";

export const metadata: Metadata = {
  title: 'Shop',
}

interface ShopPageProps {
  searchParams: Promise<{ [key: string]: string[] | string | undefined }>
}

const ShopPage = async ({searchParams}: ShopPageProps) => {
  const params = await searchParams

  const brands: string[] = await getAllProductBrands()
  const categories: CategoryI[] = await getCategoriesInUse()
  const products = await getFilteredProducts(params)
  const tags = await getProductTags()


  return (
    <div className='py-3 h-fit '>
      <Container tags={tags!} categories={categories} brands={brands} products={products}/>
    </div>
  )
}
export default ShopPage
