import type {Metadata} from "next";
import {redirect} from "next/navigation";
import {getProductBySlug, getRelatedProductByCategory} from "@/lib/actions/productActions";
import ProductDetail from "@/components/user/product/ProductDetail";
import RelatedProducts from "@/components/user/product/RelatedProducts";

export const metadata: Metadata = {
  title: 'Product Detail',
};

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>
}


const ProductDetailPage = async ({params}: ProductDetailPageProps) => {
  const {slug} = await params
  if (!slug) return redirect('/')

  const product = await getProductBySlug(slug)
  const relatedProducts = await getRelatedProductByCategory(slug)

  return (
    <div className='py-3'>
      <ProductDetail product={product}/>

      <RelatedProducts products={relatedProducts}/>

    </div>
  )
}

export default ProductDetailPage
