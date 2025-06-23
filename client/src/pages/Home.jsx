import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {
  const user = useSelector((state) => state?.user)

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-[calc(100vh-6rem)] flex items-center justify-center px-2 sm:px-4">
      <div className="w-full max-w-2xl mx-auto rounded-xl shadow-lg bg-white p-3 sm:p-6 md:p-8 flex flex-col items-center gap-3 sm:gap-4">
        {user?._id && (
          <h2 className="text-base text-center sm:text-lg md:text-xl font-semibold text-blue-700 w-full text-left mb-1 sm:mb-2">Welcome, {user.name || 'User'}!</h2>
        )}
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800 mb-2 sm:mb-3 text-center leading-tight">Medication Management System</h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 text-center mb-1 sm:mb-2">
          Effortlessly manage your medications, track prescriptions, and stay on top of your health. Our system helps you organize your medication schedules, receive timely reminders, and securely store your medical information.
        </p>
        <ul className="text-gray-600 text-xs sm:text-sm md:text-base list-disc list-inside text-left w-full max-w-lg mx-auto">
          <li>Easy medication tracking and scheduling</li>
          <li>Personalized reminders for doses and refills</li>
          <li>Secure and private health data management</li>
          <li>Accessible on all your devices with a responsive design</li>
        </ul>
        <div className="mt-3 sm:mt-4 w-full flex flex-col md:flex-row gap-2 sm:gap-3 justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg shadow transition-all w-full md:w-auto text-sm sm:text-base">Get Started</button>
          <button className="bg-white border border-blue-600 text-blue-700 font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg shadow hover:bg-blue-50 transition-all w-full md:w-auto text-sm sm:text-base">Learn More</button>
        </div>
      </div>
    </section>
  )
}

export default Home
