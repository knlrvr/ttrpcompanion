import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

import Head from "next/head";
import Link from "next/link";
import { api, type RouterOutputs } from "@/utils/api";

import { Header } from "@/components/Header";
import { CharacterEditor } from "@/components/CharacterEditor";
import { CharacterCard } from "@/components/CharacterCard";

import Modal from 'react-modal'


export default function Home() {

  return (
    <>
      <Head>
        <title>TTRPCompanion</title>
        <meta name="description" content="TTRPCompanion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <Header />
        <Content />
      </main>
    </> 
  );
}

type Campaign = RouterOutputs["campaign"]["getAll"][0];
type CharacterWithStats = RouterOutputs["character"]["getAll"][0] & {characterStats: CharacterStats[] };

type CharacterStats = {
  id: string;
  characterId: string;
  level: number;
  charClass: string;
  charRace: string;
  totalSessions: number;
  totalTime: number;
  totalXp: number;
  dmgDealt: number;
  dmgTaken: number;
  critHits: number;
  totalKills: number;
  spellsCast: number;
  totalHealingOthers: number;
  totalHealingSelf: number;
  totalDeaths: number;
  turnsNoDmg: number;
};

const Content: React.FC = () => {
  const { data: sessionData } = useSession();

  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const { data: campaigns, refetch: refetchCampaigns } = api.campaign.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setSelectedCampaign(selectedCampaign ?? data[0] ?? null);
      }
    }
  );

  const createCampaign = api.campaign.create.useMutation({
    onSuccess: () => {
      void refetchCampaigns();
    }
  });

  // to delete campaign
  const [isDelCampModalOpen, setDelCampModalOpen] = useState(false);
  const openDelCampModal = () => {
    setDelCampModalOpen(true);
  };
  const closeDelCampModal = () => {
    setDelCampModalOpen(false);
  };
  const deleteCampaign = api.campaign.delete.useMutation({
    onSuccess: () => {
      closeDelCampModal();
      void refetchCampaigns();
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
      enabled: sessionData?.user !== undefined && selectedCampaign !== null,
    }
  );

  const createCharacter = api.character.create.useMutation({
    onSuccess: () => {
      void refetchCharacters();
    },
  });

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
    <div className="max-w-7xl mx-auto">
      <div className="h-screen flex flex-col justify-center items-center px-4">
        <div className="bg-gray-200 py-16 rounded-lg flex justify-center items-center flex-col space-y-24 shadow-lg px-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
            TTRPCompanion
          </h1>
          <p className="flex items-center px-8">
            <button className="font-semibold hover:text-[#888] transition duration-200">Sign In</button>
            &nbsp;now to keep track of your character stats in any TTRPG!
          </p>
        </div>
      </div>
    </div>

    {sessionData?.user && (
    <div className="bg-gray-100 pb-4">
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-4 bg-gray-100">
        <div className="w-full flex flex-col">
          <div className="p-4 pt-6">
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

        <div className="col-span-3 border mx-2 md:mx-0 md:ml-2 md:mt-2 p-4 rounded-lg md:rounded-l-lg md:rounded-r-none bg-gray-50 shadow-lg">
          {characters?.map((character) => (
            <div key={character.id} className="pb-4">
              <CharacterCard
                character={character}
                onDelete={() => void deleteCharacter.mutate({ id: character.id})}
              />
            </div>
          ))}

          <CharacterEditor 
            onSave={({ title, stats }) => {
              void createCharacter.mutate({
                title,
                campaignId: selectedCampaign?.id ?? "",
                stats
              })
            }}
          />

          <div className="flex justify-end w-full mt-4">
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded-full text-xs uppercase"
              onClick={handleDeleteCampaign}
            > delete campaign</button>
          </div>
        </div>
      </div>
    </div>
    )}


    {/* Modal for delete confirmation */}
    <Modal
      isOpen={isDelCampModalOpen}
      onRequestClose={closeDelCampModal}
      contentLabel="Confirm Delete"
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-8"
      className="bg-white p-8 rounded-lg"
    >
      <div className="text-center flex flex-col justify-between space-y-8">
        <p className="font-bold uppercase text-sm">Are you sure you want to delete this campaign?</p>
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
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
