import React from 'react'
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";

import PageLayout from '@/components/PageLayout';

import { UserCharacterCard } from '@/components/UserCharacterCard';
import { CharacterEditor } from '@/components/CharacterEditor';

import { toast } from 'react-toastify';

const Characters = () => {

  const userCharCreated = () => toast.success('New character created! This character is now available in your character list.', {
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

  const userCharDeleted = () => toast.error('Character has been deleted! This character is no longer available to view.', {
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

  const { data: charactersData, refetch: refetchCharacters } = api.character.getAllUser.useQuery(
    {
      userId: sessionData?.user.id ?? "",
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

  return (
    <PageLayout>
      <div className="">
        <p className="text-[#888] uppercase text-xs pb-2">inactive characters</p>
        <div className="pb-4 grid grid-cols-1 gap-4 mt-2">
          {charactersData?.map((character) => (
            <div key={character.id} className="">
              <UserCharacterCard
                character={character}
                onDelete={() => {
                  void deleteCharacter.mutate({ id: character.id })
                  userCharDeleted();
                }}
              />
            </div>
          ))}
          <div className="flex flex-col pt-4">
            <CharacterEditor
              onSave={({ title, stats }) => {
              void createCharacter.mutate({
                title,
                campaignId: null,
                userId: sessionData?.user.id ?? "",
                stats,
                });
              userCharCreated();
              }}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default Characters