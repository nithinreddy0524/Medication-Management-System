import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUserDetails';

const Profile = () => {
    const user = useSelector(state => state.user)
    const [userData,setUserData] = useState({
        name : user.name,
        email : user.email,
        mobile : user.mobile,
    })
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=>{
        setUserData({
            name : user.name,
            email : user.email,
            mobile : user.mobile,
        })
    },[user])

    const handleOnChange  = (e)=>{
        const { name, value} = e.target 

        setUserData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateUserDetails,
                data : userData
            })

            const { data : responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                const userData = await fetchUserDetails()
                dispatch(setUserDetails(userData.data))
            }

        } catch (error) {
            AxiosToastError(error)
        } finally{
            setLoading(false)
        }

    }
    return (
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-[calc(100vh-6rem)] flex items-center justify-center px-2 sm:px-4">
            <div className="w-full max-w-2xl mx-auto rounded-xl shadow-lg bg-white p-4 sm:p-8 md:p-12 flex flex-col items-center gap-4 sm:gap-6">
                <form className="w-full grid gap-4" onSubmit={handleSubmit}>
                    <div className="grid">
                        <label className="text-base sm:text-lg font-medium mb-1">Name</label>
                        <input
                            type='text'
                            placeholder='Enter your name' 
                            className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded text-base sm:text-lg'
                            value={userData.name ?? ''}
                            name='name'
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div className="grid">
                        <label htmlFor='email' className="text-base sm:text-lg font-medium mb-1">Email</label>
                        <input
                            type='email'
                            id='email'
                            placeholder='Enter your email' 
                            className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded text-base sm:text-lg'
                            value={userData.email ?? ''}
                            name='email'
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div className="grid">
                        <label htmlFor='mobile' className="text-base sm:text-lg font-medium mb-1">Mobile</label>
                        <input
                            type='text'
                            id='mobile'
                            placeholder='Enter your mobile' 
                            className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded text-base sm:text-lg'
                            value={userData.mobile ?? ''}
                            name='mobile'
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <button className='border px-4 py-2 font-semibold hover:bg-primary-100 border-primary-100 text-primary-200 hover:text-neutral-800 rounded text-base sm:text-lg'>
                        {loading ? "Loading..." : "Submit"}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Profile
