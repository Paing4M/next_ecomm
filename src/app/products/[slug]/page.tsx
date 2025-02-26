import type {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Product Details',
};


const Page = async ({params}) => {

  const test = await params
  console.log(test)


  return (
    <div className='py-3'></div>
  )
}

export default Page
