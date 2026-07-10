// components/ui/UserDetails.tsx

import { PiCakeThin } from "react-icons/pi";
import { VscVerified } from "react-icons/vsc";

type UserDetailsProps = { user: { username?: string | null; dob?: string | null; address?: string | null; bio?: string | null; emailVerified?: boolean; }; };

const buttonClasses = "relative shadow dark:shadow-inner shadow-stone-500 py-1 px-2 hover:scale-105 transition-all ease-in duration-150";

export const UserDetails = ({ user }: UserDetailsProps) => {

    return (
        <div className='relative sm:w-2/5 w-full shadow dark:shadow-inner shadow-stone-500 rounded-2xl mx-1 my-2 p-2 text-shadow-xs text-shadow-stone-500'>
            <h1 className='relative max-w-fit text-xl text-center dark:shadow shadow-inner shadow-stone-500 rounded-2xl py-0.5 px-2 text-shadow-lg my-1 flex justify-start items-center'>
                {user.username || "Guest"}
                {user.username?.trim() && user.emailVerified && (
                    <span className="relative -translate-y-1/3">
                        <VscVerified />
                    </span>
                )}
            </h1>

            <address className='relative text-xs opacity-60 italic max-w-fit dark:shadow shadow-inner shadow-stone-500 rounded-2xl py-0.5 px-2 text-shadow-lg my-1'>
                {user.address || "No Address"}
            </address>

            <p className='relative text-xs opacity-80 max-w-fit dark:shadow shadow-inner shadow-stone-500 rounded-2xl py-0.5 px-2 text-shadow-lg my-1 flex justify-start items-center gap-1'>
                <PiCakeThin /> {user.dob
                    ? new Date(user.dob).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                    })
                    : "No DOB"}
            </p>

            <p className='relative text-sm opacity-80 max-w-fit dark:shadow shadow-inner shadow-stone-500 rounded-xl py-0.5 px-2 text-shadow-lg my-1'>
                {user.bio || "No Bio"}
            </p>

            {user.username &&
                (<div className='relative flex max-w-fit justify-start items-center dark:shadow shadow-inner shadow-stone-500 rounded-4xl p-2 my-2 gap-2'>
                    <button className={`${buttonClasses} rounded-4xl`}>Clients</button>
                    <button className={`${buttonClasses} rounded-4xl`}>Artists</button>
                    <button className={`${buttonClasses} rounded-4xl`}>Calls</button>
                </div>)
            }
        </div>
    );
};