import React from "react";
import Link from 'next/link'

import Image from 'next/image'

import { signIn, useSession } from "next-auth/react";

import PageLayout from "@/components/PageLayout";

import Head from "next/head";

import {
  PiTent
} from 'react-icons/pi'

import {
  MdOutlinePeopleAlt,
  MdOutlinePerson
} from 'react-icons/md'

import {
  BsArrowRight
} from 'react-icons/bs'

import ToggleTheme from "@/components/ThemeToggle";

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
      <div className="bg-neutral-100 dark:bg-[#111] dark:text-neutral-100 p-4">
        <div className="max-w-6xl mx-auto flex flex-col justify-between min-h-[calc(100vh-40px)]">
          
          <div className="flex justify-between items-center">
            <h1 className="text-sm font-light tracking-wider">TTRPCompanion</h1>
            <ToggleTheme />
          </div>

          <div className="flex flex-col items-center space-y-8 max-w-xl mx-auto">

            <Link href="https://www.github.com/knlrvr/ttrpcompanion" target="_blank"
              className="group w-fit border border-neutral-500 px-4 py-1 rounded-full flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-neutral-500">View Latest Release Notes</span>
              <BsArrowRight className="group-hover:translate-x-1 duration-300"/>
            </Link>

            <p className="text-xl md:text-3xl text-center font-light">
              <span className="font-semibold text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-orange-300 to-red-700 dark:from-blue-400 dark:to-red-600">TTRPCompanion &mdash;</span>
              <br /> Connecting players to their characters like never before.
            </p>

            <p className="text-center text-base md:text-lg text-neutral-500">
              TTRPCompanion is an all-in-one tracker for your tabletop adventures. Keep tabs on stats specific to the campaign, party, individual characters, and even the players themselves! 
            </p>
          </div> 

          <div className="flex justify-between md:justify-evenly">
            <button onClick={() => void signIn()}
              className="border border-[#111] dark:border-white px-4 py-1 rounded-full hover:border-blue-400 hover:text-blue-400 dark:hover:border-blue-500 duration-300 text-sm md:text-base">
              Get Started &mdash; It&apos;s Free
            </button>
            <Link href="https://www.github.com/knlrvr/ttrpcompanion" target="_blank"
              className="border border-neutral-500 text-neutral-500 px-4 py-1 rounded-full hover:border-red-400 hover:text-red-400 duration-300 text-sm md:text-base">
              Learn More
            </Link>
          </div>

          <div className="mt-24 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="h-1 w-1 rounded-full bg-green-500"></div>
              <span className="text-xs text-neutral-500">Online.</span>
            </div>

            <div className="flex items-center text-xs text-neutral-500">
              <p>&copy; TTRPCompanion. All Rights Reserved.</p>
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
            <span className="font-semibold tracking-wide text-3xl md:text-5xl">Hello, {sessionData.user.name}</span>
            <span className="pb-4 pt-2 font-light tracking-wide text-neutral-500">Welcome back to TTRPCompanion!</span>


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


          {/* As noted in settings.tsx, there's just not a lot of settings to configure yet. And by not a lot, I mean none at all. */}
          
          {/* <div>
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
          </div> */}

        </div>

      </div>
    </PageLayout>
    )}

    </>
  );
};
