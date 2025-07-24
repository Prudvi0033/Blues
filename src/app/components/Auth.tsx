'use client'
import { useSession } from 'next-auth/react'
import React from 'react'
import { handleSignIn, handleSignOut } from '../lib/auth'

const Auth = () => {
    const {data: session} = useSession()
  return (
    <div>
        {session && (
            <button onClick={handleSignOut}>
                Signout
            </button>
        )}
        <button onClick={handleSignIn}>SignIn</button>
    </div>
  )
}

export default Auth