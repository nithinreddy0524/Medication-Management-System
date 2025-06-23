import React, { useEffect, useRef, useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OtpVerification = () => {
    const [data, setData] = useState(["","","","","",""])
    const navigate = useNavigate()
    const inputRef = useRef([])
    const location = useLocation()

    // console.log("location",location)

    useEffect(()=>{
        if(!location?.state?.email){
            navigate("/forgot-password")
        }
    },[])

    const valideValue = data.every(el => el)

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.forgot_password_otp_verification,
                data : {
                    otp : data.join(""),
                    email : location?.state?.email
                }
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData(["","","","","",""])
                navigate("/reset-password",{
                    state : {
                        data : response.data,
                        email : location?.state?.email
                    }
                })
            }

        } catch (error) {
            // console.log('error',error)
            AxiosToastError(error)
        }



    }

    return (
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-[calc(100vh-6rem)] flex items-center justify-center px-2 sm:px-4">
            <div className="w-full max-w-lg mx-auto rounded-xl shadow-lg bg-white p-4 sm:p-8 md:p-12 flex flex-col items-center gap-4 sm:gap-6">
                <p className="font-semibold text-lg sm:text-xl md:text-2xl text-blue-700 mb-2">Enter OTP</p>
                <form className="grid gap-4 py-4 w-full" onSubmit={handleSubmit}>
                    <div className="grid gap-1">
                        <label htmlFor='otp' className="text-base sm:text-lg font-medium mb-1">Enter Your OTP :</label>
                        <div className='flex items-center gap-2 justify-between mt-3'>
                            {
                                data.map((element,index)=>{
                                    return(
                                        <input
                                            key={"otp"+index}
                                            type='text'
                                            id='otp'
                                            ref={(ref)=>{
                                                inputRef.current[index] = ref
                                                return ref 
                                            }}
                                            value={data[index]}
                                            onChange={(e)=>{
                                                const value =  e.target.value
                                                const newData = [...data]
                                                newData[index] = value
                                                setData(newData)
                                                if(value && index < 5){
                                                    inputRef.current[index+1].focus()
                                                }
                                            }}
                                            maxLength={1}
                                            className='bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus:border-primary-200 text-center font-semibold text-base sm:text-lg'
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <button disabled={!valideValue} className={` ${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" } text-white py-2 rounded font-semibold my-3 tracking-wide text-base sm:text-lg`}>Verify OTP</button>
                </form>
                <p className='text-center text-base sm:text-lg'>
                    Already have an account? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
                </p>
            </div>
        </section>
    )
}

export default OtpVerification



