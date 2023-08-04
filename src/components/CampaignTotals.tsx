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

const CampaignTotals: React.FC<{ characters: CharacterStats[] }> = ({ characters }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalStats, setTotalStats] = useState<Stats>({
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
  });

  useEffect(() => {
    // Fetch the stats here and update the state
    const fetchCampaignStats = async () => {
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

        characters.forEach((character) => {
          character.stats.forEach((characterStats) => {
            // same stats
            campaignStats.totalSessions = characterStats.totalSessions;
            campaignStats.totalTime = characterStats.totalTime;
            campaignStats.dmgDealt += characterStats.dmgDealt;
            campaignStats.dmgTaken += characterStats.dmgTaken;
            campaignStats.natTwenty += characterStats.natTwenty;
            campaignStats.natOne += characterStats.natOne;
            campaignStats.totalKills += characterStats.totalKills;
            campaignStats.totalDeaths += characterStats.totalDeaths;
            // Add other stats accordingly
          });
        });

        // Set the campaign totals
        setTotalStats(campaignStats);
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
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className='border-l-4 border-green-500 p-4 flex flex-col justify-between bg-white rounded-r-lg space-y-4'>
        <p className="text-sm font-light">Total Sessions</p>
        <span className="text-2xl md:text-3xl font-semibold text-right">{totalStats.totalSessions}</span>
      </div>
      <div className='border-l-4 border-yellow-400 p-4 flex flex-col justify-between bg-white rounded-r-lg space-y-4'>
        <p className="text-sm font-light">Total Time Played</p>
        <span className="text-2xl md:text-3xl font-semibold text-right">{totalStats.totalTime} hrs</span>
      </div>
      <div className='border-l-4 border-cyan-500 p-4 flex flex-col justify-between bg-white rounded-r-lg space-y-4'>
        <p className="text-sm font-light">Nat 1's Rolled</p>
        <span className="text-2xl md:text-3xl font-semibold text-right">{totalStats.natOne}</span>
      </div>
      <div className='border-l-4 border-orange-500 p-4 flex flex-col justify-between bg-white rounded-r-lg space-y-4'>
        <p className="text-sm font-light">Nat 20's Rolled</p>
        <span className="text-2xl md:text-3xl font-semibold text-right">{totalStats.natTwenty}</span>
      </div>
      <div className='border-l-4 border-blue-500 p-4 flex flex-col justify-between bg-white rounded-r-lg space-y-4'>
        <p className="text-sm font-light">Total Damage Dealt</p>
        <span className="text-2xl md:text-3xl font-semibold text-right">{totalStats.dmgDealt}</span>
      </div>
      <div className='border-l-4 border-red-500 p-4 flex flex-col justify-between bg-white rounded-r-lg space-y-4'>
        <p className="text-sm font-light">Total Damage Taken</p>
        <span className="text-2xl md:text-3xl font-semibold text-right">{totalStats.dmgTaken}</span>
      </div>
      <div className='border-l-4 border-purple-500 p-4 flex flex-col justify-between bg-white rounded-r-lg space-y-4'>
        <p className="text-sm font-light">Total Damage Taken</p>
        <span className="text-2xl md:text-3xl font-semibold text-right">{totalStats.dmgTaken}</span>
      </div>
      <div className='border-l-4 border-rose-400 p-4 flex flex-col justify-between bg-white rounded-r-lg space-y-4'>
        <p className="text-sm font-light">Total Damage Dealt</p>
        <span className="text-2xl md:text-3xl font-semibold text-right">{totalStats.dmgTaken}</span>
      </div>
      {/* Add other stats accordingly */}
    </div>
  );
};

export default CampaignTotals;

