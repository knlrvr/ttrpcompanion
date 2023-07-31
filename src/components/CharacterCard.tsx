import { useState } from 'react'

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
        <div className="">
            <div className="">
                <div 
                    className=""
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="">{character.title}</div>
                    <div className="">
                        {character.stats.map((stat) => (
                            <div key={stat.id}>
                                Level: {stat.level}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}