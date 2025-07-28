import React from 'react'
import { Raleway } from 'next/font/google'
import { FaShare } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'
import { handleSignOut } from '../lib/auth'

const rale = Raleway({ subsets: ['latin'] })

const Nav = ({ isModal = false }) => {
  const router = useRouter()

  const handleHome = () => {
    router.push('/')
  }

  return (
    <div>
      <div className={`flex items-center justify-between p-6 ${rale.className}`}>
        <h1
          onClick={handleHome}
          className='text-neutral-800 cursor-pointer text-2xl font-bold tracking-wide'
        >
          Blues
        </h1>

        <div className='flex gap-x-4 mr-12'>
          <div
          onClick={() => {handleSignOut()}}
            className='cursor-pointer bg-gradient-to-br from-sky-400 to-blue-600 hover:brightness-110 px-5 py-2 rounded-xl text-white font-semibold shadow-md transition-all duration-200'
          >
            Logout
          </div>

          {/* Share icon */}
          <div
            className='cursor-pointer bg-gradient-to-br from-blue-400 to-blue-700 p-3 rounded-full text-white shadow-md hover:scale-105 transition-transform duration-200'
          >
            <FaShare />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav
