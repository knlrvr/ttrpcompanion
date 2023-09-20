import React, { useEffect, useState } from "react";

import {
  BsPeople,
  BsClock,
  BsSlash
} from 'react-icons/bs'

interface Stats {
  id?: string;
  characterId: string;
  level: number;
  charClass: string;
  charRace: string;
  totalSessions: number;
  totalTime: number;
  totalXp: number;
  dmgDealt: number;
  dmgTaken: number;
  critHits: number;
  totalKills: number;
  spellsCast: number;
  totalHealingOthers: number;
  totalHealingSelf: number;
  totalDeaths: number;
  turnsNoDmg: number;
  combatTime: number;
  natTwenty: number;
  natOne: number;
  totalKo: number;
}

interface CharacterStats {
  id?: string;
  characterId?: string;
  stats: Stats[];
}

interface TotalStats extends Stats {
  totalPlayers: number;
}

const CampaignTotals: React.FC<{ characters: CharacterStats[] }> = ({ characters }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalStats, setTotalStats] = useState<TotalStats>({
    characterId: "campaignTotal",
    level: 0,
    charClass: "",
    charRace: "",
    totalSessions: 0,
    totalTime: 0,
    totalXp: 0,
    dmgDealt: 0,
    dmgTaken: 0,
    critHits: 0,
    totalKills: 0,
    spellsCast: 0,
    totalHealingOthers: 0,
    totalHealingSelf: 0,
    totalDeaths: 0,
    turnsNoDmg: 0,
    combatTime: 0,
    natTwenty: 0,
    natOne: 0,
    totalKo: 0,
    totalPlayers: 0, // Add totalPlayers property here
  });

  useEffect(() => {
    // Fetch the stats here and update the state
    const fetchCampaignStats = () => {
      try {
        // Calculate the campaign totals
        const campaignStats: Stats = {
          characterId: "campaignTotal",
          level: 0,
          charClass: "",
          charRace: "",
          totalSessions: 0,
          totalTime: 0,
          totalXp: 0,
          dmgDealt: 0,
          dmgTaken: 0,
          critHits: 0,
          totalKills: 0,
          spellsCast: 0,
          totalHealingOthers: 0,
          totalHealingSelf: 0,
          totalDeaths: 0,
          turnsNoDmg: 0,
          combatTime: 0,
          natTwenty: 0,
          natOne: 0,
          totalKo: 0,
        };

        let totalPlayers = 0; // Initialize the player count

        characters.forEach((character) => {
          character.stats.forEach((characterStats) => {
            campaignStats.totalSessions = characterStats.totalSessions;
            campaignStats.totalTime = characterStats.totalTime;
            campaignStats.dmgDealt += characterStats.dmgDealt;
            campaignStats.dmgTaken += characterStats.dmgTaken;
            campaignStats.natTwenty += characterStats.natTwenty;
            campaignStats.natOne += characterStats.natOne;
            campaignStats.totalKills += characterStats.totalKills;
            campaignStats.totalDeaths += characterStats.totalDeaths;

            // Increment player count for each unique characterId
            if (campaignStats.characterId !== characterStats.characterId) {
              totalPlayers++;
              campaignStats.characterId = characterStats.characterId; // Set it to the latest characterId
            }
          });
        });

        // Set the campaign totals
        setTotalStats({
          ...campaignStats,
          totalPlayers, // Add the totalPlayers count to the stats object
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchCampaignStats();
  }, [characters]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-4 grid grid-cols-3 gap-4 mt-2">
      <div className='flex flex-col sm:flex-row justify-start sm:items-end sm:space-x-2 p-4 pt-6 rounded-xl shadow-md bg-white dark:bg-[#222] relative'>
        <span className="text-3xl md:text-6xl">{totalStats.totalSessions}</span>
        <p className="mb-1 mt-3 sm:mt-0">Total <br /> Sessions</p>

        <div className="absolute -top-4 left-[1rem] md:-left-4 rounded-full w-8 h-8 bg-orange-300 flex justify-center items-center shadow-md">
          <BsSlash className="text-3xl text-[#222]" />
        </div>
      </div>

      <div className='flex flex-col sm:flex-row justify-start sm:items-end sm:space-x-2 p-4 pt-6 rounded-xl shadow-md bg-white dark:bg-[#222] relative'>
        <span className="text-3xl md:text-6xl">{totalStats.totalTime}</span>
        <p className="mb-1 mt-3 sm:mt-0">Total <br /> Hours</p>

        <div className="absolute -top-4 left-[1rem] md:-left-4 rounded-full w-8 h-8 bg-red-400 flex justify-center items-center shadow-md">
          <BsClock className="text-xl text-[#222]" />
        </div>
      </div>

      <div className='flex flex-col sm:flex-row justify-start sm:items-end sm:space-x-2 p-4 pt-6 rounded-xl shadow-md bg-white dark:bg-[#222] relative'>
        <span className="text-3xl md:text-6xl">{totalStats.totalPlayers}</span>
        <p className="mb-1 mt-3 sm:mt-0">Total <br /> Players</p>

        <div className="absolute -top-4 left-[1rem] md:-left-4 rounded-full w-8 h-8 bg-blue-300 flex justify-center items-center shadow-md">
          <BsPeople className="text-xl text-[#222]" />
        </div>
      </div>

    </div>
  );
};

export default CampaignTotals;


