import { useState } from 'react';
import Breadcrumbs from '../../components/reusable/Breadcrumps';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import Otp from './Otp';
import { useMutation } from '@tanstack/react-query'
import { post } from '../../baseUrl';
import ErrorMsg from '../../components/reusable/ErrorMsg';

type PhoneInputState = {
    phone: string;
    country: string;
    // dialCode: string;
};

type PhoneData = {
    dialCode: string;
    countryCode: string;
};

const Login = () => {
    const [toggleOtp, setToggleOtp] = useState<boolean>(false);
    const [phoneInput, setPhoneInput] = useState<PhoneInputState>({
        phone: '',
        country: 'in',
        // dialCode: '91'
    });

    console.log("🤙",phoneInput)


    const mutation = useMutation({
        mutationFn: (payload: {
            phone: string;
        }) => post("default", "/login", payload),
        onSuccess: (res) => {
            console.log("OTP Sent!", res);
            setToggleOtp(true);
        },
        onError: (err) => {
            console.error("Login Error", err);
            setToggleOtp(false);
        },
    });
    

    const handleSendCode = async () => {
        mutation.mutate({
            phoneNo: phoneInput.phone
        });
    };


    return (
        <>
            <Breadcrumbs />
            {toggleOtp ? (
                <Otp phoneNo={phoneInput.phone} />
            ) : (
                <div className='max-w-[90%] w-full lg:max-w-[95%] mx-auto min-h-[40vh] lg:min-h-[50vh] flex justify-center items-center'>
                    <div>
                        <h1 className='text-md text-center text-green font-bold'>Mobile Number</h1>
                        <div className='mt-3'>
                            <PhoneInput
                                country={phoneInput.country}
                                enableSearch={true}
                                value={phoneInput.phone}
                                placeholder='91-99999-99999'
                                onChange={(value: string, data: PhoneData) => {
                                    setPhoneInput({
                                        phone: value,
                                        country: data.countryCode || '',
                                        dialCode: data.dialCode || ''
                                    });
                                }}
                                inputStyle={{
                                    width: "100%",
                                    padding: "8px 48px",
                                    fontSize: "16px",
                                    borderRadius: "0.375rem",
                                    backgroundColor: "#F0F5FA",
                                    border: "1px solid white",
                                    outline: "none",
                                    marginLeft: "10px",
                                    boxShadow:"none"
                                }}
                                buttonStyle={{ border: "none", backgroundColor: "#F0F5FA" }}
                                containerStyle={{ width: '100%' }}
                            />
                            <div className='text-center my-3 mb-5'>
                                {mutation.isPending && <p className='text-gray-400 capitalize'>Loading...</p>}

                                {mutation.isError && (
                                    <h1 className='text-red-500 text-sm '>
                                        {mutation.error instanceof Error ? <ErrorMsg message={mutation.error.message} /> : <p>Something went wrong</p>}
                                    </h1>
                                )}
                            </div>
                            {/* <h1 className='text-red-500 text-sm font-semibold'>Error</h1> */}
                        </div>
                        <button
                            className='w-full py-[10px] px-2 rounded-md bg-green text-white  cursor-pointer'
                            onClick={handleSendCode}
                        >
                            Send Code
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
