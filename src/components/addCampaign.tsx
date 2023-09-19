import React, { useState } from 'react'
import { useSession } from 'next-auth/react';
import { api, type RouterOutputs } from '@/utils/api';

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

  return (
    <>
      <div>
        <div className="">
          <div className=" text-[#222] dark:text-neutral-100 flex flex-col space-y-4 gap-2">
            <div className="flex flex-col w-full space-y-2">
              <span className="flex justify-start text-sm">Add New Campaign &mdash;</span>
              <input 
                id="addCampaign"
                type="text"
                placeholder="New Campaign Name"
                className="text-sm border rounded-full px-2 py-[0.2rem] flex justify-center w-full bg-gray-50 dark:bg-[#222]"
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
                className="bg-blue-500 text-white p-1.5 px-5 rounded-full text-lg w-fit flex"
                onClick={() => {
                  const titleInput = document.getElementById("campaign") as HTMLInputElement;
                  if (titleInput) {
                    handleCreateCampaign(titleInput.value);
                    titleInput.value = "";
                  }
                }}
              >
                <p className="uppercase text-xs">create</p>
              </button>
            </div>
            
            {/*  */}

          </div>
        </div>
      </div>
    </>
  )
}

export default AddCampaign