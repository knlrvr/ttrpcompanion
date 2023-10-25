import { api } from '@/utils/api';
import React, { useState } from 'react'

import { toast } from 'react-toastify';

import { useSession } from 'next-auth/react';

const JoinCampaign = () => {

    const campJoined = () => toast.success('New campaign joined! This campaign can now be selected from the campaign list.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

    const [campaignId, setCampaignId] = useState('');

    const { data: sessionData } = useSession();
    const { refetch: refetchCampaigns } = api.campaign.getAll.useQuery(
        undefined, // no input
        {
          enabled: sessionData?.user !== undefined,
          onSuccess: () => {
            ;
          }
        }
    );

    const joinCampaign = api.campaign.join.useMutation({
        onSuccess: () => {
          setCampaignId('');
          void refetchCampaigns();
        },
      });
    
      const handleJoin = () => {
        joinCampaign.mutate({ campaignId });
    };

  return (
    <div>
        <div className="flex flex-col w-full space-y-2">
            <span className="flex justify-start text-sm">Join New Campaign &mdash;</span>
            <input
                id="joinCampaign"
                type="text"
                placeholder="Enter Campaign ID"
                className="text-sm border border-neutral-500 rounded-full px-2 py-[0.2rem] flex justify-center w-full bg-gray-50 dark:bg-[#222] placeholder:text-neutral-500"
                value={campaignId}
                onChange={(e) => setCampaignId(e.target.value)}
                // onKeyDown={(e) => {
                //     if (e.key === 'Enter') {
                //     handleJoin();
                //     }
                // }}
            />
            <button
                className="bg-blue-500 text-white p-1.5 px-5 rounded-full text-lg w-fit flex"
                onClick={() => {
                  handleJoin();
                  campJoined();
                }}
            >
                <p className="uppercase text-xs">Join</p>
            </button>
        </div>
    </div>
  )
}

export default JoinCampaign