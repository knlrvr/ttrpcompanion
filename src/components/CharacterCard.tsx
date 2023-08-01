import { useState } from 'react'

import { BsTrash } from 'react-icons/bs'

import { type RouterOutputs } from '@/utils/api'

type Character = RouterOutputs["character"]["getAll"][0];

const getBorderColorLevel = (level: number): string => {
    if (level >= 1 && level <= 5) {
        return "border-red-400";
    } else if (level >= 6 && level <= 10) {
        return "border-red-600";
    } else if (level >= 11 && level <= 15) {
        return "border-red-800";
    } else {
        return "border-red-950";
    }
};

// probably would've been easier to assign a race to a group in the db lol
type RaceGroup = "Beastfolk" | "Draconian" | "Fae" | "Giantkin" | "Mech" | "Mundane" | "Planar" ;

const getBorderColorRace = (race:string): string => {
    const raceGroups: Record<RaceGroup, string> = {
        Beastfolk: "border-green-400",
        Draconian: "border-red-500",
        Fae: "border-purple-400",
        Giantkin: "border-orange-400",
        Mech: "border-[#222]",
        Mundane: "border-blue-400",
        Planar: "border-teal-500",
    };
    const raceToGroupMap: Record<string, RaceGroup> = {
        'Aarakocra': "Beastfolk",
        'Aasimar': "Planar",
        'Air Genasi': "Planar",
        'Astral Elf': "Fae",
        'Autognome': "Mech",
        'Bugbear': "Fae",
        'Centaur': "Beastfolk",
        'Changeling': "Fae",
        'Deep Gnome': "Giantkin",
        'Dragonborn': "Draconian",
        'Duergar': "Giantkin",
        'Dwarf': "Giantkin",
        'Earth Genasi': "Planar",
        'Eladrin': "Fae",
        'Elf': "Fae",
        'Fairy': "Fae",
        'Feral Tiefling': "Planar",
        'Firbolg': "Fae",
        'Fire Genasi': "Planar",
        'Giff': "Beastfolk", 
        'Githyanki': "Planar",
        'Githzerai': "Planar",
        'Gnome': "Giantkin",
        'Goblin': "Fae",
        'Goliath': "Giantkin",
        'Grung': "Beastfolk",
        'Hadozee': "Planar",
        'Half-Elf': "Fae",
        'Halfling': "Fae",
        'Half-Orc': "Giantkin",
        'Harengon': "Beastfolk",
        'Hobgoblin': "Fae",
        'Human': "Mundane",
        'Kalashtar': "Planar",
        'Kender': "Fae",
        'Kenku': "Beastfolk",
        'Kobold': "Draconian",
        'Leonin': "Beastfolk",
        'Lizardfolk': "Draconian",
        'Locathah': "Beastfolk",
        'Loxodon': "Beastfolk",
        'Minotaur': "Beastfolk",
        'Orc': "Giantkin",
        'Owlin': "Beastfolk",
        'Plasmoid': "Planar",
        'Satyr': "Fae",
        'Sea Elf': "Fae",
        'Shadar-kai': "Planar",
        'Shifter': "Beastfolk",
        'Simic Hybrid': "Beastfolk",
        'Tabaxi': "Beastfolk",
        'Tiefling': "Planar",
        'Thri-kreen': "Beastfolk",
        'Tortle': "Beastfolk",
        'Triton': "Planar",
        'Vedalken': "Planar",
        'Verdan': "Fae",
        'Warforged': "Mech",
        'Water Genasi': "Planar",
        'Yuan-ti': "Draconian",
    };
    const group = raceToGroupMap[race];
    const raceBorderColor = group ? raceGroups[group] : "border-gray-300";

    return raceBorderColor;
};

// am I overcomplicating this? 
type ClassType = "Artificer" | "Barbarian" | "Bard" | "Blood Hunter" | "Cleric" | "Druid" | "Fighter" | "Monk" | "Paladin" | "Ranger" | "Rogue" | "Sorcerer" | "Warlock" | "Wizard";

const getBorderColorClass = (charClass: string): string => {
    const classBorderColors: Record<ClassType, string> = {
        'Artificer': "border-amber-400",
        'Barbarian': "border-red-500",
        'Bard': "border-purple-400",
        'Blood Hunter': "border-red-800",
        'Cleric': "border-gray-700",
        'Druid': "border-emerald-500",
        'Fighter': "border-orange-600",
        'Monk': "border-blue-500",
        'Paladin': "border-yellow-500",
        'Ranger': "border-green-700",
        'Rogue': "border-stone-500",
        'Sorcerer': "border-red-600",
        'Warlock': "border-purple-700",
        "Wizard": "border-blue-800"
    };

    const classBorderColor = classBorderColors[charClass as ClassType] || "border-gray-300";
    return classBorderColor;
};

