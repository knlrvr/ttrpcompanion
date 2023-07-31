import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

import Head from "next/head";
import Link from "next/link";
import { api, type RouterOutputs } from "@/utils/api";

import { Header } from "@/components/Header";
import { CharacterEditor } from "@/components/CharacterEditor";
import { CharacterCard } from "@/components/CharacterCard";


export default function Home() {

  return (
    <>
      <Head>
        <title>TTRPCompanion</title>
        <meta name="description" content="TTRPCompanion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <Header />
        <Content />
        <AuthShowcase />
      </main>
    </> 
  );
}

type Campaign = RouterOutputs["campaign"]["getAll"][0];
type CharacterWithStats = RouterOutputs["character"]["getAll"][0] & {characterStats: CharacterStats[] };

type CharacterStats = {
  id: string;
  characterId: string;
  level: number;

};

const Content: React.FC = () => {
  const { data: sessionData } = useSession();

  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const { data: campaigns, refetch: refetchCampaigns } = api.campaign.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setSelectedCampaign(selectedCampaign ?? data[0] ?? null);
      }
    }
  );

  const createCampaign = api.campaign.create.useMutation({
    onSuccess: () => {
      void refetchCampaigns();
    }
  });

  const { data: characters, refetch: refetchCharacters } = api.character.getAll.useQuery(
    {
      campaignId: selectedCampaign?.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined && selectedCampaign !== null,
    }
  );

  const createCharacter = api.character.create.useMutation({
    onSuccess: () => {
      void refetchCharacters();
    },
  });

  const deleteCharacter = api.character.delete.useMutation({
    onSuccess: () => {
      void refetchCharacters();
    },
  });

  return (
    <div className="p-4 grid grid-cols-4 gap-4">
      <div className="">
        <input 
          type="text"
          placeholder="New Campaign"
          className="border rounded-full px-3 py-1"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createCampaign.mutate({
                title: e.currentTarget.value,
              });
              e.currentTarget.value = "";
            }
          }}
        />
        <ul className="pt-8 px-3">
          {campaigns?.map((campaign) => (
            <li key={campaign.id}>
              <Link   
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  setSelectedCampaign(campaign); 
                }}
              >
                {campaign.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-3">
        <CharacterEditor 
          onSave={({ title, stats }) => {
            void createCharacter.mutate({
              title,
              campaignId: selectedCampaign?.id ?? "",
              stats,
            })
          }}
        />

        {characters?.map((character) => (
          <div key={character.id} className="">
            <CharacterCard
              character={character}
              onDelete={() => void deleteCharacter.mutate({ id: character.id})}
            />
          </div>
        ))}

      </div>
    </div>
  );

};




// just to show info for now
function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-center text-xs">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20 text-sm"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
