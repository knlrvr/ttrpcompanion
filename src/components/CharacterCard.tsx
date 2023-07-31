import { useState } from 'react'

import { BsTrash } from 'react-icons/bs'

import { type RouterOutputs } from '@/utils/api'
type Character = RouterOutputs["character"]["getAll"][0];

export const CharacterCard = ({
    character, 
    onDelete,
}: {
    character: Character,
    onDelete: () => void;
}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);

    return (
        <div className="border bg-gray-100 rounded-xl shadow-md p-4">
            <div className="">
                <div 
                    className=""
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="text-lg tracking-wide font-semibold">{character.title}</div>
                    <div className="">
                        {character.stats.map((stat) => (
                            <div key={stat.id}
                                className="grid grid-cols-3 gap-8 pt-4">

                                {/* general */}
                                <div className="border-2 border-[#222] rounded-md p-4 flex flex-col justify-between bg-gray-200">
                                    <p className="text-xs font-light">Level</p>
                                    <span className="text-3xl font-light text-right">{stat.level}</span>
                                </div>
                                <div className="border-2 border-[#222] rounded-md p-4 flex flex-col justify-between bg-gray-200">
                                    <p className="text-xs font-light">Race</p>
                                    <span className="text-3xl font-light text-right">{stat.charRace}</span>
                                </div>
                                <div className="border-2 border-[#222] rounded-md p-4 flex flex-col justify-between bg-gray-200">
                                    <p className="text-xs font-light">Class</p>
                                    <span className="text-3xl font-light text-right">{stat.charClass}</span>
                                </div>

                                {/* time & deaths */}
                                <div className="border border-gray-400 rounded-md p-4 flex flex-col space-y-4">
                                    <p className="text-xs font-light">Total Time Played</p>
                                    <span className="font-semibold text-right">{stat.totalTime} hrs.</span>
                                </div>
                                <div className="border border-gray-400 rounded-md p-4 flex flex-col space-y-4">
                                    <p className="text-xs font-light">Total Sessions</p>
                                    <span className="font-semibold text-right">{stat.totalSessions}</span>
                                </div>
                                <div className="border border-gray-400 rounded-md p-4 flex flex-col space-y-4">
                                    <p className="text-xs font-light">Deaths</p>
                                    <span className="font-semibold text-right">{stat.totalDeaths}</span>
                                </div>

                                {/* stats */}
                                <div className="border border-gray-400 rounded-md p-4 flex flex-col space-y-4">
                                    <p className="text-xs font-light">Damage Taken</p>
                                    <span className="font-semibold text-right">{stat.dmgTaken}</span>
                                </div>
                                <div className="border border-gray-400 rounded-md p-4 flex flex-col space-y-4">
                                    <p className="text-xs font-light">Damage Dealt</p>
                                    <span className="font-semibold text-right">{stat.dmgDealt}</span>
                                </div>
                                <div className="border border-gray-400 rounded-md p-4 flex flex-col space-y-4">
                                    <p className="text-xs font-light">Total Kills</p>
                                    <span className="font-semibold text-right">{stat.totalKills}</span>
                                </div>

                                <div className="border border-gray-400 rounded-md p-4 flex flex-col space-y-4">
                                    <p className="text-xs font-light">Critical Hits</p>
                                    <span className="font-semibold text-right">{stat.critHits}</span>
                                </div>
                                <div className="border border-gray-400 rounded-md p-4 flex flex-col space-y-4">
                                    <p className="text-xs font-light">Spells Cast</p>
                                    <span className="font-semibold text-right">{stat.spellsCast}</span>
                                </div>
                                <div className="border border-gray-400 rounded-md p-4 flex flex-col space-y-4">
                                    <p className="text-xs font-light">Turns Without Damage</p>
                                    <span className="font-semibold text-right">{stat.turnsNoDmg}</span>
                                </div>

                                <div className="border border-gray-400 rounded-md p-4 flex flex-col space-y-4">
                                    <p className="text-xs font-light">Total HP Healed (others)</p>
                                    <span className="font-semibold text-right">{stat.totalHealingOthers}</span>
                                </div>
                                <div className="border border-gray-400 rounded-md p-4 flex flex-col space-y-4">
                                    <p className="text-xs font-light">Total HP Healed (self)</p>
                                    <span className="font-semibold text-right">{stat.totalHealingSelf}</span>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            <button 
                className="pt-6"
                onClick={onDelete}
            > <BsTrash /> </button>
        </div>
    )
}