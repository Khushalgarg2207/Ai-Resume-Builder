import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Header() {
  const {user, isSignedIn} = useUser();
  return (
    <div className='flex justify-between items-center px-5 py-3 border-2 border-gray-300 rounded-md'>
      <img src='/logo.svg' height={100} width={100}/>

      {
        isSignedIn ? 
        <div className='flex gap-3 items-center'>
          <Link to={'/dashboard'}>
          <Button>Dashboard</Button>
          </Link>
          <UserButton/>
        </div> 
        : 
        <Link to={'/auth/sign-in'}>
        <Button>Get Started</Button>
        </Link>
      }
    </div>
  )
}

export default Header