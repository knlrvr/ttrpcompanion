'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react';

import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion';
import Link from 'next/link';

import { api, type RouterOutputs } from '@/utils/api';

import { 
    BsChevronBarLeft, 
    BsBoxArrowLeft,
    BsGear
} from "react-icons/bs";

import {
    HiOutlineMenuAlt2,
} from 'react-icons/hi'

import {
    HiOutlineSquares2X2
} from 'react-icons/hi2'

import {
    PiTent
} from 'react-icons/pi'

import {
    MdOutlinePeopleAlt,
    MdOutlinePerson
} from 'react-icons/md'

const items = [
    { label: 'Dashboard', href: '/', icon: <HiOutlineSquares2X2 /> },
    { label: 'Campaigns', href: '/campaigns', icon: <PiTent /> },
    { label: 'Characters', href: '/characters', icon: <MdOutlinePeopleAlt /> },
    { label: 'Profile', href: '/profile', icon: <MdOutlinePerson /> },
    { label: 'Settings', href: '/settings', icon: <BsGear /> }
]

type Campaign = RouterOutputs["campaign"]["getAll"][0];


const Sidebar = () => {

    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
      const handleCloseSidebar = () => {
        setSidebarOpen(false);
    };

      const { data: sessionData } = useSession();

      const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
      const [newCampaigns, setNewCampaigns] = useState<Campaign[] | null>([]);
    
      const { data: campaigns, refetch: refetchCampaigns } = api.campaign.getAll.useQuery(
        undefined, // no input
        {
          enabled: sessionData?.user !== undefined,
          onSuccess: (data) => {
            setSelectedCampaign(selectedCampaign ?? data[0] ?? null);
            setNewCampaigns(data);
          }
        }
    );

    function isCampaignSelected(campaignId: string, selectedCampaign: Campaign | null): boolean {
        return selectedCampaign ? campaignId === selectedCampaign.id : false;
    };

    

    let path = usePathname();
    if (path?.includes("/")) {
      path = '/';
    }

  return (
    <div className="relative">
        <button
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            className="inline-flex items-center p-2 mt-2 text-sm text-[#222] dark:text-white rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={toggleSidebar}
        >
            <span className="sr-only">Open sidebar</span>
            <HiOutlineMenuAlt2 
                className="text-3xl" 
            />
        </button>
        <aside
            id="default-sidebar"
            className={`fixed top-0 left-0 z-40 w-full sm:w-64 h-screen transition-transform ${
            isSidebarOpen ? "" : "-translate-x-full sm:translate-x-0"
            }`}
            aria-label="Sidebar"
        >
            <button
                className="sm:hidden absolute top-2 right-2 p-2 text-[#333] rounded-lg focus:outline-none focus:ring focus:ring-gray-200"
                onClick={handleCloseSidebar}
            >
                <span className="sr-only">Close sidebar</span>
                <BsChevronBarLeft 
                    className="text-3xl" />
            </button>

            {/* Sidebar content here */}
            <div className="min-h-screen flex flex-col justify-between px-2 py-4 overflow-y-auto pt-14 sm:pt-4 text-[#333] dark:text-neutral-200 bg-neutral-100 dark:bg-[#111]">
                <div className="h-fit">
                    <div className="flex flex-col items-center space-y-6 mb-8">
                        <span className="font-extrabold text-5xl">LO <br /> GO</span>
                        <span className="font-extrabold text-xl">TTRPCompanion</span>
                    </div>
                    <ul className="font-light m-2 flex flex-col space-y-6">
                        {items.map((item) => (
                            <li key={item.href} onClick={() => handleCloseSidebar()} className="">
                                <Link href={item.href}
                                    className="flex items-center justify-start space-x-4 px-4 py-2 rounded-lg hover:bg-blue-300 transition duration-200 relative dark:hover:text-[#222]">
                                        <span className="text-3xl">
                                            {item.icon}
                                        </span>
                                        <span className="">
                                            {item.label}
                                        </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* <div className="">
                    <ul>
                        <li className="text-sm flex items-center p-4 mb-6"
                            >
                            <BsBoxArrowLeft />
                            <span className="flex-1 whitespace-nowrap ml-3">Sign Out</span>
                        </li>
                    </ul>
                </div> */}
            </div>
        </aside>
    </div>
  )
}

export default Sidebar

{/* <li className="flex items-center justify-center pb-2 mb-4">
<span className="font-extrabold text-5xl">LO <br /> GO</span>
</li> */}