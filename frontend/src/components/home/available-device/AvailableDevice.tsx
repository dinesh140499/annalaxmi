import playstore from '../../../assets/images/playstore-support.png'
import apple from '../../../assets/images/apple-support.png'
import { Link } from 'react-router-dom'
import products from '../../../assets/images/home/Products.png'
import details from '../../../assets/images/home/Details.png'

const AvailableDevice = () => {
  return (
    <section className='mt-20 bg-[#9DCFBB] lg:h-[400px] pt-5 pb-10  relative'>
      <div className="max-w-[85%] mx-auto">
        {/* <div className="lg:flex items-center justify-between w-full relative lg:h-full "> */}
        <div className="w-full relative lg:h-full py-20">
          {/* Left */}
          <div className='mt-5 lg:mt-0'>
            <div className='text-center lg:text-start'>
              <h1 className="font-bold text-2xl ">Shop Faster With AnnaLaxmi App</h1>
              <span className='text-[#7C7C7C] mt-3 text-sm inline-block'>Available on both IOS & Android</span>
            </div>
            <div>
              <div className="flex items-center mt-5 lg:mt-10">
                <Link to={'/'} className='h-[43px]'>
                  <img src={apple} className='h-full w-full object-contain' alt="apple" />
                </Link>
                <Link to={'/'} className='h-[50px]'>
                  <img src={playstore} className='h-full w-full object-contain' alt="playstore" />
                </Link>
              </div>
            </div>
          </div>
          {/* Right */}
          <div className=" h-full w-full">
            <div className='flex items-center  top-5 lg:absolute z-10 lg:top-0 lg:right-0'>
              <img src={products} className='h-[280px] lg:h-full lg:w-[220px] object-contain absolute right-[50px] lg:right-48' alt="products" />
              <img src={details} className='h-[280px] lg:h-full lg:w-[220px] object-contain ' alt="products" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AvailableDevice