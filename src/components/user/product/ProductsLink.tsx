import Link from "next/link";

const ProductsLink = () => {
  return (
    <div className='my-6 flex items-center justify-center'>
      <Link href={'/products'} className='px-3 py-2 rounded text-white bg-redBackground'>View all products</Link>
    </div>
  )
}

export default ProductsLink
