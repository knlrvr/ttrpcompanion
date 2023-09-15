import React, { useState } from 'react'
import { useSession } from 'next-auth/react';
import { api, type RouterOutputs } from '@/utils/api';

import { BsDashLg, BsPlusLg } from 'react-icons/bs';

import Modal from 'react-modal'

type Campaign = RouterOutputs["campaign"]["getAll"][0];

const AddCampaign = () => {

    const { data: sessionData } = useSession();

    const [newCampaigns, setNewCampaigns] = useState<Campaign[] | null>([]);
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
    
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
      onSuccess: () => {
        void refetchCampaigns();
      }
    });
    const handleCreateCampaign = (title: string) => {
      createCampaign.mutate({ title });
    };

    const [isCreateCampModalOpen, setCreateCampModalOpen] = useState<boolean>(false);
    const openCreateCampModal = () => {
      setCreateCampModalOpen(true);
    }
    const closeCreateCampModal = () => {
      setCreateCampModalOpen(false);
    }

  return (
    <>
      <div>
        <div className="">
          <div className="bg-neutral-200 dark:bg-[#222] text-[#222] dark:text-neutral-100 flex flex-col space-y-4 gap-2 p-6 rounded-lg bg-opacity-50 shadow-md">
            <div className="text-left">
              <span className="font-thin text-5xl">New <br /> Campaign</span>
            </div>
            <div className="text-3xl text-right">
              <button 
                onClick={() => openCreateCampModal()}
              ><BsPlusLg /></button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isCreateCampModalOpen}
        onRequestClose={closeCreateCampModal}
        contentLabel="Confirm Change"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center px-8"
        className="bg-white dark:bg-[#222] dark:text-neutral-100 p-4 py-12 rounded-lg sm:ml-64"
      >
        <div className="text-center flex flex-col justify-between space-y-8 px-12">
          <p className="text-sm">Enter a title for the campaign you would like to create.</p>
            <div className="flex flex-col sm:flex-row items-end sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
              <input 
                id="campaign"
                type="text"
                placeholder="New Campaign"
                className="border rounded-full px-4 py-[0.2rem] flex justify-center w-[98%] bg-gray-50 dark:bg-[#222]"
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
                  className="bg-blue-500 text-white p-1.5 px-5 rounded-full text-lg w-fit"
                  onClick={() => {
                    const titleInput = document.getElementById("campaign") as HTMLInputElement;
                    if (titleInput) {
                      handleCreateCampaign(titleInput.value);
                      titleInput.value = "";
                    }
                    setCreateCampModalOpen(!isCreateCampModalOpen);
                  }}
                >
              <p className="uppercase text-xs">create</p>
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default AddCampaign