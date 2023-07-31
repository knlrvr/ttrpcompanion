import { useState } from 'react'

export const CharacterEditor = ({
    onSave,
}: {
    onSave: (character: { 
        title: string; 
        stats: {
            level: number;
        }
    }) => void;
}) => {

    const [title, setTitle] = useState<string>("");
    const [level, setLevel] = useState<number>(0);
    const [charClass, setCharClass] = useState<string>("");
    const [totalSessions, setTotalSessions] = useState<number>(0);
    const [totalTime, setTotalTime] = useState<number>(0);
    const [dmgDealt, setDmgDealt] = useState<number>(0);
    const [dmgTaken, setDmgTaken] = useState<number>(0);
    const [critHits, setCritHits] = useState<number>(0);
    const [totalKills, setTotalKills] = useState<number>(0);
    const [spellsCast, setSpellsCast] = useState<number>(0);
    const [totalOthers, setTotalOthers] = useState<number>(0);
    const [totalSelf, setTotalSelf] = useState<number>(0);
    const [totalDeaths, setTotalDeaths] = useState<number>(0);
    const [turnsNoDmg, setTurnsNoDmg] = useState<number>(0);

    return (
        <div className="">
            <div className="flex space-x-2">
                <input
                    type="text"
                    placeholder='Character Name'
                    className="border rounded-full px-3 py-1"
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                />
                <input
                    type="number"
                    placeholder='Character Name'
                    className="border"
                    value={level}
                    onChange={(e) => setLevel(e.currentTarget.valueAsNumber)}
                />
                <button 
                    onClick={() => {
                        onSave({
                            title, 
                            stats: {
                                level,
                                
                            },
                        });
                        setTitle("");
                        setLevel(0);
                    }}
                    className="rounded-full py-1 px-3 bg-green-400 text-green-950"
                >
                    Save
                </button>
            </div>
        </div>
    )
};