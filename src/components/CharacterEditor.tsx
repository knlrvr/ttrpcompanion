import { useState } from 'react'

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
        'Aarakocra',
        'Aasimar',
        'Air Genasi',
        'Astral Elf',
        'Autognome',
        'Bugbear',
        'Centaur',
        'Changeling',
        'Deep Gnome',
        'Dragonborn',
        'Duergar',
        'Dwarf',
        'Earth Genasi',
        'Eladrin',
        'Elf',
        'Fairy',
        'Feral Tiefling',
        'Firbolg',
        'Fire Genasi',
        'Giff',
        'Githyanki',
        'Githzerai',
        'Gnome',
        'Goblin',
        'Goliath',
        'Grung',
        'Hadozee',
        'Half-Elf',
        'Halfling',
        'Half-Orc',
        'Harengon',
        'Hobgoblin',
        'Human',
        'Kalashtar',
        'Kender',
        'Kenku',
        'Kobold',
        'Leonin',
        'Lizardfolk',
        'Locathah',
        'Loxodon',
        'Minotaur',
        'Orc',
        'Owlin',
        'Plasmoid',
        'Satyr',
        'Sea Elf',
        'Shadar-kai',
        'Shifter',
        'Simic Hybrid',
        'Tabaxi',
        'Tiefling',
        'Thri-kreen',
        'Tortle',
        'Triton',
        'Vedalken',
        'Verdan',
        'Warforged',
        'Water Genasi',
        'Yuan-ti'
    ]

    return (
        <div className="py-6">
            <div className="flex flex-col space-x-2">

                {/* name input */}
                <div className="grid grid-cols-3 gap-8">
                    <input
                        type="text"
                        placeholder='Character Name'
                        className="border rounded-full px-3 py-1"
                        value={title}
                        onChange={(e) => setTitle(e.currentTarget.value)}
                    />

                    {/*  select class */}
                    <select
                        className="border rounded-full px-3 py-1"
                        value={charClass}
                        onChange={(e) => setCharClass(e.currentTarget.value)}
                    >
                    {charClassOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                    </select>

                    {/* select race */}
                    <select 
                        className="border rounded-full px-3 py-1"
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

                <div className="grid grid-cols-3 gap-8 py-8">

                {/* level */}
                <input
                    type="number"
                    placeholder='Level'
                    className="border"
                    value={level}
                    onChange={(e) => setLevel(e.currentTarget.valueAsNumber)}
                />

                {/* sessions */}
                <input 
                    type="number"
                    placeholder="Sessions"
                    className="border"
                    value={totalSessions}
                    onChange={(e) => setTotalSessions(e.currentTarget.valueAsNumber)}
                />

                {/* time */}
                <input 
                    type="number"
                    placeholder="Time"
                    className="border"
                    value={totalTime}
                    onChange={(e) => setTotalTime(e.currentTarget.valueAsNumber)}
                />

                {/* damage dealt */}
                <input 
                    type="number"
                    placeholder="Damage Dealt"
                    className="border"
                    value={dmgDealt}
                    onChange={(e) => setDmgDealt(e.currentTarget.valueAsNumber)}
                />

                {/* damage taken */}
                <input 
                    type="number"
                    placeholder="Damage Taken"
                    className="border"
                    value={dmgTaken}
                    onChange={(e) => setDmgTaken(e.currentTarget.valueAsNumber)}
                />

                {/* crits */}
                <input 
                    type="number"
                    placeholder="Critical Hits"
                    className="border"
                    value={critHits}
                    onChange={(e) => setCritHits(e.currentTarget.valueAsNumber)}
                />

                {/* total kills */}
                <input 
                    type="number"
                    placeholder="Total Kills"
                    className="border"
                    value={totalKills}
                    onChange={(e) => setTotalKills(e.currentTarget.valueAsNumber)}
                />

                {/* spells cast */}
                <input 
                    type="number"
                    placeholder="Spells Cast"
                    className="border"
                    value={spellsCast}
                    onChange={(e) => setSpellsCast(e.currentTarget.valueAsNumber)}
                />

                {/* total healing to others */}
                <input 
                    type="number"
                    placeholder="Healing Done"
                    className="border"
                    value={totalHealingOthers}
                    onChange={(e) => setTotalHealingOthers(e.currentTarget.valueAsNumber)}
                />

                {/* total healing to self */}
                <input 
                    type="number"
                    placeholder="Healing Taken"
                    className="border"
                    value={totalHealingSelf}
                    onChange={(e) => setTotalHealingSelf(e.currentTarget.valueAsNumber)}
                />

                {/* total deaths */}
                <input 
                    type="number"
                    placeholder="Total Deaths"
                    className="border"
                    value={totalDeaths}
                    onChange={(e) => setTotalDeaths(e.currentTarget.valueAsNumber)}
                />

                {/* turns without damage */}
                <input 
                    type="number"
                    placeholder="Turns Without Damage"
                    className="border"
                    value={turnsNoDmg}
                    onChange={(e) => setTurnsNoDmg(e.currentTarget.valueAsNumber)}
                />

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
                    className="rounded-full py-1 px-3 bg-green-400 text-green-950"
                >
                    Save
                </button>
            </div>
        </div>
    )
};