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