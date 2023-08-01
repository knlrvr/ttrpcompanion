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
    {sessionData?.user && (
    <div className="p-4 grid grid-cols-1 md:grid-cols-4 max-w-7xl mx-auto">
      <div className="h-full w-full rounded-l-lg flex flex-col py-2 pl-2 bg-[#111]">
        <div className="h-fit w-full border-l border-t border-b p-4 rounded-l-md bg-white">
          <input 
            type="text"
            placeholder="New Campaign"
            className="border rounded-full px-3 py-[0.1rem] flex justify-center"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createCampaign.mutate({
                  title: e.currentTarget.value,
                });
                e.currentTarget.value = "";
              }
            }}
          />

          <ul className="pt-4">
            {campaigns?.map((campaign) => (
              <li key={campaign.id}
                className={`mb-2 py-1 px-3 rounded-md
                  ${isCampaignSelected(campaign.id, selectedCampaign) ? "bg-blue-400 text-white font-semibold" : "tracking-wide"}`}>
                <Link   
                  href="#"
                  className=""
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

      <div className="col-span-3 min-h-screen rounded-r-lg p-6 bg-[#111]">
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
            className="bg-red-500 text-white px-2 py-1 rounded-md text-xs uppercase"
            onClick={handleDeleteCampaign}
          > delete campaign</button>
        </div>
      </div>
    </div>
    )}


    {/* Modal for delete confirmation */}
    <Modal
      isOpen={isDelCampModalOpen}
      onRequestClose={closeDelCampModal}
      contentLabel="Confirm Delete"
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4"
      className="flex justify-center items-center bg-white p-16 py-24 rounded-lg"
    >
      <div className="text-center">
        <p className="font-bold uppercase text-sm">Are you sure you want to delete this campaign?</p>
          <div className="mt-6 flex justify-center space-x-12">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs uppercase"
              onClick={closeDelCampModal}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md text-xs uppercase"
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
