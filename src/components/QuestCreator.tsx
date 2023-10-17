import React, { useState } from 'react'

import { 
  BsPlusLg 
} from 'react-icons/bs';

import Modal from 'react-modal'

const QuestCreator = ({
    onSave,
}: {
    onSave: (quest: {
        title: string;
        body: string;
        type: string;
        gpReward: number;
        invReward: string;
        assigned: string;
        completed: boolean;
    }) => void;
}) => {

    const [title, setTitle] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [assigned, setAssigned] = useState<string>('');
    const [gpReward, setGpReward] = useState<number>(0);
    const [invReward, setInvReward] = useState<string>('');
    const [completed, setCompleted] = useState<boolean>(false);

    const questTypeOptions = [
        'Select Quest Type',
        'Bounty',
        'Defense',
        'Delivery',
        'Destroy',
        'Escort',
        'Fetch',
        'Gather',
        'Investigation',
        'Kill',
        'Protect',
        'Survival',
        'Talk To'
    ]

    const [isQuestModalOpen, setQuestModalOpen] = useState(false);
    const openQuestModal = () => {
      setQuestModalOpen(true);
    }
    const closeQuestModal = () => {
      setQuestModalOpen(false);
    }

  return (
    <>
        <button
          onClick={openQuestModal}
          className={`flex justify-between w-full`}>
          <span className="text-xs font-light">New Quest</span>
          <BsPlusLg />
        </button>

      <Modal
        isOpen={isQuestModalOpen}
        onRequestClose={closeQuestModal}
        contentLabel="Confirm Change"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center px-8"
        className="bg-white dark:bg-[#222] dark:text-neutral-100 p-4 py-8 rounded-lg sm:ml-64"
      >
        <div className="text-center flex flex-col justify-between space-y-4 px-4">
          <div className="flex flex-col space-y-1 pb-8">
            <span className="flex justify-start text-sm">Add New Quest &mdash;</span>
            <p className="text-xs text-neutral-500 text-left">Please fill out the details of the quest you would like to add.</p>
          </div>
          <div className="flex flex-col items-start space-y-2">
            <label htmlFor='questTitle' className="text-xs text-neutral-500">
                Quest Title
            </label>
            <input 
                id="questTitle"
                type="text"
                placeholder="Enter Quest Title"
                className="text-sm border border-neutral-500 rounded-full px-2 py-[0.2rem] flex justify-center w-full bg-gray-50 dark:bg-[#222] placeholder:text-neutral-500"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
          </div>
          <div className="flex flex-col items-start space-y-2">
            <label htmlFor='questType' 
              className="text-xs text-neutral-500">
              Quest Type
            </label>
            <select 
                id="questType"
                className="rounded-full border border-neutral-500 px-2 py-1 w-full bg-gray-50 dark:bg-[#222] placeholder:text-[#888] text-[#222] dark:text-white"
                value={type}
                onChange={(e) => setType(e.currentTarget.value)}
            >
              {questTypeOptions?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-start space-y-2">
            <label htmlFor='questBody' className="text-xs text-neutral-500">
                Quest Details
            </label>
            <textarea 
                id="questBody"
                rows={5}
                placeholder="Enter Quest Details"
                className="text-sm border border-neutral-500 rounded-xl px-2 py-[0.2rem] flex justify-center w-full bg-gray-50 dark:bg-[#222] placeholder:text-neutral-500"
                value={body}
                onChange={(e) => setBody(e.currentTarget.value)}
              />
          </div>
          <div className="flex flex-col items-start space-y-2">
            <label htmlFor='questAssignedBy' className="text-xs text-neutral-500">
                Quest Assigned By
            </label>
            <input 
                id="questAssignedBy"
                type="text"
                placeholder="Who Assigned This Quest To You?"
                className="text-sm border border-neutral-500 rounded-full px-2 py-[0.2rem] flex justify-center w-full bg-gray-50 dark:bg-[#222] placeholder:text-neutral-500"
                value={assigned}
                onChange={(e) => setAssigned(e.currentTarget.value)}
              />
          </div>
          <div className="flex flex-col items-start space-y-2">
            <label htmlFor='questGpReward' className="text-xs text-neutral-500">
                Quest Reward (GP)
            </label>
            <input 
                id="questGpReward"
                type="number"
                placeholder="Enter Quest Reward (GP)"
                className="text-sm border border-neutral-500 rounded-full px-2 py-[0.2rem] flex justify-center w-full bg-gray-50 dark:bg-[#222] placeholder:text-neutral-500"
                value={gpReward}
                onChange={(e) => setGpReward(e.currentTarget.valueAsNumber)}
              />
          </div>
          <div className="flex flex-col items-start space-y-2">
            <label htmlFor='questInvReward' className="text-xs text-neutral-500">
                Quest Reward (Inv)
            </label>
            <input 
                id="questInvReward"
                type="text"
                placeholder="Enter Quest Reward (Inv)"
                className="text-sm border border-neutral-500 rounded-full px-2 py-[0.2rem] flex justify-center w-full bg-gray-50 dark:bg-[#222] placeholder:text-neutral-500"
                value={invReward}
                onChange={(e) => setInvReward(e.currentTarget.value)}
              />
          </div>

          <div className="flex justify-start">
            <button 
              onClick={() => {
                closeQuestModal();
                onSave({
                  title,
                  type,
                  body,
                  gpReward,
                  invReward,
                  assigned,
                  completed,
                });
                setTitle('');
                setBody('');
                setType('');
                setGpReward(0);
                setInvReward('');
                setAssigned('');
                setCompleted(false);
              }}
              className="text-xs mt-8 rounded-full py-1.5 px-5 bg-green-500 text-white"
            > Save Quest</button>
          </div>

              {/* <button
                className="bg-blue-500 text-white p-1.5 px-5 rounded-full text-xs uppercase w-fit flex"
                onClick={(e) => {
                  const titleInput = document.getElementById("addCampaign") as HTMLInputElement;
                  if (titleInput) {
                    createQuest.mutate({
                      title: titleInput.value,
                    });
                    titleInput.value = '';
                  }
                }}
              >
                create
              </button> */}

          </div>
      </Modal>
    </>
  )
}

export default QuestCreator