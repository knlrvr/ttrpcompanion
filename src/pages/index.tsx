import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { api, type RouterOutputs } from "@/utils/api";

import ToggleTheme from "@/components/ThemeToggle";
import AddCampaign from "@/components/addCampaign";

import Head from "next/head";

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
        <div className="max-w-7xl mx-auto min-h-screen flex justify-center items-center px-4">
          <span>hey</span>
        </div>
      </div>
    )}

    {sessionData?.user && (
      <div className="p-4 relative">
        <div className="flex justify-between items-start">
          <div className="flex flex-col pb-4">
            <span className="font-semibold text-3xl md:text-5xl">Hello, {sessionData.user.name}</span>
            <span className="pb-4 font-light tracking-wide">Welcome back!</span>

            {/* theme not persisting. pls solve before uncommenting (: */}
            <ToggleTheme />
            
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <AddCampaign />
          </div>

        </div>

      </div>
    )}

    </>
  );
};
