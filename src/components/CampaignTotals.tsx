import React, { useEffect, useState } from "react";

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
    <div className="p-2 sm:p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className='border-l-4 border-red-400 p-4 flex flex-col justify-between bg-white dark:bg-[#222] text-[#222] dark:text-white rounded-r-lg space-y-4'>
        <p className="text-sm font-light">Total Sessions</p>
        <span className="text-xl md:text-3xl font-semibold text-right">{totalStats.totalSessions}</span>
      </div>
      <div className='border-l-4 border-blue-500 p-4 flex flex-col justify-between bg-white dark:bg-[#222] text-[#222] dark:text-white rounded-r-lg space-y-4'>
        <p className="text-sm font-light">Total Time Played</p>
        <span className="text-xl md:text-3xl font-semibold text-right">{totalStats.totalTime} hrs</span>
      </div>
      <div className='border-l-4 border-purple-500 p-4 flex flex-col justify-between bg-white dark:bg-[#222] text-[#222] dark:text-white rounded-r-lg space-y-4'>
        <p className="text-sm font-light">Total Players</p>
        <span className="text-xl md:text-3xl font-semibold text-right">{totalStats.totalPlayers}</span>
      </div>
    </div>
  );
};

export default CampaignTotals;


