import { useState } from 'react'
import { BsPlusLg, BsDashLg } from 'react-icons/bs'
import { api, type RouterOutputs } from '@/utils/api'
import Modal from 'react-modal'
import { useSession } from 'next-auth/react'


interface Stats {
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
};

type CharacterStats = {
    id: string;
    title: string;
    stats: Stats[];
}

const getBorderColorLevel = (level: number): string => {
    if (level >= 1 && level <= 5) {
        return "border-red-400";
    } else if (level >= 6 && level <= 10) {
        return "border-red-600";
    } else if (level >= 11 && level <= 15) {
        return "border-red-700";
    } else {
        return "border-red-800";
    }
};

// probably would've been easier to assign a race to a group in the db lol
type RaceGroup = "Beastfolk" | "Draconian" | "Fae" | "Giantkin" | "Mech" | "Mundane" | "Planar" ;

const getBorderColorRace = (race:string): string => {
    const raceGroups: Record<RaceGroup, string> = {
        Beastfolk: "border-green-600",
        Draconian: "border-red-500",
        Fae: "border-purple-500",
        Giantkin: "border-orange-500",
        Mech: "border-[#222]",
        Mundane: "border-blue-400",
        Planar: "border-blue-500",
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
type ClassType = "Select Class" | "Artificer" | "Barbarian" | "Bard" | "Blood Hunter" | "Cleric" | "Druid" | "Fighter" | "Monk" | "Paladin" | "Ranger" | "Rogue" | "Sorcerer" | "Warlock" | "Wizard";

const getBorderColorClass = (charClass: string): string => {
    const classBorderColors: Record<ClassType, string> = {
        'Select Class': 'border-gray-300',
        'Artificer': "border-amber-400",
        'Barbarian': "border-red-500",
        'Bard': "border-purple-500",
        'Blood Hunter': "border-red-800",
        'Cleric': "border-gray-500",
        'Druid': "border-emerald-500",
        'Fighter': "border-orange-500",
        'Monk': "border-blue-500",
        'Paladin': "border-yellow-400",
        'Ranger': "border-green-700",
        'Rogue': "border-stone-400",
        'Sorcerer': "border-red-600",
        'Warlock': "border-purple-700",
        "Wizard": "border-blue-800"
    };

    const classBorderColor = classBorderColors[charClass as ClassType] || "border-gray-300";
    return classBorderColor;
};

type Campaign = RouterOutputs["campaign"]["getAll"][0];


export const UserCharacterCard = ({
    character, 
    onDelete,
}: {
    character: CharacterStats;
    onDelete: () => void;
}) => {

    const { data: sessionData } = useSession();

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    // update character 
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [editedStats, setEditedStats] = useState<Partial<Stats>>({
        level: 0,
    }); // Use Partial<Stats> for editedStats
    const updateCharacterStats = api.character.update.useMutation({
        onSuccess: () => {
            window.location.reload();
        },
    });
    const handleEditClick = () => {
        setIsEditMode(true);
        // Clone the stats object when entering edit mode
        setEditedStats({ ...character.stats[0] });
    };
    const handleUpdateClick = () => {
        if (editedStats?.id) {
          // Pass the editedStats state to the mutate function
            void updateCharacterStats.mutateAsync({
                id: character.stats[0]?.id ?? "",
                stats: editedStats as Stats, // Cast editedStats to Stats
            });
            setIsEditMode(false); // Close the edit mode
        }
    };

    // to delete character
    const [isDelCharModalOpen, setDelCharModalOpen] = useState(false);
    const openDelCharModal = () => {
        setDelCharModalOpen(true);
    };
    const closeDelCharModal = () => {
        setDelCharModalOpen(false);
    };

    const { data: charactersData, refetch: refetchCharacters } = api.character.getAllUser.useQuery(
        {
          userId: sessionData?.user.id ?? "",
        },
        {
          enabled: sessionData?.user !== undefined,
        }
    );

    const { data: campaigns, refetch: refetchCampaigns } = api.campaign.getAll.useQuery(
        undefined, // no input
        {
          enabled: sessionData?.user !== undefined,
          onSuccess: (data) => {
            setSelectedCampaign(selectedCampaign ?? data[0] ?? null);
          }
        }
    );

    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

    function isCampaignSelected(campaignId: string, selectedCampaign: Campaign | null): boolean {
        return selectedCampaign ? campaignId === selectedCampaign.id : false;
    }

    const [isCampaignMenuOpen, setCampaignMenuOpen] = useState<boolean>(false);
    const toggleCampaignMenu = () => {
        setCampaignMenuOpen(!isCampaignMenuOpen);
    };



    const addCharacter = api.addCharacterToCampaignRouter.addCharacterToCampaign.useMutation({
        onSuccess: () => {
          void refetchCharacters();
        }
    });

    const removeCharFromUser = api.removeCharFromUserRouter.removeCharacterFromUser.useMutation({
        onSuccess: () => {
            void refetchCharacters();
        }
    });

    const addCharacterToCamp = api.addCharacterToCampaignRouter.addCharacterToCampaign.useMutation({
        onSuccess: () => {
            void refetchCharacters();
        }
    })

    const removeCharacterFromUser = () => {
        removeCharFromUser.mutate({
            characterId: character.id,
            userId: sessionData?.user.id ?? "",
        });
        addCharacterToCamp.mutate({
            characterId: character.id,
            campaignId: selectedCampaign?.id ?? "",
        })
    }



    return (
        <>
        <div className="bg-white dark:bg-[#222] rounded-lg shadow-md p-4 grid">
            <div className="">
                    <div className="text-lg tracking-wide font-bold flex items-center justify-between py-4">
                        <div className="flex items-center text-xl text-[#222] dark:text-white">
                            <span>{character.title}</span>
                        </div>
                        <button 
                            className="text-[#222] dark:text-white"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? <BsDashLg /> : <BsPlusLg />}
                        </button>
                    </div>

                    {isExpanded && (
                    <div className="">
                        {character.stats.map((stat) => (
                            <div key={stat.id}>

                                {isEditMode ? (
                                <div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4">
                                        <div
                                            className={`border-l-4 ${getBorderColorLevel(
                                            editedStats?.level ?? 0
                                            )} p-4 flex flex-col justify-between bg-gray-50 dark:bg-[#333] dark:bg-opacity-25 rounded-r-lg dark:text-white`}
                                        >
                                            <p className="text-xs font-light text-[#222] dark:text-white">Level</p>
                                            <div className="flex justify-end">
                                                <input
                                                    type="number"
                                                    value={editedStats.level?.toString() ?? ""}
                                                    onChange={(e) =>
                                                        setEditedStats((prevState) => ({
                                                        ...prevState,
                                                        level: parseInt(e.target.value),
                                                        }))
                                                    }
                                                    className="font-semibold text-lg md:text-2xl w-1/2 rounded-full px-3 text-right dark:bg-[#444] dark:text-white"
                                                />
                                            </div>
                                        </div>
                                        <div className={`border-l-4 ${getBorderColorRace(stat.charRace)} p-4 flex flex-col justify-between bg-gray-50 dark:bg-[#333] dark:bg-opacity-25 rounded-r-lg dark:text-white`}>
                                            <p className="text-xs font-light">Race</p>
                                            <span className="text-lg md:text-2xl font-semibold text-right">{stat.charRace}</span>
                                        </div>
                                        <div className={`border-l-4 ${getBorderColorClass(stat.charClass)} p-4 flex flex-col justify-between bg-gray-50 dark:bg-[#333] dark:bg-opacity-25 rounded-r-lg dark:text-white`}>
                                            <p className="text-xs font-light">Class</p>
                                            <span className="text-lg md:text-2xl font-semibold text-right">{stat.charClass}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 pt-4">
                                        <div className="border-l-4 border-[#222] dark:border-white rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <input
                                                type="number"
                                                value={editedStats.totalSessions?.toString() ?? ""}
                                                onChange={(e) =>
                                                    setEditedStats((prevState) => ({
                                                    ...prevState,
                                                    totalSessions: parseInt(e.target.value),
                                                    }))
                                                }
                                                className="font-semibold text-lg md:text-2xl w-1/2 rounded-full px-3 text-right dark:bg-[#444] dark:text-white"
                                            />                                            
                                            <p className="text-xs font-light text-right dark:text-white">Sessions</p>
                                        </div>
                                        <div className="border-l-4 border-[#222] dark:border-white rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <input
                                                type="number"
                                                value={editedStats.totalTime?.toString() ?? ""}
                                                onChange={(e) =>
                                                    setEditedStats((prevState) => ({
                                                    ...prevState,
                                                    totalTime: parseInt(e.target.value),
                                                    }))
                                                }
                                                className="font-semibold text-lg md:text-2xl w-1/2 rounded-full px-3 text-right dark:bg-[#444] dark:text-white"
                                            />                                             
                                            <p className="text-xs font-light text-right dark:text-white">Time Played</p>
                                        </div>
                                        <div className="border-l-4 border-[#222] dark:border-white rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                        <input
                                                type="number"
                                                value={editedStats.totalXp?.toString() ?? ""}
                                                onChange={(e) =>
                                                    setEditedStats((prevState) => ({
                                                    ...prevState,
                                                    totalXp: parseInt(e.target.value),
                                                    }))
                                                }
                                                className="font-semibold text-lg md:text-2xl w-1/2 rounded-full px-3 text-right dark:bg-[#444] dark:text-white"
                                            />                                             
                                            <p className="text-xs font-light text-right dark:text-white">XP</p>
                                        </div>

                                        {/* stats */}
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <input
                                                type="number"
                                                value={editedStats.dmgTaken?.toString() ?? ""}
                                                onChange={(e) =>
                                                    setEditedStats((prevState) => ({
                                                    ...prevState,
                                                    dmgTaken: parseInt(e.target.value),
                                                    }))
                                                }
                                                className="font-semibold text-lg md:text-2xl w-1/2 rounded-full px-3 text-right dark:bg-[#444] dark:text-white"
                                            />                                             
                                            <p className="text-xs font-light text-right dark:text-white">Damage Taken</p>
                                        </div>
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <input
                                                type="number"
                                                value={editedStats.dmgDealt?.toString() ?? ""}
                                                onChange={(e) =>
                                                    setEditedStats((prevState) => ({
                                                    ...prevState,
                                                    dmgDealt: parseInt(e.target.value),
                                                    }))
                                                }
                                                className="font-semibold text-lg md:text-2xl w-1/2 rounded-full px-3 text-right dark:bg-[#444] dark:text-white"
                                            />                                             
                                            <p className="text-xs font-light text-right dark:text-white">Damage Dealt</p>
                                        </div>
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <input
                                                type="number"
                                                value={editedStats.totalKills?.toString() ?? ""}
                                                onChange={(e) =>
                                                    setEditedStats((prevState) => ({
                                                    ...prevState,
                                                    totalKills: parseInt(e.target.value),
                                                    }))
                                                }
                                                className="font-semibold text-lg md:text-2xl w-1/2 rounded-full px-3 text-right dark:bg-[#444] dark:text-white"
                                            />                                             
                                            <p className="text-xs font-light text-right dark:text-white">Kills</p>
                                        </div>
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <input
                                                type="number"
                                                value={editedStats.critHits?.toString() ?? ""}
                                                onChange={(e) =>
                                                    setEditedStats((prevState) => ({
                                                    ...prevState,
                                                    critHits: parseInt(e.target.value),
                                                    }))
                                                }
                                                className="font-semibold text-lg md:text-2xl w-1/2 rounded-full px-3 text-right dark:bg-[#444] dark:text-white"
                                            />                                             
                                            <p className="text-xs font-light text-right dark:text-white">Critical Hits</p>
                                        </div>
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <input
                                                type="number"
                                                value={editedStats.totalDeaths?.toString() ?? ""}
                                                onChange={(e) =>
                                                    setEditedStats((prevState) => ({
                                                    ...prevState,
                                                    totalDeaths: parseInt(e.target.value),
                                                    }))
                                                }
                                                className="font-semibold text-lg md:text-2xl w-1/2 rounded-full px-3 text-right dark:bg-[#444] dark:text-white"
                                            />                                             
                                            <p className="text-xs font-light text-right dark:text-white">Deaths</p>
                                        </div>
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <input
                                                type="number"
                                                value={editedStats.totalKo?.toString() ?? ""}
                                                onChange={(e) =>
                                                    setEditedStats((prevState) => ({
                                                    ...prevState,
                                                    totalKo: parseInt(e.target.value),
                                                    }))
                                                }
                                                className="font-semibold text-lg md:text-2xl w-1/2 rounded-full px-3 text-right dark:bg-[#444] dark:text-white"
                                            />                                             
                                            <p className="text-xs font-light text-right dark:text-white">Times Unconscious</p>
                                        </div>
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <input
                                                type="number"
                                                value={editedStats.spellsCast?.toString() ?? ""}
                                                onChange={(e) =>
                                                    setEditedStats((prevState) => ({
                                                    ...prevState,
                                                    spellsCast: parseInt(e.target.value),
                                                    }))
                                                }
                                                className="font-semibold text-lg md:text-2xl w-1/2 rounded-full px-3 text-right dark:bg-[#444] dark:text-white"
                                            />                                                  
                                            <p className="text-xs font-light text-right dark:text-white">Spells Cast</p>
                                        </div>
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <input
                                                type="number"
                                                value={editedStats.turnsNoDmg?.toString() ?? ""}
                                                onChange={(e) =>
                                                    setEditedStats((prevState) => ({
                                                    ...prevState,
                                                    turnsNoDmg: parseInt(e.target.value),
                                                    }))
                                                }
                                                className="font-semibold text-lg md:text-2xl w-1/2 rounded-full px-3 text-right dark:bg-[#444] dark:text-white"
                                            />                                                  
                                            <p className="text-xs font-light text-right dark:text-white">Avg. Turns Without Damage</p>
                                        </div>
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <input
                                                type="number"
                                                value={editedStats.combatTime?.toString() ?? ""}
                                                onChange={(e) =>
                                                    setEditedStats((prevState) => ({
                                                    ...prevState,
                                                    combatTime: parseInt(e.target.value),
                                                    }))
                                                }
                                                className="font-semibold text-lg md:text-2xl w-1/2 rounded-full px-3 text-right dark:bg-[#444] dark:text-white"
                                            />                                                  
                                            <p className="text-xs font-light text-right dark:text-white">Time In Combat</p>
                                        </div>
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <input
                                                type="number"
                                                value={editedStats.totalHealingOthers?.toString() ?? ""}
                                                onChange={(e) =>
                                                    setEditedStats((prevState) => ({
                                                    ...prevState,
                                                    totalHealingOthers: parseInt(e.target.value),
                                                    }))
                                                }
                                                className="font-semibold text-lg md:text-2xl w-1/2 rounded-full px-3 text-right dark:bg-[#444] dark:text-white"
                                            />                                                  
                                            <p className="text-xs font-light text-right dark:text-white">Total HP Healed (Others)</p>
                                        </div>
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <input
                                                type="number"
                                                value={editedStats.totalHealingSelf?.toString() ?? ""}
                                                onChange={(e) =>
                                                    setEditedStats((prevState) => ({
                                                    ...prevState,
                                                    totalHealingSelf: parseInt(e.target.value),
                                                    }))
                                                }
                                                className="font-semibold text-lg md:text-2xl w-1/2 rounded-full px-3 text-right dark:bg-[#444] dark:text-white"
                                            />                                                  
                                            <p className="text-xs font-light text-right dark:text-white">Total HP Healed (Self)</p>
                                        </div>
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <input
                                                type="number"
                                                value={editedStats.natTwenty?.toString() ?? ""}
                                                onChange={(e) =>
                                                    setEditedStats((prevState) => ({
                                                    ...prevState,
                                                    natTwenty: parseInt(e.target.value),
                                                    }))
                                                }
                                                className="font-semibold text-lg md:text-2xl w-1/2 rounded-full px-3 text-right dark:bg-[#444] dark:text-white"
                                            />                                                  
                                            <p className="text-xs font-light text-right dark:text-white">Nat 20&apos;s Rolled</p>
                                        </div>
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <input
                                                type="number"
                                                value={editedStats.natOne?.toString() ?? ""}
                                                onChange={(e) =>
                                                    setEditedStats((prevState) => ({
                                                    ...prevState,
                                                    natOne: parseInt(e.target.value),
                                                    }))
                                                }
                                                className="font-semibold text-lg md:text-2xl w-1/2 rounded-full px-3 text-right dark:bg-[#444] dark:text-white"
                                            />                                                  
                                            <p className="text-xs font-light text-right dark:text-white">Nat 1&apos;s Rolled</p>
                                        </div>
                                    </div>
                                </div>
                                ) : (
                                <div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4 text-[#222] dark:text-white">                         
                                        <div className={`border-l-4 ${getBorderColorLevel(stat.level)} p-4 flex flex-col justify-between bg-gray-50 dark:bg-[#333] dark:bg-opacity-25 rounded-r-lg`}>
                                            <p className="text-xs font-light">Level</p>
                                            <span className="text-lg md:text-2xl font-semibold text-right">
                                                {stat.level}
                                            </span>
                                        </div>
                                        <div className={`border-l-4 ${getBorderColorRace(stat.charRace)} p-4 flex flex-col justify-between bg-gray-50 dark:bg-[#333] dark:bg-opacity-25 rounded-r-lg`}>
                                            <p className="text-xs font-light">Race</p>
                                            <span className="text-lg md:text-2xl font-semibold text-right">{stat.charRace}</span>
                                        </div>
                                        <div className={`border-l-4 ${getBorderColorClass(stat.charClass)} p-4 flex flex-col justify-between bg-gray-50 dark:bg-[#333] dark:bg-opacity-25 rounded-r-lg`}>
                                            <p className="text-xs font-light">Class</p>
                                            <span className="text-lg md:text-2xl font-semibold text-right">{stat.charClass}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 pt-4 text-[#222] dark:text-white">
                                        <div className="border-l-4 border-[#222] dark:border-white rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <span className="font-semibold text-lg md:text-2xl">{stat.totalSessions}</span>
                                            <p className="text-xs font-light text-right">Sessions</p>
                                        </div>
                                        <div className="border-l-4 border-[#222] dark:border-white rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <span className="font-semibold text-lg md:text-2xl">{stat.totalTime} hrs</span>
                                            <p className="text-xs font-light text-right">Time Played</p>
                                        </div>
                                        <div className="border-l-4 border-[#222] dark:border-white rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <span className="font-semibold text-lg md:text-2xl">{stat.totalXp}</span>
                                            <p className="text-xs font-light text-right">XP</p>
                                        </div>

                                        {/* stats */}
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <span className="font-semibold text-lg md:text-2xl">{stat.dmgTaken}</span>
                                            <p className="text-xs font-light text-right">Damage Taken</p>
                                        </div>
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <span className="font-semibold text-lg md:text-2xl">{stat.dmgDealt}</span>
                                            <p className="text-xs font-light text-right">Damage Dealt</p>
                                        </div>
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <span className="font-semibold text-lg md:text-2xl">{stat.totalKills}</span>
                                            <p className="text-xs font-light text-right">Kills</p>
                                        </div>
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <span className="font-semibold text-lg md:text-2xl">{stat.critHits}</span>
                                            <p className="text-xs font-light text-right">Critical Hits</p>
                                        </div>
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <span className="font-semibold text-lg md:text-2xl">{stat.totalDeaths}</span>
                                            <p className="text-xs font-light text-right">Deaths</p>
                                        </div>
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <span className="font-semibold text-lg md:text-2xl">{stat.totalKo}</span>
                                            <p className="text-xs font-light text-right">Times Unconscious</p>
                                        </div>
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <span className="font-semibold text-lg md:text-2xl">{stat.spellsCast}</span>
                                            <p className="text-xs font-light text-right">Spells Cast</p>
                                        </div>
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <span className="font-semibold text-lg md:text-2xl">{stat.turnsNoDmg}</span>
                                            <p className="text-xs font-light text-right">Avg. Turns Without Damage</p>
                                        </div>
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <span className="font-semibold text-lg md:text-2xl">{stat.combatTime} min</span>
                                            <p className="text-xs font-light text-right">Time In Combat</p>
                                        </div>
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <span className="font-semibold text-lg md:text-2xl">{stat.totalHealingOthers}</span>
                                            <p className="text-xs font-light text-right">Total HP Healed (Others)</p>
                                        </div>
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <span className="font-semibold text-lg md:text-2xl">{stat.totalHealingSelf}</span>
                                            <p className="text-xs font-light text-right">Total HP Healed (Self)</p>
                                        </div>
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <span className="font-semibold text-lg md:text-2xl">{stat.natTwenty}</span>
                                            <p className="text-xs font-light text-right">Nat 20&apos;s Rolled</p>
                                        </div>
                                        <div className="border-l-4 border-[#888] rounded-r-lg p-4 flex flex-col space-y-2 items-end bg-gray-50 dark:bg-[#333] dark:bg-opacity-50">
                                            <span className="font-semibold text-lg md:text-2xl">{stat.natOne}</span>
                                            <p className="text-xs font-light text-right">Nat 1&apos;s Rolled</p>
                                        </div>
                                    </div>
                                </div>
                                )}
                            </div>
                        ))}
                        <div className="mt-8 flex flex-col items-end space-y-2 md:space-y-0 md:flex-row justify-between text-sm uppercase">
                            <span className="text-gray-300">{character.title}&apos;s Stats</span>
                            <div className="flex space-x-8">
                                {isEditMode ? (
                                <button 
                                    className="text-xs uppercase text-white bg-green-500 px-4 py-2 rounded-full"
                                    onClick={handleUpdateClick}
                                > save </button>
                                ) : (
                                <button 
                                    className="text-xs uppercase text-white bg-blue-500 px-[1.1rem] py-2 rounded-full"
                                    onClick={handleEditClick}
                                > edit </button>
                                )}
                                {isEditMode ? (
                                <button 
                                    className="text-xs uppercase text-white bg-yellow-400 px-4 py-2 rounded-full"
                                    onClick={() => {
                                        setIsEditMode(false);
                                        // Reset the editedStats to the original stats when canceling edit
                                        setEditedStats({ ...character.stats[0] });
                                    }}
                                > cancel </button>
                                ) : (
                                <button 
                                    className="text-xs uppercase text-white bg-red-500 px-[1.1rem] py-2 rounded-full"
                                    onClick={openDelCharModal}
                                > delete </button>
                                )}
                                <button 
                                    className="text-xs uppercase text-white bg-green-500 px-[1.1rem] py-2 rounded-full"
                                    onClick={toggleCampaignMenu}
                                > Add To </button>

                                {isCampaignMenuOpen && (
                                    <div className="">
                                        {campaigns?.map((campaign) => (
                                            <button
                                              key={campaign.id}
                                              className={`block px-4 py-2 ${
                                                isCampaignSelected(campaign.id, selectedCampaign)
                                                  ? "bg-blue-200"
                                                  : ""
                                              }`}
                                              onClick={() => {
                                                // Handle campaign selection here
                                                setSelectedCampaign(campaign);
                                                // Add the character to the selected campaign
                                                removeCharacterFromUser();
                                                setCampaignMenuOpen(false);
                                              }}
                                            >
                                              {campaign.title}
                                            </button>
                                        ))}
                                    </div> 
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
              
        {/* Modal for delete character confirmation */}
        <Modal
            isOpen={isDelCharModalOpen}
            onRequestClose={closeDelCharModal}
            contentLabel="Confirm Delete"
            overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center px-8"
            className="bg-white dark:bg-[#333] p-8 rounded-lg sm:ml-64"
        >
            <div className="text-center flex flex-col justify-between space-y-8">
                <p className="text-sm text-[#222] dark:text-white">
                    Are you sure you want to delete <span className="font-semibold">{character.title}</span>? This action cannot be undone.
                </p>
                <div className="mt-6 flex justify-center space-x-12">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-full text-xs uppercase font-light"
                        onClick={closeDelCharModal}
                        >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-full text-xs uppercase font-light"
                        onClick={() => {
                            // Call the onDelete function to delete the character
                            onDelete();
                            closeDelCharModal();
                        }}
                    > Delete Character</button>
                </div>
            </div>
        </Modal>
        </>
    )
};