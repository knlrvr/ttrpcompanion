import React from "react";
import Link from 'next/link'
import Image from 'next/image'
import { signIn, useSession } from "next-auth/react";
import ToggleTheme from "@/components/ThemeToggle";

import PageLayout from "@/components/PageLayout";


import Head from "next/head";

import {
  BsGear
} from 'react-icons/bs'

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
      <div className="min-h-screen grid grid-cols-1 sm:grid-cols-2 bg-neutral-100 p-4 overflow-hidden">
        
        <div className="hidden sm:block w-full h-full">
          <div className="h-full flex flex-col justify-center items-center">
            <span className="uppercase font-semibold tracking-widest text-xl md:text-2xl lg:text-3xl xl:text-4xl">welcome to</span>
            <Image
              src="logo-nl-light.svg"
              alt="ttrpcompanion logo"
              width="1000"
              height="1000"
              className="w-3/4"
            />
            <span className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-widest">TTRPCompanion</span>
          </div>


        </div>

        <div className="bg-white rounded-xl p-4 w-full h-full">
          <div className="h-full flex flex-col justify-center items-center">

            <div className="sm:hidden">
              <span className="flex justify-center font-bold text-[2.6rem]">TTRPCompanion</span>
              <Image
                src="logo-light.svg"
                alt="ttrpcompanion logo"
                width="1000"
                height="1000"
                className=""
              />
            </div>

            <p className="text-neutral-500 text-lg">
              <span className="font-semibold text-[#222]">TTRPCompanion </span>
              is an all-in-one tracker for your TTRPG&apos;s. Keep tabs on your adventuring
              party, individual characters, and even the players themselves! Immerse yourself 
              like never before. <br/><br />
              <span className="font-semibold text-[#222]">Sign in now to get started!</span>
            </p>

            <div className="pt-16 flex justify-between sm:justify-evenly w-full">
              <button 
                onClick={() => void signIn}
                className="bg-red-500 rounded-xl px-8 py-2 text-neutral-100 text-sm"
              > Sign In </button>
              <Link href="https://github.com/knlrvr/ttrpcompanion"
                className="bg-blue-900 rounded-xl px-5 py-2 text-neutral-100 text-sm"
              > Learn More </Link>
            </div>
          </div>
        </div>

      

      </div>
    )}

    {sessionData?.user && (
      <PageLayout>
      <div className="relative flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="flex flex-col pb-4">
            <span className="font-semibold text-3xl md:text-5xl">Hello, {sessionData.user.name}</span>
            <span className="pb-4 font-light tracking-wide">Welcome back!</span>


            {/* ????? */}
          </div>
        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

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

          <div>
            <Link href="/profile" className="">
              <div className="bg-white dark:bg-[#222] text-[#222] dark:text-neutral-100 flex flex-col space-y-4 gap-2 p-4 rounded-lg bg-opacity-50 shadow-md">
                <div className="text-left">
                  <span className="font-thin text-2xl">Profile</span>
                  <p className="font-light text-xs">
                    View your profile
                  </p>
                </div>
                <div className="text-4xl flex justify-end">
                  <MdOutlinePerson />
                </div>
              </div>
            </Link>
          </div>

          <div>
            <Link href="/settings" className="">
              <div className="bg-white dark:bg-[#222] text-[#222] dark:text-neutral-100 flex flex-col space-y-4 gap-2 p-4 rounded-lg bg-opacity-50 shadow-md">
                <div className="text-left">
                  <span className="font-thin text-2xl">Settings</span>
                  <p className="font-light text-xs">
                    All settings
                  </p>
                </div>
                <div className="text-4xl flex justify-end">
                  <BsGear />
                </div>
              </div>
            </Link>
          </div>

          {/* Theme not persisting. Fix before uncommenting. */}
          <div>
            <div>
              <div className="bg-white dark:bg-[#222] text-[#222] dark:text-neutral-100 flex flex-col space-y-4 gap-2 p-4 rounded-lg bg-opacity-50 shadow-md">
                <div className="text-left flex flex-col">
                  <span className="font-thin text-2xl mb-4">Theme</span>
                </div>
                <div className="text-4xl flex justify-end py-1.5">
                  {/* <ToggleTheme /> */}
                  <p className="text-xs font-extralight py-1">disabled</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </PageLayout>
    )}

    </>
  );
};
