import React, { useEffect } from 'react'
import { Raleway } from 'next/font/google'
import { FaShare } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'

const rale = Raleway({subsets: ['latin']})
const Nav = () => {
    const router = useRouter();
    const handleHome = () => {
        
        router.push("/")
        
    }
  return (
    <div>
        <div className={`flex  items-center justify-between p-6 ${rale.className}`}>
            <h1 onClick={handleHome} className='text-neutral-700 cursor-pointer text-2xl font-semibold'>Blues</h1>
            <div className='flex gap-x-4'>
                <div className='bg-gradient-to-tr cursor-pointer from-blue-400 via-gray-200 to-blue-400 px-4 py-2 rounded-xl text-neutral-900 font-semibold'>Logout</div>
                <div className='bg-gradient-to-b cursor-pointer from-blue-400 to-indigo-600 rounded-full p-3'><FaShare/></div>
            </div>
        </div>
    </div>
  )
}

export default Nav