import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

import Head from "next/head";
import Link from "next/link";
import Image from 'next/image'
import { api, type RouterOutputs } from "@/utils/api";

import { Header } from "@/components/Header";
import { CharacterEditor } from "@/components/CharacterEditor";
import { CharacterCard } from "@/components/CharacterCard";

import { BsExclamationCircle, BsCheckLg, BsTrash } from "react-icons/bs";

import Modal from 'react-modal'

Modal.setAppElement('main')

export default function Home() {
  return (
    <>
      <Head>
        <title>TTRPCompanion</title>
        <meta name="description" content="TTRPCompanion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main id="main" className="">
        <Header />
        <Content />
      </main>
    </> 
  );
}

type Campaign = RouterOutputs["campaign"]["getAll"][0];
// type CharacterWithStats = RouterOutputs["character"]["getAll"][0] & {characterStats: CharacterStats[] };

// type CharacterStats = {
//   id: string;
//   characterId: string;
//   level: number;
//   charClass: string;
//   charRace: string;
//   totalSessions: number;
//   totalTime: number;
//   totalXp: number;
//   dmgDealt: number;
//   dmgTaken: number;
//   critHits: number;
//   totalKills: number;
//   spellsCast: number;
//   totalHealingOthers: number;
//   totalHealingSelf: number;
//   totalDeaths: number;
//   turnsNoDmg: number;
//   // added
//   combatTime: number;
//   natTwenty: number;
//   natOne: number;
//   totalKo: number;
// };

