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
        <div className="p-0 sm:p-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8 py-6 mb-4">
            {displayDmgDealt && (
                <div className="flex flex-col items-center space-y-2">
                    <CharacterTotalsChart
                        statData={characters.map(character => character.stats[0]?.dmgDealt ?? 0)}
                        chartLabels={characters.map(character => character.title ?? "")}
                        backgroundColors={[
                            '#93c5fd',
                            '#f87171',
                            '#fdba74',
                            '#3b82f6',
                            '#dc2626',
                            '#ea580c',
                            ]}
                        borderColors={[
                            '#93c5fd',
                            '#f87171',
                            '#fdba74',
                            '#3b82f6',
                            '#dc2626',
                            '#ea580c',
                        ]}
                    />
                    <p className="text-[#888] text-xs">Damage Dealt &mdash; <span className="font-bold text-[#555] dark:text-white font-mono">{totalStats.dmgDealt} hp</span></p>
                </div>
            )}    
            {displayDmgTaken && (     
                <div className="flex flex-col items-center space-y-2">
                    <CharacterTotalsChart
                        statData={characters.map(character => character.stats[0]?.dmgTaken ?? 0)}
                        chartLabels={characters.map(character => character.title ?? "")}
                        backgroundColors={[
                            '#93c5fd',
                            '#f87171',
                            '#fdba74',
                            '#3b82f6',
                            '#dc2626',
                            '#ea580c',
                            ]}
                        borderColors={[
                            '#93c5fd',
                            '#f87171',
                            '#fdba74',
                            '#3b82f6',
                            '#dc2626',
                            '#ea580c',
                        ]}
                    />
                    <p className="text-[#888] text-xs">Damage Taken &mdash; <span className="font-bold text-[#555] dark:text-white font-mono">{totalStats.dmgTaken} hp</span></p>
                </div>
            )} 
            {displayTotalKills && (
                <div className="flex flex-col items-center space-y-2">
                    <CharacterTotalsChart
                        statData={characters.map(character => character.stats[0]?.totalKills ?? 0)}
                        chartLabels={characters.map(character => character.title ?? "")}
                        backgroundColors={[
                            '#93c5fd',
                            '#f87171',
                            '#fdba74',
                            '#3b82f6',
                            '#dc2626',
                            '#ea580c',
                            ]}
                        borderColors={[
                            '#93c5fd',
                            '#f87171',
                            '#fdba74',
                            '#3b82f6',
                            '#dc2626',
                            '#ea580c',
                        ]}
                    />
                    <p className="text-[#888] text-xs">Total Kills &mdash; <span className="font-bold text-[#555] dark:text-white font-mono">{totalStats.totalKills}</span> </p>
                </div>
            )}
            {displayTotalDeaths && (
                <div className="flex flex-col items-center space-y-2">
                    <CharacterTotalsChart
                        statData={characters.map(character => character.stats[0]?.totalDeaths ?? 0)}
                        chartLabels={characters.map(character => character.title ?? "")}
                        backgroundColors={[
                            '#93c5fd',
                            '#f87171',
                            '#fdba74',
                            '#3b82f6',
                            '#dc2626',
                            '#ea580c',
                            ]}
                        borderColors={[
                            '#93c5fd',
                            '#f87171',
                            '#fdba74',
                            '#3b82f6',
                            '#dc2626',
                            '#ea580c',
                        ]}
                    />
                    <p className="text-[#888] text-xs">Total Deaths &mdash; <span className="font-bold text-[#555] dark:text-white font-mono">{totalStats.totalDeaths}</span> </p>
                </div>
            )}
            {displayTotalNatTwenty && (
                <div className="flex flex-col items-center space-y-2">
                    <CharacterTotalsChart
                        statData={characters.map(character => character.stats[0]?.natTwenty ?? 0)}
                        chartLabels={characters.map(character => character.title ?? "")}
                        backgroundColors={[
                            '#93c5fd',
                            '#f87171',
                            '#fdba74',
                            '#3b82f6',
                            '#dc2626',
                            '#ea580c',
                            ]}
                        borderColors={[
                            '#93c5fd',
                            '#f87171',
                            '#fdba74',
                            '#3b82f6',
                            '#dc2626',
                            '#ea580c',
                        ]}
                    />
                    <p className="text-[#888] text-xs">Natural 20&apos;s &mdash; <span className="font-bold text-[#555] dark:text-white font-mono">{totalStats.natTwenty}</span> </p>
                </div>
            )}
            {displayTotalNatOne && (
                <div className="flex flex-col items-center space-y-2">
                    <CharacterTotalsChart
                        statData={characters.map(character => character.stats[0]?.natOne ?? 0)}
                        chartLabels={characters.map(character => character.title ?? "")}
                        backgroundColors={[
                            '#93c5fd',
                            '#f87171',
                            '#fdba74',
                            '#3b82f6',
                            '#dc2626',
                            '#ea580c',
                            ]}
                        borderColors={[
                            '#93c5fd',
                            '#f87171',
                            '#fdba74',
                            '#3b82f6',
                            '#dc2626',
                            '#ea580c',
                        ]}
                    />
                    <p className="text-[#888] text-xs">Natural 1&apos;s &mdash; <span className="font-bold text-[#555] dark:text-white font-mono">{totalStats.natOne}</span> </p>
                </div>
            )}
        </div>
    )
}



