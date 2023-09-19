import { signOut } from 'next-auth/react'
import { BsBoxArrowLeft } from 'react-icons/bs'
import React from 'react'

import PageLayout from '@/components/PageLayout'

const Settings = () => {
  return (
    <PageLayout>
      <div className="flex flex-col items-start">
        <button 
          onClick={() => void signOut({ callbackUrl: `${window.location.origin}/`})}
          className="text-base font-light flex items-center space-x-2"
        >
          <BsBoxArrowLeft />
          <p>Sign Out</p>
        </button>
      </div>
    </PageLayout>
  )
}

export default Settings