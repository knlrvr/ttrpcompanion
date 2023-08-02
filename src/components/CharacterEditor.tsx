import { useState } from 'react'

import { BsPlusLg, BsDashLg } from 'react-icons/bs'

export const CharacterEditor = ({
    onSave,
}: {
    onSave: (character: { 
        title: string; 
        stats: {
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
        }
    }) => void;
}) => {

    const [title, setTitle] = useState<string>("");
    const [level, setLevel] = useState<number>(0);
    const [charClass, setCharClass] = useState<string>("");
    const [charRace, setCharRace] = useState<string>("");
    const [totalSessions, setTotalSessions] = useState<number>(0);
    const [totalTime, setTotalTime] = useState<number>(0);
    const [totalXp, setTotalXp] = useState<number>(0);
    const [dmgDealt, setDmgDealt] = useState<number>(0);
    const [dmgTaken, setDmgTaken] = useState<number>(0);
    const [critHits, setCritHits] = useState<number>(0);
    const [totalKills, setTotalKills] = useState<number>(0);
    const [spellsCast, setSpellsCast] = useState<number>(0);
    const [totalHealingOthers, setTotalHealingOthers] = useState<number>(0);
    const [totalHealingSelf, setTotalHealingSelf] = useState<number>(0);
    const [totalDeaths, setTotalDeaths] = useState<number>(0);
    const [turnsNoDmg, setTurnsNoDmg] = useState<number>(0);

    const charClassOptions = [
        'Artificer',
        'Barbarian', 
        'Bard',
        'Blood Hunter',
        'Cleric',
        'Druid',
        'Fighter',
        'Monk',
        'Paladin',
        'Ranger',
        'Rogue',
        'Sorcerer',
        'Warlock',
        'Wizard'
    ]

    const charRaceOptions = [
        'Aarakocra',            // beastfolk
        'Aasimar',              // planar
        'Air Genasi',           // planar
        'Astral Elf',           // fae
        'Autognome',            // mech
        'Bugbear',              // fae
        'Centaur',              // beastfolk
        'Changeling',           // fae
        'Deep Gnome',           // giantkin
        'Dragonborn',           // draconian
        'Duergar',              // giantkin
        'Dwarf',                // giantkin
        'Earth Genasi',         // planar
        'Eladrin',              // fae
        'Elf',                  // fae
        'Fairy',                // fae
        'Feral Tiefling',       // planar
        'Firbolg',              // fae
        'Fire Genasi',          // planar
        'Giff',                 // beastfolk
        'Githyanki',            // planar
        'Githzerai',            // planar
        'Gnome',                // giantkin
        'Goblin',               // fae
        'Goliath',              // giantkin
        'Grung',                // beastfolk
        'Hadozee',              // planar
        'Half-Elf',             // fae
        'Halfling',             // fae
        'Half-Orc',             // giantkin
        'Harengon',             // beastfolk
        'Hobgoblin',            // fae
        'Human',                // mundane
        'Kalashtar',            // planar
        'Kender',               // fae
        'Kenku',                // beastfolk
        'Kobold',               // draconian
        'Leonin',               // beastfolk
        'Lizardfolk',           // draconian
        'Locathah',             // beastfolk
        'Loxodon',              // beastfolk
        'Minotaur',             // beastfolk
        'Orc',                  // giantkin
        'Owlin',                // beastfolk
        'Plasmoid',             // planar
        'Satyr',                // fae
        'Sea Elf',              // fae
        'Shadar-kai',           // planar
        'Shifter',              // beastfolk
        'Simic Hybrid',         // beastfolk
        'Tabaxi',               // beastfolk
        'Tiefling',             // planar
        'Thri-kreen',           // beastfolk
        'Tortle',               // beastfolk
        'Triton',               // planar
        'Vedalken',             // planar
        'Verdan',               // fae
        'Warforged',            // mech
        'Water Genasi',         // planar
        'Yuan-ti'               // draconian
    ]

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    return (
        <div className="py-6 border p-4 rounded-lg">
            <div className="flex justify-between">
                <span className="text-gray-400 uppercase text-sm">Create Character</span>
                <button 
                    className="text-gray-400"
                    onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? <BsDashLg /> : <BsPlusLg />}
                </button>
            </div>

            {isExpanded && ( 
            <div className="flex flex-col mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor='name'
                            className="text-xs uppercase text-gray-300">
                                name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder='Character Name'
                            className="rounded-full px-3 py-[0.1rem] w-full placeholder:text-gray-300"
                            value={title}
                            onChange={(e) => setTitle(e.currentTarget.value)}
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor='level'
                                className="text-xs uppercase text-gray-300"
                            > level </label>
                        <input
                            id="level"
                            type="number"
                            placeholder='Level'
                            className="rounded-full px-3 py-[0.1rem] placeholder:text-gray-300"
                            value={level}
                            onChange={(e) => setLevel(e.currentTarget.valueAsNumber)}
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor='race'
                            className="text-xs uppercase text-gray-300">
                            race
                        </label>
                        <select 
                            id="race"
                            className="rounded-full px-2 py-1 w-full placeholder:text-gray-300"
                            value={charRace}
                            onChange={(e) => setCharRace(e.currentTarget.value)}
                        >
                        {charRaceOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                        ))}
                        </select>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor='class'
                            className="text-xs uppercase text-gray-300"
                        > class </label>
                        <select
                            id="class"
                            className="rounded-full px-2 py-1 w-full placeholder:text-gray-300"
                            value={charClass}
                            onChange={(e) => setCharClass(e.currentTarget.value)}
                        >
                        {charClassOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 py-4">

                    <div className="flex flex-col space-y-2">
                        <label htmlFor='level'
                                className="text-xs uppercase text-gray-300"
                            > sessions </label> 
                        <input 
                            id="sessions"
                            type="number"
                            placeholder="Sessions"
                            className="rounded-full px-3 py-1 placeholder:text-gray-300"
                            value={totalSessions}
                            onChange={(e) => setTotalSessions(e.currentTarget.valueAsNumber)}
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor='level'
                                className="text-xs uppercase text-gray-300"
                            > total time </label> 
                        <input 
                            id="time"
                            type="number"
                            placeholder="Time"
                            className="rounded-full px-3 py-1 placeholder:text-gray-300"
                            value={totalTime}
                            onChange={(e) => setTotalTime(e.currentTarget.valueAsNumber)}
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor='level'
                                className="text-xs uppercase text-gray-300"
                            > total xp </label> 
                        <input 
                            id="time"
                            type="number"
                            placeholder="Time"
                            className="rounded-full px-3 py-1 placeholder:text-gray-300"
                            value={totalXp}
                            onChange={(e) => setTotalXp(e.currentTarget.valueAsNumber)}
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor='dmgDealt'
                                className="text-xs uppercase text-gray-300"
                            > total damage dealt </label> 
                        <input 
                            id="dmgDealt"
                            type="number"
                            placeholder="Damage Dealt"
                            className="rounded-full px-3 py-1 placeholder:text-gray-300"
                            value={dmgDealt}
                            onChange={(e) => setDmgDealt(e.currentTarget.valueAsNumber)}
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor='dmgTaken'
                                className="text-xs uppercase text-gray-300"
                            > total damage taken </label> 
                        <input 
                            type="number"
                            placeholder="Damage Taken"
                            className="rounded-full px-3 py-1 placeholder:text-gray-300"
                            value={dmgTaken}
                            onChange={(e) => setDmgTaken(e.currentTarget.valueAsNumber)}
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor='critHits'
                                className="text-xs uppercase text-gray-400"
                            > Total Critical Hits </label> 
                        <input 
                            id="critHits"
                            type="number"
                            placeholder="Critical Hits"
                            className="rounded-full px-3 py-1 placeholder:text-gray-300"
                            value={critHits}
                            onChange={(e) => setCritHits(e.currentTarget.valueAsNumber)}
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor='totalKills'
                                className="text-xs uppercase text-gray-300"
                            > total kills </label> 
                        <input 
                            id="totalKills"
                            type="number"
                            placeholder="Total Kills"
                            className="rounded-full px-3 py-1 placeholder:text-gray-300"
                            value={totalKills}
                            onChange={(e) => setTotalKills(e.currentTarget.valueAsNumber)}
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor='spellsCast'
                                className="text-xs uppercase text-gray-300"
                            > spells cast </label> 
                        <input 
                            id="spellsCast"
                            type="number"
                            placeholder="Spells Cast"
                            className="rounded-full px-3 py-1 placeholder:text-gray-300"
                            value={spellsCast}
                            onChange={(e) => setSpellsCast(e.currentTarget.valueAsNumber)}
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor='totalhealingOthers'
                                className="text-xs uppercase text-gray-300"
                            > HP Healed (O) </label> 
                        <input  
                            id="totalHealingOthers"
                            type="number"
                            placeholder="Healing Done"
                            className="rounded-full px-3 py-1 placeholder:text-gray-300"
                            value={totalHealingOthers}
                            onChange={(e) => setTotalHealingOthers(e.currentTarget.valueAsNumber)}
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor='totalHealingSelf'
                                className="text-xs uppercase text-gray-300"
                            > HP Healed (S) </label> 
                        <input 
                            id="totalHealingSelf"
                            type="number"
                            placeholder="Healing Taken"
                            className="rounded-full px-3 py-1 placeholder:text-gray-300"
                            value={totalHealingSelf}
                            onChange={(e) => setTotalHealingSelf(e.currentTarget.valueAsNumber)}
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor='totalDeaths'
                                className="text-xs uppercase text-gray-300"
                            > total deaths </label> 
                        <input 
                            id="totalDeaths"
                            type="number"
                            placeholder="Total Deaths"
                            className="rounded-full px-3 py-1 placeholder:text-gray-300"
                            value={totalDeaths}
                            onChange={(e) => setTotalDeaths(e.currentTarget.valueAsNumber)}
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor='turnsNoDmg'
                                className="text-xs uppercase text-gray-300"
                            > turns </label> 
                        <input 
                            id="turnsNoDmg"
                            type="number"
                            placeholder="Turns Without Damage"
                            className="rounded-full px-3 py-1 placeholder:text-gray-300"
                            value={turnsNoDmg}
                            onChange={(e) => setTurnsNoDmg(e.currentTarget.valueAsNumber)}
                        />
                    </div>
                </div>

                <button 
                    onClick={() => {
                        onSave({
                            title, 
                            stats: {
                                level,
                                charClass,
                                charRace,
                                totalSessions,
                                totalTime,
                                totalXp,
                                dmgDealt,
                                dmgTaken,
                                critHits,
                                totalKills,
                                spellsCast,
                                totalHealingOthers,
                                totalHealingSelf,
                                totalDeaths,
                                turnsNoDmg,
                            },
                        });
                        setTitle("");
                        setLevel(0);
                        setCharClass("");
                        setCharRace("");
                        setTotalSessions(0);
                        setTotalTime(0);
                        setTotalXp(0);
                        setDmgDealt(0);
                        setDmgTaken(0);
                        setCritHits(0);
                        setTotalKills(0);
                        setSpellsCast(0);
                        setTotalHealingOthers(0);
                        setTotalHealingSelf(0);
                        setTotalDeaths(0);
                        setTurnsNoDmg(0);
                    }}
                    className="mt-4 rounded-md py-1 px-3 bg-green-500 text-white"
                >
                    Save
                </button>
            </div>
            )}
        </div>
    )
};