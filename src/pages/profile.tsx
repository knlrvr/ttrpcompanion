import React, { useState } from 'react'
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link'

import PageLayout from '@/components/PageLayout';
import { api } from '@/utils/api';

import { BsBoxArrowLeft } from 'react-icons/bs';
import Image from 'next/image';

import {
  PiTent
} from 'react-icons/pi'

import {
  MdOutlinePeopleAlt
} from 'react-icons/md'

const Profile = () => {

  const { data: sessionData } = useSession();

  const { data: campaigns, refetch: refetchCampaigns } = api.campaign.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  const { data: charactersData, refetch: refetchCharacters } = api.character.getAllUser.useQuery(
    {
      userId: sessionData?.user.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  return (
    <PageLayout>
      {sessionData?.user && (
        <div className="flex flex-col">
          <div className="flex items-end justify-between space-x-3">
            <Image
              src={sessionData?.user.image ?? ''}
              alt={`${sessionData?.user.name}'s profile picture` ?? ''}
              width="1000"
              height="1000"
              className="h-32 w-32 rounded-full"
            />
            <div className="flex flex-col text-right">
              <span className="text-xs uppercase font-light tracking-wide">signed in as</span>
              <span className="text-3xl font-extralight tracking-wide">{sessionData.user.name ?? ''}</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 pt-16">
            <div className="col-span-2">
              <Link href="/campaigns" className="">
                <div className="bg-white dark:bg-[#222] text-[#222] dark:text-neutral-100 flex flex-col space-y-4 gap-2 p-4 rounded-lg bg-opacity-50 shadow-md">
                  <div className="text-left">
                    <span className="font-thin text-2xl">Campaigns</span>
                    <p className="font-light text-xs">
                      View your active campaigns
                    </p>
                  </div>
                  <div className="text-4xl flex justify-end">
                    <PiTent />
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-span-2">
              <Link href="/characters" className="">
                <div className="bg-white dark:bg-[#222] text-[#222] dark:text-neutral-100 flex flex-col space-y-4 gap-2 p-4 rounded-lg bg-opacity-50 shadow-md">
                  <div className="text-left">
                    <span className="font-thin text-2xl">Characters</span>
                    <p className="font-light text-xs">
                      View your inactive characters
                    </p>
                  </div>
                  <div className="text-4xl flex justify-end">
                    <MdOutlinePeopleAlt />
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="pt-8">
            <p className="font-semibold text-lg tracking-wide">
              <span className="font-light">{sessionData?.user.name}&apos;s </span> 
              Active Campaigns
              <span className="font-light text-neutral-500"> ({campaigns?.length})</span>
            </p>
            <p className="text-xs font-light pb-4">Campaigns that you have created or joined are displayed below. You can also find your <span className="font-semibold">active</span> characters within that campaign.</p>
            <ul className="text-left text-base font-light bg-white dark:bg-[#222] rounded-xl p-4 shadow-md">
              {campaigns?.map((campaign) => (
                <li key={campaign.id}
                  className='py-2 font-normal'>
                  <span>{campaign.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-8">
            <p className="font-semibold text-lg tracking-wide">
              <span className="font-light">{sessionData?.user.name}&apos;s </span> 
              Inactive Characters 
              <span className="font-light text-neutral-500"> ({charactersData?.length})</span>
            
            </p>
            <p className="text-xs font-light pb-4">Characters that have not been assigned to a campaign are shown below.</p>

            <ul className="text-left text-base font-light bg-white dark:bg-[#222] rounded-xl p-4 shadow-md">
              {charactersData?.map((character) => (
                <li key={character.id} 
                  className="py-2 font-normal">
                  <span>{character.title}</span>
                </li>
              ))}
            </ul>
          </div>


          <div className="pt-16 pb-4">
            <button 
              onClick={() => void signOut({ callbackUrl: `${window.location.origin}/`})}
              className="text-base font-light flex items-center space-x-2"
            >
              <BsBoxArrowLeft />
              <p>Sign Out</p>
            </button>
          </div>
        </div>
      )}
    </PageLayout>
  )
}

export default Profile