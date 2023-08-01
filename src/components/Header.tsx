import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export const Header = () => {
    const { data: sessionData } = useSession();

    return (
        <div className="max-w-7xl mx-auto flex items-center justify-between py-2 px-4">
            <div className="">
                <h1 className="text-sm font-extrabold tracking-wide">TTRPCompanion</h1>
            </div>
            <div className=''>
                {sessionData?.user ? (
                    <div className="flex items-center gap-2">
                        <p className="text-xs">{sessionData?.user.name ?? ""}</p>
                        <label  
                            tabIndex={0}
                            className=''
                            onClick={() => void signOut()}
                        >
                            <div className="w-6 h-6 cursor-pointer">   
                                <Image
                                    src={sessionData?.user.image ?? ""}
                                    alt={sessionData?.user.name ?? ""}
                                    width={1000}
                                    height={1000}
                                    className="rounded-full"
                                />
                            </div>
                        </label>
                    </div>
                ) : (
                    <>
                    </>
                )}
            </div>
        </div>
    )
}