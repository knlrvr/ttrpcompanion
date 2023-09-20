import { signOut } from 'next-auth/react'
import { BsBoxArrowLeft } from 'react-icons/bs'
import React from 'react'

import PageLayout from '@/components/PageLayout'
import ToggleTheme from '@/components/ThemeToggle'

const Settings = () => {
  return (
    <PageLayout>
        {/* not really a lot of settings to configure right now */}
    </PageLayout>
  )
}

export default Settings