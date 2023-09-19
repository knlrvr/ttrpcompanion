import { signOut } from 'next-auth/react'
import { BsBoxArrowLeft } from 'react-icons/bs'
import React from 'react'

const Settings = () => {
  return (
    <div className="flex flex-col space-y-4 p-2 sm:p-4 items-start">
      <button 
        onClick={() => void signOut({ callbackUrl: `${window.location.origin}/`})}
        className="text-base font-light flex items-center space-x-2"
      >
        <BsBoxArrowLeft />
        <p>Sign Out</p>
      </button>
    </div>
  )
}

export default Settings