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
  BsPeople,
  BsClock,
  BsSlash,
  BsTrash, 
  BsBarChart, 
  BsEye, 
  BsEyeSlash,
  BsFilterCircle,
  BsCheckCircle,
  BsChevronRight, 
  BsDashLg,
  BsPlusLg,
  BsExclamationCircle,
  BsPerson,
  BsCheck
} from "react-icons/bs";

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
      <div className="bg-neutral-100 grid grid-cols-8 h-screen">

        <div className="col-span-8 sm:col-span-5 p-4 relative flex flex-col min-h-[calc(100vh-144px)] justify-between">
          <h1 className="text-sm font-light tracking-widest">TTRPCompanion</h1>
          
          <div className="">
            <p className="text-5xl sm:text-6xl md:text-7xl font-thin mr-24">
              Connecting 
              <span className="text-orange-200"> players </span>
              to their 
              <span className="text-orange-400"> characters </span>
              like never before.
            </p>
          </div>

          <div className="mb-12">
            <p className="font-light w-1/2 text-lg">
              TTRPCompanion is an all-in-one tracker for your TTRPG adventures. 
              Keep tabs on stats specific to the campaign, party, individual characters, and even
              the players!
            </p>
          </div>


          <button className="absolute -bottom-6 right-4 sm:-right-24 sm:bottom-12 bg-[#111] hover:bg-orange-300 duration-300 text-white px-4 py-4 text-sm font-light tracking-widest shadow-2xl" 
            onClick={() => signIn()}
          >
            Get Started &mdash; It&apos;s Free
          </button>
        </div>

        <div className="h-36 sm:h-full col-span-8 sm:col-span-3 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1512951670161-b5c6c632b00e"
            alt="shapes on blue"
            width={1000}
            height={1000}
            className="w-full h-full object-cover object-center"
          />
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
