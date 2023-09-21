import { useSession } from "next-auth/react";
import { useState } from "react";
import { api, type RouterOutputs } from "@/utils/api";

import PageLayout from "@/components/PageLayout";

import CampaignTotals from "@/components/CampaignTotals";
import CharacterTotals from "@/components/CharacterTotals";
import { CampCharacterCard } from "@/components/CampCharacterCard";

import Head from "next/head";
import Link from "next/link";
import Image from 'next/image'

import { 
  BsTrash, 
  BsBarChart, 
  BsEye, 
  BsEyeSlash,
  BsFilterCircle,
  BsCheckCircle
} from "react-icons/bs";

import Modal from "react-modal";
import AddCampaign from "@/components/addCampaign";
import JoinCampaign from "@/components/joinCampaign";
import QuestCreator from "@/components/QuestCreator";

Modal.setAppElement('main');

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
type Quest = RouterOutputs["questRouter"]["getAll"][0]

const Content: React.FC = () => {

  const { data: sessionData } = useSession();

  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const [newCampaigns, setNewCampaigns] = useState<Campaign[] | null>([]);
  const [isDelCampModalOpen, setDelCampModalOpen] = useState(false);

  const [isChangeCampModalOpen, setChangeCampModalOpen] = useState(false);
  const [isDelQuestModalOpen, setDelQuestModalOpen] = useState(false);
  
  const [selectedQuest, setSelectedQuest] = useState<string | null>(null);

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
      selectFirstCampaign();
      void refetchCampaigns();
    },
  });
  const handleDeleteCampaign = () => {
    if (selectedCampaign) {
      openDelCampModal();
    }
  };

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

  // to delete character
  const deleteCharacter = api.character.delete.useMutation({
    onSuccess: () => {
      void refetchCharacters();
    },
  });

  // campaign code to join
  const [isCodeShown, setCodeShown] = useState(false);
  const handleShowCode = () => {
    setCodeShown(!isCodeShown);
  }

  const characterStatsArray = charactersData ?? [];

  // owner
  const { data: campaignOwner, refetch: refetchCampaignOwner } = api.campaign.getOwner.useQuery(
    {
      campaignId: selectedCampaign?.id ?? "",
    },
    {
      enabled: selectedCampaign !== null,
    }
  );

  // members
  const { data: campaignMembers, refetch: refetchCampaignMembers } = api.campaign.getMembers.useQuery(
    {
      campaignId: selectedCampaign?.id ?? "",
    },
    {
      enabled: selectedCampaign !== null,
    }
  );

  // quests
  const { data: quests, refetch: refetchQuests } = api.questRouter.getAll.useQuery(
    { 
    campaignId: selectedCampaign?.id ?? '' 
    },
  );

  function isQuestSelected(questId: string, selectedQuest: Quest | null): boolean {
    return selectedQuest ? questId === selectedQuest.id : false;
  }

  const createQuest = api.questRouter.create.useMutation({
    onSuccess: () => {
      void refetchQuests();
    }
  })

  const openDelQuestModal = (questId: string) => {
    setSelectedQuest(questId);
    setDelQuestModalOpen(true);
  };
  const closeDelQuestModal = () => {
    setDelQuestModalOpen(false);
  };

  const deleteQuest = api.questRouter.delete.useMutation({
    onSuccess: () => {
      void refetchQuests();
    }
  })

  return (
    <PageLayout>
      <div>
        {sessionData?.user && campaigns?.length === 0 && (
          <div className="flex items-center space-x-1 p-2 sm:p-4">
            <button 
              onClick={() => openChangeCampModal()}
              className="text-xs font-mono text-blue-300"
            > Create Or Join A Campaign Now!</button>
          </div>
        )}
        {sessionData?.user && campaigns && campaigns.length > 0 && selectedCampaign !== undefined && (
          <div className="">
            
            <div className="pt-4 flex items-center justify-between">
              <p className="text-xs text-neutral-500 uppercase">Current Campaign &mdash;</p>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-neutral-500">{selectedCampaign?.title}</span>
                <button 
                  onClick={() => openChangeCampModal()}
                  className="text-xs font-mono text-blue-300"
                > (Change) </button>
              </div>
            </div>

            <div className="pt-6 pb-4">
              <ul className="flex relative -space-x-8 -ml-2">
                {campaignOwner?.image && (
                  <li>
                    <Image 
                      src={campaignOwner?.image ?? ''}
                      alt={`${campaignOwner?.name}'s profile picture`}
                      height="1000"
                      width="1000"
                      className="w-16 h-16 rounded-full border-8 border-neutral-50 dark:border-[#191919]"
                    />
                  </li>
                )}
                {campaignMembers?.map((member) => (
                  <li key={member.id} className="">
                    <Image 
                      src={member.image ?? ''}
                      alt={`${member.name}'s profile picture`}
                      height="1000"
                      width="1000"
                      className="w-16 h-16 rounded-full border-8 border-neutral-50 dark:border-[#191919]"
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 pb-4">
              <p className="text-neutral-500 uppercase text-xs">Campaign &mdash;</p>
              {characterStatsArray.length > 0 ? ( 
              <CampaignTotals characters={characterStatsArray} />
              ) : (
                <p className="text-neutral-400 dark:text-[#555] font-light mt-4 text-xs">
                  Campaign Totals will populate here once a character is added to this campaign. 
                  Visit the characters tab to create a character or add an existing character to this campaign.
                </p>
              )}
            </div>


            {/* migrate to component soon */}
            <div className="pt-6 pb-4">
              <p className="text-neutral-500 uppercase text-xs pb-6">active quests <span>({quests?.length})</span> &mdash;</p>
              {quests?.length !== undefined && quests?.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-white dark:bg-[#222] rounded-lg p-4 pt-8 mb-4 shadow-md relative">
                
                {/* icon */}
                <div className="absolute -top-4 left-[1rem] md:-left-2 rounded-full w-8 h-8 bg-red-400 flex justify-center items-center shadow-md">
                  <BsFilterCircle className="text-lg text-[#222]" />
                </div>

                {quests?.map((quest) => (
                <li key={quest.id}
                    className='bg-neutral-100 dark:bg-[#333] dark:bg-opacity-50 font-normal rounded-md p-4 flex flex-col justify-between'>
                    <div className="flex flex-col">
                        <span className="text-sm tracking-wide font-semibold">{quest.title}</span>
                        <span className="text-xs text-neutral-500 tracking-wide">{quest.type}</span>
                        <p className="text-xs text-[#222] dark:text-neutral-100 py-2">{quest.body}</p>
                    </div>

                    <div className="flex flex-col space-y-1 pt-4">
                        <div className="flex justify-between">
                            <p className="text-xs uppercase text-neutral-500">from:</p>
                            <span className="text-right text-xs ">{quest.assigned}</span>
                        </div>
                        {quest.gpReward > 0 && (
                        <div className="flex justify-between">
                            <p className="text-xs uppercase text-neutral-500">reward:</p>
                            <span className="text-right text-xs ">{quest.gpReward} gp</span>
                        </div>
                        )}
                        {quest.invReward && (
                        <div className="flex justify-between">
                            <p className="text-xs uppercase text-neutral-500">reward:</p>
                            <span className="text-right text-xs ">{quest.invReward}</span> 
                        </div>
                        )}
                        <div className="flex justify-end pt-4">
                          <button 
                              className="w-fit text-lg uppercase bg-orange-300 px-[1.1rem] p-1.5 rounded-full text-[#222]"
                              onClick={() => {
                                openDelQuestModal(quest.id);
                              }}
                          > <BsCheckCircle /> </button>
                        </div>
                    </div>
                </li>
                ))}
              </ul>
              ) : ( 
              <p className="text-neutral-400 dark:text-[#555] font-light text-xs">
                No active quests at this time.
              </p>
              )}
              <QuestCreator 
                onSave={({ title, type, body, assigned, gpReward, invReward, completed }) => {
                  void createQuest.mutate({
                    campaignId: selectedCampaign?.id ?? '', 
                    title, 
                    type, 
                    body,
                    assigned,
                    gpReward,
                    invReward,
                    completed,
                  });
                }}
              />
            </div>


            <p className="text-neutral-500 uppercase text-xs pt-6 pb-4">Party &mdash;</p>
            {charactersData && characterStatsArray.length > 0 ? ( 
            <div className="bg-white dark:bg-[#222] mb-6 mt-2 p-4 rounded-lg shadow-md relative">
                <CharacterTotals characters={characterStatsArray} />

              <div className="absolute -top-4 left-[1rem] md:-left-2 rounded-full w-8 h-8 bg-blue-500 flex justify-center items-center shadow-md">
                <BsBarChart className="text-xl text-[#222]" />
              </div>
            </div>
            ) : ( 
              <p className="text-neutral-400 dark:text-[#555] font-light text-xs">
                Party Totals will populate here once a character is added to this campaign.
                Visit the characters tab to create a character or add an existing character to this campaign.
              </p>
            )}

            <p className="text-neutral-500 uppercase text-xs pt-10 pb-4">Characters ({charactersData?.length}) &mdash;</p>
            {charactersData && characterStatsArray.length > 0 ? ( 
            <div className="pb-4 grid grid-cols-1 gap-4">
              {charactersData?.map((character) => (
                <div key={character.id} className="">
                  <CampCharacterCard
                    character={character}
                    onDelete={() => void deleteCharacter.mutate({ id: character.id })}
                  />
                </div>
              ))}
            </div>
            ) : (
              <p className="text-neutral-400 dark:text-[#555] font-light text-xs">
                Characters will populate here once they are added to this campaign.
                Visit the characters tab to create a character or add an existing character to this campaign.
              </p>
            )}
          
            <div className="text-xs text-neutral-500 flex flex-col space-y-1 mb-4 pt-10 pb-4">
              <p className="text-neutral-500 uppercase text-xs pb-1">Campaign Code &mdash;</p>
              {isCodeShown ? (
                <div className="flex items-center space-x-2">
                  <button 
                    className="text-xl"
                    onClick={() => handleShowCode()
                    }
                  > <BsEyeSlash className="text-[#222] dark:text-neutral-700"/> </button>
                  <p className="text-sm"> {selectedCampaign?.id}</p>
                </div>
              ) : (
                <div className="flex">
                  <button 
                    className="text-xl"
                    onClick={() => handleShowCode()
                    }
                  > <BsEye /> </button>
                </div>
              )}
              <p>
                Share this code with anyone that would like to join your campaign. 
                Simply enter the code in the campaign selector in the field marked &apos;Join New Campaign&apos;.
              </p>

            </div>

            {/* {selectedCampaign?.id} */}

            <div className="flex justify-end pt-8 pb-4 px-2 sm:px-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-full text-xs uppercase flex items-center space-x-2"
                onClick={handleDeleteCampaign}
              >
                <span>delete campaign</span><BsTrash />
              </button>
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
      <div className="text-center flex flex-col justify-between space-y-8 px-2">
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
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal for campaign view */}
      <Modal
        isOpen={isChangeCampModalOpen}
        onRequestClose={closeChangeCampModal}
        contentLabel="Confirm Change"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center px-8"
        className="bg-white dark:bg-[#222] dark:text-neutral-100 p-4 py-12 rounded-lg sm:ml-64"
      >
        <div className="text-center flex flex-col justify-between space-y-8 px-4">
          <p className="text-sm">Select the campaign you would like to view.</p>
          <div className="flex justify-start">
            <ul className="text-left">
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
          <AddCampaign />
          <JoinCampaign />
        </div>
      </Modal>

      <Modal
        isOpen={isDelQuestModalOpen}
        onRequestClose={closeDelQuestModal}
        contentLabel="Confirm Change"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center px-8"
        className="bg-white dark:bg-[#222] dark:text-neutral-100 p-4 py-12 rounded-lg sm:ml-64"
      >
        <div className="text-center flex flex-col justify-between space-y-8 px-4">
          <p className="text-sm">Marking this quest as completed will remove it from your active quests. Are you sure you want to mark this quest as completed?</p>
          <div className="mt-6 flex justify-center space-x-12">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full text-xs uppercase font-light"
              onClick={closeDelQuestModal}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-full text-xs uppercase font-light"
              onClick={() => {
                deleteQuest.mutate({
                  id: selectedQuest ?? '',
                })
                closeDelQuestModal();
              }}
            > Mark Complete </button>
          </div>
        </div>
      </Modal>

    </PageLayout>
  );
};