export const CharacterCard = ({
    character, 
    onDelete,
}: {
    character: Character,
    onDelete: () => void;
}) => {

    return (
        <div className="bg-gray-100 rounded-xl shadow-lg p-4 mb-6">
            <div className="">
                <div 
                    className=""
                    // onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="text-lg tracking-wide font-semibold flex justify-between">
                        <span>{character.title}</span>
                    </div>

                    <div className="">
                        {character.stats.map((stat) => (
                            <div key={stat.id}>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4">
                                
                                {/* general */}
                                    <div className={`border-l-4 ${getBorderColorLevel(stat.level)} p-4 flex flex-col justify-between bg-gray-50`}>
                                        <p className="text-xs font-light">Level</p>
                                        <span className="text-3xl font-light text-right">{stat.level}</span>
                                    </div>
                                    <div className={`border-l-4 ${getBorderColorRace(stat.charRace)} p-4 flex flex-col justify-between bg-gray-50`}>
                                        <p className="text-xs font-light">Race</p>
                                        <span className="text-3xl font-light text-right">{stat.charRace}</span>
                                    </div>
                                    <div className={`border-l-4 ${getBorderColorClass(stat.charClass)} p-4 flex flex-col justify-between bg-gray-50`}>
                                        <p className="text-xs font-light">Class</p>
                                        <span className="text-3xl font-light text-right">{stat.charClass}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 pt-4">
                                    {/* time & deaths */}
                                    <div className="border border-gray-400 rounded-lg p-4 flex flex-col space-y-2 items-end bg-gray-50">
                                        <span className="font-semibold text-2xl">{stat.totalSessions}</span>
                                        <p className="text-xs font-light">Total Sessions</p>
                                    </div>
                                    <div className="border border-gray-400 rounded-lg p-4 flex flex-col space-y-2 items-end bg-gray-50">
                                        <span className="font-semibold text-2xl">{stat.totalTime} hrs</span>
                                        <p className="text-xs font-light">Total Time Played</p>
                                    </div>
                                    <div className="border border-gray-400 rounded-lg p-4 flex flex-col space-y-2 items-end bg-gray-50">
                                        <span className="font-semibold text-2xl">{stat.totalXp}</span>
                                        <p className="text-xs font-light">Total Xp</p>
                                    </div>

                                    {/* stats */}
                                    <div className="border border-gray-400 rounded-lg p-4 flex flex-col space-y-2 items-end bg-gray-50">
                                        <span className="font-semibold text-2xl">{stat.totalDeaths}</span>
                                        <p className="text-xs font-light">Deaths</p>
                                    </div>
                                    <div className="border border-gray-400 rounded-lg p-4 flex flex-col space-y-2 items-end bg-gray-50">
                                        <span className="font-semibold text-2xl">{stat.dmgTaken}</span>
                                        <p className="text-xs font-light">Damage Taken</p>
                                    </div>
                                    <div className="border border-gray-400 rounded-lg p-4 flex flex-col space-y-2 items-end bg-gray-50">
                                        <span className="font-semibold text-2xl">{stat.dmgDealt}</span>
                                        <p className="text-xs font-light">Damage Dealt</p>
                                    </div>
                                    <div className="border border-gray-400 rounded-lg p-4 flex flex-col space-y-2 items-end bg-gray-50">
                                        <span className="font-semibold text-2xl">{stat.totalKills}</span>
                                        <p className="text-xs font-light">Total Kills</p>
                                    </div>
                                    <div className="border border-gray-400 rounded-lg p-4 flex flex-col space-y-2 items-end bg-gray-50">
                                        <span className="font-semibold text-2xl">{stat.critHits}</span>
                                        <p className="text-xs font-light">Critical Hits</p>
                                    </div>
                                    <div className="border border-gray-400 rounded-lg p-4 flex flex-col space-y-2 items-end bg-gray-50">
                                        <span className="font-semibold text-2xl">{stat.spellsCast}</span>
                                        <p className="text-xs font-light">Spells Cast</p>
                                    </div>
                                    <div className="border border-gray-400 rounded-lg p-4 flex flex-col space-y-2 items-end bg-gray-50">
                                        <span className="font-semibold text-2xl">{stat.turnsNoDmg}</span>
                                        <p className="text-xs font-light">Avg. Turns Without Damage</p>
                                    </div>
                                    <div className="border border-gray-400 rounded-lg p-4 flex flex-col space-y-2 items-end bg-gray-50">
                                        <span className="font-semibold text-2xl">{stat.totalHealingOthers}</span>
                                        <p className="text-xs font-light">Total HP Healed (others)</p>
                                    </div>
                                    <div className="border border-gray-400 rounded-lg p-4 flex flex-col space-y-2 items-end bg-gray-50">
                                        <span className="font-semibold text-2xl">{stat.totalHealingSelf}</span>
                                        <p className="text-xs font-light">Total HP Healed (self)</p>
                                    </div>

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

            <div className="flex justify-end text-sm uppercase text-gray-400">
                <span>{character.title}</span>
            </div>
        </div>
    )
}