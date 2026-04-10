import { IoIosWarning } from "react-icons/io";

type ErrorMsgType = {
    message: string
}

const ErrorMsg = ({ message }: ErrorMsgType) => {
    return (
        <div className="py-2 px-3 bg-[#ffa2a23b] capitalize w-full flex items-center  gap-3"> <IoIosWarning className="text-lg text-red-600"/> {message}</div>
    )
}

export default ErrorMsg