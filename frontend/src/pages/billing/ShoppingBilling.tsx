import Breadcrumbs from "../../components/reusable/Breadcrumps"
import Divider from "../../components/reusable/Divider"
import InputField from "../../components/reusable/InputField"
import SelectInput from "../../components/reusable/SelectInput"
import dummyImg from '../../assets/images/products/freeimg.png'


const ShoppingBilling = () => {
  const handleInput = () => {

  }
  return (
    <>
      <Breadcrumbs />
      <div className="max-w-[90%] w-full lg:max-w-[95%] mx-auto lg:relative">
        <div className="lg:flex gap-3">
          <div className="flex-1/2">
            <div className="max-w-[95%] w-full mx-auto lg:relative py-5">
              <h1 className="text-lg text-green font-bold">Billing Information</h1>
              {/* Row */}
              <div className="lg:flex items-center gap-3">
                <div className="mt-3 lg:flex-1">
                  <label htmlFor="fname" className="block lg:text-sm">First Name</label>
                  <InputField inputType="text" placeholder="Your First Name" name="fname" id="fname" onChange={handleInput} className="mt-2 py-2 w-full" />
                </div>
                <div className="mt-3 lg:flex-1">
                  <label htmlFor="lname" className="block lg:text-sm">Last Name</label>
                  <InputField inputType="text" placeholder="Your Last Name" name="lname" id="lname" onChange={handleInput} className="mt-2 py-2 w-full" />
                </div>
                <div className="mt-3 lg:flex-1">
                  <label htmlFor="cname" className="block lg:text-sm">Company Name <span className="text-[#808080]">(optional)</span></label>
                  <InputField inputType="text" placeholder="Your Company Name" name="cname" id="cname" onChange={handleInput} className="mt-2 py-2 w-full" />
                </div>
              </div>
              {/* Column */}
              <div className="mt-3 lg:flex-1">
                <label htmlFor="street" className="block lg:text-sm">Street Address</label>
                <InputField inputType="text" name="street" id="street" onChange={handleInput} className="mt-2 py-2 w-full" />
              </div>
              {/* Row */}
              <div className="lg:flex items-center gap-3 lg:max-w-[80%]">
                <div className="mt-3 lg:w-1/4">
                  <label htmlFor="country" className="block lg:text-sm">Country</label>
                  <SelectInput arrItem={[{ optVal: "India", optValName: "India" }, { optVal: "US", optValName: "US" }]} name="country" onChange={handleInput} id="country" className="mt-2"></SelectInput>
                </div>
                <div className="mt-3 lg:w-1/5">
                  <label htmlFor="state" className="block lg:text-sm">State</label>
                  <SelectInput arrItem={[{ optVal: "Delhi", optValName: "Delhi" }, { optVal: "Delhi", optValName: "Delhi" }]} name="state" onChange={handleInput} id="state" className="mt-2"></SelectInput>
                </div>
                <div className="mt-3 lg:w-1/7">
                  <label htmlFor="zip-code" className="block lg:text-sm">Zip Code</label>
                  <InputField inputType="text" name="zip-code" id="zip-code" onChange={handleInput} placeholder="Zip Code" className="mt-2 py-2 w-full" />
                </div>

              </div>
              {/* Row */}
              <div className="lg:flex items-center gap-3">
                <div className="mt-3 w-full">
                  <label htmlFor="email" className="block lg:text-sm">Email </label>
                  <InputField inputType="email" placeholder="Email Address" name="email" id="email" onChange={handleInput} className="mt-2 py-2 w-full" />
                </div>
                <div className="mt-3 w-full">
                  <label htmlFor="phone" className="block lg:text-sm">Phone </label>
                  <InputField inputType="text" placeholder="Phone Number" name="phone" id="phone" onChange={handleInput} className="mt-2 py-2 w-full" />
                </div>
              </div>

              {/* Column */}
              <div className="mt-3 flex  gap-3 items-baseline">
                <InputField inputType="checkbox" name="checkbox" id="checkbox" onChange={handleInput} className="mt-1 py-2 w-3 h-3" />
                <label htmlFor="checkbox" className="block lg:text-sm">Ship to a different address</label>
              </div>

              <Divider />
              <div className="mt-5">
                <h1 className="text-lg font-bold">Additional Info</h1>
                <div className="mt-3 lg:flex-1">
                  <label htmlFor="cname" className="block lg:text-sm">Order Notes (Optional) <span className="text-[#808080]">(optional)</span></label>
                  <textarea name="order-notes" id="order-notes" onChange={handleInput} className="mt-2 py-1 lg:text-sm px-3 border w-full border-[#E6E6E6] outline-[#00603A] rounded-sm " rows={4} cols={100} placeholder="Notes about your order, e.g. special notes for delivery"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1/4">
            <div className="border border-[#E6E6E6] rounded-sm p-3 py-5 mt-5">
              <h1 className="font-semibold text-md mb-3">Order Summary</h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={dummyImg} className="h-10 w-10" alt="" />
                  <h1 className="lg:text-sm">Pulses x 5</h1>
                </div>
                <p className="lg:text-sm font-semibold">$70.00</p>
              </div>
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <h1 className="lg:text-[13px] text-[#4D4D4D]">Subtotal:</h1>
                  <h1 className="lg:text-[13px] text-[#1A1A1A]"><b>$0</b></h1>
                </div>
                <Divider marginY="my-3" />
              </div>
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <h1 className="lg:text-[13px] text-[#4D4D4D]">Shipping:</h1>
                  <h1 className="lg:text-[13px] text-[#1A1A1A]"><b>$0</b></h1>
                </div>
                <Divider marginY="my-3" />
              </div>
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <h1 className="text-[14px] text-[#4D4D4D] text-lg">Total:</h1>
                  <h1 className="text-lg text-[#1A1A1A]"><b>$84.00</b></h1>
                </div>
                <Divider marginY="my-3" />
              </div>

              <div className="mt-5">
                <h1 className="font-semibold text-md mb-3">Order Summary</h1>
                <div className="mt-3 flex items-center gap-1">
                  <InputField inputType="radio" value="case-on" name="payment" onChange={handleInput} id="case-on" className="border rounded-full " />
                  <label htmlFor="case-on" className="block lg:text-[13px] ">Cash On Delivery</label>
                </div>
                <div className="mt-2 flex items-center gap-1">
                  <InputField inputType="radio" value="paypal" name="payment" onChange={handleInput} id="paypal" />
                  <label htmlFor="paypal" className="block lg:text-[13px] ">Paypal</label>
                </div>
                <div className="mt-2 flex items-center gap-1">
                  <InputField inputType="radio" value="amazon-pay" name="payment" onChange={handleInput} id="amazon-pay" />
                  <label htmlFor="amazon-pay" className="block lg:text-[13px] ">Amazon Pay</label>
                </div>
                <button className="mt-3 rounded-lg lg:text-sm bg-[#00603A] text-white w-full py-3 cursor-pointer duration-300 hover:tracking-wide">Place Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// const OrderSummary=()=>{
//   return(
//     <>
//     </>
//   )
// }

export default ShoppingBilling