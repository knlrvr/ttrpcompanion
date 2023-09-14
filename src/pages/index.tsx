import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";


import Head from "next/head";
import Image from 'next/image'

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
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto min-h-screen flex justify-center items-center px-4">
          
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 p-12 border rounded-lg bg-gray-50 mb-16 shadow-md place-items-center py-8 md:py-4">
          <div className="h-full w-full row-span-2">
            <Image
              src="https://images.unsplash.com/photo-1636728557326-5d78e0abfe13"
              alt="table top"
              width={1000}
              height={1000}
              className="h-full rounded-t-lg md:rounded-tr-none md:rounded-l-lg"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-2xl md:text-3xl font-light uppercase">
              welcome to
            </p>
            <h1 className="font-bold text-4xl md:text-5xl">
              TTRPCompanion
            </h1>
            <p className="font-semibold text-gray-500 pt-10 text-xl">
              Sign in now to get started on tracking stats for your characters throughout your campaign!
            </p>
          </div>
          <div className="flex justify-start">
            <button 
              className="bg-blue-400 px-4 py-2 rounded-full text-white hover:bg-blue-500 transition duration-200"
              onClick={() => void signIn()}
            > Sign In </button>
          </div>
        </div>
        
        </div>
      </div>
    )}

    {sessionData?.user && (
      <div className="p-4">
        <div className="flex flex-col pb-4">
          <span className="font-semibold text-3xl md:text-5xl">Hello, {sessionData.user.name}</span>
          <span className="pt-2 font-light tracking-wide">Welcome back!</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">


        </div>
      </div>
    )}

    </>
  );
};
