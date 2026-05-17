import projectLogo from "../assets/project-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setButton } from "../features/commonSlice";
import { type RootState } from "../store/store";
import ShopCard from "./common/ShopCard";
import { GiHamburgerMenu } from "react-icons/gi";
import { type SubMenuProps } from "./SubMenu";
import SearchFilter from "./reusable/SearchFilter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { get } from "../baseUrl";

const Navbar = ({ setToggleSidebar }: SubMenuProps) => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: () => get("default", "auth/logout"),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

      navigate("/login");
    },
  });
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.common.button.cart);

  const handleToggleCart = () => {
    dispatch(setButton({ cart: !cart }));
  };

  return (
    <>
      <div>
        <span className="text-sm bg-yellow text-green py-2 w-full block text-center font-light">
          Sarojini, Delhi, India
        </span>
        <nav className="max-w-[95%] w-full mx-auto ">
          <div className="flex items-center gap-10 w-full flex-col-reverse lg:flex-row">
            <div className="w-full lg:w-[55%]">
              <div className="flex flex-col lg:items-center gap-5 lg:flex-row">
                <Link
                  to={"/"}
                  className="bg-[#FFD75E] lg:bg-transparent p-3 rounded-b-2xl  hidden lg:block"
                >
                  <img
                    src={projectLogo}
                    className="h-20 w-20 lg:h-auto lg:w-auto object-contain"
                    alt="project logo"
                  />
                </Link>
                <div className="flex gap-3 lg:w-full">
                  <SearchFilter />
                  <button className="text-3xl lg:hidden">
                    <GiHamburgerMenu onClick={() => setToggleSidebar(true)} />
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:w-[45%]">
              <div className="flex items-center gap-3 justify-between relative">
                <Link
                  to={"/"}
                  className="bg-[#FFD75E] lg:bg-transparent p-3 rounded-b-2xl  lg:hidden "
                >
                  <img
                    src={projectLogo}
                    className=" w-30 lg:h-auto lg:w-auto object-contain"
                    alt="project logo"
                  />
                </Link>
                <div className="flex items-center gap-3">
                  <FaUser className="text-2xl lg:text-lg text-green" />

                  <div>
                    <p className="text-[13px]">
                      {user ? "Welcome" : "Account:"}
                    </p>

                    {user ? (
                      <Link
                        to={"/account/dashboard"}
                        className="text-[13px] text-[#006039]"
                      >
                        {user?.firstname}
                      </Link>
                    ) : (
                      <Link
                        to={"/login"}
                        className="text-[13px] text-[#989898] border-b duration-75 border-white hover:border-b-[#00603A] hover:text-[#006039]"
                      >
                        Login/Register
                      </Link>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  {user ? (
                    <button
                      onClick={() => logoutMutation.mutate()}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <FaRegUser className="text-2xl text-green" />
                      <p className="hidden text-[#989898] border-b duration-75 border-white hover:border-b-[#00603A] lg:inline-block">
                        {logoutMutation.isPending ? "Logging out..." : "Logout"}
                      </p>
                    </button>
                  ) : (
                    <Link
                      to={"/login"}
                      className="flex items-center gap-3 cursor-pointer "
                    >
                      <FaRegUser className="text-2xl text-green" />
                      <p className="hidden text-[#989898] border-b duration-75 border-white hover:border-b-[#00603A] lg:inline-block">
                        Login
                      </p>
                    </Link>
                  )}
                  <div className="h-5 w-[1px] bg-green"></div>
                  <Link
                    to={"/"}
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={handleToggleCart}
                  >
                    <IoCartOutline className="text-2xl text-green" />
                    <p className="hidden text-[#989898] border-b duration-75 border-white hover:border-b-[#00603A] lg:inline-block">
                      Cart
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Cart Button Toggle */}
      <ShopCard />
    </>
  );
};

export default Navbar;
