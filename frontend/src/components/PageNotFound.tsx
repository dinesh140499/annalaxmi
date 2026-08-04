import { Link } from 'react-router-dom'
import pagenotfound from '../assets/images/404.png'
import Breadcrumbs from './reusable/Breadcrumps'

const PageNotFound = () => {
  return (
    <>
        <Breadcrumbs />
        <div className='max-w-[90%] w-full lg:max-w-[95%] mx-auto'>
            <img src={pagenotfound} className='h-95 w-95 object-contain mx-auto' alt="page not found" title='Page Not Found' />
            <div className='text-center '>
                <h1 className='capitalize text-2xl font-bold '>Oops! page not found</h1>
                <p className='text-[#808080] text-md lg:text-sm mx-auto break-words mt-3'>Ut consequat ac tortor eu vehicula. Aenean accumsan purus eros. Maecenas sagittis tortor at metus mollis</p>
                <Link to={'/'} className='inline-block cursor-pointer capitalize bg-[#00603A] border border-[#00603A] rounded-full text-white px-3 py-2  mt-5 mb-15 duration-75 ease-in-out hover:bg-transparent hover:text-[#00603A] text-lg lg:text-sm lg:py-2 lg:px-3'>Back to Home</Link>
            </div>
        </div>
    </>
  )
}

export default PageNotFound