const Content: React.FC = () => {
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

  const createCampaign = api.campaign.create.useMutation({
    onSuccess: (data) => {
      void refetchCampaigns();
      setSelectedCampaign(data);
    }
  });
  const handleCreateCampaign = (title: string) => {
    createCampaign.mutate({ title });
  };

  // to delete campaign
  const [isDelCampModalOpen, setDelCampModalOpen] = useState(false);
  const openDelCampModal = () => {
    setDelCampModalOpen(true);
  };
  const closeDelCampModal = () => {
    setDelCampModalOpen(false);
  };
  // display first active campaign after one is deleted
  const selectFirstCampaign = () => {
    if (campaigns && campaigns.length > 0 && selectedCampaign && sessionData?.user?.id) {
      const currentIndex = campaigns.findIndex((campaign) => campaign.id === selectedCampaign.id);
      for (let i = 1; i <= campaigns.length; i++) {
        const firstIndex = (currentIndex + i) % campaigns.length;
        const firstCampaign = campaigns[firstIndex];
        // Assuming user's ID is stored in sessionData.user.id
        if (firstCampaign?.ownerId === sessionData.user.id) {
          setSelectedCampaign(firstCampaign);
          return;
        }
      }
    }
    setSelectedCampaign(null); // No campaigns or selectedCampaign, or next campaign not found, set selectedCampaign to null
  };

  const deleteCampaign = api.campaign.delete.useMutation({
    onSuccess: () => {
      closeDelCampModal();
      void refetchCampaigns();
      selectFirstCampaign();
    },
  });
  const handleDeleteCampaign = () => {
    if (selectedCampaign) {
      openDelCampModal();
    }
  };

  const { data: characters, refetch: refetchCharacters } = api.character.getAll.useQuery(
    {
      campaignId: selectedCampaign?.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  const createCharacter = api.character.create.useMutation({
    onSuccess: () => {
      void refetchCharacters();
    },
  });

  // to delete character
  const deleteCharacter = api.character.delete.useMutation({
    onSuccess: () => {
      void refetchCharacters();
    },
  });

  function isCampaignSelected(campaignId: string, selectedCampaign: Campaign | null): boolean {
    return selectedCampaign ? campaignId === selectedCampaign.id : false;
  }
  
  return (
    <>
    {!sessionData?.user && (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto min-h-screen flex justify-center items-center px-4">
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-16 border rounded-lg bg-gray-50 mb-16 shadow-md place-items-center">
        <div className="hidden md:block h-full w-full row-span-2 rounded-l-md overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1551174326-0ca06dacd15c"
            alt="table top"
            width={1000}
            height={1000}
            className=""
          />
        </div>
        <div className="flex flex-col">
          <p className="text-2xl md:text-3xl font-light uppercase">
            welcome to
          </p>
          <h1 className="font-bold text-4xl md:text-5xl">
            TTRPCompanion
          </h1>
          <p className="font-semibold text-gray-500 pt-16 text-xl">
            Sign in now to get started on tracking stats for your characters throughout your campaign!
          </p>
        </div>
        <div className="flex justify-start">
          <button 
            className="bg-blue-400 px-4 py-2 rounded-full text-white hover:bg-blue-300 transition duration-200"
            onClick={() => void signIn()}
          > Sign In </button>
        </div>
      </div>
      
      </div>
    </div>
    )}

    {sessionData?.user && (
    <div className="bg-gray-100 pb-4">
      <div className="grid grid-cols-1 md:grid-cols-4 bg-gray-100">

        <div className="w-full flex flex-col">
          <div className="p-2 pt-2">
            <div className="flex items-center space-x-2">
              <input 
                id="campaign"
                type="text"
                placeholder="New Campaign"
                className="border rounded-full px-4 py-[0.2rem] flex justify-center w-[98%] bg-gray-50"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    createCampaign.mutate({
                      title: e.currentTarget.value,
                    });
                    e.currentTarget.value = "";
                  }
                }}
              />
              <button
                className="bg-blue-500 text-white p-1.5 px-2 rounded-full text-lg uppercase"
                onClick={() => {
                  const titleInput = document.getElementById("campaign") as HTMLInputElement;
                  if (titleInput) {
                    handleCreateCampaign(titleInput.value);
                    titleInput.value = "";
                  }
                }}
              >
                <BsCheckLg />
              </button> 
            </div>

            <ul className="pt-4 space-y-2">
              {campaigns?.map((campaign) => (
                <li key={campaign.id}
                  className={`mb-2 py-1 px-3 w-full text-lg
                    ${isCampaignSelected(campaign.id, selectedCampaign) ? "border-l-4 border-[#222]" : "ml-1"}`}>
                  <Link   
                    href="#"
                    className="flex justify-start"
                    onClick={(evt) => {
                      evt.preventDefault();
                      setSelectedCampaign(campaign); 
                    }}
                  >
                    <span className="">
                      {campaign.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

      {sessionData?.user && campaigns && campaigns.length > 0 && selectedCampaign !== undefined && (
        <div className="min-h-screen col-span-3 border mx-2 md:mx-0 md:ml-2 md:mt-2 p-4 rounded-lg md:rounded-l-lg md:rounded-r-none bg-gray-50 shadow-md">
          {characters?.map((character) => (
            <div key={character.id} className="pb-4">
              <CharacterCard
                character={character}
                onDelete={() => void deleteCharacter.mutate({ id: character.id })}
              />
            </div>
          ))}
          <div className="flex flex-col">
            <CharacterEditor
              onSave={({ title, stats }) => {
                void createCharacter.mutate({
                  title,
                  campaignId: selectedCampaign?.id ?? "",
                  stats,
                });
              }}
            />
            <div className="flex justify-end py-16">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-full text-xs uppercase flex items-center space-x-2"
                onClick={handleDeleteCampaign}
              >
                <span>delete campaign</span><BsTrash />
              </button>
            </div>
          </div>
        </div>
        )} 

        {sessionData?.user && (!campaigns || campaigns.length === 0 || selectedCampaign === null) && (
        <div className="min-h-screen col-span-3 border mx-2 md:mx-0 md:ml-2 md:mt-2 p-4 pb-36 rounded-lg md:rounded-l-lg md:rounded-r-none bg-gray-50 shadow-lg flex flex-col justify-center items-center text-xl">
          <BsExclamationCircle />
            <p className="text-xs pt-4">
              Please select or create a campaign to view character stats
            </p>
          </div> 
        )}
      </div>
    </div>
  )}


    {/* Modal for delete campaign confirmation */}
    <Modal
      isOpen={isDelCampModalOpen}
      onRequestClose={closeDelCampModal}
      contentLabel="Confirm Delete"
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-8"
      className="bg-white p-8 rounded-lg"
    >
    <div className="text-center flex flex-col justify-between space-y-8">
      <p className="text-sm">Are you sure you want to delete this campaign? This action cannot be undone.</p>
        <div className="mt-6 flex justify-center space-x-12">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full text-xs uppercase"
            onClick={closeDelCampModal}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-full text-xs uppercase"
            onClick={() => {
              if (selectedCampaign) {
                deleteCampaign.mutate({ id: selectedCampaign.id });
              }
            }}
          >
            Delete Campaign
          </button>
        </div>
      </div>
    </Modal>
    </>
  );
};
