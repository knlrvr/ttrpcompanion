import React, { useState } from 'react'
import { useSession } from 'next-auth/react';
import { api, type RouterOutputs } from '@/utils/api';

import { BsDashLg, BsPlusLg } from 'react-icons/bs';

type Campaign = RouterOutputs["campaign"]["getAll"][0];

const AddCampaign = () => {

    const { data: sessionData } = useSession();

    const [newCampaigns, setNewCampaigns] = useState<Campaign[] | null>([]);
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
    const [isAddMenuOpen, setAddMenuOpen] = useState<boolean>(false);
    
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

    const handleOpen = () => {
        setAddMenuOpen(!isAddMenuOpen);
    };

  return (
    <div>
        <div className="">
            <div className="bg-neutral-200 dark:bg-[#222] text-[#222] dark:text-neutral-100 flex flex-col space-y-4 gap-2 p-6 rounded-lg bg-opacity-50 shadow-md">
                <div className="text-left">
                    <span className="font-thin text-5xl">New <br /> Campaign</span>
                </div>
                <div className="text-3xl text-right">
                    <button 
                        onClick={() => handleOpen()}
                    >{isAddMenuOpen ? <BsDashLg /> : <BsPlusLg />}</button>
                </div>

                {isAddMenuOpen && (
                    <div className="flex flex-col space-y-2">
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
                            setAddMenuOpen(!isAddMenuOpen)
                            }}
                        >
                            <BsPlusLg />
                        </button>
                    </div>
                )}
            </div>
          </div>
    </div>
  )
}

export default AddCampaign