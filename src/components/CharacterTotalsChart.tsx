import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

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
  
type CharacterStats = {
    id?: string;
    characterId?: string;
    stats: Stats[];
}

type CharacterTotalsChartProps = {
    statData: number[];
    chartLabels: string[];
    backgroundColors: string[];
    borderColors: string[];
};

export function CharacterTotalsChart({ statData, chartLabels, backgroundColors, borderColors }: CharacterTotalsChartProps){
    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                data: statData,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            }
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                display: false,
            },
            textCenter: {
                display: true,
                text: `oi`
            }
        },
    };

    return (
        <div className="flex justify-center max-h-[10rem]">
            <Doughnut data={chartData} options={chartOptions} />
        </div>
    );
}