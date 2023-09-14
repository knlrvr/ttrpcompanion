import ToggleTheme from '@/components/ThemeToggle'
import { signOut } from 'next-auth/react'
import { BsBoxArrowLeft } from 'react-icons/bs'
import React from 'react'

const Settings = () => {
  return (
    <div className="flex flex-col space-y-4 p-2 sm:p-4 items-start">
      <ToggleTheme />
      <button 
        onClick={() => void signOut()}
        className="text-xs flex items-center space-x-2"
      >
        <BsBoxArrowLeft />
        <p>Sign Out</p>
      </button>
    </div>
  )
}

export default Settings