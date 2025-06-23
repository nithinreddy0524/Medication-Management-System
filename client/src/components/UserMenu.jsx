import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { HiOutlineExternalLink } from "react-icons/hi";
import { MdKeyboardArrowRight } from "react-icons/md";

const UserMenu = ({close}) => {
   const user = useSelector((state)=> state.user)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleLogout = async()=>{
        try {
          const response = await Axios({
             ...SummaryApi.logout
          })
          // console.log("logout",response)
          if(response.data.success){
            if(close){
              close()
            }
            dispatch(logout())
            localStorage.clear()
            toast.success(response.data.message)

            // ✅ Send logout message to React Native WebView
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView?.postMessage("logout");
            }

            navigate("/")
          }
        } catch (error) {
          // console.log(error)
          AxiosToastError(error)
        }
   }

   const handleClose = ()=>{
      if(close){
        close()
      }
   }
  return (
    <div>
        <div className='font-semibold'>My Account</div>
        <div className='text-sm flex items-center gap-2 mb-3'>
          <Link onClick={handleClose} to={"/dashboard/profile"} className='flex gap-1 items-center justify-center hover:text-primary-200'>
            <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile} <span className='text-medium text-red-600'>{user.role === "ADMIN" ? "(Admin)" : "" }</span></span>
            <HiOutlineExternalLink size={15}/>
          </Link>
        </div>

        {/* <Divider/> */}

        <div className='text-sm grid border-t'>
          
            <Link onClick={handleClose} to={"/dashboard/profile"} className='flex justify-between items-center px-2 hover:bg-green-300 py-1 py-3 border-b'>
              <div>My Profile</div>
              <MdKeyboardArrowRight size={18}/>
            </Link>

            <button onClick={handleLogout} className='flex justify-between items-center px-2 hover:bg-green-300 py-1 py-3 border-b'>
              <div className='text-left'>Log Out</div>
              <MdKeyboardArrowRight size={18}/>
            </button>

        </div>
    </div>
  )
}

export default UserMenu
