import React from 'react'
import { useSession } from 'next-auth/react';

import { BsExclamationCircle } from 'react-icons/bs';

const Profile = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      {!sessionData?.user && ( 
        <div className="p-2 sm:p-4 flex min-h-screen justify-center items-center space-x-4"> 
          <BsExclamationCircle className="text-red-500" />
          <span>Please sign in to view your profile.</span>

        </div>
      )}
      {sessionData?.user && (
        <div className="p-2 sm:p-4">
          Profile
        </div>
      )}
    </>
  )
}

export default Profile