import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useMobile from '../hooks/useMobile';
import { useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp  } from "react-icons/go";
import UserMenu from './UserMenu';
import { FiMenu } from "react-icons/fi";

const Header = () => {
    const [ isMobile ] = useMobile()
    const navigate = useNavigate()
    const user = useSelector((state)=> state?.user)
    const [openUserMenu,setOpenUserMenu] = useState(false)
 
    const redirectToLoginPage = ()=>{
        navigate("/login")
    }

    const handleCloseUserMenu = ()=>{
        setOpenUserMenu(false)
    }

    const handleMobileUser = ()=>{
        if(!user._id){
            navigate("/login")
            return
        }

        navigate("/user")
    }

  return (
    <header className="sticky top-0 left-0 right-0 h-24 pt-1 lg:h-20 shadow-md flex flex-col justify-center gap-1 bg-gradient-to-r from-blue-50 via-white to-blue-100 z-50 border-b border-blue-200">
      <div className="container mx-auto flex items-center justify-between px-4 py-2 h-full">
        {/* Logo/Brand */}
        <div className="flex items-center gap-2 select-none cursor-pointer" onClick={() => navigate('/')}> 
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-blue-700 tracking-tight drop-shadow-sm">Medication Management System</span>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {user?._id ? (
            <div className="relative">
              <div onClick={() => setOpenUserMenu(preve => !preve)} className="flex select-none items-center gap-1 cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-100 transition-all">
                <span className="font-medium text-blue-800 text-sm md:text-base lg:text-lg">Account</span>
                {openUserMenu ? <GoTriangleUp size={22} /> : <GoTriangleDown size={22} />}
              </div>
              {openUserMenu && (
                <div className="absolute right-0 top-12 z-50">
                  <div className="bg-white rounded-lg p-4 min-w-52 shadow-xl border border-blue-100">
                    <UserMenu close={handleCloseUserMenu} />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button onClick={redirectToLoginPage} className="text-sm md:text-base lg:text-lg px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-all">Login</button>
          )}
        </div>
        {/* Mobile Menu Button */}
        <button className="text-blue-700 lg:hidden p-2 rounded-lg hover:bg-blue-100 transition-all border border-blue-100 shadow-sm" onClick={handleMobileUser}>
          <FiMenu size={26} />
        </button>
      </div>
    </header>
  )
}

export default Header
