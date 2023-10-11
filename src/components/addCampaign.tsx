import React, { useState } from 'react'
import { useSession } from 'next-auth/react';
import { api, type RouterOutputs } from '@/utils/api';

import { toast } from 'react-toastify';

type Campaign = RouterOutputs["campaign"]["getAll"][0];

const AddCampaign = () => {

    const campCreated = () => toast.success('New campaign created! This campaign can now be selected from the campaign list.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      className: ''
    });

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
                className="text-sm rounded-full px-2 py-[0.2rem] border border-neutral-500 flex justify-center w-full bg-gray-50 dark:bg-[#222] placeholder:text-neutral-500"
                // onKeyDown={(e) => {
                //   if (e.key === "Enter") {
                //     createCampaign.mutate({
                //     title: e.currentTarget.value,
                //     });
                //     e.currentTarget.value = "";
                //   }
                // }}
              />
              <button
                className="bg-blue-500 text-white p-1.5 px-5 rounded-full text-xs uppercase w-fit flex"
                onClick={() => {
                  const titleInput = document.getElementById("addCampaign") as HTMLInputElement;
                  if (titleInput) {
                    createCampaign.mutate({
                      title: titleInput.value,
                    });
                    titleInput.value = '';
                  }
                  campCreated();
                }}
              >
                create
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