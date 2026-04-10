import CheckoutCom from "../../components/cart/Checkout"
import Breadcrumbs from "../../components/reusable/Breadcrumps"

const Checkout = () => {

  return (
    <>
      <Breadcrumbs />
      <div className='max-w-[90%] w-full lg:max-w-[95%] mx-auto lg:relative'>
        <CheckoutCom />
      </div>
    </>
  )
}

export default Checkout