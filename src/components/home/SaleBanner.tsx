import {SaleInterface} from "@/lib/db/models/saleModel";

const SaleBanner = ({sale}: { sale: SaleInterface }) => {

  if (!sale) return

  return (
    <div>
      <div className='w-full h-[300px] relative bg-gradient-to-br from-sky-300 to-black/90 rounded-md backdrop-blur-lg'>
        <div className='w-full md:w-[50%] absolute  bottom-[15%] left-4'>
          <h3 className='text-white text-[2rem] md:text-[3rem] font-semibold text-wrap leading-none'>
            {sale.name}
          </h3>
          <h3 className='text-white text-[2rem] md:text-[3rem] font-semibold text-wrap leading-none'>
            Up to {sale.discount}% off
          </h3>

          <p className='text-white font-semibold text-lg mt-3'>Use this coupon code : {sale.coupon}</p>
        </div>
      </div>
    </div>
  )
}

export default SaleBanner
