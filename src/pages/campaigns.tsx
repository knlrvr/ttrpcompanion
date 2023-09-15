import { useSession } from "next-auth/react";
import { useState } from "react";
import { api, type RouterOutputs } from "@/utils/api";

import CampaignTotals from "@/components/CampaignTotals";
import CharacterTotals from "@/components/CharacterTotals";
import { CampCharacterCard } from "@/components/CampCharacterCard";

import Head from "next/head";
import Link from "next/link";

import { BsTrash, BsBarChart, BsPlus } from "react-icons/bs";

import Modal from "react-modal";

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

  const [isChangeCampModalOpen, setChangeCampModalOpen] = useState(false);
  const openChangeCampModal = () => {
    setChangeCampModalOpen(true);
  }
  const closeChangeCampModal = () => {
    setChangeCampModalOpen(false);
  }

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
    <>
    <div>
      {/* <ul className="px-2 sm:px-4 bg-gray-50 dark:bg-[#222] rounded-t-lg p-2">
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
      </ul> */}
      {sessionData?.user && campaigns && campaigns.length > 0 && selectedCampaign !== undefined && (
        <div className="">
          <div className="px-4 pt-4 flex items-center justify-between">
            <p className="text-xs text-[#888] uppercase">Current Campaign:</p>
            <div className="flex items-center space-x-1">
              <span className="text-xs text-[#888]">{selectedCampaign?.title}</span>
              <button 
                onClick={() => openChangeCampModal()}
                className="text-xs font-mono text-blue-300"
              > (change) </button>
            </div>
          </div>
          <CampaignTotals characters={characterStatsArray} />
          <div className="bg-white dark:bg-[#222] m-2 sm:m-4 mt-6 p-4 rounded-lg shadow-md relative">
            <CharacterTotals characters={characterStatsArray} />

            <div className="absolute -top-4 left-[1rem] md:-left-2 rounded-full w-8 h-8 bg-blue-500 flex justify-center items-center shadow-md">
              <BsBarChart className="text-xl text-[#222]" />
            </div>
          </div>
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


    {/* Modal for delete campaign confirmation */}
    <Modal
      isOpen={isDelCampModalOpen}
      onRequestClose={closeDelCampModal}
      contentLabel="Confirm Delete"
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center px-8"
      className="bg-white dark:bg-[#222] dark:text-neutral-100 p-4 py-12 rounded-lg sm:ml-64"
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

    <Modal
      isOpen={isChangeCampModalOpen}
      onRequestClose={closeChangeCampModal}
      contentLabel="Confirm Change"
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center px-8"
      className="bg-white dark:bg-[#222] dark:text-neutral-100 p-4 py-12 rounded-lg sm:ml-64"
    >
    <div className="text-center flex flex-col justify-between space-y-8 px-12">
      <p className="text-sm">Select the campaign you would like to view.</p>
        <div className="flex justify-start">
          <ul className="">
            {campaigns?.map((campaign) => (
              <li key={campaign.id}
                className={`py-2 px-3 w-full text-sm
                ${isCampaignSelected(campaign.id, selectedCampaign) ? "border-l-2 font-semibold border-[#222] dark:border-white" : "ml-0.5"}`}>
                <Link   
                  href="#"
                  className="flex justify-start"
                  onClick={(evt) => {
                  evt.preventDefault();
                  setSelectedCampaign(campaign); 
                  closeChangeCampModal();
                  }}
                  ><span>{campaign.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
    </>
  );
};