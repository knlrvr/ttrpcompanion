import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { CharacterTotalsChart } from "./CharacterTotalsChart";

ChartJS.register(ArcElement, Tooltip, Legend);

type CharacterStats = {
    id?: string;
    title?: string;
    characterId?: string;
    stats: Stats[];
}

type Stats = {
    id?: string;
    title: string;
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

export default function CharacterTotals({ characters }: { characters: CharacterStats[] }) {

    const [isLoading, setIsLoading] = useState(true);
    const [totalStats, setTotalStats] = useState<Stats>();
  
    useEffect(() => {
      // Fetch the stats here and update the state
      const fetchCampaignStats = () => {
        try {
          // Calculate the campaign totals
          const campaignStats: Stats = {
            characterId: "campaignTotal",
            level: 0,
            title: "",
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

    // chart display
    const displayDmgDealt = characters.some(character =>
        character.stats[0]?.dmgDealt !== undefined && character.stats[0]?.dmgDealt > 0
    );
    const displayDmgTaken = characters.some(character =>
        character.stats[0]?.dmgTaken !== undefined && character.stats[0]?.dmgTaken > 0
    );
    const displayTotalKills = characters.some(character =>
        character.stats[0]?.totalKills !== undefined && character.stats[0]?.totalKills > 0
    );
    const displayTotalDeaths = characters.some(character =>
        character.stats[0]?.totalKills !== undefined && character.stats[0]?.totalDeaths > 0
    );
    const displayTotalNatTwenty = characters.some(character =>
        character.stats[0]?.totalKills !== undefined && character.stats[0]?.natTwenty > 0
    );
    const displayTotalNatOne = characters.some(character =>
        character.stats[0]?.totalKills !== undefined && character.stats[0]?.natOne > 0
    );

    return (
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
            {displayDmgDealt && (
                <div className="flex flex-col items-center space-y-2">
                    <CharacterTotalsChart
                        statData={characters.map(character => character.stats[0]?.dmgDealt ?? 0)}
                        chartLabels={characters.map(character => character.title)}
                        backgroundColors={[
                        '#f87171',
                        '#3b82f6',
                        '#fb923c',
                        '#fed7aa',
                        '#fde047',
                        '#059669',
                        ]}
                        borderColors={[
                        '#dc2626',
                        '#2563eb',
                        '#ea580c',
                        '#f97316',
                        '#eab308',
                        '#065f46',
                        ]}
                    />
                    <span className="text-[#888] text-xs">Damage Dealt</span>
                </div>
            )}    
            {displayDmgTaken && (     
                <div className="flex flex-col items-center space-y-2">
                    <CharacterTotalsChart
                        statData={characters.map(character => character.stats[0]?.dmgTaken)}
                        chartLabels={characters.map(character => character.title)}
                        backgroundColors={[
                        '#f87171',
                        '#3b82f6',
                        '#fb923c',
                        '#fed7aa',
                        '#fde047',
                        '#059669',
                        ]}
                        borderColors={[
                        '#dc2626',
                        '#2563eb',
                        '#ea580c',
                        '#f97316',
                        '#eab308',
                        '#065f46',
                        ]}
                    />
                    <span className="text-[#888] text-xs">Damage Taken</span>
                </div>
            )} 
            {displayTotalKills && (
                <div className="flex flex-col items-center space-y-2">
                    <CharacterTotalsChart
                        statData={characters.map(character => character.stats[0]?.totalKills)}
                        chartLabels={characters.map(character => character.title)}
                        backgroundColors={[
                        '#f87171',
                        '#3b82f6',
                        '#fb923c',
                        '#fed7aa',
                        '#fde047',
                        '#059669',
                        ]}
                        borderColors={[
                        '#dc2626',
                        '#2563eb',
                        '#ea580c',
                        '#f97316',
                        '#eab308',
                        '#065f46',
                        ]}
                    />
                    <span className="text-[#888] text-xs">Total Kills</span>
                </div>
            )}
            {displayTotalDeaths && (
                <div className="flex flex-col items-center space-y-2">
                    <CharacterTotalsChart
                        statData={characters.map(character => character.stats[0]?.totalDeaths)}
                        chartLabels={characters.map(character => character.title)}
                        backgroundColors={[
                        '#f87171',
                        '#3b82f6',
                        '#fb923c',
                        '#fed7aa',
                        '#fde047',
                        '#059669',
                        ]}
                        borderColors={[
                        '#dc2626',
                        '#2563eb',
                        '#ea580c',
                        '#f97316',
                        '#eab308',
                        '#065f46',
                        ]}
                    />
                    <span className="text-[#888] text-xs">Total Deaths</span>
                </div>
            )}
            {displayTotalNatTwenty && (
                <div className="flex flex-col items-center space-y-2">
                    <CharacterTotalsChart
                        statData={characters.map(character => character.stats[0]?.natTwenty)}
                        chartLabels={characters.map(character => character.title)}
                        backgroundColors={[
                        '#f87171',
                        '#3b82f6',
                        '#fb923c',
                        '#fed7aa',
                        '#fde047',
                        '#059669',
                        ]}
                        borderColors={[
                        '#dc2626',
                        '#2563eb',
                        '#ea580c',
                        '#f97316',
                        '#eab308',
                        '#065f46',
                        ]}
                    />
                    <span className="text-[#888] text-xs">Natural 20&apos;s</span>
                </div>
            )}
            {displayTotalNatOne && (
                <div className="flex flex-col items-center space-y-2">
                    <CharacterTotalsChart
                        statData={characters.map(character => character.stats[0]?.natOne)}
                        chartLabels={characters.map(character => character.title)}
                        backgroundColors={[
                        '#f87171',
                        '#3b82f6',
                        '#fb923c',
                        '#fed7aa',
                        '#fde047',
                        '#059669',
                        ]}
                        borderColors={[
                        '#dc2626',
                        '#2563eb',
                        '#ea580c',
                        '#f97316',
                        '#eab308',
                        '#065f46',
                        ]}
                    />
                    <span className="text-[#888] text-xs">Natural 1&apos;s</span>
                </div>
            )}
        </div>
    )
}



