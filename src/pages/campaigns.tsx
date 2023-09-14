import { useSession } from "next-auth/react";
import { useState } from "react";
import { api, type RouterOutputs } from "@/utils/api";

import CampaignTotals from "@/components/CampaignTotals";
import CharacterTotals from "@/components/CharacterTotals";
import { CampCharacterCard } from "@/components/CampCharacterCard";

import Head from "next/head";
import Link from "next/link";

import { BsTrash } from "react-icons/bs";

export default function Campaigns() {
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

type Campaign = RouterOutputs["campaign"]["getAll"][0];

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

  function isCampaignSelected(campaignId: string, selectedCampaign: Campaign | null): boolean {
    return selectedCampaign ? campaignId === selectedCampaign.id : false;
  }

  const { data: charactersData, refetch: refetchCharacters } = api.character.getAllCampaign.useQuery(
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

  const characterStatsArray = charactersData ?? [];

  return (
    <div>
      <ul className="px-2 sm:px-4 bg-gray-50 dark:bg-[#222] rounded-t-lg p-2">
        {campaigns?.map((campaign) => (
          <li key={campaign.id}
            className={`mb-2 px-3 w-full text-sm
            ${isCampaignSelected(campaign.id, selectedCampaign) ? "border-l-2 font-semibold border-[#222] dark:border-white" : "ml-0.5"}`}>
            <Link   
              href="#"
              className="flex justify-start"
              onClick={(evt) => {
              evt.preventDefault();
              setSelectedCampaign(campaign); 
              }}
              ><span> {campaign.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      {sessionData?.user && campaigns && campaigns.length > 0 && selectedCampaign !== undefined && (
        <div className="">
          <CampaignTotals characters={characterStatsArray} />
          <CharacterTotals characters={characterStatsArray} />
          <p className="text-neutral-500 uppercase text-xs pt-4 px-4 pb-2">Characters</p>
          <div className="px-2 md:px-4 pb-4 grid grid-cols-1 gap-4">
            {charactersData?.map((character) => (
              <div key={character.id} className="">
                <CampCharacterCard
                  character={character}
                  onDelete={() => void deleteCharacter.mutate({ id: character.id })}
                />
              </div>
            ))}
            <div className="flex flex-col">
              <div className="flex justify-end py-8">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-full text-xs uppercase flex items-center space-x-2"
                  onClick={handleDeleteCampaign}
                >
                  <span>delete campaign</span><BsTrash />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};