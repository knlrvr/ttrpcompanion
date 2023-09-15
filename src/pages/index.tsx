import React, { useState } from "react";
import Link from 'next/link'
import { signIn, useSession } from "next-auth/react";
import { api, type RouterOutputs } from "@/utils/api";

import ToggleTheme from "@/components/ThemeToggle";
import AddCampaign from "@/components/addCampaign";

import Modal from 'react-modal'

import Head from "next/head";

import {
  BsPeople,
  BsClock,
  BsSlash,
  BsGear
} from 'react-icons/bs'

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

export default function Home() {
  return (
    <>
      <Head>
        <title>TTRPCompanion</title>
        <meta name="description" content="TTRPCompanion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main id="main" className="">
        <Content />
      </main>
    </> 
  );
}


const Content: React.FC = () => {

  const { data: sessionData } = useSession();

  return (
    <>
    {!sessionData?.user && (
      <div className="">
        <div className="p-4 pt-8 max-w-5xl mx-auto flex flex-col justify-center items-start sm:items-start px-4">
          {/* <span className="font-semibold tracking-widest text-sm sm:text-base md:text-lg lg:text-xl">Welcome To</span>
          <span className="font-semiabold tracking-wide leading-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl">TTRPCompanion</span> */}

          <button 
            onClick={() => void signIn()}
          > Sign In</button>

        </div>
      </div>
    )}

    {sessionData?.user && (
      <div className="p-4 relative min-h-screen flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="flex flex-col pb-4">
            <span className="font-semibold text-3xl md:text-5xl">Hello, {sessionData.user.name}</span>
            <span className="pb-4 font-light tracking-wide">Welcome back!</span>


            {/* ????? */}
          </div>
        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-2">
            <AddCampaign />
          </div>

          <div className="col-span-2">
            <Link href="/campaigns" className="">
              <div className="bg-neutral-200 dark:bg-[#222] text-[#222] dark:text-neutral-100 flex flex-col space-y-4 gap-2 p-4 rounded-lg bg-opacity-50 shadow-md">
                <div className="text-left">
                  <span className="font-thin text-2xl">Campaigns</span>
                </div>
                <div className="text-4xl flex justify-end">
                  <PiTent />
                </div>
              </div>
            </Link>
          </div>

          <div>
            <Link href="/characters" className="">
              <div className="bg-neutral-200 dark:bg-[#222] text-[#222] dark:text-neutral-100 flex flex-col space-y-4 gap-2 p-4 rounded-lg bg-opacity-50 shadow-md">
                <div className="text-left">
                  <span className="font-thin text-2xl">Characters</span>
                </div>
                <div className="text-4xl flex justify-end">
                  <MdOutlinePeopleAlt />
                </div>
              </div>
            </Link>
          </div>

          <div>
            <Link href="/profile" className="">
              <div className="bg-neutral-200 dark:bg-[#222] text-[#222] dark:text-neutral-100 flex flex-col space-y-4 gap-2 p-4 rounded-lg bg-opacity-50 shadow-md">
                <div className="text-left">
                  <span className="font-thin text-2xl">Profile</span>
                </div>
                <div className="text-4xl flex justify-end">
                  <MdOutlinePerson />
                </div>
              </div>
            </Link>
          </div>

          <div>
            <Link href="/profile" className="">
              <div className="bg-neutral-200 dark:bg-[#222] text-[#222] dark:text-neutral-100 flex flex-col space-y-4 gap-2 p-4 rounded-lg bg-opacity-50 shadow-md">
                <div className="text-left">
                  <span className="font-thin text-2xl">Settings</span>
                </div>
                <div className="text-4xl flex justify-end">
                  <BsGear />
                </div>
              </div>
            </Link>
          </div>

          <div>
            <div>
              <div className="bg-neutral-200 dark:bg-[#222] text-[#222] dark:text-neutral-100 flex flex-col space-y-4 gap-2 p-4 rounded-lg bg-opacity-50 shadow-md">
                <div className="text-left">
                  <span className="font-thin text-2xl">Theme</span>
                </div>
                <div className="text-4xl flex justify-start py-1.5">
                  <ToggleTheme />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    )}

    </>
  );
};
