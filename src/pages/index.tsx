import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

import Head from "next/head";
import Link from "next/link";
import Image from 'next/image'
import { api, type RouterOutputs } from "@/utils/api";

import { CharacterEditor } from "@/components/CharacterEditor";
import { CharacterCard } from "@/components/CharacterCard";

import { 
  BsExclamationCircle, 
  BsTrash, 
  BsChevronDown, 
  BsChevronUp, 
  BsHouse, 
  BsChevronBarLeft, 
  BsPlusLg,
  BsPlus
} from "react-icons/bs";

import {
  HiOutlineMenuAlt2
} from 'react-icons/hi'

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

  // sidebar menu
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isCampaignDropdownOpen, setCampaignDropdownOpen] = useState<boolean>(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };
  const toggleCampaignDropdown = () => {
    setCampaignDropdownOpen(!isCampaignDropdownOpen);
  };
  const [isAddDropdownOpen, setAddDropdownOpen] = useState<boolean>(false);
  const toggleAddDropdown = () => {
    setAddDropdownOpen(!isAddDropdownOpen);
  };
  
  return (
    <>
    {!sessionData?.user && (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto min-h-screen flex justify-center items-center px-4">
        
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 p-16 border rounded-lg bg-gray-50 mb-16 shadow-md place-items-center">
        <div className="hidden md:block h-full w-full row-span-2 rounded-l-md overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1628160634750-a81a2a780805"
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
    <div className="bg-gray-100 min-h-screen">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-black rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <HiOutlineMenuAlt2 
          className="text-3xl" />
      </button>
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "" : "-translate-x-full sm:translate-x-0"
        }`}
        aria-label="Sidebar"
      >
      <button
          className="sm:hidden absolute top-2 right-0 p-2 text-[#222] rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
          onClick={handleCloseSidebar}
        >
          <span className="sr-only">Close sidebar</span>
          <BsChevronBarLeft 
            className="text-3xl" />
        </button>
        {/* Sidebar content here */}
        <div className="h-full flex flex-col justify-between px-2 py-4 overflow-y-auto bg-gray-100 pt-14 sm:pt-4 border-r-2 border-gray-500 sm:border-none">
          <div className="">
            <ul className="font-light m-2 space-y-2">
              <li className="flex items-center justify-between pb-2 mb-4 border-b border-gray-500">
                  <span className="font-bold">TTRPCompanion</span>
                  {/* <Image
                    src={sessionData?.user.image ?? ""}
                    alt={sessionData?.user.name ?? ""}
                    width={1000}
                    height={1000}
                    className="rounded-full w-6 h-6"
                  /> */}
              </li>
              <li>
                <div className={`flex items-center p-2 rounded-lg hover:bg-gray-50 group cursor-pointer
                  ${isCampaignDropdownOpen ? 'bg-gray-50 rounded-b-none' : ''}`}
                  onClick={toggleCampaignDropdown}>
                  <BsHouse />
                  <span className="flex-1 whitespace-nowrap ml-3">Active Campaigns</span>
                  {isCampaignDropdownOpen ? <BsChevronUp /> : <BsChevronDown />}
                </div>
                {isCampaignDropdownOpen && (
                  <ul className="pl-9 bg-gray-50 rounded-b-lg p-2">
                    {campaigns?.map((campaign) => (
                      <li key={campaign.id}
                        className={`mb-2 px-3 w-full text-sm
                          ${isCampaignSelected(campaign.id, selectedCampaign) ? "border-l-2 font-semibold border-[#222]" : "ml-0.5"}`}>
                        <Link   
                          href="#"
                          className="flex justify-start"
                          onClick={(evt) => {
                            evt.preventDefault();
                            setSelectedCampaign(campaign); 
                          }}
                        > <span> {campaign.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li>
                <div className={`flex items-center p-2 rounded-lg hover:bg-gray-50 group cursor-pointer
                  ${isAddDropdownOpen ? 'bg-gray-50 rounded-b-none' : ''}`}
                  onClick={toggleAddDropdown}>
                  <BsPlusLg />
                  <span className="flex-1 whitespace-nowrap ml-3">Add Campaign</span>
                  {isAddDropdownOpen ? <BsChevronUp /> : <BsChevronDown />}
                </div>
                {isAddDropdownOpen && (
                  <div className="bg-gray-50 p-2 flex flex-col justify-center items-end gap-2 pb-6 rounded-b-lg">
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
                      className="bg-blue-500 text-white p-1.5 px-5 rounded-full text-lg uppercase"
                      onClick={() => {
                        const titleInput = document.getElementById("campaign") as HTMLInputElement;
                        if (titleInput) {
                          handleCreateCampaign(titleInput.value);
                          titleInput.value = "";
                        }
                      }}
                    >
                      <BsPlus />
                    </button> 
                  </div>
                )}
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <button 
                className="flex items-center gap-2 text-gray-400"
                onClick={() => void signOut()}
              > 
                <BsChevronBarLeft />
                <span> Sign Out </span>
              </button>
            </div>
            <div className="w-6 h-6 cursor-pointer">   
              <Image
                src={sessionData?.user.image ?? ""}
                alt={sessionData?.user.name ?? ""}
                width={1000}
                height={1000}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
      </aside>

      <div className="m-4 sm:ml-64 rounded-xl bg-gray-50 min-h-screen">
        {sessionData?.user && campaigns && campaigns.length > 0 && selectedCampaign !== undefined && (
          <div className="p-4 grid grid-cols-1 xl:grid-cols-2 gap-4">
            {characters?.map((character) => (
              <div key={character.id} className="">
                <CharacterCard
                  character={character}
                  onDelete={() => void deleteCharacter.mutate({ id: character.id })}
                />
              </div>
            ))}
            <div className="flex flex-col xl:col-start-2">
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
      </div>
    </div>
    )}


    {/* Modal for delete campaign confirmation */}
    <Modal
      isOpen={isDelCampModalOpen}
      onRequestClose={closeDelCampModal}
      contentLabel="Confirm Delete"
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-8"
      className="bg-white p-4 py-12 rounded-lg sm:ml-64"
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
