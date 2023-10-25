import React, { useState } from 'react'
import { useSession, signOut } from 'next-auth/react';

import PageLayout from '@/components/PageLayout';

import { BsBoxArrowLeft, BsChevronRight, BsDashLg } from 'react-icons/bs';
import Image from 'next/image';

import { api } from "@/utils/api";

// import {
//   PiTent
// } from 'react-icons/pi'

// import {
//   MdOutlinePeopleAlt
// } from 'react-icons/md'


const Profile = () => {

  const [showAllCamps, setShowAllCamps] = useState(false);
  const [showAllChars, setShowAllChars] = useState(false);

  const { data: sessionData } = useSession();

  const { data: campaigns } = api.campaign.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  const { data: charactersData } = api.character.getAllUser.useQuery(
    {
      userId: sessionData?.user.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  const displayedCampaigns = showAllCamps ? campaigns : campaigns?.slice(0, 3);

  const toggleShowAllCamps = () => {
    setShowAllCamps(!showAllCamps);
  };

  const displayedCharacters = showAllChars ? charactersData : charactersData?.slice(0, 3);

  const toggleShowAllChars = () => {
    setShowAllChars(!showAllChars);
  };

  const characterStatsArray = charactersData ?? [];

  return (
    <PageLayout>
      {sessionData?.user && (
        <div className="flex flex-col">

          <div className="flex flex-col items-center pt-4">
            <Image
              src={sessionData?.user.image ?? ''}
              alt={`${sessionData?.user.name}'s profile picture` ?? ''}
              width="1000"
              height="1000"
              className="h-32 w-32 rounded-full"
            />
            <div className="flex flex-col pt-3 text-center">
              <span className="text-xs uppercase font-light tracking-wide">signed in as</span>
              <span className="text-2xl font-extralight tracking-wide">{sessionData.user.name ?? ''}</span>

              <div className="flex space-x-2">
                {/* change between google & discord */}
                <span className="text-xs text-neutral-500">Google &nbsp;&bull;</span>
                <span className="text-xs text-neutral-500">{sessionData.user.email}</span>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <p className="font-semibold text-lg tracking-wide">
              <span className="font-thin">Your </span> 
              Active Campaigns
              <span className="font-light text-neutral-500"> ({campaigns?.length})</span>
            </p>
            <p className="text-xs font-light pb-4 text-neutral-500">Campaigns that you have created or joined are displayed below. You can also find your <span className="font-semibold">active</span> characters within that campaign.</p>
            
            {campaigns?.length !== undefined && campaigns?.length < 0 ? (
              <p className="text-neutral-400 dark:text-[#555] font-light text-xs">
                No campaigns to display at this time. Visit the campaign page to create or join a new campaign.
              </p>
            ) : (
              <div>
                <ul className={`text-left text-base font-light bg-white dark:bg-[#222] px-4 pt-1
                  ${campaigns?.length !== undefined && campaigns?.length > 3 ? 'rounded-t-xl' : 'rounded-xl'}
                `}>
                  {displayedCampaigns?.map((campaign) => (
                    <li key={campaign.id}
                      className='py-3 font-light text-sm border-b last:border-b-0 border-neutral-300 dark:border-neutral-500'>
                      <span>{campaign.title}</span>
                    </li>
                  ))}
                </ul>
                {campaigns?.length !== undefined && campaigns?.length > 3 && (
                  <button onClick={toggleShowAllCamps} className="font-light tracking-wide text-xs flex justify-between p-3 px-4 bg-white dark:bg-[#222] w-full rounded-b-xl text-blue-400 border-t border-neutral-300 dark:border-neutral-500">
                    <span>{showAllCamps ? 'Show Less' : `All Campaigns (${campaigns?.length})`}</span>
                    <span>{showAllCamps ? <BsDashLg /> : <BsChevronRight /> }</span>
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="pt-8">
            <p className="font-semibold text-lg tracking-wide">
              <span className="font-thin">Your </span> 
              Inactive Characters 
              <span className="font-light text-neutral-500"> ({charactersData?.length})</span>
            
            </p>
            <p className="text-xs font-light pb-4 text-neutral-500">Characters that have not been assigned to a campaign are displayed below.</p>

            {charactersData?.length !== undefined && charactersData?.length === 0 ? ( 
            <p className="text-neutral-400 dark:text-[#555] font-light text-xs">
              No characters to display at this time. Visit the character page to create a new character.
            </p>
            ) : (
            <div>
              <ul className={`text-left text-base font-light bg-white dark:bg-[#222] rounded-t-xl px-4 pt-1
              ${charactersData?.length !== undefined && charactersData?.length > 3 ? 'rounded-t-xl' : 'rounded-xl'}
              `}>
                {displayedCharacters?.map((character) => (
                  <li key={character.id} 
                    className="py-3 font-light text-sm border-b last:border-b-0 border-neutral-300 dark:border-neutral-500">
                    <span>{character.title}</span>
                  </li>
                ))}
              </ul>
              {charactersData?.length !== undefined && charactersData?.length > 3 && (
                <button onClick={toggleShowAllChars} className="font-light tracking-wide text-xs flex justify-between p-3 px-4 bg-white dark:bg-[#222] w-full rounded-b-xl text-blue-400 border-t border-neutral-300 dark:border-neutral-500">
                  <span>{showAllChars ? 'Show Less' : `All Characters (${charactersData?.length})`}</span>
                  <span>{showAllChars ? <BsDashLg /> : <BsChevronRight /> }</span>
                </button>
              )}
            </div>
            )}
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